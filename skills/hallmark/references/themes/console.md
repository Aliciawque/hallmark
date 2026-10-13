---
name: Console
slug: console
genre: modern-minimal
paper: dark 17 250
display: grotesk-sans Host Grotesk
accent: chromatic-amber 80
posture: restrained
keywords: lab, laboratory, protocol, experiment, notebook, science, research, observability, monitoring, version control, audit, compliance, instruments, data, devtools, engineering, telemetry, record, operations, dark, developer
material: graphite ground in three lightness steps, pale ink, hairline panels cut from one surface, Host Grotesk for reading, Atkinson Hyperlegible Mono for what was measured, amber for a person and cool blue for an instrument
photo: duotone paper-3 ink
pictured: Conversational FAQ, Settled hero
---

# Console

An instrument kept by careful people: a graphite ground stepped in three lightnesses, hairline panels cut from one surface, Host Grotesk for what a person reads, Atkinson Hyperlegible Mono for what an instrument measured, amber for a person and cool blue for an instrument. The ground is neutral so both meanings sit on it at equal weight, and nothing glows. It is not a neon terminal, a glass dashboard or a science-fiction control room.

## Tokens

```css
:root {
  --color-paper: oklch(17% 0.006 250); --color-paper-2: oklch(20.5% 0.007 250); --color-paper-3: oklch(13.5% 0.006 250);
  --color-ink: oklch(95% 0.005 250); --color-ink-2: oklch(82% 0.007 250); --color-muted: oklch(70% 0.008 250);
  --color-rule: oklch(30% 0.009 250);
  --color-accent: oklch(82% 0.15 80); --color-accent-ink: oklch(18% 0.04 75); --color-accent-soft: oklch(28% 0.05 80); --color-focus: oklch(82% 0.15 80);
  --color-cool: oklch(76% 0.12 245); --color-cool-soft: oklch(28% 0.05 245);
  --color-ok: oklch(74% 0.15 150); --color-bad: oklch(68% 0.18 25);
  --font-display: "Host Grotesk", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-pill: 6px; --rule-hair: 1px;
  --shadow-card: none;
  --tracking-display: -0.035em;
}
```

One dial, the colourway, stated in the stamp (`console: graphite`): `graphite`, the tokens above; `paper`, ground oklch(98% 0.006 85) under ink oklch(19% 0.010 60), amber oklch(54% 0.14 70) and cool oklch(52% 0.14 250), the paper band turning light; `amber-room`, ground oklch(15% 0.022 70) under ink oklch(95% 0.012 85), amber oklch(82% 0.15 82) and the cool turned to ice oklch(82% 0.08 200). In every colourway amber means a person and cool means an instrument.

## Type

- **Display:** Host Grotesk 600, `--tracking-display`, line-height 1.05, sentence case, roman.
- **Body:** Host Grotesk 400 at 16px, line-height 1.55 to 1.6, in `--color-muted`.
- **Labels, captions, table heads, chips:** Host Grotesk 500 a step smaller, sentence case, in `--color-muted`.
- **Measured:** Atkinson Hyperlegible Mono 400 and 500 at 13 to 14px for what an instrument or the system wrote: a reading with its unit, an id, a diff, a log line, a timestamp, every figure tabular. Its slashed zero and tailed one are the point: a value nobody can misread. Never a label, a head or a control.

## Surfaces

- Hairline panels: a surface is a 1px `--color-rule` with `--color-paper-2` inside, radius 10px (6px on controls). Panels that sit together are one surface divided by 1px rules.
- Three steps, no lamp: the ground, a panel one step up, the deepest step for code, logs and photographs. No shadow, glow, bloom or spotlight.
- Bands: a `--color-paper-3` or `--color-paper-2` band, never an amber field; two a page at most.
- Photographs: one at most, of the bench and never the person: gloved hands at a pipette, a rack of tubes, glassware under a hood; dark, quiet, close and level. Printed black and white from the deepest step to the ink (duotone paper-3 to ink), so no hue in a picture claims a meaning. Radius 10px, a 1px `--color-rule` edge, set into the panel grid; a caption beneath in the label face says what the bench is doing.
- No texture, no gradient on a surface.

## Controls

- The pair: an amber fill with `--color-accent-ink` beside a 1px `--color-rule` outline on `--color-paper-2`, both at 6px.
- A chip carries state only: the label face inside a 1px rule at 4px radius, tinted `--color-accent-soft` or `--color-cool-soft` by meaning. Inputs sit on `--color-paper-3` inside a 1px rule at 6px; links underline in `--color-rule` and turn amber on hover.
- Two meanings: amber is a person (an operator, a deviation, the current step, the one primary control); cool is an instrument (a reading, a trace, a main branch). Ok and bad exist for diffs and status only.

## Motion

Instrumental: a value changes when its source does, and a chart may draw once from its data. No reveal, parallax or hover lift; nothing appends on its own.

## Voice

A lab notebook kept by a careful person: the value, its unit, the time, who signed. A number without a unit or a time is nothing.

## Do-nots

- Never swap the meanings; an amber reading or a cool deviation is the theme lying.
- Never a floating card with a shadow under it.
- Never a third signal or a photograph in colour; amber and cool carry every meaning.
- Never mono on a label, a head or a button; mono is what an instrument wrote.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600&family=Atkinson+Hyperlegible+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 600; letter-spacing: var(--tracking-display); line-height: 1.05; }
.panel { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); }
.panels { display: grid; gap: var(--rule-hair); background: var(--color-rule); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); overflow: hidden; }
.panels > * { background: var(--color-paper-2); }
.band { background: var(--color-paper-3); }
.measured { font-family: var(--font-outlier); font-size: var(--text-xs); font-variant-numeric: tabular-nums; }
.btn { border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-pill); padding: var(--space-sm) var(--space-md); background: var(--color-paper-2); color: var(--color-ink); font-weight: 500; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
::selection { background: color-mix(in oklab, var(--color-accent) 25%, transparent); }
```
