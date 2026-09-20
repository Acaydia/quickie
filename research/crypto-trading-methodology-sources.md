# Crypto Trading Education — Source Transcripts and Distilled Rules

Research corpus for building a reusable trading methodology document.

**Method.** Candidate videos were found with the Apify Actor `streamers/youtube-scraper`
(YouTube search sorted by view count, plus direct channel scrapes sorted by most-popular).
Transcripts were extracted with the Apify Actor `supreme_coder/youtube-transcript-scraper`.
All view counts and dates below come from the scraper output, captured 2026-09-20.

**Retrieval result: 19 of 20 transcripts retrieved.** One video (Benjamin Cowen,
"Bitcoin: Entry/Exit Strategies") returned zero caption snippets and is reported as a
failure at the bottom rather than summarised.

**Selection bias, deliberate.** Price predictions, "next 100x" content, giveaways and
paid promotions were excluded. That removed most of InvestAnswers, Crypto Jebb and
TraderNick, whose most-viewed videos are almost entirely price-target content, and most
of Rekt Capital's catalogue, which is cycle-timing commentary anchored to specific dates.
The Chart Guys' public catalogue is daily chart-of-the-day videos, not methodology.
What remains skews heavily to CryptoCred, whose Technical Analysis Series is the densest
durable-methodology content in crypto YouTube.

**Note on the summaries.** Each entry is a distillation of the video's concrete, testable
claims, with short verbatim quotes for the specific rules and numbers. Full transcripts
were retrieved but are not reproduced here.

---

## Tier 1 — Risk, position sizing, stops

### 1. Technical Analysis Series — Risk Management
- **Channel:** CryptoCred
- **Views:** 299,628 | **Published:** 2018-06-11 | **Length:** 51:51
- **URL:** https://www.youtube.com/watch?v=ofwtsc20hOY

Concrete rules:

- **Always use a market stop, not a limit stop.** "If you use a limit stop there's a chance
  that it won't get filled and the market kind of jumps past your stop and exacerbates your
  losses in a volatile market."
- **Stop placement must be derived from technical analysis, never from a fixed percentage.**
  "Be very cautious if anyone tells you your stop should never be more than X percent... the
  market doesn't really work like that." The stop goes at the **invalidation level** — the
  price at which the reason for entering is disproved.
- **Risk per trade and position size are different things.** Risk per trade = percentage of
  equity lost if stopped out. Position size = number of units held.
- **Position size formula:** `(equity × risk%) ÷ (distance from entry to stop, as a decimal)`.
  Worked example: $50,000 account, 3% risk, stop 5% away → $30,000 position size, risking $1,500.
- **Risk per trade range:** "Most traders will be comfortable between one and five percent of
  equity per trade... probably closer to one to three percent." Cred's own baseline at the time:
  **3%**, reduced to 1–2% after consecutive losses.
- **Required win rate from R:** `1 ÷ (1 + R) × 100`. At 3R you need only a **25%** win rate to
  break even; at 1.5R you need **40%**.
- **Reject fixed minimum R.** "Lots of gurus will pontificate about a minimum R or gold standard
  R... that's all nonsense." Targets must be technically justified, not reverse-engineered to
  produce a flattering ratio.
- **Drawdown recovery math:** lose 10% → need 11% to recover; lose 20% → 25%; lose 30% → 43%.
- **Losing-streak probability:** even at a 50% win rate, the probability of six consecutive
  losses within a 50-trade period is above 50%.
- **Evolving R (credited to Trader Dante):** R is static at entry but changes as price moves.
  Worked example: a 1.5R trade that runs to just short of target and stalls, with the stop still
  at breakeven, has become a 0.17R proposition. Recalculate and manage rather than let a near-
  winner round-trip.
- **Escalation rule after losses:** 3% baseline → after two or three rule-following losses drop
  to 1–2% → after further losses drop to 1%, while simultaneously raising setup-quality standards.
- **Revenge trading:** "Apart from getting hacked or drunk sending your Bitcoin to someone else,
  revenge trading is the fastest way to lose all your money in trading, period."
- **Leverage changes nothing about sizing.** "The position size calculation does not change...
  it doesn't somehow magically erase all the rules." At 25x leverage, liquidation occurs at a
  ~4% adverse move. Cross margin liquidation nukes the entire account; isolated margin does not.

### 2. Technical Analysis Series — Risk Management (UPDATED)
- **Channel:** CryptoCred
- **Views:** 233,140 | **Published:** 2021-12-13 | **Length:** 1:09:23
- **URL:** https://www.youtube.com/watch?v=XeQV2ECtZVQ

This supersedes the 2018 video and explicitly repudiates parts of the standard advice.

- **Invalidation must be logically tied to the entry thesis.** "There should be a very clear link
  between the trade idea itself and the invalidation of that idea." Taking a trade for reason A
  and closing it for an unrelated reason is the diagnostic that something is wrong.
- **If you can't define invalidation, skip the trade.** "Sometimes the market just doesn't give
  you what we like to call risk-defined setups, and skipping those is fine."
- **Stop-hunting is mostly a self-diagnosis error.** The overwhelming majority of "I got wicked
  out" complaints are "better explained by simply having [bad] stop placement, not deliberate hunting."
- **The stop eye test:** put your stop level on a blank chart and ask "would I want to buy where
  my long gets stopped out?" If yes, the trade is probably bad and you should be trading *at*
  that level, not exiting there.
- **Stop precision should match trade precision.** "Strictness with stop usage and placement is
  inversely correlated with the size of the move you're trying to trade." Low-timeframe, high-size
  trades need tight surgical stops; high-timeframe swing ideas need wide ones. Mixing the two
  (low-timeframe trade with sloppy stop, or swing trade with a 1-minute-chart stop) is the error.
- **Beginners should use hard stops, not mental/soft stops.**
- **Position size formula (restated):** `(portfolio × risk%) ÷ distance to invalidation`.
  Worked example: $100k equity, 2% risk, 5% stop distance → $40,000 position.
- **Fixed risk-per-trade is rejected.** "In general fixed risk per trade is mostly [nonsense]...
  it assumes that all the setups carry the same expected value." Size should instead scale on a
  two-axis spectrum of **setup frequency × expected value**:
  - Frequent setups with marginal odds → smallest bets (or none)
  - Frequent setups with good odds → bigger bets
  - Infrequent setups with great odds → biggest bets
  - "If you're betting one percent on your once-every-three-months best-performing setup but
    also betting one percent on the day trading setup that comes out three or four times a
    day, it just doesn't stand to reason."
- **On the conventional range:** "gun to my head, one to three percent of your account per trade
  is safe, but that range is useless without context."
- **Short-lived edges:** "The best edges don't last long enough to be back-tested thoroughly."
  If you find a high-frequency high-EV edge, exploit it hard and bin it the moment it stops working.
- **Breakeven stops are attacked directly.** "A break-even stop on a long is essentially saying
  I am bearish in the same place that I bought previously." Justified only when revisiting the
  entry genuinely invalidates the idea — Cred estimates that is true perhaps 1 time in 10.
- **Partial profits get the same treatment:** "Arbitrarily closing trades based on non-market
  factors like P&L alone will likely harm you in the long run." The deeper argument: arbitrary
  management produces no data you can optimise later.
- **Streak rules — do not do these:** increase risk while losing to recover; increase risk on
  losing setups while other setups work; *decrease* risk while winning ("your fake humility will
  not be rewarded by the market"); abandon a proven setup after a short losing string.
- **Streak rules — do this:** treat divergence between setup families (trending vs ranging) as
  information about a regime change; when a setup is working, increase *frequency* before size;
  when it degrades, apply a quality filter and trade only A+ instances.
- **Leverage is collateralisation, not P&L.** "Cranking up the leverage slider does not increase
  or decrease your P&L; your P&L is dictated by your position size." Leverage only sets how close
  liquidation sits to price.
- **Crypto-specific:** altcoin diversification is largely illusory on the downside — "you're
  essentially stacking your risk because if you're wrong they'll all move down in the same
  direction." Cred prefers one or two high-conviction positions to a basket.

### 3. Risk Management — The Skill That Keeps You in the Game (TA 101)
- **Channel:** Krown
- **Views:** 23,396 | **Published:** 2019-01-16 | **Length:** 21:09
- **URL:** https://www.youtube.com/watch?v=Kyw0nGvUdGo

- **The core skill is knowing where you are wrong, stated before entry.** "The separating factor
  is: where do I know that this trade that I just put on is not going to work for me any longer."
- **Minimise the distance between entry and invalidation.** "The more that I minimize that space
  between those two numbers, the greater I can goose the odds in my favor."
- **Practical stop rule using swing structure:** short after a confirmed swing high, stop just
  above the wick high of that swing. Worked example given at a $4,414 wick high with entry near
  $4,100. "It's set in stone when I enter the trade."
- **Breakeven-exit-on-fear is mathematically ruinous.** Worked out explicitly: risking $200 to
  make $0 across a 50/50 win rate is "quite literally setting yourself up for a long-term failure."
- **Reward must exceed risk for the system to survive.** Worked example: $250 risk for ~$800
  reward is a viable structure; repeated over a sample it absorbs the losses.
- **Framing:** improvement comes from tightening two variables independently — better TA raises
  the reward side, better risk management shrinks the entry-to-invalidation gap.

### 4. Mature Trading Starts With One Simple Rule About Position Size
- **Channel:** Krown
- **Views:** 7,872 | **Published:** 2021-11-27 | **Length:** 6:53
- **URL:** https://www.youtube.com/watch?v=gNMJdqv1ncw

The most numerically explicit video in the set.

- **The emotion test for sizing:** "If your positional sizing is causing you an emotional reaction
  when you are in a trade, it's probably too high."
- **Risk cap:** "You want to never risk more than like realistically more than two percent of your
  account on a single trade."
- **Leverage cap:** "I never want to go over 5x leverage on my real trading accounts."
- **Drawdown circuit breakers:** at **-10%** of account, stop and re-strategise — "your strategy
  is probably not too good." At **-20%**, "you need to leave the market."
- **Backtest threshold before trusting a strategy:** "back tested at least 50 to 100 times and
  then also forward tested with a small dollar account."
- **Profit-taking rule he actually runs:** take one third off as soon as the position is in profit,
  triggered by PMARP above the 75th percentile or BBWP above the 80th–90th percentile —
  "that's a hard inside rule." Remainder managed on a 9/21 EMA cross; full exit on a close below
  the 55 EMA.
- **Don't change a working profit-taking scheme without re-testing it** on a small live account first.

---

## Tier 2 — Trade management, entries, structure

### 5. Technical Analysis Series — Trade Management
- **Channel:** CryptoCred
- **Views:** 76,609 | **Published:** 2020-04-26 | **Length:** 57:09
- **URL:** https://www.youtube.com/watch?v=_ndAoizXy64

- **Management timeframe rule:** manage on the entry timeframe plus one timeframe below.
  Weekly setup → weekly and daily. Daily setup → daily and 12h/6h/4h. Intraday 4h/1h setup →
  30m/15m. Mismatching these is the most common management error.
- **Manage the losing side too, not just the winning side.** "Consistently reducing 1R losers to
  less than a full size stop-out will make a meaningful difference to your equity curve." He
  notes newer traders' journals show managed winners (+0.8R, +0.5R) alongside a string of
  unmanaged full -1R losses.
- **The alignment test, applied continuously:** "Are developments in price since my entry aligned
  with my expectations for this trade idea?" If you sold a level and price is closing above it
  repeatedly, exit before the stop rather than waiting.
- **Time-based invalidation — three setup families with expiry dates:**
  1. Trap setups (swing failure, failed breakout) assume *fast* rejection. "As more time
     progresses the probabilities shift from trap to genuine breakout."
  2. Momentum-continuation setups assume price does not stall after breaking structure.
  3. Support/resistance setups: "If price spends too much time at a structure without offering a
     reaction or moving away, the probabilities shift from bounce to failure."
- **Trailing stops vs fixed targets:** trail under each swing low in a trending environment;
  use fixed range-boundary or ATR targets in a ranging environment. Risk of trailing: "obvious
  areas for trade stops often get tagged prior to trend continuation."
- **Dynamic risk/reward test:** "If someone offered you the current price, your current stop-loss
  order and your current take profit order as a trade right now, would you take it?" If no, manage.
- **Against automatic breakeven:** moving the stop to breakeven converts the risk from "losing
  money" to "getting stopped out while still being right." At high-timeframe levels price
  routinely retests before the real move, so a breakeven stop means "you end up buying the
  resistance you sold."
- **The dead zone:** immediately after entry there is usually nothing to manage. "Make sure
  there's something to manage."

### 6. Technical Analysis Series — Entry Triggers (UPDATED)
- **Channel:** CryptoCred
- **Views:** 66,930 | **Published:** 2022-11-16 | **Length:** 1:13:03
- **URL:** https://www.youtube.com/watch?v=7mnz-JxhHnk

Six named entry triggers, each with stated pros and cons.

1. **Outright price** — resting limit order at the level. Controls fill price, earns maker fees,
   enforces discipline, prevents FOMO chasing. Costs: partial fills, no chance to read the
   reaction, invalidation not always clear. Best at "higher timeframe fresh areas of support and
   resistance with a lot of time and space between the break and the retest."
2. **Wick price** — bid/offer beyond the level to catch the excess. Gives better entries and
   tighter invalidation. **Scale the offset to the timeframe:** 5–15% beyond structure for
   high-timeframe liquidation-driven moves, 0.5–2% for normal lower-timeframe rotations. Risk:
   greed causes missed trades entirely.
3. **Deviation** — a two-part confirmation: price must (a) exceed the structure and (b) close
   back inside it. "You don't know it's a deviation until it falls back within the structure."
   Invalidation is then automatic: the extreme of the failed break. "The market typically doesn't
   double deviate."
4. **Break in structure** — wait for lower-timeframe lower-highs/lower-lows at resistance (or
   higher-highs/higher-lows at support) before entering. Cred's least-used trigger; low
   signal-to-noise at high-timeframe levels, and it precludes fast one-touch moves.
5. **Candle close** — buy/sell the close through the level, **on the same timeframe as the
   structure**. "If you're looking at a daily chart and daily levels, you should be looking at
   daily closes." Main benefit is noise reduction in high-timeframe swing trading; main cost is
   lateness.
6. **Low-timeframe fractal** — when the high-timeframe zone is 5–20% wide, drop to the execution
   timeframe and take a lower-timeframe setup *inside* that zone. Converts an untradeable wide
   area into a defined entry and tight invalidation.

- **The governing trade-off, stated repeatedly:** "Less confirmation generally means a better
  entry, more confirmation generally means a worse entry." There is no free confirmation.
- **Don't use entry triggers as a precursor for cowardice.** "If true confirmation existed with
  no downsides, no one would ever lose money."
- **Beginners should start with plain limit-order strategies.**
- On psychology: "A lot of the issues that are perceived to be psychological aren't psychological
  at all — they actually stem from disorganization."

### 7. Technical Analysis Series — Pattern Failure
- **Channel:** CryptoCred
- **Views:** 36,826 | **Published:** 2022-08-13 | **Length:** 22:19
- **URL:** https://www.youtube.com/watch?v=f9mkEe-Y67A

- **Central rule:** "Bullish pattern failure is bearish and bearish pattern failure is bullish."
- **Mechanism:** a clear pattern creates concentrated one-sided positioning; when it fails, those
  participants must close with market orders around the same price, and that concentrated demand
  for liquidity is what produces the fast reversal.
- **The clearer the pattern, the better the failure trade.** More visibility → more participation
  → more trapped size.
- **Timeframe scaling is roughly linear:** "smaller time frame, smaller trap, smaller move; bigger
  time frame, bigger trap, bigger move."
- **Trend confluence filter:** in an uptrend look for *bearish* pattern failure for continuation;
  in a downtrend look for *bullish* pattern failure.
- **Chop is not pattern failure.** Ambiguous price action doesn't generate the positioning the
  setup depends on.
- **You don't need to trade the pattern to trade its failure.** Even if you think head-and-shoulders
  is worthless, you can trade the reclaim of the neckline against the people who did trade it.
- **Participation can be measured** via footprint delta, open interest change, or volume at the
  breakout point.
- Historical examples cited: BTC's failed breakout above the ~$60k prior all-time-high range,
  and the failed breakout at ~$44–45k during the Terra/Luna period, both of which preceded
  sustained downtrends.

### 8. Technical Analysis Series — Market Structure
- **Channel:** CryptoCred
- **Views:** 227,530 | **Published:** 2020-12-18 | **Length:** 1:35:53
- **URL:** https://www.youtube.com/watch?v=BHwoN7VPrBE

- **Deliberately minimal definition of a market structure break**, rejecting the common extra
  conditions. Cred does not require that a broken lower high must have been preceded by a lower
  low: "I think it's just needlessly complex."
- **Confirmation rule:** "I at least like to see a close above or below on the same time frame as
  the market structure anchor."
- **Obviousness heuristic:** "If you must ask yourself where the market structure break has
  formed, it probably hasn't."
- **Wicks vs bodies:** no universal rule; the timeframe-matched close is the working standard.
- **A structure break need not produce a trade.** It can instead be a signal to stop adding,
  move stops, take partials, or hedge.
- **Counter-trend sizing:** trading against the prevailing trend on a structure break "typically
  warrants some sort of sizing adjustment" downward.
- Higher timeframes are preferred for readability: "there's just more room between levels, easier
  to read, and that tends to translate into more actionable ideas."

### 9. Technical Analysis Series — Time Frames
- **Channel:** CryptoCred
- **Views:** 164,988 | **Published:** 2019-11-12 | **Length:** 1:20:33
- **URL:** https://www.youtube.com/watch?v=gIIeHmePc1I

- **Symmetry rule for reversals:** "Persuasive signs of reversal must also form on high
  timeframes." If a market has trended down for weeks, a low-timeframe reversal signal is not
  sufficient evidence. Default is "presume trend continuation until proven otherwise, and the
  proven otherwise must also form on the high timeframe."
- **Consolidation duration must be read relative to timeframe.** 12 hours of consolidation at
  hourly support and 12 hours at weekly support are not comparable events.
- **Levels do not stop existing because you stopped drawing them.** "Even as a low timeframe
  trader you should always know where [the high timeframe levels] are."
- **Against tick-perfect level expectations:** treating a level as broken because price didn't
  turn exactly at it is "completely wrong" — levels are zones, and holding them to that standard
  means "you will just cut good trades too early."
- **Directional expectation framing:** if bullish, expect support to do its job and resistance to
  fail; if bearish, the inverse. Use that as the running test of whether the thesis is intact.
- There is always more than one trend on an instrument; a framework for identifying the dominant
  one is prerequisite to everything else.

### 10. Technical Analysis Series — Candlestick Charts
- **Channel:** CryptoCred
- **Views:** 679,190 | **Published:** 2018-09-18 | **Length:** 25:08
- **URL:** https://www.youtube.com/watch?v=q7BVTJol0IA

Highest-viewed video in the CryptoCred series. Mechanics of candle construction and reading
open/high/low/close, body vs wick. Cautionary rule for beginners: it is "super tempting to look
at every single move, five-minute, fifteen-minute" and force a candlestick reading onto noise.
Lower rule-density than the rest of the series; useful as a primer, not as a source of testable
rules.

---

## Tier 3 — Coin Bureau (highest reach, lower rule density)

### 11. Technical Analysis: Everything YOU NEED TO KNOW!!
- **Channel:** Coin Bureau
- **Views:** 1,101,574 | **Published:** 2020-11-14 | **Length:** 19:56
- **URL:** https://www.youtube.com/watch?v=lW3eWIj3Q04

- **Rule of thumb on horizon:** "Technical analysis is used for shorter term trading and
  fundamental analysis is used for longer term trading and hodling."
- **Check volume before anything else** on an unfamiliar altcoin or exchange. Some lesser-known
  exchanges "set longer default trading time periods to hide low liquidity."
- **Volume/price divergence rule:** price falling on *declining* volume indicates a weak
  downtrend; price rising on declining volume warns of reversal.
- **Wick reading:** a long lower wick suggests dip-buying (bullish); a long upper wick suggests
  profit-taking and a possible shakeout.
- **RSI thresholds:** below 30 = undervalued/buy zone; above 70 = "bubble territory"/sell zone;
  30–70 = neutral.
- **Moving averages:** the 200-day EMA acts as resistance from below and support from above.
  A 20-day crossing the 200-day from above is a death cross; from below, a golden cross.
- **MACD:** wide line separation = low volatility, convergence = rising volatility, crossover =
  direction change.
- **Bollinger Bands:** wider = more volatility; buy at low volatility, sell at high volatility;
  price outside the band range is the trigger.
- **Triangles** are named the most reliable chart patterns; the left side of the triangle is used
  to project the move size.

### 12. Coin Bureau Crypto Trading Strategy REVEALED!! Top TIPS!
- **Channel:** Coin Bureau
- **Views:** 995,031 | **Published:** 2021-09-07 | **Length:** 19:05
- **URL:** https://www.youtube.com/watch?v=EADLE7kO4tA

A described personal process rather than a rule set, but several transferable procedures:

- **Top-down sequence:** read Bitcoin first, then Bitcoin dominance, then total market cap, then
  individual alts. "It boggles my mind that so many crypto holders don't factor in BTC when
  analyzing their favorite altcoins."
- **Dominance/market-cap confirmation matrix:** dominance down + total cap down → stay out
  entirely; dominance down + total cap up → altcoin season.
- **Avoid sub-daily timeframes:** "analyzing time frames shorter than a day can create a lot of
  noise... I always stick to longer time frames," starting from monthly and weekly for BTC.
- **Moving averages used:** 200-day (bull/bear line), 50-day (with golden/death cross), and a
  128-day used specifically as a downside support and stop-out line.
- **Laddered profit-taking:** set one realistic target from the monthly pattern, then sell in
  increments at each intervening weekly/daily resistance zone.
- **Percentage-based rule during alt season:** when a portfolio altcoin "has doubled in price
  within a few days, I will typically take some gains off the table."
- **Park profits in stablecoins or gold-backed tokens** rather than rotating straight back in.
- **Dip-buy criteria:** price beneath the Bollinger Band range *and* very low RSI on the daily.
- **Market cap, not unit price,** determines upside — used to set realistic 2x/3x sell targets.
- Caveat: the video contains a dated BTC price projection, which is exactly the kind of content
  to discard. The process around it is the usable part.

### 13. Leveraged Bitcoin Trading: This is THE REAL TRUTH!!
- **Channel:** Coin Bureau
- **Views:** 298,309 | **Published:** 2020-07-05 | **Length:** 18:45
- **URL:** https://www.youtube.com/watch?v=z4_8xVYGvks

- **Hard leverage ceiling:** "You don't really need more than 10 times leverage to be able to
  trade effectively and responsibly for the long term." And: "on every level, high leverage that
  above 10 times is suboptimal for everyone apart from the exchange."
- **Prerequisite rule:** "People should not be trading with leverage if they don't know how to
  trade spot. If you are not going to make a profit trading with no leverage, you sure as hell
  ain't going to with leverage."
- **Institutional comparison as calibration:** regulated venues imply far lower leverage —
  Bakkt's ~37% initial margin implies ~2.7x, CME's up to ~50% implies ~2x. "The guys who manage
  billions of dollars are perfectly fine using this leverage."
- **Structural conflict of interest:** higher leverage → more liquidations → more forced trades →
  more exchange fees, with residual margin flowing into the exchange insurance fund. BitMEX's
  fund is cited at over 37,000 BTC, "all funded from the margin of wrecked margin traders."
- **Liquidation vs bankruptcy price gap widens with leverage**, which is the mechanical reason
  high leverage is disadvantaged.
- **Always use stop-losses on leveraged positions**; trading without them is called out directly.
- **Ring-fence the capital:** leverage trading funds should be "a completely separate component
  from your hodl portfolio" and an amount you can lose outright.
- Legitimate non-speculative uses named: hedging a spot book, miners locking forward prices, and
  pair trades.

### 14. 10 Worst Crypto Mistakes: Make Sure You AVOID Them!
- **Channel:** Coin Bureau
- **Views:** 987,910 | **Published:** 2021-05-02 | **Length:** 24:13
- **URL:** https://www.youtube.com/watch?v=39_dy7TJD2o

Two rules here are directly relevant to methodology; the rest is operational security and tax.

- **Never add to a losing trade.** "Pro tip: never add to a losing trade... this is investing
  based on emotion and is akin to gambler's ruin. You're merely chasing losses and it's a
  strategy based on hope, not reasoned analysis."
- **An objective is not a strategy.** "You cannot mistake an objective for a strategy." Goals
  must be defined, measurable, and set against a stated risk tolerance.
- **Measure strategy performance annually**, and don't change it continuously — "you can't be
  sure of its long-term effectiveness if you're constantly chopping and changing."
- **Never invest more than you can afford to lose; never borrow to invest.**
- **Always use stop-losses when actively trading**, because "the crypto markets move faster than
  you are able to react to them."
- **Avoid high leverage as a beginner.**
- Remaining items (exchange selection, fees, hardware wallets, seed-phrase backups, test
  transactions, chain-mismatch errors, tax planning, not disclosing holdings, scam filtering via
  "is this too good to be true") are operational rather than methodological.

---

## Tier 4 — DataDash (2017 "Trading Tip" series)

Historically the most-viewed structured crypto-trading curriculum on YouTube. The indicator
mechanics remain valid; the coin examples are dated and should be ignored.

### 15. Trading Tip #9: Three Signs To Buy A Cryptocurrency
- **Channel:** DataDash | **Views:** 322,373 | **Published:** 2017-10-02 | **Length:** 8:19
- **URL:** https://www.youtube.com/watch?v=fbiR8tVbjTQ

- **Sign 1 — consecutive higher lows on pullbacks.** Look for a history of uptrends that retain
  most of their gains through each correction, rather than round-tripping.
- **Sign 2 — the 50% retracement that holds.** "When you can find 50% corrections in price action
  ... once it's held that 50% correction level multiple times, you can see that as a form of
  price strength confirmation."
- **Sign 3 — 21-day and 50-day moving averages as momentum filters.** Support holding on the
  50-day, then graduating to holding the 21-day, is read as strengthening momentum. Buy on the
  pullback into the MA, not on the breakout.
- **Explicit anti-rule:** "I always tell people not to buy something after it's gone up three or
  four hundred percent."

### 16. Trading Tip #10: Three Signs To Sell A Cryptocurrency
- **Channel:** DataDash | **Views:** 118,412 | **Published:** 2017-10-08 | **Length:** 11:31
- **URL:** https://www.youtube.com/watch?v=bzs8-7OqWSU

- **Sign 1 — the 9-day moving average as a partial-exit trigger for fast movers.** Rule as stated:
  sell a partial position whenever price dips **more than 5% below the 9-day MA**; reset the rule
  when price reclaims it. Claimed to apply to "around 60 to 80 percent of the fast movers."
  His own first tranche is **40–50% of profits**, with the remainder laddered out on the way up.
- **Sign 2 — the topping candle.** Defined quantitatively: an upper wick "well over two to three
  times the actual gain of the day," read as exhausted FOMO.
- **Sign 3 — head and shoulders**, with the breakdown of the neckline as the exit.
- **Bonus rule — the "big evens."** Round numbers concentrate sell orders; take profit slightly
  *before* them rather than at them.
- Raise the trailing stop as the position advances rather than relying on discretion.

### 17. Trading Tip #12: Three Mistakes of Beginners in Cryptocurrency
- **Channel:** DataDash | **Views:** 135,328 | **Published:** 2017-10-14 | **Length:** 13:47
- **URL:** https://www.youtube.com/watch?v=dB3RL3DzvMU

- **Mistake 1 — assuming what went down must come up.** "What comes up must come down" is broadly
  true; the inverse is not. "Buying the low does not guarantee something is a good buy." If an
  asset is down 95%, "there's probably a reason for it."
- **Mistake 2 — judging value by unit price instead of market cap.** Valuation = circulating
  supply × price. Unit price carries no information about whether an asset is cheap.
- **Mistake 3 — concentration.** Given that most tokens go to zero, a single-asset position is a
  5–10% chance of success. He argues for roughly ten positions plus stop-losses, on the reasoning
  that one or two winners outweigh eight losers when losses are capped.

### 18. Trading Tip #14: The Dangers of Overtrading
- **Channel:** DataDash | **Views:** 23,909 | **Published:** 2017-10-21 | **Length:** 8:03
- **URL:** https://www.youtube.com/watch?v=6keM6Q3kgKw

- **The fee math, worked explicitly.** At 0.25% per side, rotating from one altcoin to another via
  BTC costs 0.25% to sell plus 0.25% to buy — "you're already putting yourself at a 0.5% loss of
  your gains" before the new position has done anything. Repeated rotation compounds this into
  a structural drag.
- **Base rate cited:** "95% of day traders are losing money" — and he expects it to be worse in crypto.
- **Benchmark rule:** before committing to active trading, compute what the same capital would
  have returned simply held over the period.
- **Pre-trade checklist, three questions:** Have I done the technical analysis? Do I fundamentally
  believe it's worth this and can be worth more? Am I overtrading — have I done too many trades today?

### 19. Trading Cryptocurrencies for Beginners
- **Channel:** DataDash | **Views:** 511,138 | **Published:** 2017-08-05 | **Length:** 35:09
- **URL:** https://www.youtube.com/watch?v=RQtvpNYtLfw

- **Worked risk example with concrete numbers:** targeting a 100% return while capping downside
  at **10%** via a stop-limit order. "We don't want to just keep holding it... we're going to
  limit our risk profile to 10% in losses."
- **Emotional rule attached to it:** "If you make a 10% loss, don't feel upset — be satisfied
  knowing that you limited your risk to an area that you're comfortable with."
- **Base rate cited:** "90% of traders lose money."
- **Four fundamental screens** before any technical work: target market, technology, team, adoption.
- **Pullback heuristic:** a 50–75% drawdown in an asset with sound technology, team and adoption
  is treated as an accumulation opportunity — with the explicit caveat that this fails when the
  asset is genuinely dying.
- **200-day moving average** named as the key long-term pullback support.
- Mechanics of limit orders and stop-limit orders are demonstrated step by step.

---

## Failed retrieval

### Bitcoin: Entry/Exit Strategies
- **Channel:** Benjamin Cowen
- **Views:** 94,929 | **Published:** 2023-12-12 | **Length:** 34:09
- **URL:** https://www.youtube.com/watch?v=ReziClqylXA

**No transcript retrieved.** The Actor returned the video successfully with full metadata but
`snippetCount: 0` — no caption track was available to extract. **No summary is provided, and
nothing about this video's content should be inferred.** Benjamin Cowen's other candidate
videos ("Investing $1000 In Crypto? Modern Portfolio Theory", 103,510 views; "Bitcoin Dynamic
DCA", 130,186 views) were identified but not extracted; they are the obvious next candidates
if a retry is wanted.

---

## Cross-source agreement and conflict

Points where independent sources converge — the strongest candidates for the methodology document:

- **Stops are placed at thesis invalidation, not at a fixed percentage.** CryptoCred (both
  videos) and Krown state this as the central principle.
- **Position size is derived, not chosen.** Both CryptoCred videos give the identical formula:
  `(equity × risk%) ÷ distance to invalidation`.
- **Never add to a loser.** Coin Bureau states it as a rule; CryptoCred's streak section reaches
  the same conclusion from expected-value reasoning.
- **Leverage does not change position-sizing math.** CryptoCred and Coin Bureau agree; Coin Bureau
  adds a hard 10x ceiling, Krown a 5x personal ceiling.
- **Journal everything.** Every CryptoCred video and Krown's position-size video make trade
  records the precondition for every other decision.
- **Confirmation has a price.** CryptoCred's entry-trigger trade-off is the most rigorous
  formulation, but DataDash's "don't chase after +300%" is the same idea.

Genuine conflicts worth resolving deliberately:

- **Fixed risk-per-trade.** Krown says never exceed 2%; Coin Bureau implies a conservative fixed
  fraction; CryptoCred's 2021 video explicitly rejects fixed fractional sizing in favour of
  frequency × expected-value scaling. The 2021 CryptoCred position also contradicts his own 2018
  video, which endorsed a 3% baseline.
- **Breakeven stops.** CryptoCred argues against them in both the risk and trade management
  videos, on the grounds that they amount to selling support or buying resistance. Krown's
  practical system does take a third off early, which is a partial-profit variant of the same
  impulse. This is the sharpest disagreement in the corpus.
- **Diversification.** DataDash advocates roughly ten positions; CryptoCred argues altcoin
  correlation makes that risk-stacking rather than diversification and prefers one or two
  high-conviction trades.
