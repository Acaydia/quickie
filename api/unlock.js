const { decrypt, hmac, timingSafeEqual } = require("../lib/crypto");

// Lemon Squeezy's checkout custom_data (the nonce/token embedded in the buy
// link) is only ever delivered via webhooks, not via GET /v1/orders/{id} —
// so it can't be used here to bind a specific order to a specific blob.
// Instead, single-use redemption is enforced by Lemon Squeezy's own License
// Keys feature: enable "License Keys" with an activation limit of 1 on the
// product variant (see README setup), and activating the order's license
// key here can only ever succeed once per paid order, with Lemon Squeezy
// itself tracking that state — no database needed on our side.
async function getLicenseKeyForOrder(orderId, apiKey) {
  const res = await fetch(
    `https://api.lemonsqueezy.com/v1/license-keys?filter[order_id]=${encodeURIComponent(orderId)}`,
    {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${apiKey}`
      }
    }
  );
  if (!res.ok) return null;
  const body = await res.json();
  const entry = body.data && body.data[0];
  return entry ? entry.attributes.key : null;
}

async function activateLicenseKey(licenseKey) {
  const res = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ license_key: licenseKey, instance_name: "speech-unlock" })
  });
  const body = await res.json().catch(() => ({}));
  return body.activated === true;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const secret = process.env.UNLOCK_SECRET;
  const lsApiKey = process.env.LEMONSQUEEZY_API_KEY;
  const expectedStoreId = process.env.LEMONSQUEEZY_STORE_ID;
  const expectedVariantId = process.env.LEMONSQUEEZY_VARIANT_ID;

  if (!secret || !lsApiKey) {
    res.status(500).json({ error: "server_not_configured" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const { orderId, blob, nonce, token } = body;
  if (!orderId || !blob || !nonce || !token) {
    res.status(400).json({ error: "missing_fields" });
    return;
  }

  // Self-consistency check: does the submitted token match this blob+nonce?
  const expectedToken = hmac(String(nonce) + "." + String(blob), secret);
  if (!timingSafeEqual(expectedToken, token)) {
    res.status(400).json({ error: "invalid_token" });
    return;
  }

  let order;
  try {
    const lsRes = await fetch(`https://api.lemonsqueezy.com/v1/orders/${encodeURIComponent(orderId)}`, {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${lsApiKey}`
      }
    });
    if (!lsRes.ok) {
      res.status(402).json({ error: "order_not_found" });
      return;
    }
    order = await lsRes.json();
  } catch (err) {
    console.error("Lemon Squeezy lookup failed", err);
    res.status(502).json({ error: "payment_verification_failed" });
    return;
  }

  const attrs = order.data && order.data.attributes;
  if (!attrs || attrs.status !== "paid") {
    res.status(402).json({ error: "order_not_paid" });
    return;
  }
  if (expectedStoreId && String(attrs.store_id) !== String(expectedStoreId)) {
    res.status(402).json({ error: "order_wrong_store" });
    return;
  }
  if (expectedVariantId && attrs.first_order_item &&
      String(attrs.first_order_item.variant_id) !== String(expectedVariantId)) {
    res.status(402).json({ error: "order_wrong_product" });
    return;
  }

  let licenseKey;
  try {
    licenseKey = await getLicenseKeyForOrder(orderId, lsApiKey);
  } catch (err) {
    console.error("License key lookup failed", err);
    res.status(502).json({ error: "payment_verification_failed" });
    return;
  }
  if (!licenseKey) {
    // Either License Keys isn't enabled on this product/variant (setup issue —
    // see README), or the key hasn't finished generating yet right after
    // checkout. Either way, this must not be treated as "unlocked".
    res.status(402).json({ error: "license_not_ready" });
    return;
  }

  // Decrypt BEFORE activating the license key. Otherwise a malformed/tampered
  // blob can burn the single-use activation and leave a paid customer stuck.
  let fullText;
  try {
    fullText = decrypt(blob, secret);
  } catch (err) {
    res.status(400).json({ error: "invalid_blob" });
    return;
  }

  let activated;
  try {
    activated = await activateLicenseKey(licenseKey);
  } catch (err) {
    console.error("License key activation failed", err);
    res.status(502).json({ error: "payment_verification_failed" });
    return;
  }
  if (!activated) {
    // Already activated once for this order — reject the replay.
    res.status(402).json({ error: "order_already_redeemed" });
    return;
  }

  res.status(200).json({ fullText });
};
