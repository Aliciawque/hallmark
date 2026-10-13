---
name: Riso
slug: riso
genre: editorial
paper: light 97.5 95
display: grotesk-heavy Cabinet Grotesk
accent: chromatic-pink 356
posture: committed
keywords: risograph, riso, print studio, print fair, zine, small press, poster, art book, spot colour, two colour, indie press, diy, handmade, prints, open studio
material: bright uncoated stock and no black, a blue drum for every word, a fluorescent pink drum for the fills, purple where they cross, Cabinet Grotesk 800 over Literata, grain, a hair out of register
photo: duotone ink paper-3
pictured: Print Run, Stage hero
---

# Riso

A small-press run from two drums and nothing else: bright uncoated stock, a blue drum that sets every word and a fluorescent pink drum for the fills, crossing in a purple nobody mixed. Cabinet Grotesk 800 heads over a Literata body, grain where the ink skips, one word a hair out of register. It reads handmade because the imperfection is in the ink, not in tape and scribbles. It is not clean vector flatness, not a neon zine, and never black.

## Tokens

```css
:root {
  --color-paper: oklch(97.5% 0.007 95); --color-paper-2: oklch(93.5% 0.032 356); --color-paper-3: oklch(82% 0.12 356);
  --color-ink: oklch(37% 0.15 266); --color-ink-2: oklch(43% 0.14 266); --color-muted: oklch(50% 0.11 266);
  --color-rule: oklch(86% 0.04 266);
  --color-accent: oklch(67% 0.23 356); --color-accent-ink: oklch(27% 0.13 266); --color-focus: oklch(45% 0.19 266);
  --font-display: "Cabinet Grotesk", ui-sans-serif, sans-serif; --font-body: "Literata", ui-serif, Georgia, serif;
  --radius-card: 2px; --radius-pill: 2px; --rule-hair: 1px;
  --shadow-card: none; --texture-opacity: 0.08;
  --tracking-display: -0.015em; --display-weight: 800;
}
```

## Type

- **Display:** Cabinet Grotesk 800, `--tracking-display`, line-height 0.95, sentence case, in the blue. A head is one weight and one colour.
- **The misregistered word** (stamp `waive 38iii`): one focal word in the hero head prints in both drums, a pink copy behind the blue nudged 1 to 3px down and right, so only its fringe shows (`texture.md` § Misregistration). Once a page.
- **Body and lede:** Literata 400, opsz following size, in the blue; the poster head against the reading serif is load-bearing.
- **Captions, table heads, meta:** Literata 500 a step smaller, sentence case, `--color-muted`. No mono: figures that compare take Literata's tabular numerals.

## Surfaces

- No black: every word, rule and icon prints in the blue drum, every fill in the pink; where pink overprints blue (`mix-blend-mode: multiply`) the purple shows, and nobody paints it.
- Hairlines in `--color-rule`, 2px radius, zero shadow; depth comes from overprint, never a lift.
- Bands are screens of the pink drum: `--color-paper-2` under any text, `--color-paper-3` (half strength) under the blue only, or one solid pink field with `--color-accent-ink` type. Two a page.
- Photographs: the work and the room at arm's length in even light (sheets on a drying rack, a drum and its ink, a ream knocked square, hands collating a run), cropped close. Each prints in both drums, blue shadows into half-screen pink (the `photo:` duotone), so it reads as a riso pull; 2px radius, no border, grain over it. Captions sit beneath in Literata, never on the picture.
- Grain, declared: paper specks where the ink skips (`texture.md` § Grain, light specks) on pink fills, bands and photographs at `--texture-opacity`, up to 0.15 where no text sits, never under running text; grain and misregistration are one drum's family.

## Controls

- The pair: a pink-filled rectangle with `--color-accent-ink` type beside one outlined 1.5px in the blue, both at 2px radius in Cabinet Grotesk 800 at 15px.
- Links underline in pink, thicker on hover; inputs 48px tall at 2px radius with a 1.5px blue border on the stock.
- Pink sits on the primary, link underlines and one fill a screen; the focus ring is blue.

## Motion

One reveal: the pink drum settles into its offset once on load over `--dur-long` on `--ease-out`, and never loops. Nothing else moves.

## Voice

Specific, hand-set, a little literary: name the ink, the sheet, the drum and the price; verbs and counts over adjectives. Imperfect on purpose, never sold as flawless.

## Do-nots

- Never black ink or a grey; the only third colour is the purple the drums make.
- Never a registered, ungrained flat fill; that is vector, not riso.
- Never a glow, neon or gradient; colour comes from overprint.
- Never pink as type on the stock; the pink drum fills, the blue one writes.
- Never the misregistration on a second head; one word, then rest.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); } h1, h2 { line-height: 0.95; }
.misreg { position: relative; display: inline-block; isolation: isolate; }
.misreg::after { content: attr(data-text); position: absolute; inset: 0; z-index: -1; white-space: nowrap; pointer-events: none; color: var(--color-accent); transform: translate(2px, 2px); }
a { text-decoration-color: var(--color-accent); text-decoration-thickness: 2px; } a:hover { text-decoration-thickness: 4px; }
.btn { display: inline-flex; align-items: center; min-height: 48px; padding: 0 var(--space-lg); border: 1.5px solid transparent; border-radius: var(--radius-card); font: var(--display-weight) 0.9375rem/1 var(--font-display); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border-color: var(--color-ink); color: var(--color-ink); }
.band { background: var(--color-paper-2); }
.grained { position: relative; isolation: isolate; }
.grained::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: var(--texture-opacity); background-size: 200px 200px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 9 -4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E"); }
::selection { background: color-mix(in oklab, var(--color-accent) 35%, transparent); color: var(--color-ink); }
```
