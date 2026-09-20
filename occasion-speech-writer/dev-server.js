#!/usr/bin/env node
"use strict";

// Local development server for the Occasion Speech Writer.
//
// The production app runs on Vercel (static files + the two functions under
// `api/`). `vercel dev` reproduces that locally but requires a Vercel login and
// project link, which isn't available in a headless dev environment. This
// server reproduces just enough of Vercel's contract — static file serving with
// `cleanUrls`, and `api/*.js` handlers invoked with Vercel's (req, res) shape —
// so the whole app can be exercised locally with no external accounts.
//
// It is a dev-only helper and is excluded from the deployment via `.vercelignore`.
//
// Env:
//   PORT        port to listen on (default 3000)
//   HOST        interface to bind (default 127.0.0.1)
//   DEV_MOCKS   when set to "1"/"true", stub the Anthropic and Lemon Squeezy
//               APIs so the full generate -> unlock flow can be demonstrated
//               without real paid API keys. Off by default (real behavior).
//
// Real secrets (ANTHROPIC_API_KEY, LEMONSQUEEZY_API_KEY, ...) are read from the
// environment and from an optional `.env.local` file, matching `vercel dev`.

const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "127.0.0.1";
const MOCKS = /^(1|true|yes)$/i.test(String(process.env.DEV_MOCKS || ""));

// ---- Load .env.local (simple KEY=VALUE parser, like `vercel env pull`) -------
(function loadDotEnvLocal() {
  const file = path.join(ROOT, ".env.local");
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
})();

// UNLOCK_SECRET is just "any long random string" (see README). Generate an
// ephemeral one for local dev if the operator didn't provide one, so the
// encrypt/decrypt path works out of the box.
if (!process.env.UNLOCK_SECRET) {
  process.env.UNLOCK_SECRET = crypto.randomBytes(32).toString("hex");
  process.env.__UNLOCK_SECRET_EPHEMERAL = "1";
}

// ---- Optional API mocks for a self-contained end-to-end demo -----------------
if (MOCKS) installMocks();

function installMocks() {
  const realFetch = globalThis.fetch;
  const activatedKeys = new Set(); // enforce single-use license activation

  // The handlers refuse to run without these keys. Provide placeholders so the
  // (mocked) network calls below are actually exercised. Real values from the
  // environment are preserved if present.
  if (!process.env.ANTHROPIC_API_KEY) process.env.ANTHROPIC_API_KEY = "sk-mock-anthropic";
  if (!process.env.LEMONSQUEEZY_API_KEY) process.env.LEMONSQUEEZY_API_KEY = "mock-lemonsqueezy";

  const MOCK_SPEECH = [
    "Good evening, everyone. For those who don't know me, I'm the lucky one who",
    "gets to stand up here and embarrass my best friend a little before dinner.",
    "",
    "I've known the groom since we were kids trading sandwiches at lunch, and in",
    "all that time I have never seen him as happy, as steady, or as genuinely",
    "himself as he is with the person he married today. Love, it turns out, looks",
    "a lot like someone finally exhaling.",
    "",
    "So please, raise your glasses. To a lifetime of bad jokes, good mornings, and",
    "the kind of love the rest of us are still taking notes on. Cheers!"
  ].join(" ");

  globalThis.fetch = async function mockedFetch(url, opts) {
    const u = String(url);

    if (u.startsWith("https://api.anthropic.com/")) {
      return jsonResponse(200, { content: [{ type: "text", text: MOCK_SPEECH }] });
    }

    if (u.startsWith("https://api.lemonsqueezy.com/")) {
      if (u.includes("/v1/orders/")) {
        return jsonResponse(200, {
          data: {
            attributes: {
              status: "paid",
              store_id: Number(process.env.LEMONSQUEEZY_STORE_ID) || 1,
              first_order_item: {
                variant_id: Number(process.env.LEMONSQUEEZY_VARIANT_ID) || 1
              }
            }
          }
        });
      }
      if (u.includes("/v1/license-keys")) {
        const m = u.match(/order_id\]=([^&]+)/);
        const orderId = m ? decodeURIComponent(m[1]) : "unknown";
        return jsonResponse(200, { data: [{ attributes: { key: `MOCK-KEY-${orderId}` } }] });
      }
      if (u.includes("/v1/licenses/activate")) {
        let key = "";
        try { key = JSON.parse(opts && opts.body).license_key; } catch (e) {}
        if (activatedKeys.has(key)) return jsonResponse(200, { activated: false });
        activatedKeys.add(key);
        return jsonResponse(200, { activated: true });
      }
    }

    return realFetch(url, opts);
  };

  function jsonResponse(status, obj) {
    return new Response(JSON.stringify(obj), {
      status,
      headers: { "content-type": "application/json" }
    });
  }
}

// ---- Static file serving -----------------------------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

function safeResolve(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const resolved = path.normalize(path.join(ROOT, decoded));
  if (resolved !== ROOT && !resolved.startsWith(ROOT + path.sep)) return null;
  return resolved;
}

function tryStatic(urlPath) {
  // `/` -> index.html
  if (urlPath === "/" || urlPath === "") urlPath = "/index.html";
  const base = safeResolve(urlPath);
  if (!base) return null;

  const candidates = [];
  if (path.extname(base)) {
    candidates.push(base);
  } else {
    // cleanUrls: `/best-man-speech` -> `best-man-speech.html`
    candidates.push(base + ".html", base, path.join(base, "index.html"));
  }
  for (const file of candidates) {
    try {
      const stat = fs.statSync(file);
      if (stat.isFile()) return file;
    } catch (e) {}
  }
  return null;
}

// ---- Vercel-style (req, res) shims -------------------------------------------
function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", () => resolve(""));
  });
}

function decorateRes(res) {
  res.status = function (code) {
    res.statusCode = code;
    return res;
  };
  res.json = function (obj) {
    const payload = JSON.stringify(obj);
    if (!res.getHeader("Content-Type")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(payload);
    return res;
  };
  return res;
}

async function handleApi(handlerPath, req, res) {
  let handler;
  try {
    // Load fresh each request so edits to api/*.js are picked up without a restart.
    delete require.cache[require.resolve(handlerPath)];
    handler = require(handlerPath);
  } catch (err) {
    console.error("Failed to load handler", handlerPath, err);
    res.status(500).json({ error: "handler_load_failed" });
    return;
  }

  const raw = await readBody(req);
  if (raw) {
    const ct = String(req.headers["content-type"] || "");
    if (ct.includes("application/json")) {
      try { req.body = JSON.parse(raw); } catch (e) { req.body = raw; }
    } else {
      req.body = raw;
    }
  } else {
    req.body = undefined;
  }

  decorateRes(res);
  try {
    await handler(req, res);
  } catch (err) {
    console.error("Handler threw", handlerPath, err);
    if (!res.headersSent) res.status(500).json({ error: "internal_error" });
  }
}

// ---- Server ------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const started = Date.now();
  const urlPath = (req.url || "/").split("?")[0];

  res.on("finish", () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${Date.now() - started}ms)`);
  });

  if (urlPath === "/api/generate") return handleApi(path.join(ROOT, "api", "generate.js"), req, res);
  if (urlPath === "/api/unlock") return handleApi(path.join(ROOT, "api", "unlock.js"), req, res);

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.status(405).setHeader?.("Allow", "GET, HEAD");
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const file = tryStatic(urlPath);
  if (!file) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end("404 Not Found");
    return;
  }
  res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method === "HEAD") { res.end(); return; }
  fs.createReadStream(file).on("error", () => {
    res.statusCode = 500;
    res.end("500 Internal Server Error");
  }).pipe(res);
});

server.listen(PORT, HOST, () => {
  const cfg = (k) => (process.env[k] ? "set" : "MISSING");
  console.log("");
  console.log("  Occasion Speech Writer — local dev server");
  console.log(`  Listening on   http://${HOST}:${PORT}`);
  console.log(`  Serving files  ${ROOT}`);
  console.log("");
  console.log("  Routes:");
  console.log("    GET  /                     landing page (index.html)");
  console.log("    GET  /best-man-speech      + maid-of-honor, wedding-toast, retirement");
  console.log("    POST /api/generate         Anthropic-backed speech generation");
  console.log("    POST /api/unlock           Lemon Squeezy payment verification");
  console.log("");
  console.log("  Config:");
  console.log(`    ANTHROPIC_API_KEY   ${cfg("ANTHROPIC_API_KEY")}`);
  console.log(`    LEMONSQUEEZY_API_KEY ${cfg("LEMONSQUEEZY_API_KEY")}`);
  console.log(
    `    UNLOCK_SECRET        ${process.env.__UNLOCK_SECRET_EPHEMERAL ? "auto-generated (ephemeral)" : "set"}`
  );
  console.log(`    DEV_MOCKS            ${MOCKS ? "ON (Anthropic + Lemon Squeezy stubbed)" : "off"}`);
  console.log("");
});
