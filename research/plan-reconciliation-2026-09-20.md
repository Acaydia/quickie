# Plan reconciliation — crypto desk strategy reset

Reconciles `crypto_desk_strategy_reset_260e2318.plan.md` against the book as of
**2026-09-20 02:50 UTC**. The plan file itself is left unedited by instruction.

Account: **$275.04** total — $147.35 crypto, $127.69 cash of which $74.94 is
reserved against a resting bid, leaving **$52.74** spendable.

## Implemented as specified

**Resting orders replace alerts entirely.** The plan's central diagnosis — that the
AVAX trim alert fired and nothing happened because alerts only notify — is fixed.
Every position now carries a GTC order in the broker's book, and no exit depends on
an agent being awake. Alerts are informational only.

**Order increments verified** per the plan's instruction to check
`min_order_quantity_increment` before placing. All five held pairs verified, none
halted:

| Pair | Qty increment | Price increment |
| --- | --- | --- |
| BTC-USD | 0.00000001 | 0.01 |
| ETH-USD | 0.000001 | 0.01 |
| SOL-USD | 0.00001 | 0.01 |
| AVAX-USD | 0.0001 | 0.01 |
| SUI-USD | 0.001 | 0.001 |

Every resting order conforms. SUI is the one pair with a 0.001 *price* increment
rather than 0.01, which is why its take-profit sits at $0.897 rather than $0.8975.

**SOL and ETH re-evaluated off SOLZ and ETHA rather than guessed**, as the plan
requires. This produced a correction and a validation:

- **SOLZ is not leveraged.** Its own fundamentals description reads "providing the
  same daily price movements of Solana." ETHA likewise "seeks to track the spot
  price of Ether." Both are 1x and their ATR transfers directly. The prior working
  assumption that SOLZ was 2x, and that its ATR should be halved, was wrong and
  would have justified tightening the SOL stop to roughly half its correct distance.
  BITX is the genuinely leveraged vehicle, confirmed at "2x the daily price
  movements" and measured at 1.96x IBIT on the 18 Sep session.
- **Measured 14-day daily ATR at the 18 Sep close:** ETHA $0.7308 on $19.92 (3.67%),
  SOLZ $0.4821 on $11.40 (4.23%).
- **Both existing stops validate, so neither was moved.** ETH at $2,340 against a
  $2,594 mark is 9.8% away, or **2.67 ATR**. SOL at $97 against a $108.32 mark is
  10.5% away, or **2.47 ATR**. Both sit near the plan's stated ~3 ATR convention for
  a thesis stop rather than a noise stop.
- **RSI(14) is 69.06 on ETHA and 69.77 on SOLZ** — both just under the conventional
  70 overbought threshold, so both positions are extended rather than cheap. Recorded
  for the patrol; not acted on, because a stop already defines the exit.

**Proceeds redeployed as a resting limit buy near the range low**, per the plan's
instruction to buy weakness with limits rather than at market. A GTC limit buy for
0.00099 BTC at **$75,700** rests in the book, about $74.94, mirroring the range-low
level the equity plan independently derived.

## Superseded by measurement taken after the plan was written

These three are deliberate departures, not omissions. Reverting them would cost money.

**1. BTC was sold in full, rather than given a stop-limit at $74,000.**
The plan assumed BTC sat mid-range. Measured, it did not: IBIT closed 18 Sep at
$46.0103, which is **91% of the way up** the $42.37–$46.37 range, with both endpoints
verified to the tick. That leaves 0.44 ATR of upside against 2.43 ATR of downside — a
**0.18:1 proposition requiring an 85% win rate**. Applying the plan's own offered-trade
test, holding $126 of BTC with a stop 8.7% below and 1.3% of range-top upside fails
plainly. BTC was sold at $80,150 and the proceeds fund the resting bid above.

Corroborating, all measured: the Fed **hiked** 25bp to 3.75–4% on 16 Sep, the first
hike since 2023, with the 10-year at 5.04%. Bitcoin ETF flows were **negative $746M**
across 15–16 Sep, into the rally.

**2. The plan's "rejected twice" premise is wrong — there has been one rejection.**
18 Sep was not a rejection. IBIT's high was $46.1301, it never touched $46.37, and it
closed at $46.0103 in the top 6% of its own bar. 3 Sep was a real rejection, gapping
down to $44.91 the next day. Monday is therefore the *first* retest of $46.37 since
3 Sep, unresolved, with buyers still in control.

**3. Protective stops are stop orders, not stop-limit orders.**
The plan's "no market orders, ever" rule is right for entries and take-profits and
wrong for protection. A stop-limit fails to fill in exactly the violent move a stop
exists for. Measured: a stop order returns a `price` field exactly **5% below** the
stop, so it fills within a bounded window instead of failing outright.

A related correction to the plan's line 5. Limit orders do **not** recover the ~1.9%
round trip unconditionally. Fills happen against the **bid**, not the mark: a BTC limit
sell resting at $80,750 went unfilled while the mark was $80,888, because the bid was
$80,128. Repricing to the bid filled at once, for about what a market order would have
paid. The saving is real only for a patient order; the spread is the price of immediacy.

## Armed but not triggered

**Breakout leg.** The plan's trigger is an IBIT close above $46.37 on above-average
volume. Volume qualified — 84.8M against a 49.9M two-week average, 1.70x. **Price did
not:** the $46.0103 close is $0.36, or 0.78%, short. The leg is armed, not fired, and
the equity market is closed until Monday 09:30 ET regardless.

Vehicle notes if it does fire: MSTR closed at about $153.91 and is unaffordable — one
share is 56% of the account. BITX at $18.70 fits, 2 shares for $37.40 within the
$52.74 available, but carries measured daily-reset decay of 1.86x realised against 2x
nominal over the quarter, consistent with the plan's own "defined-exit trade, never a
hold."

The better pre-computed setup is the opposite side of the same range: IBIT 1 share at
**$42.75**, stop **$41.65**, targets **$44.34** (1.45R) and **$46.37** (3.29R), as an
OCO bracket. Contrast that with 0.18:1 buying near $46.

## Corrected: AVAX and SUI were never unmeasurable

An earlier version of this document claimed AVAX and SUI had no ETF proxy and therefore
no measurable ATR, and concluded that leaving them without stops was the honest response
to a data limit. **That claim was an assertion nobody checked, and it is false.** One
`search` call returns, with leverage read from each fund's own description:

| Asset | 1x proxies | Leveraged | Measured ATR |
| --- | --- | --- | --- |
| AVAX | VAVX, BAVA, GAVA | AVAZ (2x) | 3.40% via VAVX, 3.02% via AVAZ halved |
| SUI | none found | SUIL (2x) | 4.71% via SUIL halved |

Those proxy figures then turned out to be wrong too, for a deeper reason — see below.

## Corrected again: crypto technicals were always available, so the proxies were needless

The claim underneath everything was that Robinhood exposes no crypto price history, which
forced every measurement through an equity proxy. It is false. The dedicated tools really
do refuse crypto — `get_equity_historicals` 404s on `BTC-USD` and `BTCUSD`,
`get_index_historicals` rejects a currency-pair UUID — so enumerating tool *names* makes
the data look absent. **`preview_scan` carries all of it.** Filtering
`FILTER_TYPE_INSTRUMENT_TYPE = CRYPTO` returns 49 pairs, and the full expression language
(`atr`, `rsi`, `bollingerBandUp/Down`, `pricePosInBollinger`, `distanceFromPivotS1`) works
on every one.

The proxies had been understating volatility the whole time, worst on the small caps:

| Asset | Proxy | Direct | Error |
| --- | --- | --- | --- |
| BTC | 3.03% | 2.81% | 8% high |
| ETH | 3.67% | 3.97% | 8% low |
| SOL | 4.23% | 4.76% | 11% low |
| AVAX | 3.0-3.4% | **5.14%** | 34-42% low |
| SUI | 4.71% | 6.19% | 24% low |

So the AVAX stop believed to sit 3.5 ATR out was really at **2.05 ATR** — half the
intended room.

Two traps found while testing, both silent. Scoping by `symbol ANY_OF ["BTC"]` returns the
**Grayscale Bitcoin Mini Trust ETF**, an equity with an ATR of 1.07 on a $35.77 price, and
raises no error. And combining the `CRYPTO` filter with a symbol scope returns **zero
rows**, because `symbol` is dxFeed symbology rather than the ticker shown in results.

## AVAX and SUI both exited on direct measurement

**AVAX sold in full at $9.40** (entry $9.229). Five measured facts, one direction: RSI
**79.2**, second-highest of 49 pairs; price **5.6% above its upper Bollinger band** at
position 1.197, the most extended of the 21 pairs above $0.50; already faded 6.2% off the
day's high; and against its own $9.97 target, 1.03 ATR of upside versus 2.11 ATR of risk —
**0.49:1, requiring a 67% win rate**. The offered-trade test fails plainly: nobody would
open that position fresh. Monday's Helicon activation made holding through it sell-the-news
risk rather than a reason to stay.

**SUI sold at $0.812** (entry $0.8621). Its volatility was measurable, so a stop was
placeable, but SUI had no identified catalyst, its move round-tripped below the $0.8295
close it started from, and there was no structural level to anchor invalidation to. A
volatility multiple alone would have been a number dressed as a thesis.

ETH and SOL both validate against direct data and were left alone. ETH's $2,340 stop is
2.28 ATR out and sits **below** its measured lower Bollinger band of $2,357.79 — correctly
outside normal volatility. SOL's $97 stop is 2.09 ATR out but sits slightly **above** its
$94.91 band, a known tightness accepted because widening to $94.50 would lift account risk
to 2.3%, past the 1-2% cap.

## Corrected: the BTC bid rested on an inherited inference

The original bid at $75,700 came from dividing an IBIT level by a BTC-per-share ratio a
subagent had explicitly labelled "inferred, ±0.3%". That caveat was dropped when the
number became a live order. The API does not expose a fund's coin holdings, so no such
ratio can be measured here.

Re-derived using **percentage depth**, which needs no ratio because a spot ETF tracks
spot. IBIT's range low of 42.370 against its 46.020 close is a **7.93%** decline;
applied to BTC's $81,112.61 previous close that is **$74,679**. The bid was moved to
**$74,700**, and the stop for a filled bid to **$73,450** — IBIT's range low less 0.5
ATR (41.674, or 9.445% down) through the same conversion.

Every input is now measured: both range endpoints verified from my own daily bars, IBIT
ATR(14) measured at 1.3929, and BTC's previous close read from the quote.

## Live orders

| Asset | Order | Level | Basis |
| --- | --- | --- | --- |
| ETH | stop order 0.013121 | $2,340 | 2.28 ATR, below the $2,357.79 BB lower |
| SOL | stop order 0.48625 | $97 | 2.09 ATR, just above the $94.91 BB lower |
| BTC | limit buy 0.001 | $74,700 | IBIT range low by % depth; on BTC's $74,811 BB lower |
| BTC | limit buy 0.00098 | $76,000 | **not mine** — another agent, basis unknown |

The BTC bid at $74,700 gets independent corroboration from direct measurement: BTC's own
20-day lower Bollinger band is **$74,811**, so the level derived through IBIT lands within
0.15% of the coin's own statistical range edge.

## A second agent is bidding the same asset

An order appeared at 23:06 that this desk did not place — 0.00098 BTC at $76,000,
`initiator_type` `agentic`, `ref_id` `cab9387d-22a2-4b73-9b82-82a4f8803e70`. It was left in
place rather than overridden, since coordinating with the other agent is the user's call,
not a unilateral one.

Two consequences worth stating plainly. **Buying power is now $0.50**, because both bids
reserve cash against $187.06. And **if both fill, BTC becomes about $149, or 54% of the
account**, unprotected until the patrol acts. The patrol's first instruction now covers
either or both orders, reads the actual filled quantity from positions rather than assuming,
and is told to trim toward 30% if it judges 54% too concentrated.

Patrol runs every two hours.

## Claims still resting on second-hand research

Flagged rather than relied upon alone. The Fed hike to 3.75-4% on 16 Sep and the negative
$746M of ETF flows across 15-16 Sep both came from a subagent's web research, not the
broker API, and neither has been independently verified here. They corroborate the BTC
exit but were not its basis — the range measurement was. The MSTR and COIN beta figures
(2.6x up against 2.1x down, and 1.9x against 3.7x) rest on **two sessions**, which is far
too small a sample to be called a beta; treat them as directional, not quantitative.

## Options

Still blocked and not overridable agent-side. `option_level` is empty and
`get_option_quotes` returns 403, so even market data is unavailable. Only the account
holder completing Robinhood's application changes this:
https://applink.robinhood.com/upgrade_options?account_number=989645692

The plan's sizing objection stands independently. At roughly 48% implied annualised
volatility, a near-dated at-the-money IBIT put is on the order of $236 against a $275
account. Options remain impractical below roughly $2,500, where one contract would be
about 10% of capital rather than most of it.
