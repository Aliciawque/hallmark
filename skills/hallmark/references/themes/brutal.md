# Theme - Brutal

Raw graphic-design brutalism: heavy grids, slab type, one loud signal. Near-white paper is carved by near-black 3px rules, stacked with giant uppercase Albert Sans 700, and cut by exactly ONE red as a fill-block or bar. It reads like a wayfinding sign or a broadsheet front page: loud, rigid, unhedged.

The material, in one line: **a clean sheet, thick black rules, zero radius, one red cut.**

## Axes (diversification)

- **Paper band** - light (`oklch(98% 0.001 0)`, chroma ~0, hue 0). An engineered near-white, all but neutral. Not tinted, not warm-grey - a clean sheet the black rules bite into.
- **Display style** - **display-heavy**: Albert Sans **700**, run UPPERCASE at `--tracking-display: -0.045em`. `--lh-tight: 1.02` is the floor: below it, cap-tops of line N+1 collide with line N on multi-line all-caps heads.
- **Accent hue** - **warm red** (`#E63946`, text form `oklch(58% 0.24 25)`). One saturated signal, hue ~25. Sits clear of the cool themes; used as a graphic cut, never a wash.

## Reference register

Bloomberg Businessweek graphics · Balenciaga · Gumroad · Cash App · Are.na · MSCHF · Off-White · Read the Docs. **Never name any of these in the output.**

The material to match: the heavy-grid front page and the wayfinding sign - thick black rules, one red bar, type as the structure. Internally: *a broadsheet masthead crossed with a machine-shop label plate* - rigid grid, one red stamp, everything flush to a border.

## Palette

Canonical values live in `site/css/tokens.css` under `[data-theme="brutal"]`.

- `--color-paper: oklch(98% 0.001 0)` - engineered near-white
- `--color-ink: oklch(8% 0.005 0)` - near-black, and the rule colour
- body text `oklch(12% 0.005 0)`
- `--color-muted: oklch(38%)` - mono meta
- `--color-accent: #E63946` - the one red; as text, `--color-accent-ink: oklch(58% 0.24 25)`

Close to `#fff` / `#000` on purpose but never either: the ~0-chroma neutrality is what makes the red read as the only colour on the page. Keep the red under ~5% of any viewport. It cuts; it does not coat.

## Typography

All-sans. No serif anywhere.

- **Display** - Albert Sans 700, UPPERCASE, `--tracking-display: -0.045em`, `--lh-tight: 1.02`, sized by `--text-display` (clamp to 6.5rem). Flush-left, edge-aligned to a rule, allowed to run wide and clip against it. Never centred, never italic.
- **Body** - Albert Sans 400/500.
- **Label** - JetBrains Mono, UPPERCASE, `--tracking-label: 0.04em`, in `--color-muted`. The machine-readout counterpoint to the shouting display: meta rows, table headers, captions, filenames, kbd hints, units, folios, entry numbers inside a real `<ol>`. It records a value; it never introduces a heading.

## Material

- **Thick rules are the structure.** Two weights only: `--rule-fine: 3px` heavy borders box sections and figures; `--rule-hair: 1px` splits rows inside them. Brutalism draws with a marker, not a pencil. Content sits flush to the border with no inset gutter softening it.
- **Zero radius, everywhere.** `border-radius: 0` on buttons, inputs, blocks, images. Square corners are non-negotiable; any rounding reads as a softer sibling and breaks the theme.
- **Inverted solid blocks, no float.** The page reads as stacked filled rectangles: a solid black panel with paper text, a solid red panel, a bordered white panel. No drop-shadow blur, no glass, no card-on-card float - blocks butt against each other and against rules.
- **No texture, no pattern, no ornament.** The rules and the fills are the whole surface treatment.

## Motion

**Motion character: severe (0.75×).** Mechanical and abrupt. Reveals snap or step (a hard `opacity` cut, or a 1-step translate over ~120ms), they do not ease-glide. Hover flips state instantly: a block inverts to `--color-ink` (or `--color-accent`) with paper text, a border thickens to red. No bounce, no parallax, no blur transition, no autoplay. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Voice range

Blunt, declarative, often ALL CAPS. Verbs and nouns, no hedging, no hype. Never *seamless, elegant, delightful, gentle, soft, curated, whimsical, effortless, playful*. Say the thing flat.

## Do-nots (this theme's own failure modes)

- **No rounded corners.** Any `border-radius` > 0 belongs to Cobalt / Coral, not here.
- **No blurred drop-shadows, no glassmorphism.** Depth is borders and solid fills; a hard-offset no-blur shadow is Carnival's decorative move, keep it out.
- **No ornaments, fleurons, or layered offset stacks.** That is Carnival's decorated lane. Brutal is raw.
- **No black paper.** Inversion into a dark ground is Manifesto. Brutal is a **light 98%** sheet with black structure.
- **No second colour, no gradient, no pastel.** Exactly one red signal on near-neutral ink.
- **No serif, no italic display.** Albert Sans and JetBrains Mono only.

## How Brutal differs from its neighbours

| vs | what settles it instantly |
|---|---|
| **Carnival** (editorial maximalist sibling) | Carnival is **decorated**: duo-tone accents, ornaments, hard-offset layered shadows, variable-width type, tinted paper. Brutal is **raw**: near-white paper, one red, thick black borders, no ornament. Decorated vs raw. |
| **Manifesto** (loud editorial sibling) | Manifesto is **BLACK paper** with all-caps red condensed display, inverted polarity. Brutal is a **light 98% sheet** with black structure and a red cut. Light vs dark settles it in one glance. |
| **Riso** (print-craft editorial) | Riso is risograph craft: pink stock, misregistration, soft grainy ink. Brutal is hard-edged and crisp: no texture, no misregistration, heavy exact rules. |

## When the brief routes here

*brutalist · raw · bold · high-contrast · statement · agency · studio · portfolio · streetwear · drop · zine · type-forward · graphic-design · poster · festival · collective · no-nonsense · uncompromising*. Categories: design studios and agencies, streetwear or fashion drops, editorial and zines, type-forward portfolios, event or festival pages, statement landings. Tone: loud, blunt, confident, raw, rigid, unhedged.

Warm, soft, image-led, or intimate briefs route elsewhere (Carnival for decorated maximalism, Manifesto for the dark inversion, the quieter editorial themes for prose).

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink);
       font-family: var(--font-body); font-weight: 400; }

/* Display - uppercase Albert Sans 700, ultra-tight, edge-aligned */
h1, h2, .display { font-family: var(--font-display);
  font-weight: var(--display-weight); text-transform: uppercase;
  letter-spacing: var(--tracking-display); line-height: var(--lh-tight); }

/* Structure = thick square-cornered rules, never radius */
.block { border: var(--rule-fine) solid var(--color-rule); border-radius: 0; }
.rule  { border: 0; border-top: var(--rule-fine) solid var(--color-rule); }

/* One red signal - solid fill or bar, never gradient */
.bar, mark { background: var(--color-accent); color: var(--color-paper); }
.accent { color: var(--color-accent-ink); }
.btn { border: var(--rule-fine) solid var(--color-rule); border-radius: 0; }

/* Mono label voice - meta, captions, units, real values */
.label { font-family: var(--font-label); text-transform: uppercase;
  letter-spacing: var(--tracking-label); color: var(--color-muted); }

/* Inversion on hover - instant, no blur, no bounce */
.invert:hover { background: var(--color-ink); color: var(--color-paper); }

@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; animation: none !important; }
}
```

The rest of the page is yours. Brutal supplies the sheet, the rules, and the one red; what gets stacked between them is the brief's business, not the theme's.
