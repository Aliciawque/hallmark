---
name: Cobalt
slug: cobalt
genre: modern-minimal
paper: light 98.5 250
display: grotesk-sans Familjen Grotesk
accent: cool 256
posture: restrained
keywords: api, sdk, cli, dev tool, developer platform, docs, documentation, infrastructure, backend, database, observability, webhooks, events, type-safe, open source, ship, deploy, developer experience, technical
material: cool near-white paper, blue-grey ink and hairlines, Familjen Grotesk over IBM Plex Sans, JetBrains Mono on a graphite surface in three tones, one electric cobalt signal
photo: duotone graphite paper
pictured: Narrative Workflow, Stage hero
---

# Cobalt

An exact, technical register: cool near-white paper ruled with hairlines, Familjen Grotesk heads over IBM Plex Sans, JetBrains Mono on a graphite surface wherever the content is code, and one electric cobalt signal. It reads as precise because every edge is a 1px line, every neutral leans blue and every snippet runs, not because the page dresses as a terminal. It is not a dark developer page, not a gradient launch template and not a warm product voice.

## Tokens

```css
:root {
  --color-paper: oklch(98.5% 0.005 250); --color-paper-2: oklch(96% 0.007 250); --color-paper-3: oklch(93% 0.009 250);
  --color-ink: oklch(24% 0.020 258); --color-ink-2: oklch(34% 0.018 257); --color-muted: oklch(50% 0.015 256);
  --color-rule: oklch(90% 0.008 250); --color-rule-2: oklch(84% 0.010 250);
  --color-graphite: oklch(22% 0.016 260); --color-graphite-2: oklch(27% 0.018 260); --color-graphite-ink: oklch(92% 0.010 250); --color-graphite-muted: oklch(68% 0.020 255);
  --color-accent: oklch(52% 0.185 257); --color-accent-2: oklch(74% 0.14 256); --color-accent-ink: oklch(98.5% 0.005 250); --color-focus: oklch(52% 0.185 257);
  --font-display: "Familjen Grotesk", system-ui, sans-serif; --font-body: "IBM Plex Sans", system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 10px; --radius-input: 6px; --radius-pill: 999px;
  --rule-hair: 1px; --shadow-card: 0 1px 2px oklch(24% 0.02 258 / 0.05);
  --tracking-display: -0.02em;
}
```

## Type

- **Display:** Familjen Grotesk 600 on heads and 500 on item titles, `--tracking-display`, line-height 1.05, sentence case, roman. Its flared terminals keep it from reading as a default grotesk.
- **Body:** IBM Plex Sans 400 and 500, body only.
- **Labels, captions, table heads, status:** Familjen Grotesk 500 a step smaller, sentence case, in `--color-muted`, the theme's label face. Never mono.
- **Code:** JetBrains Mono 400 and 500 for code, commands and machine values in a table (event names, IDs, timestamps); never a label, a head or a chip.

## Surfaces

- Hairlines do the work: a 1px `--color-rule` edges every surface and splits every row, never a heavy boxed card. Every neutral tilts to hue 250 to 260.
- Radius 10px on surfaces, 6px on controls and inputs, concentric inside a well. Depth is the whisper `--shadow-card` on an interactive surface and a paper step on a well; nothing else lifts. No texture, no gradient text.
- Graphite is the dark material: `--color-graphite` under `--color-graphite-ink`, `--color-graphite-2` for a selected line or a panel's header strip, `--color-graphite-muted` for comments, line numbers and secondary text. Syntax takes the lighter cobalt `--color-accent-2` for types and strings; never a rainbow.
- Bands: a `--color-paper-2` band or the one graphite band; two a page at most.
- Photographs are rare: one at most, of a real system at work seen from a distance (rail switches in a yard, a patch panel, a signal box), never people at laptops or glowing code. In the graphite and paper duotone, 10px radius, a 1px hairline, no type on it.

## Controls

- The pair: a solid cobalt button at 6px with `--color-accent-ink` text beside a hairline-outlined 6px button in ink.
- Links are ink with a cobalt underline that grows on hover. Inputs: 6px radius, a 1px `--color-muted` border (the field edge holds 3:1), cobalt focus.
- Status is text with one icon, never a filled chip: done in ink, in flight in cobalt, failed in `--color-error`. One cobalt signal, under 5% of a screen: the primary button, a hover underline, a status, a syntax token.

## Motion

One settle a page: a code surface fades in once over `--dur-long` on `--ease-out`, or one command types in once and stays; never both. Hover grows a cobalt underline on a link and turns a hairline cobalt on a focusable surface. No bounce, no parallax.

## Voice

Declarative, technical, specific, like a good changelog: name the event, the endpoint, the status code, the interval. No hype adjectives.

## Do-nots

- Never a warm accent; the signal is cobalt at hue 256.
- Never a pill or a gradient button; one solid cobalt button at 6px, plus typographic links.
- Never glass, blur or a floating shadowed bar; chrome is as flat as every surface.
- Never fake code: a snippet compiles, resolves or returns, and an invented endpoint is the theme's worst failure. With no host in the brief, call `example.com`.
- Never a second graphite band; two dark beats turn the light theme into a striped one.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@500;600&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
h1, h2, h3 { font-family: var(--font-display); font-weight: 600; letter-spacing: var(--tracking-display); color: var(--color-ink); } h3 { font-weight: 500; }
.btn { border: var(--rule-hair) solid var(--color-rule-2); border-radius: var(--radius-input); padding: var(--space-sm) var(--space-lg); background: var(--color-paper); color: var(--color-ink); font-weight: 500; }
.btn--primary { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-accent-ink); }
.well { background: var(--color-paper-2); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-card); }
.graphite { background: var(--color-graphite); color: var(--color-graphite-ink); border-color: var(--color-graphite); }
.graphite pre, .graphite code { font: 400 var(--text-sm)/1.6 var(--font-outlier); } .graphite .token { color: var(--color-accent-2); } .graphite .comment { color: var(--color-graphite-muted); }
a { text-decoration-color: var(--color-rule-2); text-underline-offset: 0.2em; } a:hover { text-decoration-color: var(--color-accent); }
::selection { background: color-mix(in oklab, var(--color-accent) 22%, transparent); }
```
