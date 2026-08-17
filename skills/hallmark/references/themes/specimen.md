# Theme - Specimen

The canonical Hallmark editorial voice and the catalog's silent default: the type-specimen school, where one high-contrast serif set enormous and thin *is* the page. Warm oat paper, a single signal-orange mark, ruler-drawn hairlines, Bodoni Moda shown at specimen scale. It reads like a well-set printed page: quiet, warm, exact.

The material, in one line: **oat paper, one thin serif at scale, hairlines, and a single orange mark.**

## Axes (diversification)

- **Paper band** - warm oat (`oklch(96% 0.018 80)`, hue 80). A cream near-white with real yellow warmth, distinct from Almanac's cool blue-grey oat and Atelier's near-neutral taupe.
- **Display style** - **high-contrast serif** (Bodoni Moda, its lightest cut). `--display-weight: 400` (the family floor), `--display-optical: 96` (the top of the optical-size axis, where the hairlines thin furthest against the stems). A Didone: elegant and razor-thin, never the bold crown of Atelier or the slab of Newsprint.
- **Accent hue** - **signal orange** (`#FC4C02`, hue ~33). One warm spark, with `--color-accent-ink: oklch(55% 0.21 32)` for legible orange text on oat. A signal, never a flood.

## Reference register

Klim and Commercial Type foundry specimens · Pentagram · Aesop · Cereal · Kinfolk · It's Nice That · Readymag editorial · Frere-Jones.

The material to match: the printed type specimen and the considered editorial page - one serif shown at scale, hairline structure, mono folios, generous paper, a single ink colour. Ask "does this read like a printed specimen, or a marketing template?" Keep the former. **Never name any of these in the output.**

**Voice range:** editorial, hand-set, lightly literary. Verbs over adjectives; name the thing concretely, name the number.

## Palette

- `--color-paper: oklch(96% 0.018 80)` - warm oat, never `#fff`
- `--color-ink: oklch(18% 0.014 60)` - warm near-black, never `#000`
- `--color-ink-2: oklch(26% 0.014 60)` - body, a notch up
- `--color-muted` - meta and folios
- `--color-accent: #FC4C02` - signal orange, the one spark
- `--color-accent-ink: oklch(55% 0.21 32)` - orange that stays legible as text on oat
- `--color-rule` at `--rule-card: 1px`, `--rule-hair: 0.5px`

Everything is tinted warm (hue 60-80). Orange stays under 5% of any viewport: a link underline, one control, the drop cap, the focus ring, a single italic emphasis. It never fills a band or a surface, and there is no second accent.

## Typography

- **Display** - Bodoni Moda at `--display-weight: 400`, `font-variation-settings: "opsz" 96`, `--text-display: clamp(3rem, 5.5vw + 1rem, 5.75rem)`, `--tracking-display: -0.025em`, `--lh-tight: 1.02`. One word or a short phrase set enormous and light: at the top of the optical axis the hairlines go razor-fine against the stems, and that contrast *is* the graphic. Do not drop the optical size; a low `opsz` fattens the hairlines and the specimen effect dies with them.
- **Body** - Geist at `--measure: 62ch`, `--lh-normal: 1.45`. The sans-under-serif contrast is the specimen tension.
- **Serif emphasis** - Bodoni Moda italic for pulled lines and single-word emphasis only, never the display face.
- **Label** - Geist Mono, UPPERCASE, `--tracking-label: 0.12em`, `--text-xs`, `--color-muted`. The machine-readout counterpoint that keeps the warm serif from going soft: meta rows, folios, figure captions, table headers, units.

## Material

- **Hairlines, square corners, no shadow.** `--rule-card: 1px`, `--radius-card: 0`, `--shadow-card: none`, `--rule-hair: 0.5px`. Structure is drawn with rules, columns, and double rules, never boxed surfaces or blur.
- **Editorial ornament, no depth.** A fleuron or an orange Bodoni Moda drop cap is welcome; a shadow is not. Where the page ornaments itself, the ornament demonstrates the face it is set in.
- **Generous paper.** `--page-max: 76rem`. Whitespace and the size of the type do the work.

## Motion

**Motion character: calm (1.0×).** Quiet and composed. One orchestrated entrance: reveals fade and rise (`--ease-out`, ~600ms). Optionally one weight or optical ladder that settles once, then holds static. Hover: an orange underline-grow on links, a 1px rule shift toward accent on focusable surfaces. No bounce, no parallax, no autoplay. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static and fully visible.

## Do-nots (this theme's own failure modes)

- **Never a heavy or black display.** Bodoni Moda stays at 400. A bold serif crown is Atelier's move; a heavy hero reads as a different theme.
- **Never cool paper.** Cool blue-grey oat is Almanac's, warm pink cream is Newsprint's. Specimen is oat.
- **Never a second accent.** One signal orange only: no teal, no blue, no companion hue.
- **Never an orange flood.** The accent is a spark on a mark, never a fill behind type or a full band.
- **Never rounded corners, pills, or shadows.** Square, hairline, flat.
- **Never background texture, mesh, or gradient.** Oat paper plus hairlines plus one orange mark carry it.

## How Specimen differs from its neighbours

| vs | difference |
|---|---|
| **Atelier** | Sentient at weight **700** (bold, soft-contrast, no hairlines), near-neutral plaster paper, umber accent (`oklch(22% 0.060 40)`). Specimen is Bodoni Moda at **400** (a Didone's thick/thin extreme), warmer oat, signal orange. High-contrast-plus-orange vs soft-bold-plus-umber. |
| **Newsprint** | Pinker cream paper (`oklch(92% 0.045 50)`), a **serif body** (Spectral), a **slab** display (Zilla Slab 700), brick accent, broadsheet columns. Specimen has a **sans body** (Geist), a Didone display, oat not pink, orange not brick. |
| **Almanac** | **Cool** blue-grey paper (hue 245), a **sans display** (Hanken Grotesk), blue accent, dense small type. Specimen is warm, serif-display, orange. Warm-serif vs cool-sans. |

## When the brief routes here

*type specimen · typography · foundry · letterform · portfolio · editorial · magazine · essay · manifesto · studio · agency · brand story · print · publication · considered · craft · design-led*. Categories: type foundries, design portfolios, editorial and magazine sites, agency sites, personal sites, brand stories, indie publications. Tone: literary, hand-set, warm, considered, high-craft, quiet-confident.

When the brief names no specialised aesthetic ("a landing page for X"), it lands here. Cool or technical routes to Almanac or Cobalt, loud-maximalist to Carnival, heavy-dramatic serif to Atelier.

## Build hint

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-body); font-weight: 400; }

/* Specimen-scale display - Bodoni Moda, lightest cut, max optical size */
.display { font-family: var(--font-display); font-weight: var(--display-weight); /* 400 */
           font-variation-settings: "opsz" var(--display-optical);                /* 96 */
           font-size: var(--text-display); letter-spacing: var(--tracking-display);
           line-height: var(--lh-tight); }

/* Mono label - the machine-readout counterpoint (meta, folios, captions) */
.label { font-family: var(--font-mono); text-transform: uppercase;
         letter-spacing: var(--tracking-label); font-size: var(--text-xs);
         color: var(--color-muted); }

/* Hairline structure, square corners, no shadow */
.rule { border-top: var(--rule-fine) solid var(--color-rule); }
.card { border: var(--rule-card) solid var(--color-rule);
        border-radius: var(--radius-card); box-shadow: var(--shadow-card); }

/* The one signal - orange, used sparingly; the drop cap spends it well */
a { text-decoration-color: var(--color-accent); }
.dropcap::first-letter { color: var(--color-accent); font-family: var(--font-display); }
:focus-visible { outline: 2px solid var(--color-focus); }

.reveal { opacity: 0; transform: translateY(10px);
          transition: opacity .6s var(--ease-out), transform .6s var(--ease-out); }
.reveal.is-in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

Plus one `IntersectionObserver` adding `.is-in`. Specimen supplies the oat, the one serif, the hairline vocabulary, and the single orange mark; what is set in that face is the brief's business.
