---
name: Ultraviolet
slug: ultraviolet
genre: modern-minimal
paper: light 95 300
display: geometric-sans Outfit
accent: cool 290
posture: committed
keywords: music, audio, stems, remix, dj, producer, player, streaming, tempo, playlist, creator, app, consumer, lowercase, violet, sound, beats, recording studio
material: lavender paper, violet-black ink, Outfit set lowercase over Onest, hairline pills, photographs pulled into the one saturated violet
photo: tint accent con=10
pictured: Workbench, Settled hero, in the night colourway
---

# Ultraviolet

A producer's tool in one pigment: lavender paper tinted the same hue as the ink, one saturated violet, Outfit set lowercase on every head and control, pills throughout, depth held to a hairline, and photographs pulled into the violet. It reads quick, exact and young without raising its voice. It is not a purple-gradient startup page and not a neon club flyer.

## Tokens

```css
:root {
  --color-paper: oklch(95% 0.02 300); --color-paper-2: oklch(92% 0.03 300); --color-paper-3: oklch(89% 0.035 300);
  --color-ink: oklch(18% 0.02 300); --color-ink-2: oklch(28% 0.03 300); --color-muted: oklch(46% 0.05 300);
  --color-rule: oklch(84% 0.04 300);
  --color-accent: oklch(50% 0.25 290); --color-accent-ink: oklch(97% 0.01 300); --color-focus: oklch(50% 0.25 290);
  --font-display: "Outfit", ui-sans-serif, system-ui, sans-serif; --font-body: "Onest", ui-sans-serif, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 16px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(18% 0.02 300 / 0.06);
  --tracking-display: -0.025em;
}
```

Three colourways, set once per page and stated in the stamp (`ultraviolet: lavender`). A nocturnal brief takes `night`.

| Colourway | Paper, ink, accent |
| --- | --- |
| `lavender` (default) | the block above |
| `record` | ground `oklch(50% 0.25 290)`, ink `oklch(95% 0.02 300)`, the accent turns white `oklch(99% 0.005 300)` with violet text on it, rule `oklch(62% 0.2 290)` |
| `night` | ground `oklch(14% 0.02 290)`, paper-2 `oklch(17.5% 0.025 290)`, paper-3 `oklch(21% 0.03 290)`, ink `oklch(92% 0.04 300)`, ink-2 `oklch(80% 0.05 300)`, muted `oklch(68% 0.06 300)`, rule `oklch(28% 0.04 290)`, accent `oklch(55% 0.25 290)`, focus `oklch(62% 0.22 290)` |

## Type

- **Display:** Outfit 500, lowercase, `--tracking-display`, line-height 1. Lowercase is the material: heads, nav links, buttons and pills never carry a capital.
- **Body:** Onest 400 and 500, sentence case, line-height 1.5. Prose is the one place a capital appears.
- **Labels, captions, table heads:** Outfit 500 a step smaller, lowercase, untracked, in `--color-muted`; figures in Outfit with `tabular-nums`. Mono only inside code.

## Surfaces

- Hairlines: 1px `--color-rule` between list rows and under a nav; pills and outlined controls carry 1.5px. No borders on cards; a surface is a step to `--color-paper-2`.
- Radius: `--radius-pill` on every control and tag, 16px on surfaces, screens and photographs; nothing square.
- Depth: none on paper, the whisper `--shadow-card` under a raised surface. No blur, no glow, no gradient.
- Bands: a `--color-paper-2` band, an `--color-ink` band with lavender text, or one violet field in the `record` colours; two bands a page at most.
- The product sits plain on `--color-paper-2` or bleeds off its edge, never in a drawn phone bezel; a waveform is real line work, its played part in the violet.
- Photographs: the night around the music: hands on a mixer, decks in a booth, a crowd lit from the stage seen from behind, a desk of monitors after midnight. The tint turns the light violet. 16px radius, a 1px inset ring of ink at 8%, no border, no shadow; captions beside in the label style; type over a photograph only on an ink scrim at 50 to 65%. Faces never lead.
- No texture, no mesh, no grain.

## Controls

- A violet-filled pill (`--color-accent-ink` on `--color-accent`) beside an inset-outlined one (1.5px of `--color-ink`), both Outfit 500 lowercase; inside a violet field the filled pill turns `--color-accent-ink` with violet text.
- Links underline in violet on hover; inputs are pills with a 1.5px `--color-rule` inset ring that turns ink on focus.
- The violet is one pigment: one filled control, the focus ring, a link's hover, a progress fill, a played waveform, one figure. Everything else is ink and lavender.

## Motion

Quick and dry: `--dur-micro` colour transitions on pills over `--ease-out`, a figure or a lane that updates live as a control moves, and at most one settle on load over `--dur-long` from an already-visible default. Nothing spins or loops.

## Voice

Lowercase, short, exact: the stem, the bar count, the key, the minute, the price. It talks like a producer, not a label.

## Do-nots

- Never a capital in a head, a nav link or a button; a mixed-case head breaks the theme faster than a wrong colour.
- Never a second chromatic colour, in a photograph either; the violet is the only one.
- Never a purple-to-pink gradient, a mesh behind text or a glow.
- Never square controls or 4px radii; Ultraviolet is round.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500&family=Onest:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: 500; line-height: 1; text-transform: lowercase; }
.btn, .pill { display: inline-flex; align-items: center; gap: var(--space-xs); border-radius: var(--radius-pill); font: 500 var(--text-sm)/1 var(--font-display); text-transform: lowercase; transition: background-color var(--dur-micro) var(--ease-out); }
.btn { padding: var(--space-md) var(--space-lg); } .pill { padding: var(--space-xs) var(--space-md); box-shadow: inset 0 0 0 1.5px var(--color-rule); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { box-shadow: inset 0 0 0 1.5px currentColor; color: inherit; }
.well { background: var(--color-paper-2); border-radius: var(--radius-card); }
.photo { border-radius: var(--radius-card); outline: 1px solid color-mix(in oklab, var(--color-ink) 8%, transparent); outline-offset: -1px; }
.band--violet { background: var(--color-accent); color: var(--color-accent-ink); }
.band--violet .btn--primary { background: var(--color-accent-ink); color: var(--color-accent); }
a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
