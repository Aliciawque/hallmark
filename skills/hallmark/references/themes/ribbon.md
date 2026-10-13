---
name: Ribbon
slug: ribbon
genre: atmospheric
paper: light 98.5 85
display: high-contrast-serif Newsreader italic
accent: chromatic-teal 190
posture: committed
keywords: sleep, sound, soundscape, audio, night, rest, calm, wellness, meditation, white noise, ambient, listen, headphones, wind down, bedtime, quiet, breathing, app, subscription
material: warm off-white paper, soft near-black ink, Newsreader light italic over Figtree, pills on hairline rules, a teal signal and a copper wash
photo: muted sepia=14
pictured: Narrative Workflow, Settled hero
---

# Ribbon

The hour before sleep, set quietly: warm off-white paper, Newsreader italic at its lightest for every head, Figtree in a soft grey for reading, pills for every control, hairline rules instead of boxes, and a warm and a cool colour that never raise their voice. The night comes in through photographs, muted and lamp-warm, like windows cut in the paper. It reads as calm because the type is light and nothing is loud, not because the page is dark. It is not a night sky of stars and not a glossy wellness app.

## Tokens

```css
:root {
  --color-paper: oklch(98.5% 0.006 85); --color-paper-2: oklch(96% 0.009 85); --color-paper-3: oklch(92.5% 0.012 85);
  --color-ink: oklch(18% 0.005 80); --color-ink-2: oklch(30% 0.008 80); --color-muted: oklch(48% 0.012 80);
  --color-rule: oklch(90% 0.010 85); --color-rule-2: oklch(94% 0.008 85);
  --color-accent: oklch(44% 0.075 190); --color-accent-ink: oklch(98% 0.006 85); --color-focus: oklch(52% 0.09 190);
  --color-band: oklch(26% 0.045 195); --color-band-ink: oklch(94% 0.012 85);
  --color-slot: oklch(69% 0.07 80);
  --font-display: "Newsreader", Georgia, serif; --font-body: "Figtree", ui-sans-serif, system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 20px; --radius-pill: 999px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.022em;
}
```

One dial, the colourway, stated in the stamp (`ribbon: dawn`). One colour is warm and one cool: the accent takes one; the other (`--color-slot`) is the wash a photograph loads over, carried into the pictures by the treatment's warmth.

| Colourway | Paper | Ink | Accent and photo wash |
| --- | --- | --- | --- |
| `dawn` (default) | `oklch(98.5% 0.006 85)` | `oklch(18% 0.005 80)` | accent teal `oklch(44% 0.075 190)`; wash copper `oklch(69% 0.07 80)` |
| `two-in-the-morning` | navy `oklch(21% 0.034 252)` | `oklch(93% 0.010 85)` | accent peach `oklch(84% 0.085 55)` with the navy as its text; wash ice `oklch(80% 0.07 240)` |
| `moss` | sage `oklch(89% 0.034 140)` | `oklch(22% 0.03 150)` | accent ochre `oklch(48% 0.115 70)`; wash deep teal `oklch(46% 0.07 195)` |

## Type

- **Display:** Newsreader italic 300 at opsz 72, `--tracking-display`, line-height 1.02. Declared italic system (stamp `waive 38ii`): on `--font-display`, every head at every level, true italic, `font-synthesis: none`, one weight and one colour; big figures take the display italic too.
- **Body:** Figtree 400, 16px, line-height 1.55 to 1.6, in `--color-muted` rather than ink.
- **Labels, captions, table heads, meta:** Figtree 500 a step smaller, sentence case, untracked, `--color-muted`. JetBrains Mono only inside code and on figures that compare, tabular.

## Surfaces

- Rules, not boxes: items part on 1px `--color-rule` hairlines, `--color-rule-2` inside a well.
- Radius: every control and tag at `--radius-pill`; a well at `--radius-card` (20px) with a 1px `--color-rule` border. Nothing square, nothing sharp.
- Depth is a tint and a rule: a `--color-paper-2` well; no shadow, no blur, no bloom.
- Bands: one full-bleed `--color-band` (deep teal, `--color-band-ink` text) and a `--color-paper-2` band; two a page at most.
- Photographs: the night, held still and close: rain on a window, a lamp in a dark room, a train's lights far off, trees at dusk; low light, no person, no face. `--radius-card`, no border, no shadow. Captions in the label voice under the frame; one light italic line may sit on a dark photograph's calmest part over an ink scrim at 45 to 60%.
- No texture: the paper stays clean.

## Controls

- The pair: an accent-filled pill with `--color-accent-ink` text beside one outlined in 1px `--color-rule` on `--color-paper-2`, both Figtree 500.
- Links underline in `--color-muted` and turn teal on hover; inputs are pills 48px tall with a 1px rule border; a range takes the accent on its thumb.
- Teal sits on the primary, the focus ring, a link's hover and one figure; copper never sits on a control.

## Motion

Slow and breathing: a state changes over `--dur-long` on `--ease-in-out`. Nothing moves on its own: no loop, no reveal, no parallax, no counter.

## Voice

Calm and specific: the hour, the sound, how loud. Never a promise of perfect sleep.

## Do-nots

- Never a roman or a heavy head; the light italic is the system at every level.
- Never a third hue beside the accent and the wash; a third is a rainbow.
- Never a second dark band, and never a second full-bleed fill.
- Never a starfield, a moon, a navy-to-violet gradient or a stock sleeper (a face on a pillow, a sleep mask); the calm is the paper, the light type and the night outside.
- Never a drawn waveform, equaliser or sound bar as ornament; sound is told in words and numbers.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@1,6..72,300&family=Figtree:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-style: italic; font-weight: 300; font-variation-settings: "opsz" 72; font-synthesis: none; line-height: 1.02; }
.btn { padding: var(--space-sm) var(--space-lg); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-pill); background: var(--color-paper-2); color: var(--color-ink); font: 500 var(--text-sm)/1.5 var(--font-body); }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); }
.band { background: var(--color-band); color: var(--color-band-ink); }
a { text-decoration-color: var(--color-muted); } a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
