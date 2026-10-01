---
name: Hum
slug: hum
genre: playful
paper: light 97 95
display: rounded-sans Chillax
accent: chromatic-yellow 95
posture: full-palette
keywords: daily, habit, streak, practice, learning, curiosity, mood, energy, friendship, community, kids, family, game, puzzle, creative, character, mascot, playful, alive
material: cream pulled toward pear-yellow, three accents that never blend, one rounded sans, round corners everywhere, a press you can feel
signature: the pear-yellow pill with a solid colour edge that lifts on hover and presses down on click
pictured: Bento Grid, Ledge hero
---

# Hum

Cream pulled toward pear-yellow, three accents that never blend, Chillax for everything, round corners everywhere, and a press you can feel. The signature is the pear-yellow pill with a solid colour edge that lifts on hover and presses down on click.

## Tokens

```css
:root {
  --color-paper: oklch(97% 0.012 95); --color-paper-2: oklch(94% 0.016 95); --color-paper-3: oklch(91% 0.020 95);
  --color-ink: oklch(20% 0.012 250); --color-ink-2: oklch(28% 0.012 250); --color-muted: oklch(48% 0.012 250);
  --color-rule: oklch(88% 0.014 95);
  --color-accent: oklch(86% 0.18 95); --color-accent-deep: oklch(72% 0.16 95); --color-accent-ink: oklch(20% 0.012 250);
  --color-accent-2: oklch(54% 0.17 235); --color-accent-3: oklch(68% 0.24 18);
  --color-mint: oklch(80% 0.16 150); --color-lavender: oklch(74% 0.16 305); --color-focus: oklch(54% 0.17 235);
  --font-display: "Chillax", "Geist", ui-rounded, ui-sans-serif, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 20px; --radius-input: 12px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: 0 1px 2px oklch(20% 0.012 250 / 0.06), 0 10px 24px -12px oklch(20% 0.012 250 / 0.18);
  --tracking-display: -0.025em; --display-weight: 600;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); --ease-snap: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Faces

- **Display:** Chillax 600, `--tracking-display`, sentence case.
- **Body:** Chillax 400 with 500 for inline emphasis; no serif anywhere.
- **Labels, captions, table heads, meta, units, ordinals:** Chillax 500 one step smaller, sentence case, `--color-muted`. Mono appears only inside code.

## Material

- Round, everywhere: cards at 20px, inputs at 12px, controls as pills. Radius is a per-build lever (28px for kids, 14px for a quiet tool); no corner is ever square.
- The press: the primary control is a solid colour edge under a soft blurred cast, never a negative spread. Hover lifts 2px and grows the edge to 6px; active presses down 3px and shrinks it to 1px. The secondary is a 1px `--color-rule` pill with no edge.
- Each accent owns a surface: pear is the primary action, cyan (at L 54, so it reads as type on cream) is links and hover tints, coral is the single high-energy moment as a fill with ink on it. They never blend; mint and lavender at most once each per page.
- Emphasis in running text is a clipped background band with `box-decoration-break: clone` or weight 500; a head is one weight and one colour. One character mark per page, drawn in CSS or SVG, with a personality.

## Motion

Spring posture declared: gate 12 is waived on the primary CTA and on the one character moment only, both on `--ease-spring`; everything else eases out on `--ease-snap`. The press runs 140ms on hover, 70ms on active, no `scale()`. Cards lift 4px over 220ms. The character mark breathes at rest on a 4s period. Nothing else moves: no count-up, no staggered heads, no burst.

## Voice

Warm, smart, casual, direct. Sentence case, verbs over nouns, honest numbers only.

## Do-nots

- Never a serif, never pure white paper, never a square corner.
- Never a gradient between two accents and never a rainbow ground.
- Never a single restrained accent; three are on stage.
- Never a second character moment, never emoji or stock icons.
- Never the spring on anything but the two declared moments.

## Build hint

```html
<link href="https://api.fontshare.com/v2/css?f[]=chillax@400,500,600,700&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-weight: var(--display-weight); letter-spacing: var(--tracking-display); }
.btn { background: var(--color-accent); color: var(--color-accent-ink); font-weight: 600; border: 0; border-radius: var(--radius-pill);
  box-shadow: 0 4px 0 0 var(--color-accent-deep), 0 6px 12px -3px oklch(76% 0.20 95 / 0.45);
  transition: transform 140ms var(--ease-spring), box-shadow 140ms var(--ease-spring); }
.btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 0 var(--color-accent-deep), 0 12px 22px -4px oklch(76% 0.20 95 / 0.45); }
.btn:active { transform: translateY(3px); box-shadow: 0 1px 0 0 var(--color-accent-deep); transition-duration: 70ms; }
a { color: var(--color-accent-2); }
::selection { background: oklch(86% 0.18 95 / 0.6); color: var(--color-ink); }
```
