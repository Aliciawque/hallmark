---
name: Saffron
slug: saffron
genre: editorial
paper: mid 76 70
display: high-contrast-serif Cormorant Italic
accent: chromatic-pink 2
posture: drenched
keywords: couture, atelier, fashion, collection, season, dye, textile, silk, wool, linen, garment, fitting, boutique, lookbook, designer, luxury, slow fashion, craft, stockists, bridal, sari, lehenga
material: two dyes and an ink: saffron edge to edge, rani pink for the cloth and the mark, madder black for type and the night band; Cormorant Italic set huge with a cut-out length of silk woven through it; Newsreader to read, a small Hanken Grotesk for controls; square edges, flat cream sheets
photo: warm sat=8 con=4
pictured: Dye Lot, Woven hero
---

# Saffron

A dye house, not a beige boutique: the page is saffron to every edge, the type is madder black, and the one cut-out object, a length of silk in rani pink, runs through the head, passing in front of one word and behind the next. Cormorant Italic is set huge and unhurried. Below the fold the cloth gives way to photographs on flat cream sheets, and one night band in madder carries a second silk in gold. It reads as couture because the colour is total, the type is enormous and the object is real cloth. It is not a gold-foil luxury template, not a photo grid under a serif logo, and not pastel.

## Tokens

```css
:root {
  --color-paper: oklch(76% 0.152 70); --color-paper-2: oklch(71% 0.15 66); --color-paper-3: oklch(66% 0.145 62);
  --color-ink: oklch(21% 0.055 14); --color-ink-2: oklch(28% 0.07 14); --color-muted: oklch(30% 0.06 30);
  --color-rule: color-mix(in oklab, var(--color-ink) 28%, transparent);
  --color-plate: oklch(96% 0.025 85); --color-slot: var(--color-plate);
  --color-rani: oklch(50% 0.21 2); --color-madder: oklch(23% 0.075 12); --color-zari: oklch(80% 0.15 78);
  --color-accent: var(--color-rani); --color-accent-ink: oklch(97% 0.02 85); --color-focus: var(--color-ink);
  --font-display: "Cormorant", Georgia, serif; --font-body: "Newsreader", Georgia, serif; --font-outlier: "Hanken Grotesk", system-ui, sans-serif;
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --shadow-cloth: drop-shadow(0 28px 28px oklch(30% 0.1 40 / 0.28));
  --tracking-display: -0.02em; --display-weight: 500;
}
```

Colourways, stated in the stamp (`saffron: lot`): `lot` (above); `madder`, the night band as the ground (saffron heads, cream prose, a gold silk); `cream`, ground `--color-plate` with saffron as the band and rani as the cloth.

## Type

- **Display:** Cormorant Italic 500, `--tracking-display`, every head at every level, true italic, `font-synthesis: none` (stamp `waive 38ii`). The hero head runs at 15vw in two or three words, line-height 0.8, one word left and the next pushed right so the cloth can pass between them. Section heads at `--text-section`, line-height 1.
- **Body:** Newsreader 400 at 18px, line-height 1.55. Leads in `--color-ink-2`.
- **Controls, captions, the nav, labels:** Hanken Grotesk 500 at 14px, sentence case, untracked. Never a head, never prose.
- **Numerals in a list:** Cormorant Italic lowercase roman (i, ii, iii) in rani, never a big figure.

## Surfaces

- Flat colour on flat colour: no radius, no shadow on a surface, no border. Depth is a step of the dye (`--color-paper-2`) or a cream sheet (`--color-plate`) laid edge to edge.
- Bands: one cream sheet and one madder night band a page, no more.
- **The cut-out cloth (the signature):** one length of silk, dupatta or ribbon, cut out cleanly with no background, wider than the screen, in rani on the saffron (gold with a zari border on madder). It carries `--shadow-cloth` and is placed twice: a back copy under the head and a front copy over it, the front masked so the cloth falls in front of one word and behind the next. Generated (then cut out) or photographed, it must read as real cloth; no drawn ribbon, no gradient swoosh. Two a page at most. With no way to make one, the head stands alone at full size and the first photograph of cloth comes straight after the fold.
- **Photographs:** cloth and the work close, in warm light: embroidery, folded silks, thread drying, shears and chalk on the cutting table; detail over the whole figure, never a face to camera. Square, borderless, straight on the saffron or the cream. Captions beneath in Hanken 14px name the cloth or the stage.

## Controls

- The pair: a madder-filled square button with saffron text, beside one outlined by a 1px inset madder line; both turn rani on hover. On the madder band the primary turns saffron with madder text.
- Inputs: square, 1px madder border on the cream sheet, focus a 2px rani ring. Choice chips are joined square toggles, the selected one filled madder.
- Links in prose: a 1px underline in the text colour. Nav links draw their underline in from the left on hover.

## Motion

The cloth arrives once: it unfurls left to right through a soft mask over 1.8s on a long ease-out while the head settles upward; the night band's silk unfurls when it enters the view. On scroll the hero cloth drifts a little (translate and a fraction of a degree), never loops. Hover changes colour in 220ms. Reduced motion shows everything in place.

## Voice

The atelier's: the piece, the cloth, the fitting, the day. Short, unhurried, first person plural. No bridal cliche (dream, magical, special day, timeless).

## Do-nots

- Never a roman head; the italic is the system.
- Never white or grey on the saffron; cream is the light surface.
- Never more than two cut-out cloths, and never a drawn ribbon or a gradient in its place.
- Never a radius, a shadow on a surface, or a border around a photograph.
- Never the sans at prose or head size.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@1,500;1,600&family=Newsreader:opsz,wght@6..72,400;6..72,500&family=Hanken+Grotesk:wght@500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-style: italic; font-weight: 500; font-synthesis: none; }
.hero { position: relative; isolation: isolate; overflow: clip; }
.hero__cloth { position: absolute; z-index: 1; left: -4vw; width: 92vw; pointer-events: none; filter: var(--shadow-cloth); }
.hero__title { position: relative; z-index: 2; display: grid; font-size: 15vw; line-height: 0.8; }
.hero__cloth--front { z-index: 3; filter: none; }
.hero__cloth--front img { mask: linear-gradient(90deg, var(--color-ink) 0 33%, transparent 39% 84%, var(--color-ink) 88%); }
.btn { min-height: 48px; padding: 0 var(--space-lg); border: 0; font: 500 var(--text-sm)/1 var(--font-outlier); background: var(--color-ink); color: var(--color-paper); }
.btn:hover { background: var(--color-rani); color: var(--color-accent-ink); }
::selection { background: var(--color-rani); color: var(--color-accent-ink); }
```
