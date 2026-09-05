const crypto = require("crypto");

function deriveKey(secret) {
  return crypto.createHash("sha256").update(String(secret)).digest();
}

function encrypt(plaintext, secret) {
  const key = deriveKey(secret);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [iv, encrypted, authTag].map((b) => b.toString("base64")).join(".");
}

function decrypt(blob, secret) {
  const parts = String(blob).split(".");
  if (parts.length !== 3) throw new Error("malformed_blob");
  const [ivB64, dataB64, tagB64] = parts;
  const key = deriveKey(secret);
  const iv = Buffer.from(ivB64, "base64");
  const data = Buffer.from(dataB64, "base64");
  const tag = Buffer.from(tagB64, "base64");
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

function hmac(value, secret) {
  return crypto.createHmac("sha256", String(secret)).update(value).digest("hex");
}

function randomToken(bytes) {
  return crypto.randomBytes(bytes || 16).toString("hex");
}

function timingSafeEqual(a, b) {
  const bufA = Buffer.from(String(a));
  const bufB = Buffer.from(String(b));
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

module.exports = { encrypt, decrypt, hmac, randomToken, timingSafeEqual };
