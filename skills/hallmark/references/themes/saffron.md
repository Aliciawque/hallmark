---
name: Saffron
slug: saffron
genre: editorial
paper: mid 71 75
display: high-contrast-serif Zodiak Italic
accent: chromatic-amber 70
posture: drenched
keywords: couture, atelier, fashion, collection, season, dye, textile, silk, wool, linen, garment, fitting, boutique, lookbook, designer, luxury, slow fashion, craft, stockists
material: saffron-dyed paper edge to edge, near-black ink, Zodiak Italic over Newsreader and a small Hanken Grotesk, flat cream stock, warm full-colour photographs, ink as the signal
photo: warm vib=12 con=6
pictured: Commission Book, Stage hero
---

# Saffron

An atelier's dye bath: the whole page a deep saffron, near-black ink, Zodiak Italic on every head, Newsreader for reading, a small Hanken Grotesk for labels and controls, flat cream stock on the dye, square edges. Photographs of cloth and hands at work sit square on the dye in warm full colour. It reads as couture because the colour is total and the type is unhurried. It is not a beige luxury template, not gold foil and not a photo grid under a serif logo.

## Tokens

```css
:root {
  --color-paper: oklch(71% 0.145 75); --color-paper-2: oklch(66% 0.135 72); --color-paper-3: oklch(61% 0.125 70);
  --color-ink: oklch(17% 0.012 70); --color-ink-2: oklch(23% 0.02 72); --color-muted: oklch(27% 0.04 72);
  --color-rule: oklch(40% 0.07 72); --color-plate: oklch(95.5% 0.03 84); --color-slot: var(--color-plate);
  --color-accent: oklch(61% 0.125 70); --color-accent-ink: oklch(17% 0.012 70); --color-focus: oklch(17% 0.012 70);
  --font-display: "Zodiak", Georgia, serif; --font-body: "Newsreader", Georgia, serif; --font-outlier: "Hanken Grotesk", system-ui, sans-serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.01em;
}
```

Three colourways, stated in the stamp (`saffron: lot`); `--color-plate` is the cream stock.

| Colourway | Ground, ink, stock |
| --- | --- |
| `lot` (default) | the block above |
| `cream` | ground `oklch(95.5% 0.03 84)`, the stock saffron `oklch(71% 0.145 75)`, rule `oklch(80% 0.05 80)`, muted `oklch(42% 0.03 72)` |
| `black` | ground `oklch(15% 0.012 70)`, heads saffron `oklch(74% 0.14 76)`, prose `oklch(92% 0.03 85)`, cream stock, rule `oklch(32% 0.04 72)` |

## Type

- **Display:** Zodiak Italic 400, `--tracking-display`, line-height 1.04. Declared italic system (stamp `waive 38ii`): every head at every level, true italic, `font-synthesis: none`. A figure (a count, an hour, a price) is the one roman use, Zodiak 700, never in a head; figures in a column take Newsreader's tabular ones.
- **Body:** Newsreader 400 and 500 at 17px, line-height 1.5, `"opsz" 16`.
- **Labels, nav links, buttons, captions, table heads:** Hanken Grotesk 500 at `--text-sm` (14px), sentence case, untracked, `--color-muted`. It carries only small strings and controls, never a head or prose; no mono but code.

## Surfaces

- 1px rules in `--color-rule` under heads and between table rows; no border on any surface.
- Zero radius, no shadow. Depth is a step of the dye: `--color-paper-2` for a well or band, `--color-paper-3` deeper.
- The cream stock (`--color-plate`) lies flat on the saffron, no border; on `cream` it turns saffron.
- Bands: `--color-paper-2`, the cream stock, or ink with saffron heads; two a page at most.
- Photographs: cloth and the hands that work it, close, in warm window light: silk across a cutting table, shears and chalk on wool, pins in a seam, a toile on a dress form, embroidery under a lamp, a finished piece on a wall; detail over the whole figure, never a face to camera, never a posed bride. Full colour, warmed (the `photo:` line) so the cloth holds against the dye. Square, borderless, no shadow, straight on the saffron or full-bleed. A caption beneath names the cloth or the stage; a line on a photograph rides a cream plate.
- Texture, the thread grid: 1px ink lines at 3.5% every 10px both ways, on a cream well or band only; never on a photograph or under running text.

## Controls

- The pair: an ink-filled square button with saffron text beside one outlined by a 1px inset ink line, both Hanken Grotesk 500, 14px, sentence case.
- Inline links take a 1px bottom border in the text colour; inputs are square on the cream stock with a 1px ink border.
- Drenched: the dye is the surface and ink the signal (the primary, the focus ring, the selection); `--color-accent`, the deepest dye step, marks hover and selected states.

## Motion

Almost none. A hairline may draw in once over `--dur-long` on `--ease-out`; a linked surface steps one shade of saffron on hover. Nothing loops.

## Voice

The atelier's register: the piece, the cloth and its weight, the colour, the hour of the fitting. Precise, unhurried, first person plural; no bridal cliche (dream, magical, special day).

## Do-nots

- Never a roman head; the italic is the system.
- Never a brown or terracotta button on the cream colourway; the pair is ink and outline.
- Never a border, a shadow or a radius on a surface; flat colour on flat colour.
- Never the sans at prose or head size; it exists at 14px.
- Never white or grey on the saffron, and never a photograph toned into the dye; cream is the light surface and a picture keeps its colour.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=zodiak@400i,700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Hanken+Grotesk:wght@500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-style: italic; font-weight: 400; font-synthesis: none; line-height: 1.04; }
.figure { font-family: var(--font-display); font-style: normal; font-weight: 700; }
.label { font: 500 var(--text-sm)/1.3 var(--font-outlier); color: var(--color-muted); }
.btn { padding: var(--space-md) var(--space-lg); border: 0; font: 500 var(--text-sm)/1 var(--font-outlier); background: var(--color-ink); color: var(--color-paper); }
.btn--secondary { background: transparent; color: var(--color-ink); box-shadow: inset 0 0 0 1px var(--color-ink); }
.well { background: var(--color-plate); color: var(--color-ink); }
.thread { background-image: repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-ink) 3.5%, transparent) 0 1px, transparent 1px 10px),
  repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-ink) 3.5%, transparent) 0 1px, transparent 1px 10px); }
::selection { background: var(--color-ink); color: var(--color-paper); }
```
