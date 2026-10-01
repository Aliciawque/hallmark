---
name: Arcade
slug: arcade
genre: playful
paper: dark 15 315
display: pixel Silkscreen and Bungee
accent: chromatic-ember 40
posture: full-palette
keywords: game, indie, studio, launch party, demo night, hackathon, festival, meetup, retro, pixel, arcade, nostalgia, synth, lo-fi, toy, zine, club night, loud
material: an aubergine CRT with a visible grille, marquee lettering, ember and acid chevron side art, a pixel HUD
signature: the lit marquee band with an RGB-split wordmark over a chevron side-art panel
pictured: Marquee Hero, Poster hero
---

# Arcade

An aubergine CRT ground carrying a grille, a scanline and a vignette, Bungee marquee lettering with an RGB split, Chivo for reading and Silkscreen only on the HUD. The signature is the lit marquee band over a chevron side-art panel drawn from one gradient in the two inks.

## Tokens

```css
:root {
  --color-paper: oklch(15% 0.035 315); --color-paper-2: oklch(19% 0.035 315); --color-paper-3: oklch(23% 0.035 315);
  --color-ink: oklch(95% 0.014 315); --color-ink-2: oklch(88% 0.016 315); --color-muted: oklch(70% 0.02 315);
  --color-rule: oklch(32% 0.04 315);
  --color-accent: oklch(66% 0.215 40); --color-accent-2: oklch(88% 0.195 115); --color-accent-ink: oklch(15% 0.035 315);
  --color-focus: oklch(88% 0.195 115);
  --font-display: "Bungee", "Impact", sans-serif; --font-body: "Chivo", ui-sans-serif, sans-serif; --font-outlier: "Silkscreen", monospace;
  --radius-card: 4px; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 6px 6px 0 var(--color-accent-2);
  --tracking-display: 0;
}
```

Two dials, each stated in the stamp (`arcade: ember/grille`).

| Dial | Options |
| --- | --- |
| **Colourway** (lead over answer, then ground) | `ember` (default): `oklch(66% 0.215 40)` over `oklch(88% 0.195 115)` on hue 315 · `sodium`: `oklch(80% 0.165 72)` over `oklch(60% 0.145 242)` on `oklch(14% 0.030 300)` · `oxblood`: `oklch(83% 0.150 90)` over `oklch(58% 0.200 25)` on `oklch(16% 0.028 330)` |
| **Screen** (layer 1 of the CRT stack) | `grille` (default): 1px vertical RGB stripes at very low alpha · `mask`: an offset triad dot lattice from three radial gradients on a 3px pitch |

## Faces

- **Marquee:** Bungee 400, uppercase, for strings under 24 characters: the wordmark, the marquee band, a section number, a whole headline line. Never one word inside a head, never a sentence.
- **Headings and body:** Chivo 400, 700, 900. Section heads at 900 with -0.02em; prose at 400, line-height 1.6.
- **HUD:** Silkscreen 400 and 700, untracked, alternating the two inks, for the score strip, the credits line and a rank chip: figures with their units, never a heading, a paragraph or a caption. Labels, captions and status are Chivo 500 one step smaller, sentence case.

## Material

- The CRT stack once, at page level, `aria-hidden`: the screen layer, a scanline `repeating-linear-gradient` (2px clear, 1px dark at low alpha), a corner vignette, and a tight phosphor bloom (`text-shadow` at 0.02 to 0.06em in the element's own ink) only on the Bungee marquee lettering and HUD text only. Budget in `texture.md` § Scanline. Never a bezel.
- The side art: stacked chevrons at 22 degrees from one `repeating-linear-gradient` in the two inks, clipped to a panel with `clip-path`. That is the whole object; never an image.
- The RGB split on marquee lettering: a 1 to 2px red offset and a matching cyan offset, zero blur. It replaces the flat drop shadow.
- `--rule-bar` rules and near-square radii; depth is a hard zero-blur offset shadow, never blur.
- The press surface: every interactive surface carries `Npx Npx 0` in the answer ink with a `--rule-bar` ink border; hover moves away from the shadow, active slams toward it.
- Objects: a marquee band, a side-art panel, an attract-screen table, a HUD strip, an instruction card (plain Chivo, a `--rule-bar` rule, no bloom). Two inks alternating, never a third.

## Motion

Press physics over 120ms ease-out, one attract prompt that blinks on a `steps(1)` beat for four beats, then holds lit (never an open-ended blink, never under reduced motion), the RGB split widening 1px on hover for interactive marquee lettering. The grille, scanline and vignette are static.

## Voice

Coin-op plain: the credit, the night, the machine, the buzzer.

## Do-nots

- Never Silkscreen on body copy or a heading.
- Never magenta-and-cyan as the pair and never a radial-gradient starfield; the screen is the texture.
- Never mix colourways or screens on one page; two dials, set once.
- Never a soft or blurred shadow, never a gradient on a button, never bloom on body copy.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Chivo:wght@400;700;900&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
```

```css
body::after { content: ""; position: fixed; inset: 0; z-index: 40; pointer-events: none;
  background-image:
    repeating-linear-gradient(to right, oklch(63% 0.24 25 / 0.05) 0 1px, oklch(80% 0.25 140 / 0.05) 1px 2px, oklch(60% 0.24 265 / 0.05) 2px 3px),
    repeating-linear-gradient(to bottom, transparent 0 2px, oklch(8% 0.02 315 / 0.16) 2px 3px),
    radial-gradient(120% 90% at 50% 50%, transparent 55%, oklch(8% 0.02 315 / 0.45) 100%); }
.marquee { font-family: var(--font-display); text-transform: uppercase; color: var(--color-ink);
  text-shadow: -1.5px 0 0 oklch(63% 0.24 25), 1.5px 0 0 oklch(78% 0.14 200), 0 0 0.05em var(--color-accent); }
.side-art { background: repeating-linear-gradient(22deg, var(--color-accent) 0 18px, var(--color-accent-2) 18px 36px); clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%); }
.hud { font-family: var(--font-outlier); font-size: 12px; font-variant-numeric: tabular-nums; color: var(--color-accent-2); }
.btn { background: var(--color-accent); color: var(--color-accent-ink); border: var(--rule-bar) solid var(--color-ink); border-radius: var(--radius-card);
  box-shadow: var(--shadow-card); transition: translate 120ms ease-out, box-shadow 120ms ease-out; }
.btn:active { translate: 3px 3px; box-shadow: 2px 2px 0 var(--color-accent-2); }
```
