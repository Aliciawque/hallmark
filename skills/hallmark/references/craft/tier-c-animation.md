## Tier C · Declarative animation (CSS first, JS when needed)

Use the platform first; reach for JS only when the platform cannot express the orchestration. The page-level motion rules (three easings, three durations, one reveal per page, `transform` and `opacity` only) are in `craft.md` § 5 and bind here too.

### CSS keyframes plus `@property`

`@property` defines typed custom properties (`<color>`, `<length>`, `<angle>`, `<number>`, `<percentage>`) that the browser interpolates smoothly. Without it, an animated custom property steps from start to end with nothing between. A functional loader, the one infinite loop that is always legal:

```css
@property --turn {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes turn { to { --turn: 360deg; } }

.loader {
  width: var(--space-lg);
  aspect-ratio: 1;
  border-radius: var(--radius-pill);
  background: conic-gradient(from var(--turn), var(--color-accent) 0 25%, var(--color-paper-2) 25% 100%);
  animation: turn 1.2s linear infinite;   /* linear is right for progress */
}
```

No JS, no library, composited. Reduced motion keeps a functional loader running (`craft.md` § 5); it collapses decorative loops instead.

### Scroll-driven animations

`animation-timeline: scroll()` and `view()` are Baseline; Firefox still needs a flag. The rule is progressive enhancement, and this is one of the named patterns in `scroll-choreography.md`, so it counts as the page's one scroll pattern (F8).

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: fade-up linear both;
    animation-timeline: view();
    animation-range: entry 0% cover 30%;
  }
}

@keyframes fade-up {
  from { opacity: 0; transform: translateY(var(--space-lg)); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Where supported, the element animates as it enters the viewport; elsewhere it is simply there, visible at rest (62). No JavaScript, no IntersectionObserver.

### View Transitions API

Same-document view transitions are Baseline; cross-document ones are in Chromium and Safari. Use them for a theme switch or any DOM swap:

```js
function applyTheme(theme) {
  const apply = () => { /* mutate the DOM */ };
  if (!reduced && document.startViewTransition) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}
```

The browser handles the cross-fade. No library for state changes.

### Motion, GSAP and friends: when each earns its bundle

| Library | When | Bundle | Verdict |
| --- | --- | --- | --- |
| **[Motion](https://motion.dev)** (`motion/react`, `motion`) | Orchestrated multi-element entrances in React (variants, `AnimatePresence`, viewport hooks) | About 6 KB with the React layer; Web Animations API backed | First reach for React |
| **[GSAP](https://gsap.com)** | Ambitious timelines, scrub on scroll, SVG path morphing across mismatched anchors, hero sequences with 20 or more elements | About 50 KB core; 100 KB or more with plugins | Worth it when timelines are the product; overkill for a fade-in |
| **AutoAnimate** | Trivial layout transitions in React (a list reflows, an element appears) | About 2 KB | Fine for what it does |
| **Anime.js** | Lightweight stagger and simple animation in vanilla JS | About 15 KB | Acceptable |
| **Theatre.js** | A visual editor plus code API for ambitious orchestration | Heavy, 80 KB or more | Single-page interactive art only |

**The decision rule:**

```
Single element, simple motion            → CSS keyframes / @property
Multiple elements, orchestrated entrance → Motion (React) or GSAP (vanilla, complex)
Scroll-progress-linked                   → one pattern from scroll-choreography.md (animation-timeline); GSAP ScrollTrigger only when that pattern needs JS
State change between two layouts         → View Transitions API
A list reflows in React                  → AutoAnimate
A hero narrative with scrubbing          → GSAP timeline plus ScrollTrigger
```

Motion for a single fade-in is the bundle-bloat tell; GSAP for a list reflow is the same tell, louder.

### Anti-patterns of declarative animation

- **Animating `width`, `height`, `top`, `left`, `margin` or `padding`.** Layout thrash; `transform` and `opacity` composite (10a).
- **Linear easing on UI.** Linear belongs to progress and loaders only.
- **Bouncy elastic on hero entrances** (`cubic-bezier(0.34, 1.56, …)` and friends). Reserved for a playful theme's declared waiver, on a real physical interaction like drag-release (12).
- **Importing Motion or GSAP for one fade-in.** `transition: opacity var(--dur-long) var(--ease-out)` is zero bytes.
- **Scroll-fade everything.** One orchestrated entrance on first load; the rest is simply there.
- **A reveal with no `prefers-reduced-motion` fallback.** Every transform and animation is guarded (27).
