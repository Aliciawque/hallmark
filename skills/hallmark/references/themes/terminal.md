---
name: Terminal
slug: terminal
genre: atmospheric
paper: dark 11 145
display: mono Martian Mono
accent: chromatic-green 138
posture: committed
keywords: cli, terminal, shell, command-line, tui, self-hosted, open-source, binary, ssh, sysadmin, devops, homelab, install script, package manager, repl, retro, phosphor, hacker
material: green-black ground, phosphor-green ink on one hue, every glyph Martian Mono with heads set wide and text set narrow, square hairline-ruled surfaces, the brightest green as the one signal
photo: duotone paper ink con=20
pictured: Component Playground, Settled hero
---

# Terminal

A terminal's material without its costume: a green-black ground, phosphor-green ink held to one hue, one monospace family for every glyph, square corners and hairline rules. Hierarchy comes from width and lightness, never from a second colour or a second face: heads run wide, text and sessions run narrow. It reads as a tool that respects the reader's time. It is not a retro CRT pastiche and not a dark product page holding a screenshot of a terminal; the page itself is the terminal surface.

## Tokens

```css
:root {
  --color-paper: oklch(11% 0.018 145); --color-paper-2: oklch(15% 0.020 145); --color-paper-3: oklch(19% 0.022 145);
  --color-ink: oklch(86% 0.160 138); --color-ink-2: oklch(78% 0.140 138); --color-muted: oklch(60% 0.090 140);
  --color-rule: oklch(28% 0.030 140);
  --color-accent: oklch(78% 0.190 138); --color-accent-ink: oklch(11% 0.018 145); --color-focus: oklch(78% 0.19 138);
  --font-display: "Martian Mono", ui-monospace, monospace; --font-body: var(--font-display);
  --font-outlier: var(--font-display);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: 0em; --display-weight: 500; --stretch-display: 112.5%; --stretch-body: 87.5%;
}
```

## Type

- **Every glyph is Martian Mono:** mono is the material here. No proportional face exists on the page, not even a friendlier body.
- **Display:** 500 at `--stretch-display`, `--tracking-display`, line-height 1.1, sentence case, roman. A wide mono line runs long, so `h1` caps at 4rem; section heads take the shared step.
- **Body, sessions and tables:** 400 at `--stretch-body`, 700 for emphasis; a long command line may close to 75%.
- **Labels, captions, table heads, meta, exit codes, units:** the body setting a step smaller, sentence case, untracked, in `--color-muted`.
- **Prompt glyphs:** a `$` or `~/` prefix in `--color-muted` marks a real command or path, and only those; a block caret only ever ends a command line.

## Surfaces

- One hue top to bottom: every surface, rule and photograph sits on hue 138 to 145, and hierarchy comes from the lightness ramp, never from a second colour.
- Depth by lightness: the three paper steps stack, and a raised surface is one step up with a 1px `--color-rule` border, never a floating window with a shadow. Radius 0 everywhere.
- Rules: 1px `--color-rule` on wells, tables and the foot of a nav; a divider may be typed in box-drawing characters as text. Never a title bar or traffic lights.
- Bands: `--color-paper-2` or `--color-paper-3`, two a page at most; never a light band and never an accent field.
- Photographs: one a page at most, as a wide band: the machines themselves, a laptop, a desktop, a small board computer, a shelf of servers, shot plainly, with no screen showing an interface and no person at the keys. The duotone prints it in the page's green; square, a 1px `--color-rule` border, its caption below in `--color-muted`.
- No texture: no scanline, no grain, no bloom, no vignette. The CRT is implied by hue and mono, never drawn.

## Controls

- An accent-filled block (`--color-accent-ink` on `--color-accent`) beside one bordered 1px in `--color-ink-2`, both square, mono 500, sentence case.
- Links are ink, underlined, and turn `--color-accent` on hover; inputs are square `--color-paper-2` wells with a 1px rule border and an accent caret.
- The brightest green sits on the primary control, the focus ring, a status value and one emphasised word in running text, never inside a heading.

## Motion

Stepped, never eased: a state change switches in `steps(1)` over `--dur-micro`, and nothing fades, slides or reveals. A caret, where a command line carries one, blinks five times in `step-end`, then holds solid.

## Voice

Commands, flags, paths and exit codes. Declarative, terse, specific: name the command, the flag, the code, never the adjective.

## Do-nots

- Never a second hue, in a photograph either: no warm bloom, no cyan, no amber.
- Never a proportional face, not even one paragraph.
- Never a rounded corner, a pill or a soft card.
- Never a light section; dark end to end.
- Never the CRT costume: no scanlines, no glow, no bezel, no title bar, no caret hung on a heading.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,400..700&display=swap" rel="stylesheet">
```

```css
body { font-stretch: var(--stretch-body); font-variant-numeric: tabular-nums; }
h1, h2, h3 { font-weight: var(--display-weight); font-stretch: var(--stretch-display); line-height: 1.1; }
h1 { font-size: min(var(--text-display), 4rem); }
.btn { border: var(--rule-hair) solid transparent; border-radius: var(--radius-card); padding: var(--space-sm) var(--space-md); font-weight: 500; transition: background-color var(--dur-micro) steps(1); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); }
.btn--secondary { border-color: var(--color-ink-2); color: var(--color-ink); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); }
.well--raised { background: var(--color-paper-3); }
.photo { border: var(--rule-hair) solid var(--color-rule); }
a:hover { color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 35%, transparent); color: var(--color-ink); }
```
