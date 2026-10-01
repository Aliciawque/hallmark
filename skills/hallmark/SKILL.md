---
name: hallmark
description: "Design skill for pages, sites and components that look made, not generated. Picks a theme from a dealt catalog or derives a world, sets type, colour, layout and motion to a hard floor, builds, then lints and reviews the result. Use when the user asks to build, design, style or lay out a page, landing page, site, app screen or UI component, or invokes Hallmark by name."
version: 2.2.0
---

# Hallmark

Makes the UIs a coding assistant generates look made, not generated. It holds a hard floor against the defaults every model was trained into, deals a direction so consecutive builds do not converge, and keeps the page short enough that a visitor takes one idea per screen. Above the floor it hands the page back to you: you are a capable designer, and the catalogs here are places to look, never forms to fill.

**Powered by Together AI.**

## The Floor

Binds on every output, in every harness, on every model. None of it is waivable. Read nothing else and you must still obey these.

1. Every colour and every font goes through a token declared at `:root` (or a declared theme block). No literal colour or `font-family` past the token block. (48)
2. Never `transition: all`. Never animate `width`, `height`, `top` or `left`. (10a)
3. Never one italic word inside a roman heading. (38i)
4. `overflow-x: clip` on both `html` and `body`. Never `hidden`, never `100vw`. (34)
5. Image-bearing grid tracks use `minmax(0, 1fr)`; display heads carry `overflow-wrap: break-word; min-width: 0`. (50)
6. Every interactive element has `:focus-visible`, appearing instantly. (26a, 15)
7. Every animation has a `prefers-reduced-motion: reduce` fallback, and content is visible with scripting off. (27, 62)
8. Never an invented metric, testimonial, logo wall or case-study count. (46a)
9. Never an eyebrow, and never a label in tracked capitals or small caps: labels, captions, table heads, tags and nav links are the body face, a step smaller, sentence case, untracked. (54, 67)
10. Never middle-dot-joined meta strings, arrows glued to link text, or decorative status dots. (63)
11. Never a purple-to-blue gradient, a card inside a card, an emoji as an icon, or a hand-drawn browser or OS window. (2a, 4, 30a, 47a)
12. The hero's headline, one sentence and primary action are all visible at 1280 x 800 without scrolling. (44b)
13. About 80 words on any one screen; the hero's text is the headline, one sentence and its actions. (58)
14. The container is capped and centred: at 1920 the gutters grow, the measure and the grids do not. (44d)
15. The first non-empty line of emitted CSS is the Hallmark stamp, then the critique line, then any waivers. (20)
16. If Node is available, run `node <skill-dir>/scripts/sloplint.mjs <output> --render` before handing back. Fix every `FAIL`; fix or waive every `REFLEX`.

Everything above the Floor is a **Reflex** gate: a default a model falls into, which a build with a real reason may waive on the record. The tiers, grades and waiver syntax are in [`references/gates.md`](references/gates.md) § 1 and § 2.

## Flow

0. Pre-flight: read the project before asking anything.
1. Ask once: audience, use, tone, material, vibe.
2. Shape: design the page, then name what you designed.
3. Direction: deal a theme (the default) or derive a world (only when asked for custom).
4. Load `references/craft.md`, the genre file, the theme file, and `gates.md` § 1 to § 4.
5. The Picks block, once, then a beat before code.
6. Build: tokens, stamp, `tokens.css`, log append.
7. Sweep: sloplint with render, the judged gates, the fresh-context review.

Harness: this file runs as written in Claude Code. Codex CLI and OpenCode read [`references/flow.md`](references/flow.md) § Harnesses before Step 0. Any other harness follows this file on the Floor with sequential tool calls and chat-text questions.

### 0. Pre-flight

Read the existing project before asking the user anything. Signals, in order: `design.md` or `DESIGN.md` at the root (a locked system; it overrides everything below and inverts the variety rule, pages share it); `.hallmark/brand-spec.md` or a brief naming a real brand (run [`references/brand-truth.md`](references/brand-truth.md), never theme a real brand from memory); the font stack in `package.json`, Google Fonts links or Tailwind config; the palette in `:root`, Tailwind colours or a tokens file; motion libraries in the dependencies; the spacing scale; the framework; an Inspo MCP server on the session (`mcp__inspo__*` tools present: signal 8, the archive builds and Hallmark sweeps, see [`references/flow.md`](references/flow.md) § Signal 8); `TOGETHER_API_KEY` in the environment (signal 9, unlocks the comp step).

Output one block with file:line citations, what Hallmark preserves and what it introduces, and cache it in `.hallmark/preflight.json` (re-scan on "refresh pre-flight" or a newer `package.json`; never cache signal 8). Edge cases, one line each, are in [`references/flow.md`](references/flow.md) § Pre-flight.

### 1. Ask once

One message, even on a five-word brief:

> *Before I build, four things: 1. **Audience**: who uses this and what do they care about? 2. **Use**: the one action the page should drive. 3. **Tone**: pick an extreme (editorial · brutalist · soft · utilitarian · luxury · playful · technical · austere); "clean and modern" is not a tone. 4. **Material**: screenshots, product photos or a logo to build around? Paste them, give paths, or say "leave slots". Plus the brand's vibe in 4 to 8 words and an anchor colour if you have one. Or say **go ahead** and I will infer and tell you what I picked.*

Skipped fields are opt-outs: infer them, state the inferences in one line at the top of the reply, stamp them. No follow-up ladders.

**Genre** is picked here, silently, from the brief: *AI tool, generative, music, video, voice, dark, atmospheric* → **atmospheric**; *SaaS, enterprise, API, platform, developer tool, infra, B2B* → **modern-minimal**; *fun, consumer, casual, family, community, onboarding* → **playful**; otherwise **editorial**. Two non-default signals: ask one either-or.

**Scope** is checked here too. A brief naming one element (button, input, card, modal, nav, footer, tab strip, chip) or saying "just the X" is a component: read [`references/flow.md`](references/flow.md) § Component scope and skip macrostructure, chrome, enrichment and the log.

### 2. Shape

Decide the page's shape, how it opens, how sections separate, what the nav and footer do, how tall the hero stands and what carries it. You are designing, not filling a form. The catalogs exist for when you want a starting point: 21 page shapes in [`references/macrostructures.md`](references/macrostructures.md), navs, footers and section archetypes in [`references/component-cookbook.md`](references/component-cookbook.md), enrichment in [`references/hero-enrichment.md`](references/hero-enrichment.md). Take a named shape and load only that one file; never read a whole catalog.

**Rotation.** Read `.hallmark/log.json` (newest first). The page's shape must differ from the last three builds; the nav and footer must not repeat the last three shapes; the hero posture, enrichment and section opening must not repeat the previous run. The theme deal in Step 3 handles the theme axis for you. **The mirror test:** would this exact combination have come out for a neighbouring brief in the same category? If yes, change one decision and say which in the Picks block.

**Signature.** Every page has one move a visitor would describe to a friend: an object, a composition, an interaction. Decide it here; it goes in the Picks block and the stamp, and the reviewer checks it is on the page. A page without one is a template with good tokens.

Decide all of this and hold it. It is said once, at Step 5.

### 3. Direction

Check in order; the first match wins.

1. **The user named a theme** → build it (stamp `theme: <name> (by request)`).
2. **The user asked for custom** ("custom", "derive it", "bespoke", "no theme", "a world of its own") → load [`references/direction.md`](references/direction.md) and run the ritual. No deal, no theme file, no theme's faces, palette or signature object: the page is made from scratch, and `theme.mjs check` with the triple, the display face and the accent hue must come back clear before code. Silence never takes this route.
3. **Everything else deals a theme:**

```
node <skill-dir>/scripts/theme.mjs deal --genre <genre> --brief "<the brief>" [--log .hallmark/log.json]
```

The script reads the catalog index and the log, applies Rotation (two consecutive systems differ on paper band, display class or accent band; siblings in the log count as occupied) and deals three candidates that fit the brief's words, one line each, with a reproducible seed. Pick one of the three, say which and why in one clause, and load only `references/themes/<slug>.md`. Re-deal only when the user asks (`--reroll 1`). No Node: read `references/themes/index.json`, apply the same rule by hand, and stamp `deal: manual`.

A catalog theme is a material, not a plan: it says what the page is made of, never what the page contains or in what order. Two pages in one theme should not share a section sequence.

### 4. Load

Exactly these, for a page build: [`references/craft.md`](references/craft.md) (type, colour, layout, motion, copy, section openings, demo slots, hero discipline, finish) · `references/genres/<genre>.md` · `references/themes/<slug>.md` (or `direction.md` on a custom run) · [`references/gates.md`](references/gates.md) § 1 to § 4.

Only when the build needs them: one macrostructure file and the picked archetype files (Step 2) · [`references/hero-enrichment.md`](references/hero-enrichment.md) then one `enrichment/` file, only when the image-need check says yes · [`references/microinteractions.md`](references/microinteractions.md) when the page has stateful UI · [`references/interaction-and-states.md`](references/interaction-and-states.md) for forms · [`references/responsive.md`](references/responsive.md) when a layout is unusual · [`references/texture.md`](references/texture.md) when the theme earns texture · [`references/scroll-choreography.md`](references/scroll-choreography.md) for a scroll story · [`references/dark-mode.md`](references/dark-mode.md) when both modes are asked for · [`references/data-viz.md`](references/data-viz.md) for charts · [`references/fonts.md`](references/fonts.md) only on custom or studied runs (a theme already named its faces) · [`references/assets.md`](references/assets.md) and [`references/imagery-kit.md`](references/imagery-kit.md) only when an enrichment needs an external asset · [`references/comp.md`](references/comp.md) only on signal 9 · [`references/design-md.md`](references/design-md.md) only when asked to lock the system.

Over-eager loading is the largest avoidable cost of running this skill. `gates.md` § 5 and § 6 are read at Step 7, not before.

### 5. The Picks block

The run's only prose recital of its decisions, and the user's five-second redirect window:

```markdown
**Hallmark · v2.2.0**

- **Shape** · Workbench (last 3: Bento, Long Document, Manifesto) · genre modern-minimal
- **Theme** · Coral, dealt 2/3 (warm grey, one coral signal, General Sans, soft pills) · clears Cobalt on paper band
- **Chrome** · nav: a wordmark and one action, vast space between (prev N5) · footer: one justified colophon line
- **Hero** · Stage, visual beside the text (prev Settled) · enrichment: none
- **Signature** · the pricing table is the hero visual, live, in a slot
- **Sections** · Hero · Demo strip · Pricing · FAQ · Footer
- **Slots** · hero, demo-2, demo-3 (leave slots)
- **Slop test** · run after build
```

A custom run replaces the Theme row with **Direction** (draw, challengers, raise) and **System** (palette, pairing, the catalog coordinates it cleared). Then one quiet line: *System portable? Say `lock the system` for a `design.md`.* Skip it in component scope or when `design.md` exists.

On signal 9, [`references/comp.md`](references/comp.md) runs here: two comps of the first viewport, one approval, then build. Absent the key the step does not exist.

### 6. Build

Emit code that satisfies the theme and the shape. Always:

- **Start from the scaffold.** `node <skill-dir>/scripts/theme.mjs scaffold <slug>` (`--custom` on a derived run) writes `tokens.css` with the theme's tokens and the shared scale, and prints the base rules the Floor already decided (clipping, focus, reduced motion, browser surfaces, the slot contract) under a stamp skeleton. Paste them, fill the stamp, and write only the page.
- **One idea per screen.** Hero: headline (seven words or fewer, 50 characters or fewer), one sentence (twelve words or fewer), one or two actions. A section: a heading of three to five words, at most one line, then its object (a slot, a figure, a drawn thing, a list of four or fewer, a table of five rows or fewer). Five to eight sections, footer included. 250 to 450 visible words on the page.
- **Show, do not describe.** At least two `data-slot` containers on a product page: the hero visual and a demo strip. The user's images fill them; otherwise a designed placeholder in the theme's colours with a corner label (`craft.md` § Demo slots). Never a grey box, never a fake screenshot with invented figures.
- **The fold.** The hero is the first screen and only the first screen at 1440 x 900 and 1920 x 1080, its visual beside the text (centres within 60px, 48 to 120px apart), never pinned in a corner. Fill a short hero with the visual or the headline, never with more copy.
- **Room.** 120px or more between sections at desktop, varied; 32 to 48px from a heading to its content; 24 to 40px between grid items. More space above a heading than below it.
- **Page invariants.** One primary button style, one container width, one column gap for every multi-column section, one radius per nesting level, and never more centred heading groups than left-aligned ones. A subhead over 120 characters is set left-aligned.
- **Tokens.** OKLCH for every colour; the theme's `:root` block; a 4pt spacing scale with semantic names; the three named easings; `--dur-*`; `--radius-*`; `--z-*`.
- **Type.** The theme's display and body faces, two families (three with one outlier role). Display tracking -0.02 to -0.04em, line-height 1.0 to 1.15; body 16px or more at 1.5 to 1.65, 45 to 75ch. Headlines roman. Labels, captions, table heads and nav links in the body face, sentence case, untracked, never capitals (67), never mono unless mono is the material (64). A head is one weight and one colour throughout; the accented word is a tell (38iii).
- **States and motion.** Eight states on every interactive element; `transform` and `opacity` only; one orchestrated reveal per page, 0.4 to 0.8s, visible by default; exits at 60 to 75% of the enter; nothing bounces.
- **Browser surfaces.** Theme `::selection`, `caret-color`, `scrollbar-color`, the focus ring, underline offset and thickness, and tabular numerals on figures. The cheapest sign a page was built rather than assembled.
- **Stamp.** Line 1 of CSS:

```css
/* Hallmark · shape: Workbench · genre: modern-minimal · theme: Coral (deal 2/3, seed tracejam·2026-09-22·r0)
 * hero: Stage · nav: edge-aligned · footer: colophon line · enrichment: none · signature: live pricing table in the hero slot
 * axes: light/grotesk-sans/warm · posture: restrained · contrast: pass · fold: pass · v2.2.0 */
/* Hallmark · pre-emit critique: P4 H5 E4 S4 R5 V4 · weakest: E, focus ring was the body colour; moved to --color-focus */
```

then any `waive` and `answered` lines, then a custom run's direction contract. Everything the linter reads sits in the first 40 lines.
- **`tokens.css`** at the project root (the scaffold writes it) with every `--color-*`, `--font-*`, `--space-*`, `--text-*`, `--ease-*`, `--dur-*`, `--rule-*` and `--radius-*` token, imported by the page. On a `design.md` project, refresh its `## Exports` per [`references/export-formats.md`](references/export-formats.md).
- **Existing stylesheets are append-only.** Keep `@tailwind` and `@import "tailwindcss"` where they are, add Hallmark's `:root` below them, reuse the project's own token names where they exist. A full rewrite only on explicit request.
- **Log.** Append to `.hallmark/log.json`, newest first, trimmed to 20:

```json
{ "date": "2026-09-22", "shape": "Workbench", "theme": "Coral", "axes": "light/grotesk-sans/warm",
  "hero": "Stage", "nav": "edge-aligned", "footer": "colophon line", "enrichment": "none",
  "entry": "change of paper", "fingerprint": "Hanging|Asymmetric spans|Hairline|Outlined|Margin-aligned|None",
  "signature": "live pricing table in the hero slot", "waived": [], "brief": "Tracejam · observability" }
```

Dark mode and `design.md` are opt-in: only an explicit ask loads their files.

### 7. Sweep

1. `node <skill-dir>/scripts/sloplint.mjs <files> --genre <genre> --render` (add `--scope component` on a component). Fix every FAIL, re-run until clean. The render tier writes the screenshots you need next; do not run Chrome by hand.
2. Load [`references/gates.md`](references/gates.md) § 5 and walk the J and R/J gates. Confirm or dismiss every WARN. Fix every open Floor finding; fix or waive every Reflex one; answer every Finish one.
3. Review in fresh context per `gates.md` § 6: a subagent with the artifact, the screenshots, the stamp's theme or contract, and the gate table. Act on its first word (`recapture`, `rebuild`, `fix`, `ship`). Two rounds is the ceiling.
4. Update the Picks block's last row with the real outcome (`Floor 0 FAIL · Reflex 2 (1 waived: 47b) · finish-review: subagent, 3 resolved`). A fabricated pass is itself slop.

Verification is budgeted: one batched inspection, one fix batch, at most one confirming round, then stop polishing. Endless single-issue re-render loops are their own failure mode.

## Branches

- **Component scope**, **signal 8** (the archive builds, Hallmark sweeps and writes the `checked` stamp), **comp before build**, **harness tuning** for Codex and OpenCode, and the pre-flight edge cases live in [`references/flow.md`](references/flow.md). Read the section you are in, nothing else.
- **Fast mode** (`--fast`, or a brief that says quick, rough, demo, prototype): "go ahead" at Step 1 with a one-line disclosure, narration capped at three lines, the Finish tier skipped, Reflex gates waivable with a one-line reason. Not relaxed: the Floor, the stamp, `tokens.css`, the log, contrast.
- **Edit-time linting** (Claude Code): `node <skill-dir>/scripts/install-hook.mjs` wires sloplint as a PostToolUse hook that reports Floor findings the moment an artifact is written and stays quiet otherwise; Step 7 still runs.

## Scope

Hallmark is a taste skill for the rendered surface. It will not invent product copy (ask), pick a brand identity (follow the one given), enforce a style the user did not commit to, or build logic. In an existing project it never deletes routes or component trees without a file-level plan the user approved, and it states the files it will touch before touching them.
