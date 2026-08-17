# Genre — playful

For the consumer / friendly / onboarding-led page. Soft surfaces, mild colour, motion that responds to hover, friendlier voice. Closer to Notion's marketing or Figma's onboarding than to Stripe's API docs.

## When to pick it

Brief mentions any of: *fun, consumer, casual, family, kids, friendly, approachable, onboarding-heavy, community, social, tactile-but-soft, post-Linear-soft*. Pick playful sparingly — most consumer briefs still belong to editorial (warm-paper, hand-set) unless the user explicitly asks for *softer* and *friendlier*.


## Voice

- **Display** — Geist Sans 600 with tighter tracking (`-0.025em`), or a bricolage-style display weighted at 700. Friendly, not childish.
- **Body** — Geist Sans 400 in a slightly muted ink (not pure black).
- **Accent** — soft indigo, warm coral, or muted rose at low chroma. Always low — never the saturated consumer-app pop.
- **Layout** — slightly rounded surfaces, soft drop shadows, friendlier card edges (12 px radius is the upper bound).
- **Motion** — responsive on hover (cards lift slightly). One small bounce-free reveal per section. No spring physics on UI state.
- **Copy tone** — warm, direct, specific. Avoid quirk for quirk's sake. *"Made for teams who write together."* over *"For the squad ✨"*.

## What this genre allows

- **Soft drop shadows** on cards (`0 8px 24px -10px <accent at low chroma>`). Restrained.
- **12 px radius** on cards, 8 px on inputs, 999 px on pills.
- **Hover-lift animations** on cards (`translateY(-2px)` + shadow expansion).
- **Mild tinted backgrounds** on alternating sections (paper-2 vs paper, with a tinted band).
- **Soft accent colours** — `oklch(50% 0.13 282)` (indigo) and similar, never above 0.16 chroma.

## What this genre disallows

- **Saturated consumer-app pinks / purples** — playful keeps chroma low by default. **A system that declares a Full-palette or Drenched posture is the exception**: three or four named roles at chroma up to 0.24 are allowed, each with a stated job and footprint, per [`color.md`](../color.md) § Colour postures. Hum is the catalog's worked example of it; a derived build claims the same licence by declaring the posture, not by borrowing Hum's name.
- **Emoji-as-decoration** — emoji can appear in copy ("we built X 🌱") but never as visual ornament replacing iconography.
- **Comic Sans, Comic Neue, anything that signals "we're zany"** — playful stays sophisticated, even at full vibrancy.
- **Bouncy / overshoot easings** — playful uses smooth easings by default. **A system that declares spring motion in its direction contract is the exception**: overshoot (`cubic-bezier(0.34, 1.56, 0.64, 1)`) on the primary CTA and one character moment, one each per page, no more. Hum is the catalog's worked example; declaring it is what buys it.
- **Glassmorphism** — banned across all genres.
- **Gradient text** — gate 2 universal. Stays banned.

## Voice fixtures

- *"Made for teams who write together."* — Hum voice
- *"Soft, but exact."* — Hum voice
- *"Software can be soft and exact at once. That's the trick."* — Hum voice
- *"A small tool, gently opinionated."* — Hum voice
- *"Your daily 30-second curio."* — Hum voice
- *"Get really good at one thing this quarter."* — Hum voice
- *"Notice yourself, in 30 seconds."* — Hum voice
- *"Learn something genuinely new today."* — Hum voice

## Nav and footer voice

Loud but composed chrome fits here: a heavy slab bar, a dense product bar with rounded knobs, a banner, a marquee footer. What fights the genre is editorial furniture (a masthead) and the modern-minimal blur pill.

These are affinities, not assignments. Nothing here mandates an archetype code: the nav and footer are yours to design, and gates 42-43 only ask that if you land on the industry default you name it in the stamp rather than arriving there by reflex. [`component-cookbook.md`](../component-cookbook.md) § Navigation and § Footers is a place to look when you want a starting point.

## Stamp signature

```css
/* Hallmark · genre: playful · macrostructure: <name> · theme: <name> · enrichment: <tier> · nav: <shape or N#> · footer: <shape or Ft#> */
```

## Reference register

The aesthetic to match: soft surfaces, low-chroma colour, friendly-but-restrained type, hover-responsive motion. The post-Linear soft school. Never childish, never quirk-for-quirk.
