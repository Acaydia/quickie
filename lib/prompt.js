const OCCASION_CONTEXT = {
  "best-man": "a best man speech at a wedding, addressed to the groom and the wedding guests",
  "maid-of-honor": "a maid of honor speech at a wedding, addressed to the bride and the wedding guests",
  "groom": "a groom's speech at his own wedding reception, thanking guests and speaking about his new spouse",
  "wedding-toast": "a wedding toast given by a guest (not part of the wedding party) to the couple",
  "retirement": "a retirement speech honoring someone's career as they leave the workplace",
  "anniversary": "an anniversary toast celebrating a couple's relationship",
  "farewell": "a farewell speech for someone leaving a job, team, or community"
};

const TONE_CONTEXT = {
  heartfelt: "warm, sincere, and emotionally genuine",
  funny: "light, funny, and playful, while still being kind",
  formal: "polished, formal, and respectful",
  mixed: "a natural mix of humor and heartfelt sincerity"
};

const LENGTH_WORDS = {
  short: "about 200-250 words (roughly a 1 minute speech)",
  medium: "about 400-500 words (roughly a 2-3 minute speech)",
  long: "about 650-800 words (roughly a 4-5 minute speech)"
};

function sanitize(value, maxLen) {
  return String(value || "").replace(/[<>]/g, "").slice(0, maxLen);
}

function buildPrompt(input) {
  const occasion = OCCASION_CONTEXT[input.occasion] || OCCASION_CONTEXT["wedding-toast"];
  const tone = TONE_CONTEXT[input.tone] || TONE_CONTEXT.mixed;
  const length = LENGTH_WORDS[input.length] || LENGTH_WORDS.medium;

  const speakerName = sanitize(input.speakerName, 80);
  const honoreeName = sanitize(input.honoreeName, 80);
  const relationship = sanitize(input.relationship, 200);
  const anecdotes = sanitize(input.anecdotes, 1500);

  return [
    `Write ${occasion}.`,
    `The speech is being given by ${speakerName || "the speaker"}, about/to ${honoreeName || "the honoree"}.`,
    relationship ? `Their relationship: ${relationship}.` : "",
    anecdotes ? `Personal details and memories to weave in naturally (don't just list them): ${anecdotes}` : "",
    `Tone: ${tone}.`,
    `Length: ${length}.`,
    "Write it as a real speech meant to be spoken aloud — natural sentences, no headers, no bullet points, no stage directions, no emojis.",
    "Do not include a title. Start directly with the speech.",
    "End on a genuine, warm closing line or toast."
  ].filter(Boolean).join("\n");
}

module.exports = { buildPrompt, OCCASION_CONTEXT };
