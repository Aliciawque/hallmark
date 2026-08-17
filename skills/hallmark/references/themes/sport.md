# Theme - Sport

Athletic editorial, scoreboard register. A cool concrete-grey ground, blue-black ink, uppercase condensed heads, tabular mono numerals, and exactly ONE blaze-orange signal. It reads like a timed event: fast, measured, competitive.

The material, in one line: **cool concrete, blue-black ink, tight caps, tabular numerals, one blaze-orange.**

## Axes (diversification)

- **Paper band** - light, cool concrete (`--color-paper oklch(98% 0.003 250)`, L 98, hue 250, near-zero chroma). An engineered near-white with a faint cool cast. Not warm cream (Carnival, Riso), not black (Manifesto).
- **Display style** - display-condensed, uppercase. Saira Condensed `--display-weight 700`, `--tracking-display -0.04em`, all-caps on the `--lh-tight 1.02` floor. A true condensed design rather than a narrow cut of a text face, so the caps stack without crowding. Upright, never italic (`--display-style: normal`).
- **Accent hue** - warm blaze-orange (`--color-accent oklch(58% 0.190 35)`; as text `--color-accent-ink oklch(54% 0.20 35)`). High-chroma safety-orange, used as a single signal, never a flood. Clear of Coral's coral and Lumen's brass.

## Reference register

On Running · Bandit Running · Soar · District Vision · Strava · Whoop · Formula 1 result boards · NBA scoreboards · Wilson · Gymshark. **Never name any of these in the output.**

The material to match: the clinical performance grid, the race-bib crop, the standings table, the split-time readout. Internally: a stadium scoreboard's mono precision plus a running-club singlet, recoloured blaze-orange on cool concrete. When in doubt ask "does this read like a timed result board, or a wellness landing page?" Keep the former.

## Palette

Canonical values live in `site/css/tokens.css` under `[data-theme="sport"]`.

- `--color-paper: oklch(98% 0.003 250)` - cool concrete, never `#fff`
- `--color-ink: oklch(16% 0.080 260)` - cool near-navy black, chroma 0.08, visibly blue rather than warm charcoal
- `--color-ink-2: oklch(22% 0.060 258)` - body
- `--color-muted: oklch(50% 0.020 250)` - meta
- `--color-accent: oklch(58% 0.190 35)` - blaze-orange; as text, `--color-accent-ink: oklch(54% 0.20 35)`
- `--color-rule: oklch(78% 0.008 250)` at `--rule-hair 1px` - table rows, fine grids
- `--color-rule-2: oklch(36% 0.060 255)` at `--rule-fine 2px` - the heavy frame and the section break

The orange stays under 5% of any viewport: a bib number, one primary control, an active row, a link underline, the focus ring, the single lane stripe. Everything else is cool grey and blue-black ink.

## Typography

All-sans. No serif anywhere.

- **Display** - Saira Condensed 700, all-caps, `--tracking-display -0.04em` on the `--lh-tight 1.02` floor. No optical-size axis: the weight and the caps carry it. The tension lives in the caps and the tracking, not a slant: upright, never italic. Two-line all-caps risks ascender/descender collision, so hold the 1.02 floor and never drop under it.
- **Body** - Albert Sans 400/500/600 at `--measure 58ch`.
- **Numerals** - JetBrains Mono with `font-variant-numeric: tabular-nums` for times, splits, scores, distances, dates. The number is the content and outsizes its label: this is the stopwatch voice, and it is the theme's second signature after the caps.
- **Label** - JetBrains Mono, uppercase, `--tracking-label 0.10em`, for captions, table headers, meta rows, units, bib tags, folios, and entry numbers inside a real `<ol>`. The wide mono label is the ONLY place caps go loose; the display stays tight. It tags a value; it never announces a heading.

## Material

- **Two-weight rule system, never boxed cards.** The hairline rules rows and fine grids; the heavy 2px rule frames a figure and breaks sections. Depth from rules, never soft shadows or card-in-card.
- **A single lane stripe.** One vertical or diagonal orange bar (a track lane, a speed stripe, a finish line) in `--color-accent`, pure CSS, placed ONCE as the page's kinetic graphic. Never repeated as decoration.
- **Radius** ~4px on a control, no more. No pills.
- **No texture, no skeuomorphism.** Concrete is a colour here, not a photograph of concrete.
- **Fast rhythm.** `--section-gap 5.5rem`, `--section-head-gap 1.25rem` under a head. Tight, quick, no lounging.

## Motion

**Motion character: severe (0.7×, quick).** Kinetic but disciplined. Section reveals fade and rise ~10px, ease-out ~600ms, from one `IntersectionObserver`. Numerals count up once on reveal (the scoreboard flip) and then hold. Hover: an orange underline grows on links, a 2px border shifts to orange on focusable rows. No parallax, no autoplay, no bounce. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships final numbers, full visibility, static.

## Voice range

Imperative, kinetic, numbered. Caps on the headline, sentence case in the body. Numerals over words (5K, not five-K); verbs and numbers, not adjectives. Never *journey, wellness, holistic, elevate, unleash, game-changer, next-level, curated*.

## Do-nots (this theme's own failure modes)

- **No italic display.** The athletic lean comes from tracking and layout, not slanted type.
- **No loose tracking on the display.** The head is tight (`-0.04em`); wide caps live only on mono labels (`0.10em`). Spread display caps read as AI-stretched.
- **No warm paper.** Sport is cool (hue 250). Warm grey and cream belong to Carnival, Riso, Almanac.
- **No second accent, no duo-tone.** One orange signal only.
- **No hard-offset poster shadow** (`4px 4px 0`) and **no pill or gradient CTA.** Rules carry structure; the button is one solid orange block at a square-ish radius, destination named.
- **No stadium skeuomorphism** - no grass texture, jersey-mesh gradient, medal or trophy emoji.

## How Sport differs from its neighbours

| vs | difference |
|---|---|
| **Manifesto** | Manifesto is BLACK paper with red Anton, caps as protest. Sport is light cool-grey paper with blaze-orange and Saira Condensed, caps as scoreboard. Both uppercase; opposite polarity and opposite purpose (declaration vs result). |
| **Carnival** | Carnival is duo-tone poster art (Big Shoulders width axis, ornaments, hard-offset shadows). Sport is single-signal data (Saira Condensed, mono tabular numerals, hairlines). Expressive vs measured. |
| **Brutal** | Brutal is raw heavy-border slab brutalism. Sport is fast and hairline-precise, one heavy rule, the number as hero. Structure from rules and data, not slab weight. |

## When the brief routes here

*running · marathon · race · training · fitness · gym · team · league · fixtures · standings · scoreboard · athletics · performance · splits · PR / PB · kit · sportswear · club · season · match · tournament · endurance*. Categories: sportswear, running brands, fitness apps, sports teams and clubs, race events, training programs, performance gear, league and standings sites. Tone: fast, competitive, measured, kinetic, disciplined, timed, hard.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@500;600;700;800&family=Albert+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400; }

/* Scoreboard heads: uppercase Saira Condensed, tight + upright */
h1, h2 { font-family: var(--font-display); font-weight: var(--display-weight);
         text-transform: uppercase; letter-spacing: var(--tracking-display);
         line-height: var(--lh-tight); font-style: normal; }

/* The number: mono, tabular, larger than its label */
.num   { font-family: var(--font-mono); font-variant-numeric: tabular-nums;
         font-size: var(--text-2xl); color: var(--color-ink); }
.label { font-family: var(--font-label); text-transform: uppercase;
         letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* Two-weight rule system, never boxed cards */
.hair { border-top: var(--rule-hair) solid var(--color-rule); }
.rule { border-top: var(--rule-fine) solid var(--color-rule-2); }

/* One blaze-orange signal: the control, the single lane stripe */
.btn--primary { background: var(--color-accent); color: var(--color-paper);
                border-radius: 4px; }
.lane { background: var(--color-accent); }

.reveal { opacity: 0; transform: translateY(10px);
          transition: opacity .6s cubic-bezier(0.16,1,0.3,1),
                      transform .6s cubic-bezier(0.16,1,0.3,1); }
.reveal.is-in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

The rest of the page is yours. Sport supplies the concrete, the caps, the numerals, and the one orange; what gets timed on that surface is the brief's business, not the theme's.
