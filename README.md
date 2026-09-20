# Occasion Speech Writer

An AI tool that writes personalized wedding, best man, maid of honor, and
retirement speeches. Visitors get a free preview and pay a one-time fee to
unlock and download the full speech. No accounts, no database — the whole
thing is a static site plus two serverless functions.

## How it works

1. Visitor fills out a short form (occasion, names, relationship, a few
   memories, tone, length).
2. `api/generate.js` calls the Anthropic API to write the speech, returns a
   free preview, and sends the full text back to the browser **encrypted**
   (nothing is stored server-side).
3. Visitor clicks "Unlock," pays via a Lemon Squeezy checkout overlay.
4. `api/unlock.js` verifies the payment with the Lemon Squeezy API, then
   decrypts and returns the full speech for the browser to display, copy, or
   download as PDF/txt.

## Setup

You need three things before this can go live: an Anthropic API key, a
Lemon Squeezy account with one product, and a Vercel deployment. None of
these can be created on your behalf — they involve identity/payment
verification only you can complete.

### 1. Anthropic API key

1. Create an account at [console.anthropic.com](https://console.anthropic.com).
2. Add billing and set a **spend limit** (Settings → Limits) — this is your
   real cost control, since the free preview has no other rate limiting.
   $20–30 is plenty to start.
3. Create an API key (Settings → API Keys). You'll paste this into Vercel as
   `ANTHROPIC_API_KEY`.

### 2. Lemon Squeezy product

1. Create a store at [lemonsqueezy.com](https://lemonsqueezy.com) and
   complete payout/identity verification (needed before you can receive
   money).
2. Create one product, e.g. "Speech Unlock," priced around $8.99, type
   "Single Payment."
3. **On that product's variant, enable "License Keys" and set the
   activation limit to 1.** This is not optional — `api/unlock.js` relies on
   Lemon Squeezy's license-key activation (one-time use per order) to stop a
   single paid order from unlocking unlimited speeches. Without this
   enabled, unlock requests will fail with `license_not_ready`.
4. Open the product's variant and copy its **Buy Link** — paste it into
   `config.js` as `SPEECH_WRITER_CHECKOUT_URL`.
5. Under Settings → API, create an API key — this becomes
   `LEMONSQUEEZY_API_KEY` in Vercel.
6. Note your **Store ID** and the product variant's **Variant ID** (visible
   in the dashboard URLs or via the API) — these become
   `LEMONSQUEEZY_STORE_ID` and `LEMONSQUEEZY_VARIANT_ID` in Vercel. They're
   optional but recommended: without them, `api/unlock.js` only checks that
   *an* order was paid, not that it was paid for *this* product.

### 3. Deploy to Vercel

1. Push this repo to GitHub (or connect it directly) and import it into
   [Vercel](https://vercel.com) — no build step needed, it's static +
   `/api` functions.
2. In the Vercel project's Settings → Environment Variables, add:

   | Variable | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | from step 1 |
   | `ANTHROPIC_MODEL` | optional, defaults to `claude-haiku-4-5-20251001` |
   | `UNLOCK_SECRET` | any long random string (e.g. `openssl rand -hex 32`) — used to encrypt speeches in transit |
   | `LEMONSQUEEZY_API_KEY` | from step 2 |
   | `LEMONSQUEEZY_STORE_ID` | from step 2 (optional but recommended) |
   | `LEMONSQUEEZY_VARIANT_ID` | from step 2 (optional but recommended) |

3. Edit `config.js` with your real `SPEECH_WRITER_CHECKOUT_URL` and price,
   commit, and deploy.
4. **Test before going live**: switch the Lemon Squeezy store to Test Mode,
   run through the full generate → checkout → unlock flow with a test card,
   and confirm the full speech unlocks. Then switch the store to Live Mode.

You're launching on Vercel's free `*.vercel.app` subdomain — no domain
purchase needed to start. Only buy a custom domain later if the product
shows real traction.

## Local development

```
npm i -g vercel
vercel dev
```

This serves the static pages and `/api` functions locally, reading the same
environment variables from a `.env.local` file (see `vercel env pull`).

## How single-use redemption works (no database)

A paid order alone doesn't prove which speech it should unlock, and nothing
stops a client from generating unlimited free preview/blob pairs from
`api/generate.js`. So `api/unlock.js` doesn't just check "is this order
paid" — it also requires **activating** that order's Lemon Squeezy license
key (see setup step 3 above), which Lemon Squeezy allows exactly once per
order when the activation limit is set to 1. The first unlock request for a
given order succeeds; any replay of that same order ID fails with
`order_already_redeemed`. This pushes single-use tracking onto Lemon
Squeezy's own infrastructure instead of needing a database here.

## Files

- `index.html`, `best-man-speech.html`, `maid-of-honor-speech.html`,
  `wedding-toast.html`, `retirement-speech.html` — landing pages sharing one
  widget, each targeting a different search intent.
- `app.js` / `style.css` — the shared form, checkout, and unlock UI.
- `config.js` — the one file you edit with your Lemon Squeezy checkout URL.
- `api/generate.js` — calls Anthropic, returns a preview + encrypted full text.
- `api/unlock.js` — verifies payment with Lemon Squeezy, decrypts full text.
- `lib/crypto.js`, `lib/prompt.js` — shared helpers (not deployed as routes).

## Related

The Robinhood crypto trading desk lives in a separate private repository:
[`Acaydia/crypto-desk`](https://github.com/Acaydia/crypto-desk).
