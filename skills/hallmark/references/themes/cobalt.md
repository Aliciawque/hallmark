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
pictured: Feature Ledger, Stage hero
---

# Cobalt

An exact, technical register: cool near-white paper ruled with hairlines, Familjen Grotesk heads over IBM Plex Sans, JetBrains Mono on a graphite surface wherever the content is code, and one electric cobalt signal. It reads as precise because every edge is a 1px line, every neutral leans blue and every snippet runs, not because the page dresses as a terminal. It is not a dark developer page, not a gradient launch template and not a warm product voice.

## Tokens

```css
:root {
  --color-paper: oklch(98.6% 0.005 250); --color-paper-2: oklch(96.2% 0.008 252); --color-paper-3: oklch(93% 0.011 252);
  --color-ink: oklch(21% 0.028 262); --color-ink-2: oklch(36% 0.022 260); --color-muted: oklch(50% 0.018 258);
  --color-rule: oklch(90% 0.009 252); --color-rule-2: oklch(83% 0.012 252);
  --color-graphite: oklch(21% 0.024 262); --color-graphite-2: oklch(26.5% 0.026 262); --color-graphite-ink: oklch(93% 0.010 250); --color-graphite-muted: oklch(69% 0.022 256);
  --color-accent: oklch(52% 0.19 258); --color-accent-2: oklch(76% 0.13 254); --color-accent-wash: oklch(95% 0.028 256); --color-accent-ink: oklch(98.6% 0.005 250); --color-focus: oklch(52% 0.19 258);
  --font-display: "Familjen Grotesk", system-ui, sans-serif; --font-body: "IBM Plex Sans", system-ui, sans-serif;
  --font-outlier: "JetBrains Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-input: 6px; --radius-pill: 999px;
  --rule-hair: 1px; --shadow-card: 0 1px 2px oklch(21% 0.028 262 / 0.06);
  --tracking-display: -0.028em; --display-weight: 600;
}
```

## Type

- **Display:** Familjen Grotesk 600 on heads and figures, 500 on item titles, `--tracking-display` (item titles at -0.01em), line-height 1.02 on heads, sentence case, roman, tabular figures. Its flared terminals keep it from reading as a default grotesk, and a status code or a count set in it at 60px and over is the page's loudest type.
- **Body:** IBM Plex Sans 400 and 500, body only.
- **Labels, captions, table heads, status:** Familjen Grotesk 500 a step smaller, sentence case, in `--color-muted`, the theme's label face. Never mono.
- **Code:** JetBrains Mono 400 and 500 for code, commands and machine values in a table (event names, IDs, timestamps); never a label, a head or a chip.

## Surfaces

- Hairlines do the work: a 1px `--color-rule` edges every surface and splits every row, never a heavy boxed card. Every neutral tilts to hue 250 to 260.
- Radius 8px on surfaces, 6px on controls and inputs, concentric inside a well. `--color-accent-wash` is the cobalt's second strength: the selected row, a meter's track, a highlighted line in a diff. Depth is the whisper `--shadow-card` and a paper step; nothing else lifts. No texture.
- Graphite is the dark material, a blue-tinted ink rather than black: `--color-graphite` under `--color-graphite-ink`, `--color-graphite-2` for a selected line or a panel's header strip, `--color-graphite-muted` for comments, line numbers and secondary text. Syntax takes the lighter cobalt `--color-accent-2` for types and strings; never a rainbow.
- Bands: a `--color-paper-2` band or the one graphite band; two a page at most.
- Photographs are rare: one at most, of a real system seen from a distance (a rail yard, a patch panel), never people at laptops or glowing code; graphite and paper duotone, 8px radius, a hairline, no type on it.

## Range

- **A table that is the API:** sources, endpoints or limits as a full-width ruled table, the row's name in Familjen 500, machine values in JetBrains Mono, the column that matters one step heavier, one row on the cobalt wash.
- **A comparison as a diff:** two graphite panes side by side, the raw payload and what the product makes of it, file names in the header strip, lines that changed on `--color-graphite-2`.
- **A timeline as figures:** attempts, deploys or a schedule set on one hairline axis spaced by their real times, each status or duration in Familjen 600 at display size, the time beneath in mono, failure in the error colour and success in cobalt.
- **A working control on the brief's numbers:** a calculator or a filter on paper-2, its result as one large Familjen figure over a single cobalt meter on the wash, beside the signup.

## Controls

- The pair: a solid cobalt button at 6px with `--color-accent-ink` text beside a hairline-outlined 6px button in ink.
- Links are ink with a cobalt underline that grows on hover. Inputs: 6px radius, a 1px `--color-muted` border (the field edge holds 3:1), cobalt focus.
- Status is text with one icon, never a filled chip: done in ink, in flight in cobalt, failed in `--color-error`. One cobalt signal, under 5% of a screen: the primary button, a hover underline, a status, a syntax token.

## Motion

One settle a page: a code surface fades in once over `--dur-long` on `--ease-out`. Hover grows a cobalt underline on a link and turns a hairline cobalt on a focusable surface. No bounce, no parallax.

## Voice

Declarative, technical, specific, like a good changelog: name the event, the endpoint, the status code, the interval. No hype adjectives.

## Do-nots

- Never a warm accent; the signal is cobalt at hue 256.
- Never a pill or a gradient button; one solid cobalt button at 6px, plus typographic links.
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
