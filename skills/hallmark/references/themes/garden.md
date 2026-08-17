# Theme - Garden

Warm-botanical editorial: the naturalist field-journal and herbarium-sheet school. A **warm oat-cream ground** (never grey-sage), **botanical green ink** (a warm near-black green, never `#000`), one **living leaf-green** accent, a clay pop, and imagery that is **hand-built botanical craft** rather than photography. It reads like a well-kept field notebook: honest, seasonal, grown-not-manufactured.

The material, in one line: **oat paper, green ink, a chunky roman serif, and something grown drawn by hand.**

## Axes (diversification)

- **Paper band** - light warm (`L 95.5%`, hue 92, low chroma). Oat cream, faintly honeyed. Distinct from the genre's cool and bone grounds and from any grey-sage; tint everything toward oat, never toward slate.
- **Display style** - **roman serif** (Young Serif, one organic weight `400`, `--display-style: normal`). Chunky, slab-ish, hand-cut. Never italic in headers; Young Serif ships one weight, so vary by size, not weight.
- **Accent hue** - **chromatic leaf-green** (`oklch(47% 0.13 140)`, primary) with an **earthy clay / terracotta** pop (`oklch(54% 0.14 46)`, secondary). Living, chlorophyll-real, clear of any cool teal or corporate emerald.

## Reference register

Aesop · Kinfolk · Cereal · Frama · Le Labo · Mast · Toast Ale · Ballymaloe · small-CSA and single-apiary brand sites.

The material to match: the naturalist's brand story - warm paper, roman serif, hand-drawn or hand-built botanical craft, seasonal honesty, prose that smells of the field. A pressed-herbarium sheet: one specimen, a hand-lettered mono tag, a warm neutral mount. Ask "does this read like a field journal, or a supermarket label?" Keep the former. Never name any of these in the output.

**Voice range:** warm, honest, seasonal, unhurried. Say the ridge, the flower, the pour date, the number of jars; never *artisanal*, *curated*, *small-batch* as a hollow badge.

## Palette

- `--color-paper: oklch(95.5% 0.022 92)` - oat cream, faintly honeyed
- `--color-ink: oklch(24% 0.052 152)` - botanical near-black green, headlines
- `--color-ink-2: oklch(33% 0.05 150)` - body
- `--color-accent: oklch(47% 0.13 140)` - living leaf-green, the signal
- `--color-accent-2: oklch(54% 0.14 46)` - clay / terracotta pop
- `--tint-moss: oklch(47% 0.13 140 / 0.10)` and `--tint-clay: oklch(54% 0.14 46 / 0.10)` - band washes
- `--color-rule` soft green-grey, `--color-rule-2` mossy - hairlines

Every neutral carries a green cast (hue 90-152); no pure grey anywhere. Leaf-green stays under 5% of any viewport (links, the one solid control, focus rings, active nav). Clay lives mostly *inside* the craft (honey fill, cork, ripe accents) and rarely as UI chrome. Two hues, disciplined. Set `font-variant-numeric: oldstyle-nums`.

## Typography

- **Display** - Young Serif at `--display-weight: 400`, roman only, `--tracking-display: -0.006em`, clamped to `5rem`. Hierarchy comes from size, never from italic or a bolder cut. A drop-of-honey slab feel, hand-cut, not a refined Didone.
- **Body** - Hanken Grotesk 400/500/600/700.
- **Prose serif** - Newsreader at `--measure: 58ch` for long provenance and story copy: readable and warm. Young Serif never runs as body.
- **Label** - Geist Mono, UPPERCASE, `--tracking-label: 0.14em`. The herbarium tag voice, dry machine-lettering mounted against the warm serif: lot codes, dates, captions, meta rows, table headers, units, folios.

## Material

- **Hand-built botanical craft.** The imagery is drawn in pure CSS and hand-authored SVG (a honeycomb wash, a glass jar of amber, corked vials of a pour), never a stock photo. It is the thing being sold, anchored rather than decorative.
- **Tint bands, not boxed cards.** Soft full-bleed washes in `--tint-moss` or `--tint-clay`. Structure is hairlines plus generous whitespace, never drop-shadowed boxes.
- **Sprig ornament.** A small hand-authored SVG leaf-sprig or fleuron drawn in `--color-rule-2` or accent: the broadsheet fleuron, botanised. Ornament, never chrome.
- **Radius and shadow** - near-square, flat. One solid leaf-green control; a pill is fine, a gradient on it is not.

## Motion

**Motion character: calm (1.2×).** Quiet and seasonal. One orchestrated entrance: staggered reveal (fade plus <=10px rise, `--i` stagger, <=500ms, reveal-once). An optional single hover behaviour on a piece of craft (a jar-fill rise). Transform and opacity only: no bounce, no parallax, no autoplay. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never grey-sage or slate paper.** The ground is warm oat (hue ~92); a cool grey-green kills it.
- **Never stock photography.** The imagery is hand-built CSS and SVG botanical craft. A real honey photo reads as a supermarket label.
- **Never a cool teal or corporate emerald accent.** The green must read chlorophyll-living (hue ~140), not fintech.
- **Never italic Young Serif and never faux-bold.** One roman weight; vary by size.
- **Never boxed drop-shadow cards.** Hairlines and tint bands do the containing.
- **Never a gradient on the leaf-green control.** One flat fill, honest.

## How Garden differs from its neighbours

| vs | difference |
|---|---|
| **Almanac** | A dense data and ledger register (tables, monospace almanac). Garden is a warm brand story with hand-built botanical craft and a living leaf-green accent: narrative, not tabular. |
| **Atelier** | A restrained studio voice on a neutral ground. Garden shares the letter-close warmth but commits to green ink, oat paper, and chunky Young Serif: agrarian, not gallery-quiet. |
| **Specimen** | Its specimen is a type and glyph specimen. Garden's is a *botanical* object and its accent is chromatic leaf-green: a farm, not a foundry. |

## When the brief routes here

*farm · apiary · honey · cidery · orchard · seed · nursery · herbalist · botanical · tea · preserves · single-origin · seasonal · harvest · small-maker · CSA · provenance · grown · field · homestead*. Categories: artisan food and drink, apiaries, farm brands, seed companies, nurseries, herbal and botanical goods, maker stories. Tone: warm, honest, seasonal, rooted, unhurried, hand-made.

Technical, corporate, cool, or photo-heavy briefs route elsewhere.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Young+Serif&family=Hanken+Grotesk:wght@400;500;600;700&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400;
       font-variant-numeric: oldstyle-nums; }

/* Young Serif display - roman, one weight, sized not bolded */
.display { font-family: var(--font-display); font-weight: var(--display-weight);
  font-style: var(--display-style); letter-spacing: var(--tracking-tight);
  color: var(--color-ink); line-height: var(--lh-tight); }

/* Herbarium tag - dry mono against the warm serif */
.tag { font-family: var(--font-label); text-transform: uppercase;
  letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* Tint band + hairline, never a boxed card */
.band--moss { background: var(--tint-moss); }
.rule { border-top: 1px solid var(--color-rule); }

/* One leaf-green control; clay stays on the craft */
.btn--solid { background: var(--color-accent); color: var(--color-accent-ink); }

/* Reveal - the whole motion engine */
.reveal { opacity: 0; transform: translateY(10px);
  transition: opacity .5s ease, transform .5s ease;
  transition-delay: calc(var(--i, 0) * 70ms); }
.reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; } }
```

Plus one `IntersectionObserver` adding the in-view class. Reference build: [`site/examples/garden-01/`](../../../../site/examples/garden-01/) - match its register (tokens, voice, motion feel), never its composition; reusing its section order, hero geometry, or grid is a gate-32-grade repeat.
