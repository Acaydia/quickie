# Trade plan — US equity open, Monday 2026-09-21 09:30 ET

**Verdict: no trade at the open.** Two independent reasons, either one sufficient.

1. **No edge.** IBIT is not mid-range. It closed Friday at $46.01, which is 91% of the
   way up the stated $42.37–$46.37 range, $0.98 *above* its upper 2-sigma Bollinger band,
   after a +6.26% day. A long here has 0.44 ATR of room to resistance against 2.43 ATR
   of room to support.
2. **No affordable vehicle.** At $25–45 cash, one share of IBIT costs $46.01 and one
   share of MSTR costs $153.91. Neither is buyable. Only BITX ($18.69) fits, and BITX at
   a range high after a +12.3% day is the worst of the three, not the fallback.

Analysis captured Saturday 2026-09-19 22:24 ET against Robinhood API data. Prices are
Friday 2026-09-18's session. Section headings mark **measured** versus **inferred**
throughout.

---

## 1. Measured state of the three vehicles

All figures below came from `get_equity_quotes`, `get_equity_historicals` (daily bars,
`bounds=regular`) and `get_equity_technical_indicators`. Nothing here is estimated.

| | IBIT | MSTR | BITX |
|---|---|---|---|
| Friday close (official last trade 15:59:59 ET) | **$46.0103** | **$153.9086** | **$18.69** |
| Thursday 09-17 close | $43.30 | $132.25 | $16.64 |
| Friday move | **+6.26%** | **+16.38%** | **+12.32%** |
| Friday range (low–high) | 44.205–46.1301 | 136.18–154.02 | 17.33–18.80 |
| Close position within Friday's bar | 93.8% | 99.4% | 92.5% |
| ATR(14), daily | **$1.3929** | **$9.3532** | **$1.0705** |
| RSI(14), daily | **64.80** | **66.04** | **63.19** |
| SMA20 | $44.3415 | $131.644 | $17.5767 |
| Close vs SMA20 | +3.8% | **+16.9%** | +6.3% |
| SMA50 | $39.7142 | — | — |
| EMA200 | — | **$151.9868** | — |
| Bollinger upper (20, 2σ) | **$45.0295** | — | — |

Post-market Friday (last non-regular trade, 19:59 ET): IBIT $45.82, MSTR $153.19,
BITX $18.62. All three drifted slightly lower after the bell, no material move.

**Closed-market bid/ask is unusable, as expected.** BITX quoted a $5.00 bid against a
$23.01 ask; IBIT quoted $45.50/$46.00. Confirms the existing note in the trading skill —
these were ignored entirely, and all pricing below derives from last trades and indicators.

### Range position — the headline finding

The range endpoints are exact, not approximate. Verified against daily bars:

- Range low **$42.370** = the 2026-09-15 session low, to the tick.
- Range high **$46.370** = the 2026-09-03 session high, to the tick.

Range width is $4.00. IBIT's Friday close of $46.0103 sits at **91.0% of range**:

```
(46.0103 - 42.37) / (46.37 - 42.37) = 3.6403 / 4.00 = 0.9101
```

Not mid-range. Mid-range would be $44.37, and IBIT is $1.64 (1.2 ATR) above that.

### One correction to the range thesis

The working thesis says IBIT was "rejected at the top on both 3 Sep and 18 Sep." The
first is right; the second has not happened yet.

- **3 Sep was a genuine rejection.** High $46.370 (the exact range top), closed $46.35,
  then 4 Sep gapped down to open $44.91 and closed $45.23. Rejection delivered overnight.
- **18 Sep was not a rejection.** High $46.1301 — it never reached $46.37 — and it closed
  $46.0103, in the top 6% of its own daily bar. A bar that closes at its high is not a
  rejection. It is a strong close parked directly beneath untested resistance.

This matters because it changes what Monday is. It is not the third bounce off a
twice-confirmed ceiling. It is the *first* retest of $46.37 since 3 Sep, unresolved, with
the buyer still in control on the close. That is a coin flip to be watched, not a trade to
be taken, and it is specifically the wrong side of the range to be buying.

---

## 2. Measured: BTC has not moved over the weekend

`get_crypto_quotes` for BTC-USD at Saturday 22:24 ET:

- mark **$81,000.51**
- prior-day boundary close (Friday midnight ET) **$81,112.61**
- Saturday drift: **−0.14%**

This confirms the stated ~$81,051. Practically flat, so **IBIT will not gap down into a
better entry on Monday** — it opens roughly where it closed.

### Inferred: implied IBIT fair value and the BTC-mapped range

Robinhood exposes no crypto historicals, so BTC's exact 16:00 ET Friday print is not
directly retrievable. Anchoring IBIT's BTC-per-share ratio on the two closest-in-time
observations available — IBIT's 19:59 ET post-market last ($45.82) against BTC's midnight
ET boundary ($81,112.61), about four hours apart:

```
ratio  = 45.82 / 81,112.61       = 0.00056490 BTC per share
implied = 0.00056490 x 81,000.51 = $45.76
```

**Inferred, ±0.3%** for the timestamp mismatch. So IBIT's fair value right now is about
$45.76, or **84.7% of range**. Whether you use Friday's official close (91.0%) or implied
fair value (84.7%), price is in the **top sixth of the range**.

Inverting the ratio maps the IBIT range onto BTC:

| IBIT level | Implied BTC |
|---|---|
| $42.37 range low | ~$75,000 |
| $46.37 range high | ~$82,100 |
| BTC now | **$81,000** → 84.7% of range |

**This cross-checks against an independent source.** Benzinga's 17 Sep ETF-flow piece
described BTC as "range-bound between $75,000 and $82,000" — derived from order flow, not
from my arithmetic, and it lands on the same boundaries. Two independent methods agreeing
on the range is the strongest evidence in this document.

So the "roughly mid-range" read does not survive measurement, in either instrument.
BTC would need to be near **$78,500** for mid-range to be true. It is $2,500 above that.

### Inferred: what the rally actually was

BTC was ~$76,000 on Fed day (16 Sep) and ~$76,647 on 17 Sep, per Benzinga. At $81,000
that is a **~6.5% two-session bounce off the low**, not a base. Friday was day two of a
sharp recovery leg, which is precisely when range-traders are most tempted and least paid.

---

## 3. Why there is no defensible long — measured reward:risk

Taking the inferred $45.76 entry:

- Room up to range top $46.37: **$0.61 = 0.44 ATR**
- Room down to range low $42.37: **$3.39 = 2.43 ATR**
- Reward:risk against range boundaries: **0.18 : 1**

Per the expectancy math in the trading skill (`1 / (1 + R)`), a 0.18R trade needs an
**85% win rate** to break even. Nothing in this data supports 85%.

Three further measured strikes against a long at the open:

1. **IBIT closed $0.98 above its upper 2σ Bollinger band** ($46.0103 vs $45.0295). A close
   outside the band is by construction a statistically extended close, not a value entry.
2. **RSI(14) is 64.8 and rising off 54.97.** Momentum is confirmed but there is no
   oversold condition anywhere — the exact opposite of a range-low signal.
3. **MSTR closed 1.26% through its 200-day EMA** ($153.91 vs $151.99) on a +16.4% day,
   and **16.9% above its 20-day SMA**. First touch of a major moving average from below,
   on the most extended bar in months. That is a level to sell into or wait out, not buy.

The trading skill's own eye test settles it: *"would I want to buy where my long gets
stopped out?"* A long here stops out in the mid-$44s — which is nearer the middle of the
range and a structurally *better* buy than $45.76. When the stop-out price is more
attractive than the entry, the entry is wrong.

And the skill's explicit permission applies: *"sometimes the market just doesn't give you
risk-defined setups, and skipping those is fine."*

---

## 4. The affordability constraint — stronger than expected

This is where the plan ends regardless of the technical read. Whole shares are required.

| Vehicle | 1 share | Affordable on $25–45? |
|---|---|---|
| **MSTR** | **$153.91** | **No.** Needs 3.4x the top of the raise. |
| **IBIT** | **$46.01** | **No.** Short by $1.01 even at $45. |
| **BITX** | **$18.69** | Yes — 2 shares = $37.38. |

**MSTR is simply unaffordable, plainly and permanently at this account size.** Even the
full $278.56 account value buys 1 share with $124 left over, which would be a 55%
single-position concentration in a 2.6x-beta instrument. MSTR is not a vehicle for this
account, this week or any week, until the account is several thousand dollars. The
favourable 2.6x-up / 2.1x-down asymmetry is real and irrelevant — it cannot be accessed.

**IBIT is also unaffordable, which the brief did not anticipate.** This is the finding
worth acting on. At $46.01 it misses the top of the expected raise by **$1.01, or 2.2%**.
That is agonisingly close, and it has a direct consequence:

> If the weekend AVAX/SUI limit sells can be nudged to clear **$47 rather than $45**, IBIT
> becomes tradeable. At $45 it does not. One extra dollar of raised cash changes the
> instrument set from "BITX only" to "IBIT available," and IBIT is by far the better
> vehicle — unleveraged, no daily reset, no decay, half the ATR.

That is the single highest-value action available before Monday, and it costs nothing.

**BITX fits the cash but fails the setup.** It is the only affordable name, which creates
exactly the pressure to force a trade that should be resisted. Buying a 2x daily-reset
fund near the top of its daily bar, 6.3% above its 20-day SMA, on day two of a bounce, in a
Fed-tightening regime, is the worst available expression of an already-absent edge.

### Measured: BITX decay is real

Two windows, same instrument, quantifying why it is a defined-exit trade only:

- **Clean trend, 15 Sep low → 18 Sep close:** IBIT +8.59%, BITX +17.62% → **2.05x**. Works
  as designed when direction is sustained.
- **Full quarter, 22 Jun open → 18 Sep close:** IBIT +25.11%, BITX +46.82% → **1.86x**.

A true 2x with daily compounding should have *beaten* 2x over a net-uptrending quarter.
It returned 1.86x instead. The shortfall is the daily-reset drag through chop, measured
rather than asserted. Holding BITX through a range costs money even when the range
eventually resolves your way.

---

## 5. Catalysts, Monday and Tuesday

### Measured from the API

**Earnings (`get_earnings_calendar`, high-market-cap, 21–23 Sep): nothing that matters.**
ABVX Monday (unverified EPS), then AZO, KBH, THO, MLKN, WOR Tuesday. No crypto-adjacent
name, no index-mover. Earnings are not a factor.

### Measured from news retrieved via `get_equity_news`

**The macro regime is actively hostile, and this is the most important context in the
document.** From the 18 Sep Benzinga week-in-review:

- **The Fed raised rates Wednesday 16 Sep** — a quarter point to **3.75–4%**, the first
  hike since 2023, on a **unanimous 12–0 vote**.
- **16 of 18 policymakers project at least one more hike this year.** Projections hold
  rates at 4.1% through end-2027.
- Inflation **3.4%**, and the Fed does not see 2% before **2029**.
- Chair Kevin Warsh: *"I would be hard-pressed to describe broad financial conditions as
  restrictive. So we removed a dose of accommodation."*
- **10-year Treasury at 5.04%, highest since 2007.** 2-year 4.75%, 30-year 5.34%.
- WTI $101.50, Brent $104.26, diesel at a record $6.30/gal after a drone strike on Saudi
  Arabia's East-West pipeline.
- Russell 2000 **−3.7% month-to-date**.
- Kansas City Fed's Schmid delivered a further hawkish signal **on Friday**, during the
  rally, and yields rose 7bp in response.

So BTC rallied 6.5% *against* a tightening Fed, a 5% 10-year and $100 oil. A 5% risk-free
yield is a direct competitor to a non-yielding asset. Quoting the 15 Sep piece: *"If yields
remain above 5% while oil stays above $100 and inflation expectations continue rising,
Bitcoin faces a much tougher competition for institutional capital."* This rally is
counter-macro, which lowers rather than raises the odds it clears $46.37 on first contact.

**ETF flows were negative into the rally — Monday's release is the live catalyst.**

| Date | Spot BTC ETF net flow |
|---|---|
| 15 Sep | −$450.33M |
| 16 Sep | −$295.98M (IBIT alone −$144.11M) |
| Two-day total | **−$746.31M** |

Ethereum was worse: −$224.11M on 16 Sep, its largest single-day outflow since 30 Jan 2026.
The prior full week saw ~−$463M, ending three consecutive weeks of inflows.

**Friday 18 Sep's flow figure had not printed as of this writing and posts Monday.** It is
the one genuinely scheduled crypto catalyst of the session, and it is a real fork:

- Flows flip decisively positive → the 6.5% bounce has institutional sponsorship, and a
  break above $46.37 becomes credible.
- Flows stay negative → Friday was retail and short-covering into resistance, and the
  range-high rejection is the high-probability path.

**Waiting one session buys this information for free.** That is the strongest single
argument for standing down Monday morning: a known, dated, decision-relevant data release
lands during the session you would otherwise be guessing ahead of.

**Legislative backdrop:** the CLARITY Act procedural vote failed 15 Sep (BTC sold off),
then a BTC Reserve Bill advanced 16 Sep. Both are already priced.

**MSTR's Friday catalyst was a soundbite, not a transaction.** CEO Phong Le said
*"we're never going to stop"* buying BTC and confirmed 840,050 BTC held. Note what actually
moved the stock: the same interview *opened the door to occasional selling* — *"sometimes
sales in the short term can actually be accretive in real Bitcoin terms."* A +16.4% move on
a restated policy with a new sell-side caveat, while the company has **skipped BTC
purchases for consecutive weeks** (14 Sep, 8 Sep headlines), is sentiment repricing, not
fundamental news. Sentiment moves retrace.

### Noted, not tradeable here: Avalanche Helicon

The **Helicon upgrade activates Monday 15:00 UTC = 11:00 ET**, 90 minutes into the session.
Two consequences:

1. **It is irrelevant to IBIT, MSTR and BITX.** No BTC-proxy transmission channel.
2. **It is directly relevant to the AVAX exit,** which is the actual open position.
   A network upgrade is a known volatility event in both directions. If the AVAX limit
   sells are meant to raise Monday's cash, having them **resting in the book before
   11:00 ET** is the point — an upgrade that pumps fills them, an upgrade that
   disappoints (or a "sell the news" fade after weeks of anticipation) may not. Per the
   skill: alerts are not exits, and anything that must happen unsupervised has to be a
   resting order.

---

## 6. What to do Monday

### At the open: nothing

No order at 09:30 ET. Not IBIT (unaffordable and at range high), not MSTR (unaffordable by
3.4x), not BITX (affordable but the weakest setup of the three). Cash is a position, and
with $3.00 on hand it is currently the only one.

**Actually useful, and free:**

1. **Reprice the AVAX/SUI limit sells to clear $47+**, not $45. This unlocks IBIT for any
   future entry. Highest-leverage action available.
2. **Get those sells resting in the book before 11:00 ET Monday**, ahead of Helicon.
3. **Read Monday's spot-BTC-ETF flow print for 18 Sep.** It is the swing factor.
4. **Watch the $46.37 test.** It resolves this week either way, and the resolution is
   worth more than a guess ahead of it.

### Conditional setup A — IBIT at the range low (preferred, needs $47+ cash)

Do not place this Monday morning. This is the trade to place **if and when** price comes
back to the level. It is included so the numbers are pre-computed and no decisions get
made in the moment.

| Parameter | Value | Derivation |
|---|---|---|
| Ticker | **IBIT** | Unleveraged, no daily reset, ATR half of BITX's |
| Trigger | IBIT trades into **$42.37–$42.90** | The range low, verified to the tick |
| Shares | **1** (whole shares required) | All the cash permits |
| Entry limit | **$42.75** | Resting limit inside the zone |
| Stop | **$41.65** | $42.37 − 0.5 ATR ($0.70), i.e. structure + volatility buffer |
| Risk/share | **$1.10** | 42.75 − 41.65 |
| **Total risk** | **$1.10 = 0.40% of $278.56** | Below the 1–2% target — see note |
| Target 1 | **$44.34** (SMA20 / mid-range) | +$1.59 = **1.45R** |
| Target 2 | **$46.37** (range high) | +$3.62 = **3.29R** |
| Order type | `place_advanced_order` OCO bracket | Whole shares, regular hours — both satisfied |

Implied BTC trigger: roughly **$75,000–75,950**, using the 0.00056490 ratio.

**On the risk being 0.40% rather than 1–2%: this is a hard floor, not a choice.** Reaching
$3–6 of risk at a $1.10-per-share stop distance needs 3–5 shares, or $128–214 of IBIT —
three to five times the available cash. The whole-share minimum sets the size, so the
sizing chain runs backwards here and there is nothing to be done about it. Under-risking is
the correct direction to err, and it should be stated plainly rather than papered over by
widening the stop to manufacture a 1% number. **Widening a stop to hit a risk target
inverts the logic** — the skill names this as the most common sizing error.

Note the contrast that justifies the wait: **0.18:1 buying Monday at $45.76, versus 1.45R
to first target and 3.29R to second at $42.75.** Same instrument, same thesis, same range.
The only variable is patience.

### Conditional setup B — BITX at the range low (fallback only if cash < $47)

Strictly worse than A. Take it only if the raise lands short and the level actually trades.

| Parameter | Value | Derivation |
|---|---|---|
| Ticker | **BITX** | Only affordable vehicle under $47 |
| Trigger | BITX trades into **$15.90–$16.20** | 15 Sep low $15.89, 16 Sep low $15.97 |
| Shares | **2** | $32.00 at $16.00 — fits $25–45 |
| Entry limit | **$16.00** | |
| Stop | **$15.35** | $15.89 − 0.5 ATR ($0.54), rounded |
| Risk/share | **$0.65** | |
| **Total risk** | **$1.30 = 0.47% of $278.56** | |
| Target 1 | **$17.58** (SMA20) | +$1.58/share = **2.4R** |
| Target 2 | **$18.70** | +$2.70/share = **4.2R** |
| Order type | `place_advanced_order` OCO bracket — **mandatory** | Daily reset means no unbracketed hold |

**Same-day or next-day exit, without exception.** The measured 1.86x-versus-2.0x quarterly
shortfall in section 4 is the cost of ignoring this.

### Invalidation of the whole range thesis

If IBIT closes a **daily bar above $46.37**, the range is broken and every number in this
document is void. Do not buy that breakout on this account: at $46+ per share one share is
unaffordable, and a 2x leveraged breakout chase in a tightening-Fed regime is not a trade
this account can survive being wrong about. Re-measure from scratch and build a new plan
against the new structure.

---

## 7. Measured versus inferred — explicit ledger

**Measured (Robinhood API, re-verifiable):** all closes, OHLC bars and Friday percentage
moves; ATR(14), RSI(14), SMA20, SMA50, EMA200, Bollinger(20,2) for the tickers shown;
range endpoints $42.370 and $46.370 confirmed to the tick against 15 Sep and 3 Sep bars;
BTC mark $81,000.51 and prior-boundary $81,112.61; post-market last trades; the unusable
closed-market bid/ask spreads; the 21–23 Sep earnings calendar; share prices driving every
affordability statement; both BITX beta-decay ratios.

**Measured from news text (Benzinga, via `get_equity_news` — reported figures, not API
data):** the 25bp hike to 3.75–4% and 12–0 vote; the 16-of-18 dot projection; 3.4%
inflation; Treasury yields 5.04% / 4.75% / 5.34%; oil and diesel prices; the 15–16 Sep ETF
outflow figures; BTC ~$76,000 on 16 Sep and ~$76,647 on 17 Sep; the independent
$75,000–82,000 BTC range; MSTR's 840,050 BTC and the Le quotes; Schmid's Friday remarks.

**Inferred (stated with error bars):** the 0.00056490 BTC-per-share ratio, anchored on
observations ~4 hours apart, hence the ±0.3%; implied IBIT fair value $45.76 and range
position 84.7%, both downstream of that ratio; the IBIT↔BTC level map in section 2 and the
~$75,000–75,950 trigger in setup A; the ~6.5% two-session bounce, which mixes an API BTC
mark with a news-reported BTC level.

**Assumed from the brief, not verified here:** account value $278.56 and $3.00 cash;
options blocked; the $25–45 weekend raise; the 0.95% crypto market-order spread; the
MSTR/COIN/BITX beta measurements; Helicon activating Monday 15:00 UTC.

**Not obtainable:** crypto OHLC history and indicators (no Robinhood endpoint — hence the
IBIT-proxy arithmetic); Friday 18 Sep ETF flows (not yet published); intraday BTC at
Friday's 16:00 ET equity close.
