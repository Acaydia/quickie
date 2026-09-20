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

## Known unprotected exposure

AVAX and SUI carry take-profits, not stops, so they have **no downside protection**.
This is structural: crypto has no OCO and a resting sell reserves the units, so a
position gets one or the other unless the quantity is split. Neither has an ETF proxy,
so neither has a measurable ATR, and inventing a stop distance for them would be the
guesswork the plan explicitly warns against. Combined they are $60.46, or 22% of the
account — within the plan's ~23% blind-sleeve cap. Flagged rather than fixed.

## Live orders

| Asset | Order | Level | Distance | Purpose |
| --- | --- | --- | --- | --- |
| AVAX | limit sell 3.7925 | $9.97 | +4.4% | harvest under $10 before Helicon |
| SUI | limit sell 29 | $0.897 | +7.2% | harvest under $0.90 |
| ETH | stop order 0.013121 | $2,340 | −9.8% | protection, 2.67 ATR |
| SOL | stop order 0.48625 | $97 | −10.5% | protection, 2.47 ATR |
| BTC | limit buy 0.00099 | $75,700 | −6.5% | range-low re-entry |

Patrol runs every three hours. Its first instruction is to place a stop on the BTC bid
the moment it fills, since a filled buy has no protection.

## Options

Still blocked and not overridable agent-side. `option_level` is empty and
`get_option_quotes` returns 403, so even market data is unavailable. Only the account
holder completing Robinhood's application changes this:
https://applink.robinhood.com/upgrade_options?account_number=989645692

The plan's sizing objection stands independently. At roughly 48% implied annualised
volatility, a near-dated at-the-money IBIT put is on the order of $236 against a $275
account. Options remain impractical below roughly $2,500, where one contract would be
about 10% of capital rather than most of it.
