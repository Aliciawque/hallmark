---
name: Arcade
slug: arcade
genre: playful
paper: dark 15 315
display: pixel Silkscreen and Bungee
accent: chromatic-ember 40
posture: full-palette
keywords: game, indie, game studio, launch party, demo night, hackathon, festival, meetup, retro, pixel, arcade, nostalgia, synth, lo-fi, toy, zine, club night, loud
material: aubergine CRT ground, lilac-white ink, Bungee capitals split in RGB over Chivo, Silkscreen figures, hard offset shadows, ember and acid signals
photo: tint accent
pictured: Manifesto, Settled hero
---

# Arcade

A late-night cabinet: an aubergine ground, a CRT screen on its bands, Bungee capitals split in RGB over Chivo, Silkscreen figures, hard offset shadows, two loud inks. Photographs come through the screen, tinted in the lead so the room glows like a cabinet. It is loud through colour, lettering, light and press physics, never drawn props; not a neon synthwave poster, not a pixel-art game page.

## Tokens

```css
:root {
  --color-paper: oklch(15% 0.035 315); --color-paper-2: oklch(19% 0.035 315); --color-paper-3: oklch(23% 0.035 315);
  --color-ink: oklch(95% 0.014 315); --color-ink-2: oklch(88% 0.016 315); --color-muted: oklch(70% 0.02 315);
  --color-rule: oklch(32% 0.04 315);
  --color-accent: oklch(66% 0.215 40); --color-accent-2: oklch(88% 0.195 115); --color-accent-ink: oklch(15% 0.035 315);
  --color-focus: oklch(88% 0.195 115);
  --color-crt-r: oklch(63% 0.24 25); --color-crt-g: oklch(80% 0.25 140); --color-crt-b: oklch(60% 0.24 265); --color-crt-c: oklch(78% 0.14 200); --color-shade: oklch(8% 0.02 315);
  --font-display: "Bungee", "Impact", sans-serif; --font-body: "Chivo", ui-sans-serif, sans-serif; --font-outlier: "Silkscreen", monospace;
  --radius-card: 4px; --radius-pill: 0; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: 6px 6px 0 var(--color-accent-2);
  --tracking-display: 0;
}
```

Two dials, each stated in the stamp (`arcade: ember/grille`).

| Dial | Options |
| --- | --- |
| **Colourway**: lead over answer on ground, OKLCH | `ember` (default), the block above · `sodium`: 80% 0.165 72 over 60% 0.145 242 on 14% 0.030 300 · `oxblood`: 83% 0.150 90 over 58% 0.200 25 on 16% 0.028 330 |
| **Screen**: the CRT's first layer | `grille` (default): 1px vertical RGB stripes at low alpha · `mask`: a triad dot lattice of three radial gradients on a 3px pitch |

## Type

- **Display:** Bungee 400, uppercase, untracked, line-height 1.02, for the h1, a big figure and the wordmark, each under 24 characters, never a sentence. It carries the RGB split: 1 to 2px of `--color-crt-r` one way and `--color-crt-c` the other, zero blur.
- **Heads and body:** Chivo; section heads and item titles 900 at -0.01em, sentence case; prose 400 at line-height 1.6.
- **Figures:** Silkscreen 400 and 700, untracked, tabular, in the two inks, for figures with their units only.
- **Labels and captions:** Chivo 700 a step smaller, sentence case.

## Surfaces

- `--rule-bar` borders on wells and anything pressable, `--rule-hair` in `--color-rule` between rows; 4px radius, square tags.
- Depth: the zero-blur acid offset (`--shadow-card`) on anything pressable, a ground step on a well. Never blur.
- Bands: a `--color-paper-2` band, or one ember field with `--color-accent-ink` type. Two a page at most.
- Photographs: the night from inside the room: players from behind lit by their screens, cabinets in a dark row, hands on a stick or a pad; the screens the brightest thing, nobody facing the lens. Tinted in the lead, 4px radius, a `--rule-bar` border, under the CRT layer; no type on a picture but a Silkscreen figure on a ground tag at a corner.
- The CRT screen (`texture.md` § 4): the Screen dial's layer and a `--color-shade` scanline, static, on bands, wells and photographs; never under running text, never a bezel.

## Controls

- The press surface: an ember fill, Chivo 700, a `--rule-bar` ink border and the acid offset, beside the same surface unfilled. Hover moves away from the shadow, active slams toward it.
- Links in ink with an acid underline; inputs 48px, square, a `--rule-bar` border in `--color-muted`.
- Ember leads and acid answers across controls and figures; never a third ink.

## Motion

Press physics on `--dur-micro` and `--ease-out`. One line may blink on a `steps(1)` beat four times, then hold lit. The RGB split may widen 1px on a display line that links.

## Voice

Coin-op plain, said over the noise: the night, the hour, the door price, the machines. Short lines, verbs first, no nostalgia.

## Do-nots

- Never magenta and cyan as the pair, never a starfield; the screen is the texture.
- Never mix colourways or screens on one page.
- Never a soft shadow, a phosphor glow or a gradient on a button.
- Never a drawn sprite, joystick, controller or pixel character; the night is photographed.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Chivo:wght@400;700;900&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
```

```css
h1, .display { font-family: var(--font-display); font-weight: 400; line-height: 1.02; text-transform: uppercase; text-shadow: -1.5px 0 0 var(--color-crt-r), 1.5px 0 0 var(--color-crt-c); }
h2, h3 { font-family: var(--font-body); font-weight: 900; letter-spacing: -0.01em; }
.figure { font-family: var(--font-outlier); color: var(--color-accent-2); }
.btn { background: var(--color-accent); color: var(--color-accent-ink); border: var(--rule-bar) solid var(--color-ink); border-radius: var(--radius-card); padding: var(--space-sm) var(--space-lg); font-weight: 700;
  box-shadow: var(--shadow-card); transition: translate var(--dur-micro) var(--ease-out), box-shadow var(--dur-micro) var(--ease-out); }
.btn:active { translate: 3px 3px; box-shadow: 2px 2px 0 var(--color-accent-2); }
.btn--secondary { background: transparent; color: var(--color-ink); }
.well, .photo { background: var(--color-paper-2); border: var(--rule-bar) solid var(--color-rule); border-radius: var(--radius-card); }
.crt { position: relative; isolation: isolate; }
.crt::after { content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image:
    repeating-linear-gradient(to right, color-mix(in oklab, var(--color-crt-r) 5%, transparent) 0 1px, color-mix(in oklab, var(--color-crt-g) 5%, transparent) 1px 2px, color-mix(in oklab, var(--color-crt-b) 5%, transparent) 2px 3px),
    repeating-linear-gradient(to bottom, transparent 0 2px, color-mix(in oklab, var(--color-shade) 16%, transparent) 2px 3px); }
```
