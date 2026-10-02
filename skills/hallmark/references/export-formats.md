# Export formats

Loaded when a `design.md` exists and its `## Exports` need refreshing, or when the user asks for the tokens in another format. `tokens.css` is the source of truth, written by `theme.mjs scaffold`; every other format is a translation of it, written only when asked for.

## The token set

| Family | Tokens |
| --- | --- |
| Colour | `--color-paper`, `-paper-2`, `-paper-3`, `-ink`, `-ink-2`, `-muted`, `-rule` (and `-rule-2` where a theme sets one), `-accent`, `-accent-ink`, `-focus`, `-error`, `-success`; `-field` under a Committed posture, `-accent-2` where a theme names a second ink |
| Type | `--font-display`, `--font-body`, `--font-outlier`; `--text-xs` to `--text-3xl` on a 1.25 ratio from 16px, `--text-display-s`, `--text-display`; `--tracking-display` |
| Space | `--space-3xs` (2px) to `--space-4xl` (144px), ten steps; `--container`, `--gutter`, `--gap-columns`, `--section-gap-s`, `--section-gap`, `--section-gap-l` |
| Shape | `--radius-card`, `--radius-pill`, `--rule-hair`, `--shadow-card` |
| Motion | `--ease-out`, `--ease-in`, `--ease-in-out`; `--dur-micro` 120ms, `--dur-short` 220ms, `--dur-long` 420ms |
| Layers | `--z-base` 1, `-raised` 10, `-dropdown` 100, `-sticky` 200, `-sticky-nav` 300, `-modal` 400, `-toast` 500, `-tooltip` 600 |

A page that needs another token names it by role and declares it in `tokens.css`; nothing downstream uses a name `tokens.css` does not declare.

## `tokens.css` in a project

The page's stylesheet imports it before any rule: `@import "./tokens.css";` (CSS drops an `@import` that follows a rule, and the tokens vanish without an error). In an existing entry stylesheet (`app/globals.css`, `src/index.css`), keep `@import "tailwindcss"` or the `@tailwind` directives exactly where they are, put the tokens import after them, and add Hallmark's base rules below. Where the project already names its tokens (`--background`, a Tailwind `@theme`), map Hallmark's roles onto those names rather than adding a parallel set. Replace the file only when the user asks for a full takeover.

## Tailwind v4

Move the declarations into `@theme static` (static, so Tailwind emits every one as a variable on `:root`, used by a utility or not), so the page's `var()` references keep working and the utilities appear (`bg-paper`, `text-ink`, `font-display`, `rounded-card`, `ease-out`). Tailwind reads spacing as `--spacing-*`, so the scale goes in under that name and `tokens.css` keeps `--space-*` as aliases; the tokens Tailwind has no namespace for stay in `:root`.

```css
@import "tailwindcss";
@theme static {
  --color-paper: oklch(96.5% 0.008 50);
  --spacing-lg: 24px;
}
:root { --space-lg: var(--spacing-lg); --dur-short: 220ms; --z-modal: 400; --section-gap: 144px; }
```

Every `--color-*`, `--font-*`, `--text-*`, `--tracking-*`, `--radius-*`, `--shadow-*` and `--ease-*` token goes into `@theme static` unchanged. Tailwind v3: the same names under `theme.extend` in `tailwind.config`, each value a `var()` of the token.

## DTCG `tokens.json`

For Style Dictionary or Tokens Studio pipelines. Path-based, a `$type` on every token, OKLCH as a string (convert to hex only if the pipeline cannot read it, and say the conversion is lossy). A fluid size exports its maximum; the `clamp()` stays in CSS.

```json
{
  "color": {
    "paper": { "$value": "oklch(96.5% 0.008 50)", "$type": "color" },
    "accent": { "$value": "oklch(62% 0.17 28)", "$type": "color" }
  },
  "font": { "display": { "$value": "General Sans, ui-sans-serif, sans-serif", "$type": "fontFamily" } },
  "space": { "lg": { "$value": "24px", "$type": "dimension" } },
  "duration": { "short": { "$value": "220ms", "$type": "duration" } }
}
```

## shadcn/ui

shadcn keeps full colour values in its own variables and maps them in `@theme inline`. Point its variables at Hallmark's tokens:

```css
:root {
  --background: var(--color-paper); --foreground: var(--color-ink);
  --card: var(--color-paper-2); --card-foreground: var(--color-ink);
  --popover: var(--color-paper-2); --popover-foreground: var(--color-ink);
  --primary: var(--color-accent); --primary-foreground: var(--color-accent-ink);
  --secondary: var(--color-paper-3); --secondary-foreground: var(--color-ink-2);
  --muted: var(--color-paper-2); --muted-foreground: var(--color-muted);
  --accent: var(--color-paper-3); --accent-foreground: var(--color-ink);
  --destructive: var(--color-error);
  --border: var(--color-rule); --input: var(--color-rule); --ring: var(--color-focus);
  --radius: var(--radius-card);
}
```

shadcn's `accent` is a hover surface and its `muted` a quiet background, so its `@theme inline` block defines `--color-accent` and `--color-muted` with meanings that collide with Hallmark's. In a shadcn project, keep Hallmark's two tokens out of `@theme` and let the page CSS reach them through `var()`, or rename them there (`--color-signal`, `--color-ink-3`) and say so in the handoff.
