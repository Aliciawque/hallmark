# Theme - Terminal

Green-phosphor CRT, rendered as a page. Dark green-black ground, phosphor-green ink, one hue top to bottom, every glyph monospace, a blinking block cursor. The page *is* a terminal surface, not one that shows a screenshot of one. It reads like a live shell: fast, raw, competent, no ornament.

The material, in one line: **one green hue, all mono, zero radius, phosphor glow under scanlines.**

## Axes (diversification)

- **Paper band** - dark, green (`oklch(11% 0.018 145)`, a near-black with a green cast). The darkest ground in the catalog, and the only one tinted green rather than neutral or indigo.
- **Display style** - **mono** (JetBrains Mono 500, `--tracking-display 0.01em`). No proportional face exists on the page; display just sizes the mono up (`--text-display` clamps to 4rem).
- **Accent hue** - **chromatic phosphor** (`oklch(78% 0.190 138)`). A lit P1-green, not neon `#00ff00`. It is the *same* hue as the ink and the paper: the whole page is one hue.

## Reference register

Warp · Charm / charm.sh · Ghostty · Fig · Vercel's monospace · old DEC/VT220 green screens · man pages · `htop` and `btop` TUIs. **Never name any of these in the output.**

The material to match: monochrome phosphor, box-drawn chrome, a cursor that blinks. Hand-built, precise, never a costume. Internally: *a green VT220 phosphor screen, recoloured for the web*. When in doubt ask "does this read like a live terminal, or like a hacker-themed skin?" Keep the former.

## Palette

Canonical values live in [`site/css/tokens.css`](../../../../site/css/tokens.css) under `[data-theme="terminal"]`.

- `--color-paper: oklch(11% 0.018 145)` - green-black; elevation steps to `15%` / `19%`
- `--color-muted: oklch(58% 0.090 140)` - meta
- `--color-ink-2: oklch(78% 0.140 138)` - body
- `--color-ink: oklch(86% 0.160 138)` - bright ink
- `--color-accent: oklch(78% 0.190 138)` - the lit phosphor signal
- `--color-rule: oklch(28% 0.030 140)` - 1px TUI chrome

**One hue, top to bottom.** Everything sits on hue 138-145. There is no second hue on the page; the monochrome *is* the design, and hierarchy comes from the L/chroma ramp since hue cannot carry it. Reserve the two brightest greens (ink at 86% L, accent at chroma 0.19) for the one emphasised word, the active prompt, the cursor, focus rings, and a status chip.

## Typography

**Every glyph is JetBrains Mono.** Display, headings, body, labels, meta, buttons, all `--font-mono` (display 500, body 400, bold 700). No proportional type exists anywhere, not even a "friendlier" body. A sans or serif on the page means the theme is broken.

**The prompt is the grammar.** A `$`, `>`, or `~/` prefix marks things that are genuinely commands or destinations: nav items, an inline command, an active input, a path. A blinking block cursor (`▋`) trails the live line. It is a shell affordance, not a decoration to hang above headings, and it never labels a section.

Numerals run tabular wherever a figure appears. Labels are uppercase mono for captions, table headers, meta rows, units, exit codes, folios, and entry numbers inside a real `<ol>`.

## Material

- **Zero radius, sharp rectangles.** `--radius-card` / `--radius-pill` / `--radius-input` all resolve to `0`. Windows, buttons, inputs, chips have square corners. The hard edge is the CRT bezel.
- **Phosphor glow, not drop-shadow.** Bright text carries a soft `text-shadow` bloom in the accent hue, the phosphor bleeding past its pixel. Depth otherwise steps through the paper elevation ramp. Never a grey box-shadow, never blur.
- **Scanline atmosphere.** A fixed, low-opacity horizontal scanline overlay (`repeating-linear-gradient`, ~3px pitch, under ~6% alpha), optionally a faint vignette. This is Terminal's answer to the genre's warm blooms: the atmosphere is CRT, not dusk. It must never fight legibility.
- **Rules are TUI chrome.** 1px `--color-rule` borders framed as terminal furniture: box-drawing dividers (`+--+`, `│`), a session bar, a path line. Structure reads as terminal furniture, not as web cards.
- **No emoji, no colour icons.** Monochrome glyphs, box-drawing, and ASCII only.

## Motion

**Motion character: brisk (0.9×), fade-only; the only loop is the caret.** A live command types itself in once, then the block cursor blinks on a steady 1s `step-end` loop. Section reveals **fade only**, ~500ms, no rise: the screen does not slide its content in. An optional one-time boot flicker on load is allowed. No parallax, no bounce, no autoplay. Everything gates behind `prefers-reduced-motion: no-preference`; reduced-motion ships static, cursor solid, scanlines still or absent.

## Voice range

Speak in commands, flags, paths, and exit codes. Declarative, terse, specific: name the command, the flag, the exit code, never the adjective. Never *seamless, robust, magical, revolutionary, next-gen, effortless, delightful, supercharge*. Never "click here."

## Do-nots (this theme's own failure modes)

- **No second hue.** No warm bloom, no cyan, no amber, no indigo. If it is not green (hue 138-145), it does not belong. This is what separates Terminal from Midnight / Aurora / Lumen.
- **No proportional type.** No sans, no serif, ever.
- **No rounded corners.** No pill control, no soft card, no rounded input. Radius stays `0`.
- **No pure `#000` or neon `#00ff00`.** Paper is a green-black; the accent is a lit phosphor, not a `#0f0` highlighter.
- **No light sections.** Terminal is dark end to end; never sneak a white band in.
- **No skeuomorphic terminal screenshot, and no heavy CRT costume.** The *page* is the terminal, and overdense scanlines or a fat glow read as a theme skin rather than an instrument.

## How Terminal differs from its neighbours

| vs | difference |
|---|---|
| **Midnight** (atmospheric) | Midnight is dark **blue** (hue ~250) with a real proportional display face (thin Geist) and a diffuse azure glow. Terminal is monochrome **green** (138-145), all-mono, with a prompt grammar and scanlines. Hue and all-mono settle it instantly. |
| **Cobalt** (modern-minimal) | Cobalt is a **light** engineered page with one dark graphite code band. Terminal is dark end to end and green: it *is* the code surface, not a light page containing one. |
| **Aurora** (atmospheric) | Aurora blooms **cyan** and sets body in a serif. Terminal has no bloom (scanlines instead), no serif (all-mono), and one green hue. |
| **Lumen** (atmospheric) | Lumen carries Instrument Serif, a built light artefact, and two palette drops. Terminal is single-drop, all-mono, no serif, phosphor-glow rather than emitted-light. |

## When the brief routes here

*CLI · terminal · shell · command-line · TUI · self-hosted · open-source · binary · ssh · sysadmin · DevOps · homelab · install script · package manager · REPL · retro · CRT · phosphor · green screen*. Categories: CLI tools, terminal and shell products, self-hosted infra, dev CLIs, open-source binaries, sysadmin and DevOps tools, retro-computing products. Tone: hacker, raw, fast, no-nonsense, retro-technical, machine, competent.

When the brief wants a page that *is* a shell rather than one that shows a code card, it is Terminal. Warm, consumer, editorial, and image-led briefs route elsewhere.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
```

```css
html, body { overflow-x: clip; }
body { background: var(--color-paper); color: var(--color-ink-2);
       font-family: var(--font-mono); font-weight: 400; letter-spacing: 0; }

/* Display just sizes the mono up - no other face exists */
.display { font: 500 var(--text-display)/var(--lh-tight) var(--font-mono); }

/* Phosphor glow on bright text - the CRT bleed */
.ink, .accent { color: var(--color-ink);
  text-shadow: 0 0 8px oklch(78% 0.19 138 / 0.35); }

/* Scanline atmosphere - fixed, faint, above paper, below content */
body::after { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 9;
  background: repeating-linear-gradient(oklch(86% 0.16 138 / 0.04) 0 1px, transparent 1px 3px); }

/* Blinking block cursor - the live prompt */
.cursor::after { content: "\25AE"; color: var(--color-accent);
  animation: blink 1s step-end infinite; }
@keyframes blink { 50% { opacity: 0; } }

/* Zero radius everywhere - sharp CRT edges */
.card, .btn, .input { border-radius: 0; border: 1px solid var(--color-rule); }

.reveal { opacity: 0; transition: opacity .5s ease; }
.reveal.is-in { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .cursor::after { animation: none; }
  .reveal { opacity: 1; transition: none; }
}
```

The rest of the page is yours. Terminal supplies the phosphor, the mono, and the hard edge; what runs on that screen is the brief's business, not the theme's.
