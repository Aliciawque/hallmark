---
name: Terminal
slug: terminal
genre: atmospheric
paper: dark 12 150
display: mono Martian Mono
accent: chromatic-green 142
posture: committed
keywords: cli, terminal, shell, command-line, tui, self-hosted, open-source, binary, ssh, sysadmin, devops, homelab, install script, package manager, repl, dotfiles, developer tool, phosphor
material: a near-black ground with a green cast, pale phosphor ink and one bright phosphor signal, every glyph Martian Mono with heads wide and text narrow, and pictures printed in the page's own glyphs: a photograph rendered as a grid of characters taken from the product's own text, dim cells small, bright cells full, stirred by the cursor
photo: duotone paper accent con=20
pictured: Session, Split hero
---

# Terminal

The page is the terminal surface, and its pictures are printed in type. A near-black ground with a green cast, pale phosphor ink, one bright phosphor green for the signal, and one family, Martian Mono, for every glyph: heads run wide, text runs narrow. Where a page wants a picture it never places a photograph; it prints one as a grid of characters drawn from the product's own text (a config file, a command, a manifest), dim cells set small, bright cells set full, so a hare or a machine appears out of dotfiles. It reads as a tool made by people who live in a shell. It is not the CRT costume and not a dark product page holding a screenshot of a terminal.

## Tokens

```css
:root {
  --color-paper: oklch(12.5% 0.012 150); --color-paper-2: oklch(16% 0.016 150); --color-paper-3: oklch(20% 0.02 150);
  --color-ink: oklch(94% 0.03 140); --color-ink-2: oklch(82% 0.05 142); --color-muted: oklch(63% 0.06 145);
  --color-rule: oklch(27% 0.028 148);
  --color-accent: oklch(87% 0.2 142); --color-accent-ink: oklch(14% 0.02 150); --color-focus: oklch(87% 0.2 142);
  --glyph-0: oklch(30% 0.06 146); --glyph-1: oklch(38% 0.08 145); --glyph-2: oklch(47% 0.11 144); --glyph-3: oklch(57% 0.14 143);
  --glyph-4: oklch(67% 0.17 142); --glyph-5: oklch(77% 0.19 142); --glyph-6: oklch(86% 0.2 141); --glyph-7: oklch(94% 0.12 138);
  --font-display: "Martian Mono", ui-monospace, monospace; --font-body: var(--font-display); --font-outlier: var(--font-display);
  --radius-card: 0; --radius-pill: 0; --rule-hair: 1px; --shadow-card: none;
  --tracking-display: -0.02em; --display-weight: 500; --stretch-display: 112.5%; --stretch-body: 87.5%;
}
```

## Type

- **Every glyph is Martian Mono.** Display 500 at `--stretch-display`, line-height 1.12, `h1` at most 3.75rem in two or three lines. Body 400 at `--stretch-body`, 15px, line-height 1.65. Labels and meta a step smaller in `--color-muted`, sentence case, untracked.
- Prompt glyphs (`$`, `~ $`) in `--color-muted` mark real commands and only those; arguments in a reference take the accent.
- Martian Mono has no box-drawing or block glyphs. Diagrams are typed in `+ - |` and wordmarks are printed as glyph pictures, so no fallback face ever slips into a line.

## Surfaces

- One hue, a ramp of lightness: ground, then `--color-paper-2` for a session or an install well, `--color-paper-3` for hover. Raised surfaces take a 1px `--color-rule` border, square, never a shadow.
- Rules: 1px `--color-rule` between sections, rows and tabs.
- **Pictures as glyphs (the signature):** a photograph or a generated picture with a strong silhouette on black is reduced to a grid of brightness levels (about 130 columns, cells 1.85 times as tall as wide) and drawn on a canvas, each lit cell one character from the product's own text in `--glyph-0` to `--glyph-7` by level, dim cells at 62% size. It sits at a hero's side bleeding to the fold, or prints the wordmark across the footer. A static `<pre>` of the same grid stands in without script. One or two a page.
- When a build cannot make a glyph grid, one photograph a page stands in, printed in the `photo:` duotone with a 1px `--color-rule` border: the machines themselves, never a screen showing an interface.
- No scanline, glow, bezel, title bar or traffic lights.

## Controls

- Primary: an accent block with `--color-accent-ink` text, square. Secondary: a 1px `--color-ink-2` border. Hover and state switch in `steps(1)`.
- Install lines: a `--color-paper-2` well with tabs (brew, cargo, curl) underlined in the accent, the command at `--text-lg`, and a 16px copy icon at the right that turns into a tick in the accent for 1.4s.
- Nav: a multiplexer's status line, sticky, 40px: the session name on an accent block, numbered windows as links, meta at the right.

## Motion

Stepped where it is state, alive where it is a picture. A glyph picture resolves row by row from noise over about 1.5s on arrival, once; under the cursor its cells scramble and flare to the accent, then settle. A session types itself once when it enters the view, and anything it names (a host on a map) lights as its line prints. A caret blinks five times and holds. Reduced motion shows every final state.

## Voice

Commands, flags, paths and exit codes. Declarative and short: name the command, never the adjective.

## Do-nots

- Never a proportional face, and never a box-drawing glyph from a fallback font.
- Never a second hue: no amber, no cyan, no warm bloom.
- Never a rounded corner, a pill or a soft card.
- Never a light section.
- Never more than one photograph, and only where glyphs cannot be made.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,400..700&display=swap" rel="stylesheet">
```

```css
body { font-stretch: var(--stretch-body); font-variant-numeric: tabular-nums; }
h1, h2, h3 { font-weight: var(--display-weight); font-stretch: var(--stretch-display); letter-spacing: var(--tracking-display); line-height: 1.12; }
.art { position: relative; } .art canvas { position: absolute; inset: 0; }
.status { position: sticky; top: 0; background: var(--color-paper-2); border-bottom: var(--rule-hair) solid var(--color-rule); }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-radius: 0; transition: background-color var(--dur-micro) steps(1); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); }
```

To make a glyph picture: crop the subject, autocontrast, resize to `cols` by `round(cols * h / w / 1.85)`, quantise brightness to levels 0 to 8 (0 is blank), and ship the rows as strings; the canvas sets each lit cell's glyph from the product text in order and its colour from `--glyph-(level - 1)`.
