# quickie

Two unrelated things share this repository.

## [`occasion-speech-writer/`](occasion-speech-writer/) — the deployed app

An AI speech writer for weddings, best man and maid of honor toasts, and
retirements. Static pages plus two Vercel serverless functions, with a free
preview and a one-time payment to unlock the full speech. Setup, local
development, and the payment flow are documented in
[its own README](occasion-speech-writer/README.md).

**This folder is the Vercel project's Root Directory.** The app used to live at
the repository root and was moved here; the `quickie` project's Root Directory
setting was changed to `occasion-speech-writer` in the same change so the
deployment kept working. The two have to stay in agreement — moving these files
again, or renaming the folder, breaks the deployment unless that setting is
updated to match. The pages reference `/style.css`, `/app.js` and `/api/*` as
absolute paths, which resolve against the Root Directory rather than the repo
root, so nothing inside the app needed rewriting.

## [`research/`](research/) and [`.cursor/skills/crypto-trading/`](.cursor/skills/crypto-trading/) — the trading desk

Notes and an agent skill for discretionary crypto trading against the Robinhood
API: position sizing, stop placement, and measured execution mechanics. Unrelated
to the speech app, and not part of the deployment. `.cursor/skills/` is read by
Cursor agents rather than shipped.

## Licence

[MIT](LICENSE), covering the whole repository.
