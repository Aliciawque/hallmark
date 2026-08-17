# Theme - Ledger

The ruled account book, rendered dark. A navy sheet that carries **its own ruling: banded rows and visible money columns**, figures set in tabular mono, and **two inks that mean something specific, one for each side of the book**. Totals sit under a double rule, as-of times are stated, and every column foots. It reads like a book somebody closed and signed: precise, dated, and checkable.

The material, in one line: **a ruled navy sheet with money columns, two inks (credit and debit), and every total footed under a double rule.**

> **The one dark option in the modern-minimal cluster.** Coral and Cobalt own the light lane; Ledger fills the dark slot. Dark but **not atmospheric** (that is Midnight): no glow, no bloom, no serif, no thin display. An instrument, not a mood. And not a dashboard: the page is a *book*, not a console full of widgets.

## Axes (diversification)

- **Paper band** - **dark**, one of three bindings (see below), ruled (see The sheet). Default navy `--color-paper: oklch(20% 0.025 255)`, raised paper `+4% L`, band tone `+2.5% L`, all at the binding's hue. Ink is cool light `oklch(93% 0.008 255)`, muted at `oklch(66% 0.012 255)`. Never pure black or white.
- **Display style** - **grotesk-sans plus tabular mono**: Instrument Sans 500/600/700 for display and prose, IBM Plex Mono 400/500 on every figure. No serif anywhere, no thin display weight.
- **Accent hue** - **two inks, one per side of the book** (see The two inks). Default credit teal `oklch(78% 0.12 185)`, debit brass `oklch(76% 0.115 82)`. Together they stay under 8% of any viewport.

## Three dials

**Ledger is built from three independent choices, and a page states all three.** They multiply to twenty-seven books, so two Ledger pages should never read as the same console recoloured. **Two Ledger pages in one run must differ on at least two of the three dials.**

### 1. The sheet (the ruling)

The ground is ruled, and **the ruling is the theme**. It never brightens, never animates, and never carries chroma.

| ruling | what it does |
|---|---|
| **banded** (default) | Alternating row bands in `--color-paper-3` at 28-34px, continuous-feed accounting paper inverted into the dark. Data rows land on the bands; prose sits in the clear. |
| **columnar** | Vertical money columns: 1px `--color-rule` rules defining the amount fields (debit, credit, balance) run the full height of a band, so figures visibly share one set of columns down the page. |
| **journal** | A two-page spread with a visible gutter rule down the centre: left page narrates, right page tabulates, and the two halves stay in register across every band. |

### 2. The binding (the ground)

The colour of the book itself. Every neutral on the page carries the binding's hue.

| binding | paper | the book it is |
|---|---|---|
| **navy** (default) | `oklch(20% 0.025 255)` | The treasury console. Cool, current, institutional. |
| **bordeaux** | `oklch(19% 0.032 15)` | Dark wine buckram, the bound annual. Warmer and older; the one that reads as a physical volume. |
| **cloth** | `oklch(19% 0.024 168)` | Ledger-cloth green-black, the stationer's book. Quietest of the three. |

**Cloth versus Terminal:** Terminal is a far darker green-black (`L 11%`, hue 145) that sets *everything* in mono and accents in phosphor green. Cloth is `L 19%` at hue 168, sets prose in a grotesk, and keeps mono for figures only. If a cloth-bound page starts reading as a console, the mono has escaped the figures.

### 3. The inks (the two sides)

Double entry has two sides, so the theme has two inks and each has exactly one job: **credit** is money in, reconciled, matched, live, posted, and takes the headline figure and the one solid button; **debit** is money out, owed, pending, unmatched, and is set on the figure itself, never on a background.

| pair | credit | debit | the house it is |
|---|---|---|---|
| **teal + brass** (default) | `oklch(78% 0.12 185)` | `oklch(76% 0.115 82)` | Modern treasury. The two inks sit far apart in hue and equal in weight. |
| **sage + clay** | `oklch(76% 0.10 150)` | `oklch(72% 0.11 45)` | Greenbar and manila. Softer and more papery; the closest to a printed statement. |
| **ice + oxide** | `oklch(82% 0.085 215)` | `oklch(64% 0.14 38)` | Cool credit against a warm earth debit, the widest value gap of the three. Debits read heavier here, which suits a page about what is still open. |

**The clearance rule.** Both inks must sit at least **40 degrees of hue** from the binding, or the page loses the distinction between ground and figure. That rules out sage + clay and ice + oxide on **bordeaux** (hue 15), which takes teal + brass. Every other combination clears.

Laws that bind whichever pair is chosen: **debits are never red** (money out is not an error, and the oxide debit is an earth tone, not a warning); neither ink is ever decorative; neither ever fills a band; a figure with no side takes `--color-ink`, not a colour. If a page needs a third meaning, it uses a label, not a hue.

## Reference register

The bound account book and the printed statement: ruled ledger paper, journal spreads, trial balances, the audited close. Modern surfaces that share the register are treasury and reconciliation consoles at their calmest. The material to match: money as the subject, set in a book that a controller signs. When in doubt, ask whether this reads like a page from a closed book or like a crypto landing, and keep the former. Never name any of these in the output.

## Typography

- **Display and body** - Instrument Sans, display at 600 with `-0.02em` tracking; prose 400/500 at 1.0625rem / 1.55.
- **Figures** - IBM Plex Mono 400/500 with `font-variant-numeric: tabular-nums`, on **every** number: balances, amounts, spec values, dates, timestamps, deltas, counts, percentages. Columns align digit-for-digit or the theme breaks. This is the spine.
- **Label voice** - IBM Plex Mono UPPERCASE, 11px, tracked `0.1em`, `--color-muted`. It sets column heads, field labels, status, units, folios, and the as-of line. Never a kicker above a heading.
- **The headline figure** - mono, 500, `clamp(2.4rem, 6vw, 3.6rem)`, in its side's ink, with a small superscript currency mark, faded decimals, and an as-of line beneath it in label voice.

## The kit

- **The foot.** Any column of figures that shows a total closes with the accounting convention: a 1px rule above the total, then the total, then a **double rule** (two 1px rules 3px apart) beneath it. This is the theme's most recognisable mark and it appears at least once per page.
- **The T-account.** A two-column figure split by a vertical centre rule, debits left in brass, credits right in teal, header in label voice, with both sides footed. One per page at most, and the two sides must balance.
- **The statement extract.** A ruled band presenting real-looking rows of a statement: date, particulars, folio reference, debit, credit, running balance. It is a `<table>`, right-aligned on amounts, with the ruling of the chosen sheet showing through.
- **The stamp.** A rotated outline stamp, 1.5px border, letter-spaced label voice inside (`posted`, `reconciled`, `as of 06:00 utc`), in either ink at low opacity. Once per page.
- **The running-balance rail.** A narrow vertical strip beside a statement extract carrying a single teal sparkline of the balance over the same rows, no axes, no second colour.
- **The tick and the query.** A small teal tick marks a matched row; a brass query mark flags an unmatched one. Nothing else appears in a status column.
- **The tally.** A count rendered as grouped strokes (four uprights and a crossing fifth) beside a small figure, for counts under about forty. Used once, where a count is genuinely small.

## Material

- **Every figure foots.** If the page shows a column of numbers with a total, the numbers **actually sum to the total**, and any percentages actually derive from them. A page that fakes its arithmetic has failed this theme in the way that matters most.
- **Every figure carries an as-of.** Balances, totals, and deltas state their moment in label voice: a date, a time with a zone, or a period. A figure without a date is an assertion, not a record.
- **Every section carries an accounting object**: a statement extract, a T-account, a footed column, a datasheet of label-left and mono-value-right, or a tick-and-query status column. A band of prose with no figures in it has failed the theme.
- **Rows, never tiles.** Repeated data is a real `<table>` with ruled rows, right-aligned amounts, and a hover that lifts the row one paper step. No card grids of KPIs, no donut walls, no gauges.
- **Hairlines and one surface tier carry depth.** 1px `--color-rule` draws every edge; raised paper sits on `--color-paper-2` with a single deep shadow. No glow, no inner gradients, no blur-as-depth.
- **Tight instrument radii** - `--radius-card: 10px`, `--radius-input: 6px`. Never a pill, never zero.
- **One chart at most**, and it is the balance sparkline or a single teal line over a fade, no axes, no grid, no second colour. Anything more is [`data-viz.md`](../data-viz.md).

## Motion

Composed and near-still, the way a printed page behaves.

- Rows shift one paper step on hover; the row's own ink brightens a hair.
- Buttons dip `translateY(1px)` on `:active`. Links shift border and colour.
- A live dot may pulse (opacity 1 to 0.4 over 2.4s), once per page.
- An optional one-shot count-up of the headline figure on load, then static, and it counts to a figure that foots.
- No parallax, no autoplay, no glow, no number-scrambling, no scroll reveals. `prefers-reduced-motion: reduce` ships everything static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never a dashboard.** No KPI card grids, no widget walls, no fake chart clutter. This is a book: ruled bands, tables, and footed columns.
- **Never a proportional numeral on a figure.** Every amount and spec value is tabular mono. Misaligned columns break the theme faster than any other error.
- **Never a red debit, and never a third hue.** Two inks with two jobs. Money out is brass, not an error.
- **Never a total that does not foot, and never an invented statistic.** Figures on a Ledger page are honest and dated, or they are not on the page.
- **Never an atmospheric glow, aurora, mesh, radial bloom, or gradient text, and never pure `#000` or `#fff`.** That is Midnight's lane. Ledger is flat.
- **Never a pill or gradient CTA.** One solid teal button at 6px radius, plus typographic links. Name the destination.
- **Never hide the ruling.** The sheet is ruled; deleting the ruling because it looks like scaffolding removes the theme.

## Voice range

Declarative, numeric, audited. Name the figure, the feed, the folio, the lock time; let specifications do the arguing. State what is not yet reconciled. Never: seamless, robust, cutting-edge, leverage, synergy, revolutionary, unlock, supercharge, effortless, game-changing. Never "click here."

## How Ledger differs from its neighbours

| vs | difference |
|---|---|
| **Cobalt** | Cobalt is cool near-white paper, electric cobalt, Familjen Grotesk and JetBrains Mono, with code as its focal material. Ledger is ruled dark navy, two accounting inks, Instrument Sans and IBM Plex Mono, with money as its focal material. Same cluster, opposite ground. |
| **Midnight** | Both are dark near hue 250, but Midnight is **atmospheric**: deeper `L 15%`, blue accent, Geist plus Instrument Serif, `--display-weight 300`, typewriter reveals. Ledger is **modern-minimal**: lifted `L 20%` navy, ruled, teal and brass, Instrument Sans 600, flat and still. Mood vs instrument. |
| **Coral** | Coral is warm-grey paper, warm coral, Geist, pill radii. Ledger is ruled dark navy, teal and brass, 10px and 6px radii. Opposite temperature, opposite ground. |
| **Terminal** | Terminal is green-black with mono for everything including body, a reading surface. Ledger keeps mono for figures only, sets prose in a grotesk, and rules its ground like paper. Editor vs account book. |
| **Grid** | Both expose their ruling, but Grid is a 99% light sheet with vertical hairlines, one grotesk, and one signal ink spent on geometry. Ledger is a dark ruled book whose columns exist to align money. Pencil on paper vs pen in a register. |

## When the brief routes here

*treasury · banking · fintech · payments · reconciliation · ledger · accounting · close · audit · balance · cash management · payouts · settlement · compliance · controller · CFO · bookkeeping · invoicing · payroll*. Categories: business banks, treasury software, payments APIs, accounting and reconciliation tools, finance products, back-office SaaS. Tone: precise, audited, calm, trustworthy, dense-but-legible, dark.

Warm, consumer, editorial, or image-led briefs route elsewhere. When the brief is money and wants to show the book, it is Ledger.

## Build hint

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background-color: var(--color-paper); color: var(--color-ink);
       font-family: var(--font-body); }

/* THE sheet: banded ruling, the ground of the page */
.ruled { background-image: repeating-linear-gradient(to bottom,
    transparent 0 31px, var(--color-paper-3) 31px 62px); }

/* Every figure is tabular mono - the theme's spine */
.fig { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
.cr  { color: var(--color-accent); }      /* credit, teal  */
.dr  { color: var(--color-accent-2); }    /* debit, brass; never red */

/* THE foot: rule, total, double rule */
.total   { border-top: 1px solid var(--color-rule); }
.total td { padding-top: 10px; }
.foot::after { content: ""; display: block; height: 3px;
  border-top: 1px solid var(--color-ink); border-bottom: 1px solid var(--color-ink); }

/* Money columns share one set of rules down the page */
.cols { display: grid; grid-template-columns: 1fr 8rem 8rem 9rem; }
.cols > * + * { border-inline-start: 1px solid var(--color-rule); text-align: right; }

@media (hover: hover) { tbody tr:hover td { background: var(--color-paper-2); } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; } }
```

Ledger supplies the ruled sheet, the money columns, the two inks, and the foot. Which figures earn the page, and whether they add up, is the brief's business, not the theme's.
