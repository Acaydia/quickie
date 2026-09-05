const { buildPrompt, OCCASION_CONTEXT } = require("../lib/prompt");
const { encrypt, hmac, randomToken } = require("../lib/crypto");

const MAX_TOKENS_BY_LENGTH = { short: 450, medium: 750, long: 1150 };
const PREVIEW_WORD_COUNT = 120;
const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const secret = process.env.UNLOCK_SECRET;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!secret || !apiKey) {
    res.status(500).json({ error: "server_not_configured" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  body = body || {};

  const occasion = String(body.occasion || "");
  const speakerName = String(body.speakerName || "").trim();
  const honoreeName = String(body.honoreeName || "").trim();

  if (!OCCASION_CONTEXT[occasion]) {
    res.status(400).json({ error: "invalid_occasion" });
    return;
  }
  if (!speakerName || !honoreeName || speakerName.length > 80 || honoreeName.length > 80) {
    res.status(400).json({ error: "invalid_names" });
    return;
  }
  if (String(body.anecdotes || "").length > 1500 || String(body.relationship || "").length > 200) {
    res.status(400).json({ error: "input_too_long" });
    return;
  }

  const length = ["short", "medium", "long"].includes(body.length) ? body.length : "medium";
  const prompt = buildPrompt({
    occasion,
    speakerName,
    honoreeName,
    relationship: body.relationship,
    anecdotes: body.anecdotes,
    tone: body.tone,
    length
  });

  let fullText;
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS_BY_LENGTH[length],
        messages: [{ role: "user", content: prompt }]
      })
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Anthropic API error", response.status, errBody);
      res.status(502).json({ error: "generation_failed" });
      return;
    }

    const data = await response.json();
    fullText = (data.content || []).map((block) => block.text || "").join("").trim();
    if (!fullText) throw new Error("empty_response");
  } catch (err) {
    console.error("Generate error", err);
    res.status(502).json({ error: "generation_failed" });
    return;
  }

  const words = fullText.split(/\s+/);
  const preview = words.length > PREVIEW_WORD_COUNT
    ? words.slice(0, PREVIEW_WORD_COUNT).join(" ") + "…"
    : fullText;

  const blob = encrypt(fullText, secret);
  const nonce = randomToken(16);
  const token = hmac(nonce + "." + blob, secret);

  res.status(200).json({ preview, blob, nonce, token });
};
