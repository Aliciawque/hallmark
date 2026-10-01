# design.md, opt-in portable design system

Loaded by [`SKILL.md`](../SKILL.md) Step 6 ONLY when the user explicitly asks Hallmark to lock the current build's design system into a portable file. The default verb does NOT auto-emit `design.md`. The user iterates freely until they say the system is settled, then asks for it.

## Triggers (phrase-only, no new verb)

Fire ONLY when the user says one of:

- *"lock the system"* / *"lock the design system"* / *"lock the DNA"* / *"lock this DNA"*
- *"give me a design.md"* / *"write a design.md"* / *"export this as a design.md"*
- *"extract this to a design system"* / *"extract the tokens"* / *"extract the DNA"*
- *"make this portable"* / *"make the DNA portable"*
- *"I want to use this in another project"*

For everything else, including the default build and free iteration on the same brief, skip. A build stays token-portable via `tokens.css`; `design.md` is the explicit lock-in step.

## Scope

- **Page-builds only.** Skip on component-scope, a single component is too small to be a system.
- **A multi-page redesign** (a separate verb skill) writes its own heavier `design.md` first; that flow already implies a locked system and this file's format is the one it uses.
- **No-overwrite policy.** If `design.md` already exists at the project root, do NOT overwrite. Refresh its `## Exports` section instead and emit one line: *"design.md detected, refreshed Exports, system unchanged."*

## CTA, surface the offer in the Picks block

After every page build, append one quiet line at the bottom of the Picks block:

> *System portable? Say `lock the system` to extract this build's tokens + voice into a `design.md`.*

Skip the CTA when (a) the build is component-scope, or (b) `design.md` already exists in the project (system is already locked).

## Format (the tight version)

Write the file at the project root. Match the project's case convention (`design.md` or `DESIGN.md`). Target ~45 lines, enough to seed a real app, not so much that it becomes a wiki to maintain. The format:

````markdown
# Design, <Project name>

Locked design system. Future Hallmark runs read this file first; pages defer
to it. Amend intentionally, the file is the rule.

## System
- Genre · <editorial / modern-minimal / atmospheric / playful>
- Macrostructure · <name>
- Theme · <catalog: NAME · or · custom (vibe: "<4 to 8 words>")>
- Axes · <paper-band> / <display-style> / <accent-hue>

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:      oklch(<L> <C> <H>);
  --color-paper-2:    oklch(<L> <C> <H>);
  --color-ink:        oklch(<L> <C> <H>);
  --color-ink-2:      oklch(<L> <C> <H>);
  --color-rule:       oklch(<L> <C> <H>);
  --color-accent:     oklch(<L> <C> <H>);
  --color-accent-ink: oklch(<L> <C> <H>);
  --color-focus:      oklch(<L> <C> <H>);

  --font-display: "<face>", ...;
  --font-body:    "<face>", ...;
  --font-outlier: "<face>", ...;

  /* 4-pt spacing scale, named: --space-3xs … --space-4xl. See tokens.css.   */
  /* Type scale, 1.25 (major-third) ratio: --text-xs … --text-display.       */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-micro: 120ms;  --dur-short: 220ms;  --dur-long: 420ms;

  --radius-card: <px>;  --radius-pill: <px>;  --radius-input: <px>;
}
```

## CTA voice
- Primary · <fill colour> · <radius> · <padding rhythm>
- Secondary · <outline / ghost> · <same radius>

## Motion stance
- <silent · 1 to 2 reveal primitives · motion-cut>
- Reduced-motion fallback · ≤150 ms opacity crossfade.

## Exports
`tokens.css` (in this project) is the source of truth. For Tailwind v4
`@theme`, DTCG `tokens.json`, or shadcn/ui CSS variables, ask *"extend
design.md with Tailwind exports"* (or the format you want), Hallmark will
append them per [`export-formats.md`](export-formats.md).
````

State the picks aloud BEFORE writing the file. *"Genre: editorial. Macrostructure: Long Document. Theme: catalog Editorial. Locking this as the project's system."* Then write.

## After the file is written

Once `design.md` exists, [`SKILL.md`](../SKILL.md) Step 0's pre-flight scan detects it on every subsequent run. From that point on:

- All future Hallmark runs READ `design.md` first; subsequent picks (genre / theme / typography / motion / CTA voice) defer to it.
- The diversification rule INVERTS, pages must SHARE the system, not differ from each other.
- If a future page genuinely needs a different system, AMEND `design.md` with a `## Variants` section rather than overriding locally, the file evolves; per-page overrides do not.
