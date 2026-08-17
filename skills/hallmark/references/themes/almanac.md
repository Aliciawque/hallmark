# Theme - Almanac

The editorial-reference register, executed in **cool slate stock, not white**, with **tables and figures as the material**. A cool mid-band paper ground, ruler-drawn hairlines, tabular figures that line up to the decimal, and one deep bookish ink-blue that never gets loud. It reads like a trusted reference: dense, indexed, exact.

The material, in one line: **slate stock, two rule weights, tabular figures, one library-stamp blue.**

## Axes (diversification)

- **Paper band** - **mid cool** (`L 84%`, hue 245, chroma 0.012). A slate *ledger stock*, the catalog's first mid-band paper - unmistakably deeper than Cobalt's `98.5%` near-white and Newsprint's warm `92%`.
- **Display style** - **grotesk-sans**, Hanken Grotesk `600`, tight tracking `-0.014em`. A workmanlike Swiss grotesk, not a serif and not geometric-Geist.
- **Accent hue** - **deep ink-blue** (`oklch(38% 0.135 250)`) - dark and quiet, a library-stamp blue. Explicitly *not* Cobalt's electric `L58`; Almanac's signal is bookish, never live.

## Reference register

Works in Progress · Our World in Data · Stripe Press · Low-Tech Magazine · Whole Earth Catalog · The Pudding · Baymard · Poor Richard's Almanack. **Never name any of these in the output.**

The material to match: a cool indexed canvas, hairline tables, tabular figures, mono entry-numbers. Internally: *an old farmer's almanac reset in a Swiss grid*, its tables kept honest by hairlines and tabular figures. When in doubt ask "does this read like a trusted reference, or like a brochure?" Keep the former.

## Palette

Canonical values live in [`site/css/tokens.css`](../../../../site/css/tokens.css) under `[data-theme="almanac"]`.

- `--color-paper: oklch(84% 0.012 245)` - cool slate stock, never `#fff`
- `--color-paper-2` (`81%`) - alternating table rows
- `--color-paper-3` (`77%`) - wells and callout blocks
- `--color-ink: oklch(16% 0.020 245)` - cool near-black, 11.9:1 on the stock
- `--color-muted: oklch(42% 0.016 245)` - meta, labels
- `--color-accent: oklch(38% 0.135 250)` - deep ink-blue, under 5% of any viewport
- `--color-rule: oklch(74% 0.012 240)` - the hairline that draws the grid
- `--color-rule-2: oklch(38% 0.018 240)` - the one emphatic line under a head or `thead`

The accent is a stamp, not a flood: links, one figure, a single primary control. Everything else is ink on bond-grey.

## Typography

Three families.

- **Display** - Hanken Grotesk 600, tracking `-0.014em`. Grotesk sets structure.
- **Body / running entry** - Newsreader, optical-sizing, at the `64ch` measure. Serif sets reading. Italic is in-paragraph emphasis only, never a heading.
- **Label** - IBM Plex Mono, UPPERCASE, `0.06em` (`--tracking-label`): captions, table headers, units, dates, folios, entry numbers inside a real `<ol>`. It is a machine-readout voice carrying real values; it never sits above a heading to announce it.

**Tabular figures are load-bearing.** `font-variant-numeric: tabular-nums` wherever a figure appears, numerics right-aligned, decimals lined up, units in mono. Charts, when a table earns one: [`data-viz.md`](../data-viz.md).

## Material

- **Two rule weights, used deliberately.** The light hairline draws the grid and row separators; the dark rule draws one emphatic line under a head or a `thead`. **No boxed cards, no shadows.** Depth is rules, not blur.
- **No radius to speak of.** Square or near-square; this is ruled paper, not a card surface.
- **No texture.** The stock carries the warmth; grain, overprint, and scanline all belong to other themes.
- **Images** are small, outlined, inline to the measure. They never outgrow the type.

## Motion

**Motion character: brisk (0.85×).** Functional and sparse, like turning a reference page. Section reveals fade and rise ~8px at `0.85×` ease-out, functional rather than showy. Number-tick counters run `0 → final` once on reveal for stats, dates, and prices, then hold. **No bounce, no parallax, no autoplay, no marquee.** Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static, counters at final value, fully visible.

## Voice range

Declarative, dated, exact: cite the figure, the edition, the source, the unit. Never *seamless, revolutionary, magical, effortless, game-changing, cutting-edge, supercharge, unlock*. Never "click here."

## Do-nots (this theme's own failure modes)

- **No electric blue.** Almanac's accent is dark bookish `L38`; the live `L58` cobalt is a sibling's lane.
- **No pure `#fff` / `#000`.** Cool slate paper, cool near-black ink, always tinted hue 240-250.
- **No warm paper.** Warm grey is Newsprint's; Almanac is cool.
- **No boxed cards, no drop-shadows, no glassmorphism.** Hairline tables and two rule weights carry every surface.
- **No justified newspaper columns.** That is Newsprint's broadsheet; Almanac is ragged-right.
- **No pill / gradient CTA.** One quiet ink-blue control or a typographic link; name the destination.

## How Almanac differs from its neighbours

| vs | difference |
|---|---|
| **Newsprint** | Warm `92%` paper, a slab display (Zilla Slab), brick accent, justified broadsheet columns. Almanac is cool `84%` slate stock, grotesk display, ink-blue, ragged-right. Broadsheet vs reference book settles it. |
| **Cobalt** | Same cool + blue + mono labels, but Cobalt is `98.5%` engineered near-white with **electric** `L58` cobalt and Familjen Grotesk. Almanac is greyer bond, **deep** `L38` bookish blue, a Newsreader serif. Dev-tool vs reference book. |
| **Garden** | Warm `95.5%`, roman serif (Young Serif), leaf-green, generous negative space, calm springs. Almanac is cool, grotesk, ink-blue, dense, functional `0.85×` motion. Botanical calm vs data density. |

## When the brief routes here

*almanac · yearbook · field guide · reference · handbook · manual · index · catalogue · encyclopedia · data · figures · tables · statistics · research · dataset · records · directory · glossary · compendium · specifications*. Categories: data and research sites, reference manuals, field guides, knowledge bases, directories, public datasets, technical handbooks, editorial data journalism. Tone: exact, indexed, trusted, dense, scholarly, matter-of-fact, cool.

Warm, broadsheet, image-led, or atmospheric briefs route elsewhere. When the brief is a reference full of data and wants to *show the tables*, it is Almanac.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink);
       font-family: var(--font-body); font-weight: 400; }

/* Two rule weights: hairline grid + one emphatic head rule */
.rule       { border-top: 1px solid var(--color-rule); }
.rule--firm { border-bottom: 2px solid var(--color-rule-2); }

/* Tabular, right-aligned, hairline-ruled */
table { border-collapse: collapse; font-variant-numeric: tabular-nums; }
thead th { border-bottom: 2px solid var(--color-rule-2);
           font: 500 var(--text-sm)/1 var(--font-mono);
           text-transform: uppercase; letter-spacing: var(--tracking-label); }
td.num { text-align: right; font-variant-numeric: tabular-nums; }
tbody tr:nth-child(even) { background: var(--color-paper-2); }

/* Mono label voice: captions, headers, units, entry numbers */
.label { font: 500 var(--text-xs)/1 var(--font-mono);
         text-transform: uppercase; letter-spacing: var(--tracking-label);
         color: var(--color-muted); }

/* Newsreader carries running prose; ink-blue is the one signal */
.prose { font-family: var(--font-serif); max-width: var(--measure); }
a { color: var(--color-accent); }

/* Functional reveal - 0.85x, no showmanship */
.reveal { opacity: 0; transform: translateY(8px);
          transition: opacity .5s ease-out, transform .5s ease-out; }
.reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

The rest of the page is yours. Almanac supplies the stock, the rules, and the figures; what gets indexed on that paper is the brief's business, not the theme's.
