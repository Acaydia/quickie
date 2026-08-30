const { decrypt, hmac, timingSafeEqual } = require("../lib/crypto");

function extractCustomData(order) {
  const attrs = (order && order.data && order.data.attributes) || {};
  return attrs.custom_data || (order.data && order.data.meta && order.data.meta.custom_data) || null;
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

  // Best-effort binding of this specific order to this specific blob via Lemon
  // Squeezy's echoed checkout custom data. If Lemon Squeezy doesn't return
  // custom data for this order, we fall back to the paid-status check above —
  // meaning a shared order ID could unlock more than one speech. There's no
  // database in this stack to track single-use order redemption; upgrading to
  // Vercel KV to record "orderId already redeemed" closes that gap if it
  // becomes a real problem.
  const customData = extractCustomData(order);
  if (customData && customData.token) {
    if (!timingSafeEqual(customData.token, token) || customData.nonce !== nonce) {
      res.status(402).json({ error: "order_blob_mismatch" });
      return;
    }
  }

  let fullText;
  try {
    fullText = decrypt(blob, secret);
  } catch (err) {
    res.status(400).json({ error: "invalid_blob" });
    return;
  }

  res.status(200).json({ fullText });
};
