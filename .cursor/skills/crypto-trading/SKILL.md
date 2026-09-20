---
name: crypto-trading
description: Operational methodology for discretionary crypto trading — position sizing, stop placement, trade management, entry triggers, and Robinhood execution mechanics. Use when placing, sizing, or managing any crypto or crypto-proxy trade, or when reviewing an existing book.
---

# Crypto trading methodology

Two sources feed this document, and they are kept separate on purpose.

**Sections 1-6** distil 19 YouTube trading-education transcripts (CryptoCred, Krown, Coin Bureau, DataDash), summarised with quotes in [research/crypto-trading-methodology-sources.md](../../../research/crypto-trading-methodology-sources.md). These are other people's claims. Most are reasoned rather than proven.

**Section 7** is measured directly against the Robinhood API. Every number there was observed in a preview or fill response and can be re-verified. Trust it over anything in sections 1-6 where they conflict.

---

## 0. Never guess

A standing law, and it overrides everything below. No price level, stop, size, or capability claim goes into an order unless it traces to something measured. When a number cannot be measured, say so and do not place the order.

Three failure modes, all of which have already happened here:

**Asserting absence.** This one has now happened three times, each time cheaper to check than to assume. "AVAX has no ETF proxy" — `search` returns four. "Crypto has no price history" — the scanner returns ATR, RSI, Bollinger bands and pivots for the entire crypto universe in one call. The first false claim left AVAX with no stop at all; the second built an entire proxy apparatus whose numbers understated alt volatility by up to 42%.

Note the failure was subtler the second time: enumerating tool names and finding no `get_crypto_historicals` is *evidence*, and the dedicated historicals tools really do reject crypto. But a tool's name is not its capability surface, and an adjacent subsystem carried the data all along. **Absence has to be demonstrated by a call that failed, not inferred from a catalogue that lacked the obvious name.** Run the lookup: enumerate, `search`, read `description`, and try the call on the asset you doubt.

**Inheriting an inference.** A subagent labelled its IBIT-to-BTC ratio "inferred, ±0.3%", and that caveat was dropped when the number became a resting order 6.5% from market. **A figure does not become measured by being passed along.** Carry the error bar, or re-derive it from something you can measure — and prefer the derivation that needs fewer unmeasurable inputs.

**Dressing a convention as a measurement.** "The stop is validated at 2.67 ATR" sounds measured, but the ~3 ATR convention is itself arbitrary, and CryptoCred argues stops belong at structural invalidation rather than any volatility multiple. The ATR is measured; the multiple is a choice. **Say which part is which.** The strongest stops are the ones where structure and volatility independently agree — AVAX's stop sits just under its $8.493 breakout base *and* lands at roughly 3.5 ATR, so both methods point to the same level.

The corollary is that "I cannot measure this" is a valid and useful answer. SUI had no identified catalyst, no structural invalidation to anchor a stop to, and a move that had fully round-tripped. The honest response was to exit, not to invent a level and call it risk management.

---

## 1. The sizing chain

Position size is **derived, never chosen**. Both CryptoCred risk videos give the identical formula:

```
position size = (equity x risk%) / distance from entry to invalidation
```

Worked from the source videos: $50,000 equity, 3% risk, stop 5% away gives a $30,000 position risking $1,500. $100,000 equity, 2% risk, 5% stop gives $40,000.

The order of operations matters and is the whole point. Find the level where the idea is wrong, measure the distance to it, then let the formula tell you the size. Picking a size first and then hunting for a stop that justifies it inverts the logic and is the most common sizing error.

**Risk per trade is not position size.** Risk per trade is the percentage of equity lost if stopped out. Position size is the notional held. Conflating them is how people end up 10x larger than they intended.

**Leverage changes nothing in this calculation.** "Cranking up the leverage slider does not increase or decrease your P&L; your P&L is dictated by your position size." Leverage only sets how close liquidation sits to price. At 25x, liquidation is roughly a 4% adverse move away. Cross margin liquidation takes the whole account; isolated margin does not.

## 2. Stops

**The stop goes at thesis invalidation, not at a fixed percentage.** This is the single strongest point of agreement across every source. "Be very cautious if anyone tells you your stop should never be more than X percent — the market doesn't really work like that."

**Invalidation must be logically tied to the entry reason.** If you enter for reason A and exit for unrelated reason B, something has gone wrong. If you cannot state invalidation before entering, skip the trade: "sometimes the market just doesn't give you risk-defined setups, and skipping those is fine."

**The eye test.** Put your stop level on a blank chart and ask: would I want to *buy* where my long gets stopped out? If yes, you should be trading at that level, not exiting there.

**Stop precision scales inversely with intended move size.** Low-timeframe, large-size trades need tight surgical stops. High-timeframe swing ideas need wide ones. Using a 1-minute-chart stop on a weekly thesis, or a sloppy stop on a scalp, is the error.

**Most "I got stop hunted" claims are bad stop placement.** Diagnose your own level before blaming the market.

**Use hard stops, not mental stops.** Non-negotiable for anyone without a long verified record.

**Stop-market versus stop-limit is a real decision with a real cost.** CryptoCred argues for market stops: "if you use a limit stop there's a chance that it won't get filled and the market jumps past your stop and exacerbates your losses in a volatile market." That risk is genuine. The counter-cost is measured in section 7: a market order pays roughly 0.95% in spread on Robinhood. Resolve it by size — when the spread cost is small in dollars relative to the loss an unfilled stop would cause, take the spread and use a stop-market order. In fast-moving crypto that is usually the right side of the trade.

## 3. Expectancy

**Required win rate from R:** `1 / (1 + R) x 100`. At 3R you need a 25% win rate to break even. At 1.5R you need 40%.

**Reject minimum-R dogma.** "Lots of gurus will pontificate about a minimum R or gold standard R — that's all nonsense." Targets must be justified by structure, not reverse-engineered to produce a flattering ratio.

**Drawdown recovery is asymmetric.** Down 10% needs +11% back. Down 20% needs +25%. Down 30% needs +43%. This asymmetry is the argument for caps.

**Expect losing streaks.** At a 50% win rate, the probability of six consecutive losses somewhere within 50 trades is above 50%. A losing streak is not evidence the system is broken.

**R evolves after entry.** A 1.5R trade that runs most of the way to target and stalls, with the stop still at the original level, may now be a 0.17R proposition. Recalculate rather than letting a near-winner round-trip.

## 4. Trade management

**Manage on the entry timeframe plus one below.** Weekly setup, manage on weekly and daily. Daily setup, manage on daily and 4h. Mismatching these is the most common management error.

**Manage losers, not just winners.** "Consistently reducing 1R losers to less than a full size stop-out will make a meaningful difference to your equity curve." Journals full of managed winners at +0.5R alongside unmanaged full -1R losses are a recognisable failure pattern.

**The continuous alignment test:** are developments in price since entry aligned with my expectations for this idea? If you sold a level and price keeps closing above it, exit before the stop.

**The offered-trade test:** if someone offered you the current price, your current stop and your current target as a fresh trade right now, would you take it? If no, manage it.

**Time-based invalidation.** Three setup families carry expiry dates:
- Trap setups (swing failure, failed breakout) assume *fast* rejection. As time passes, probability shifts from trap to genuine breakout.
- Momentum-continuation setups assume price does not stall after breaking structure.
- Support/resistance setups fail if price sits at the structure without reacting.

**Trailing versus fixed targets:** trail under each swing low in a trend; use fixed range boundaries or ATR targets in a range. Trailing risk is that obvious stop locations get tagged right before continuation.

**The dead zone.** Immediately after entry there is usually nothing to manage. Make sure there is something to manage before touching it.

## 5. Entry triggers

Six triggers, governed by one trade-off: **less confirmation means a better entry, more confirmation means a worse entry.** There is no free confirmation. "If true confirmation existed with no downsides, no one would ever lose money."

1. **Outright price** — resting limit order at the level. Controls fill price, earns maker pricing, prevents FOMO chasing. Costs partial fills and no chance to read the reaction. Best at fresh high-timeframe levels with time and space between break and retest. **Start here if inexperienced.**
2. **Wick price** — bid beyond the level to catch the excess. Scale the offset to the timeframe: 5-15% beyond structure for high-timeframe liquidation moves, 0.5-2% for normal lower-timeframe rotations. Greed causes missed trades.
3. **Deviation** — price must exceed the structure *and* close back inside it. Invalidation is then automatic: the extreme of the failed break. "The market typically doesn't double deviate."
4. **Break in structure** — wait for lower-timeframe lower-highs and lower-lows at resistance. Low signal-to-noise; precludes fast one-touch moves.
5. **Candle close** — buy the close through the level, on the *same timeframe as the structure*. Reduces noise in swing trading; costs lateness.
6. **Low-timeframe fractal** — when the high-timeframe zone is 5-20% wide, drop to the execution timeframe and take a setup inside the zone. Converts an untradeable area into a defined entry.

**Pattern failure is a tradeable setup in itself.** "Bullish pattern failure is bearish and bearish pattern failure is bullish." A clear pattern concentrates one-sided positioning; when it fails those participants must exit with market orders around the same price, and that produces the fast reversal. The clearer the pattern, the better the failure trade. Chop is not pattern failure — ambiguous price action never built the positioning.

**Market structure.** Require a close beyond the level on the same timeframe as the structure anchor. "If you must ask yourself where the market structure break has formed, it probably hasn't." A structure break need not produce a trade; it can simply mean stop adding, move stops, or take partials. Counter-trend structure breaks warrant a downward size adjustment.

**Timeframe symmetry for reversals.** If a market has trended down for weeks, a low-timeframe reversal signal is not sufficient evidence. Presume trend continuation until disproved, and the disproof must also appear on the high timeframe. Levels are zones, not ticks — treating a level as broken because price missed it exactly "means you will just cut good trades too early."

## 6. Where the sources disagree

Do not average these. Pick deliberately.

**Fixed risk per trade.** Krown: never exceed 2%, ever. CryptoCred 2018: 3% baseline, cut to 1-2% after consecutive losses. CryptoCred 2021 rejects fixed fractional sizing entirely — "it assumes that all the setups carry the same expected value" — and argues size should scale on setup frequency times expected value: frequent-and-marginal gets the smallest bets or none, infrequent-and-excellent gets the biggest. "If you're betting one percent on your once-every-three-months best-performing setup but also betting one percent on the day trading setup that comes out three or four times a day, it just doesn't stand to reason."

*Resolution adopted here:* frequency x EV scaling is the better model but requires a trade log with enough instances to classify setups. Until that log exists, use a fixed 1-2% cap, then graduate. A hard account-level cap stays regardless.

**Breakeven stops.** CryptoCred attacks them twice: "a break-even stop on a long is essentially saying I am bearish in the same place that I bought previously," genuinely true perhaps one time in ten. High-timeframe levels routinely retest before the real move, so a breakeven stop means "you end up buying the resistance you sold." Krown's live system takes one third off as soon as the position is green.

*Resolution adopted here:* CryptoCred has the better argument. Move a stop only when structure moves, not when P&L turns positive. Accept that this means giving back open profit sometimes.

**Diversification.** DataDash argues for roughly ten positions plus stops, reasoning that one or two winners outweigh eight capped losers. CryptoCred argues altcoin correlation makes that risk-stacking rather than diversification: "if you're wrong they'll all move down in the same direction," and prefers one or two high-conviction positions.

*Resolution adopted here:* CryptoCred is right about correlation in drawdowns. Count crypto exposure as one risk factor regardless of ticker count. Position count is an expression of conviction, not a risk control.

**Hard caps worth borrowing.** Krown: 5x leverage personal ceiling; stop and re-strategise at -10% account drawdown; leave the market at -20%. Coin Bureau: 10x absolute leverage ceiling, noting regulated venues imply 2-2.7x and "the guys who manage billions of dollars are perfectly fine using this leverage."

## 7. Robinhood execution mechanics (measured, not claimed)

Every item here was observed directly in API responses. Re-verify with `preview_crypto_order` rather than trusting this from memory.

**Market orders pay about 0.95% per side, and a limit order only avoids that if it is patient.** A market sell preview priced BTC at $80,356 against an $81,146 mark — a 0.97% haircut. Both order types show `estimated_fee: 0`, so the spread is the entire cost.

The critical qualifier, measured the hard way: **fills happen against the bid, not the mark.** A BTC limit sell resting at $80,750 sat unfilled while the mark was $80,888, because the bid was $80,128 — the order needed the bid to climb 0.78%, not merely for the mark to sit above it. Repricing to the bid filled it at once, for essentially what a market order would have paid.

So a limit order saves the spread only when you are willing to wait for the market to come to your price, and it saves nothing when you want out now. The spread is the price of immediacy and the only way to avoid it is patience. Use resting limits for take-profits and planned entries, where waiting is free. Do not expect a limit to cheapen an exit you actually need.

**The quoted bid/ask is not a real spread.** Every pair quotes at a mechanically uniform 1.88-1.94% wide, BTC and small caps alike. That is a display band around the mark, not a tradable book. Market orders execute at the band edge; limit orders execute at your price.

**Stop orders default to good-for-day.** `time_in_force` must be passed explicitly as `gtc` on `stop_loss` and `stop_limit`, or the order silently expires at end of day. Limit and market orders are always GTC (90 days). This is the highest-consequence footgun in the API.

**Stop orders carry a 5% collar, which resolves the stop-market question numerically.** A `stop_loss` sell returns a `price` field set exactly 5% below the stop: a BTC stop at $74,000 showed $70,300, ETH at $2,340 showed $2,223, SOL at $97 showed $92.15. That is the worst acceptable fill, so a stop order fills anywhere in a bounded 5% window below the trigger and only fails if price gaps clean through the whole window. A `stop_limit` at the same trigger fails as soon as price passes its single limit price. Prefer `stop_loss` for protective stops: the bounded-slippage window is worth far more than the spread saved, because the stop exists precisely for the violent move in which a limit stop is the one that fails.

**Crypto has no OCO, and a resting sell reserves the units.** After placing a sell, `quantity_transferable` goes to zero and `quantity_held_for_sell` takes the full amount. A position can therefore carry a take-profit **or** a stop, never both, unless you split the quantity across two orders. Equities do have true OCO via `place_advanced_order`, but it requires whole shares and regular hours.

**Crypto has full technical data. Use `preview_scan`, not equity proxies.** This corrects the most damaging error this document ever contained. The dedicated tools genuinely do refuse crypto — `get_equity_historicals` 404s on both `BTC-USD` and `BTCUSD`, `get_index_historicals` rejects a currency-pair UUID, and `get_crypto_quotes` returns only bid/ask/mark plus the previous close. Enumerating tool *names* therefore makes it look as though no crypto history exists. That inference was wrong, and it stood only because nobody tried the call.

The scanner carries it. `FILTER_TYPE_INSTRUMENT_TYPE` accepts `CRYPTO`, and every expression from `get_scanner_datapoints` evaluates against crypto pairs — `atr`, `rsi`, `bollingerBandUp/Down`, `pricePosInRange`, `pricePosInBollinger`, `distanceFromPivotS1/S2`, `macd`, `adx`, on any `candlePeriod` from `1m` to `1y`. One `preview_scan` call returns the whole tradable crypto universe with all of it attached.

```
filters: [{filter_type: "FILTER_TYPE_INSTRUMENT_TYPE", predicate: "=", values: ["CRYPTO"]}]
columns: [{display_name: "ATR 14d",
           expression: "atr(candleCount=14, candlePeriod=\"1d\", session=\"all\")"}]
```

**Proxies systematically understate crypto volatility, and the error grows as the asset gets smaller.** Measured the same evening, direct against proxy-derived:

| Asset | Proxy said | Direct | Proxy error |
| --- | --- | --- | --- |
| BTC | 3.03% (IBIT) | **2.81%** | 8% high |
| ETH | 3.67% (ETHA) | **3.97%** | 8% low |
| SOL | 4.23% (SOLZ) | **4.76%** | 11% low |
| AVAX | 3.0-3.4% (VAVX) | **5.14%** | 34-42% low |
| SUI | 4.71% (SUIL halved) | **6.19%** | 24% low |

Every proxy-derived stop on an alt is therefore far tighter in real ATR terms than intended — an AVAX stop believed to sit at 3.5 ATR was actually at 2.05 ATR. Thin proxy volume and the daily-reset decay of leveraged vehicles both damp measured range, and halving a 2x ETF's ATR compounds it.

**Two traps, both of which fail silently.**

*Ticker collision.* Scoping with `symbol ANY_OF ["BTC", "ETH"]` returns the **Grayscale Bitcoin Mini Trust ETF** and a Grayscale Ethereum ETF — real equities holding those tickers, with `instrument_type: EQUITY` and an ATR of 1.07 on a $35.77 price. Nothing errors. Treating that as Bitcoin's ATR of 2255.97 on $80,207 is a 2,000x mistake.

*The symbol field is not the ticker.* Combining the `CRYPTO` type filter with `symbol ANY_OF ["BTC"]` returns **zero rows**, because `symbol` is dxFeed symbology while the `Symbol` shown in results is Robinhood's ticker. So there is no working way to scope by name — filter on `CRYPTO` and read the rows you want out of the result. The universe is only about 49 pairs, so add a coarse `FILTER_TYPE_LAST` bound if the payload needs trimming.

Also check for blank cells before relying on a row: newly listed pairs (LIT, AERO, MNT, XTZ) return an empty ATR despite matching the filter, and a couple (MOODENG at RSI 7.4, XCN) show zero volume with stale readings.

**Equity proxies still have two narrow uses,** now that direct measurement exists: trading the proxy itself (IBIT, BITX and MSTR have options, OCO brackets and whole-share pricing that crypto lacks), and reading equity-market structure such as ETF flows. For measuring a coin, prefer the coin.

**When converting an equity level into a crypto price, use percentage depth, never a holdings ratio.** The API exposes no fund holdings, so any coin-per-share figure is inferred. A spot ETF tracks spot, so a percentage transfers cleanly: IBIT's verified 42.370 range low against its 46.020 close is 7.93%, which on BTC's $81,112.61 previous close gives $74,679.

**Alerts are not exits.** `create_alert` only notifies. An alert firing while no agent is running accomplishes nothing. Anything that must happen without supervision has to be a resting order in the broker's book.

**Always `preview_crypto_order` first.** It validates quantity increments, price increments and buying power, and returns the exact fee and net credit, for free.

**Equity proxy beta, measured over the 18 Sep rally and the 14-16 Sep dip:** MSTR ran 2.6x BTC's upside against 2.1x its downside. COIN was 1.9x up but 3.7x down — unfavourable asymmetry. BITX tracked a clean 2x both ways as designed, but it resets daily and decays in chop, so it is a defined-exit trade and never a hold.

**Closed-market equity quotes are garbage.** Outside regular hours, bid/ask on equities goes absurd (COIN showing 179 bid against 330 ask). Never size or price from those.

## 8. Anti-patterns

- **Never add to a loser.** "Investing based on emotion and akin to gambler's ruin — chasing losses, a strategy based on hope."
- **Never revenge trade.** "Apart from getting hacked or drunk sending your Bitcoin to someone else, revenge trading is the fastest way to lose all your money in trading, period."
- **Never increase risk while losing** to recover, and never *decrease* risk while winning — "your fake humility will not be rewarded by the market."
- **Never abandon a proven setup after a short losing string.** Apply a quality filter instead and trade only A+ instances. When a setup is working, increase *frequency* before size.
- **Do not buy after a 300-400% run.**
- **Do not assume what went down must come up.** "What comes up must come down" is broadly true; the inverse is not. If an asset is down 95%, there is probably a reason.
- **Do not judge value by unit price.** Valuation is circulating supply times price.
- **Do not confuse an objective with a strategy.** "You cannot mistake an objective for a strategy."
- **Watch turnover.** At 0.25% per side, rotating between assets costs 0.5% before the new position does anything. Overtrading compounds this into structural drag. Before committing to active trading, compute what the same capital would have returned simply held.
- **Most reported psychology problems are organisation problems.** "A lot of the issues that are perceived to be psychological aren't psychological at all — they actually stem from disorganization."

## 9. Provenance and limits

19 of 20 attempted transcripts were retrieved. The corpus skews heavily to CryptoCred (8 of 19) because most popular crypto YouTube content is price prediction rather than method — InvestAnswers, Crypto Jebb and TraderNick were largely excluded for that reason, and Rekt Capital's catalogue is date-anchored cycle commentary. Benjamin Cowen's "Bitcoin: Entry/Exit Strategies" had no caption track, so his quantitative approach is absent from this document entirely.

These are popular YouTubers, not verified track records. View count measures reach, not edge. The sizing arithmetic and the expectancy math in sections 1 and 3 are simply true. Everything framed as a setup or an edge is a claim, and the honest position on all of it is that it is untested here.

Section 7 is the opposite: directly observed, cheap to re-verify, and specific to this broker. When in doubt, re-measure rather than recall.
