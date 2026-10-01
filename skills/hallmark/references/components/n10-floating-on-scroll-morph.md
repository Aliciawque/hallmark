### N10 · Floating-on-scroll morph
A sticky bar at the top that morphs into a floating pill once the user scrolls past a threshold. Two visual modes share one DOM: `.nav` (outer) owns the bar look, `.nav__inner` (inner) owns the pill look. Cross-faded on one class toggle (`.is-floating`) with one timing curve.
*Use when:* atmospheric or modern-minimal pages where one kinetic moment earns its place. One surprise; it resists novelty.
*Not:* N5 (always a pill, no scroll behaviour). N10 is N5 plus a default bar state that morphs into it.

```html
<header class="nav">
  <div class="nav__inner">
    <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
    <ul class="nav__links">…</ul>
    <a class="cta" href="/install">Install</a>
  </div>
</header>
```

#### The four laws

**1. Total nav height stays constant.** If the outer's height changes when the state flips, every pixel below shifts and the page reads as jumping mid-scroll. Compensate the inner's shrink with the outer's `padding-block` so the sum is the same in both states (the 10b guard).

**2. The visible offset is `transform: translateY()`, never `padding` or `margin`.** The pill sits detached from the viewport top; adding padding to the outer breaks law 1. `transform` leaves layout alone: the pill drops visually and the box stays put.

**3. Cross-fade ownership of every shared visual.** For every property the outer carries at rest (background, border, backdrop-filter, box-shadow), neutralise it in `.is-floating` and put it in the transition list. Forget one, say a stale `backdrop-filter: blur(14px)` on the outer in floating mode, and an invisible blurred strip drags across the viewport behind nothing.

**4. One timing curve across every property.** Eight properties on eight curves read as eight animations. The same eight on `var(--dur-long)` and `var(--ease-out)` read as one motion.

#### The property morph, one curve

| Element | Property | Default | Floating |
|---|---|---|---|
| `.nav` | `padding-block` | `0` | `var(--space-2xs)` |
| `.nav` | `background-color` | `color-mix(in oklab, var(--color-paper) 62%, transparent)` | `transparent` |
| `.nav` | `border-block-end-color` | `var(--color-rule)` | `transparent` |
| `.nav` | `backdrop-filter` | `saturate(1.4) blur(14px)` | `blur(0)` |
| `.nav__inner` | `max-width` | `var(--container)` | `58rem` |
| `.nav__inner` | `min-height` | `60px` | `52px` |
| `.nav__inner` | `padding-block` | `var(--space-sm)` | `var(--space-2xs)` |
| `.nav__inner` | `border-radius` | `0` | `var(--radius-pill)` |
| `.nav__inner` | `background-color` | `transparent` | `color-mix(in oklab, var(--color-paper) 82%, transparent)` |
| `.nav__inner` | `backdrop-filter` | `blur(0)` | `blur(18px)` |
| `.nav__inner` | `box-shadow` | `none` | `var(--shadow-card), inset 0 0 0 1px var(--color-rule)` |
| `.nav__inner` | `transform` | `translateY(0)` | `translateY(var(--space-sm))` |

The outer is `position: sticky; top: 0; z-index: var(--z-sticky-nav)`. Use `blur(0)`, not `none`: `none` snaps, `blur(0)` transitions. `backdrop-filter` transitions are baseline in every current browser.

#### The scroll handler

```js
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const THRESHOLD = 80;          // 60px or more, so micro-scrolls do not twitch it
  let floating = false;
  let ticking = false;
  const update = () => {
    const next = window.scrollY > THRESHOLD;
    if (next !== floating) {     // flip guard: toggle once per state change
      floating = next;
      nav.classList.toggle("is-floating", floating);
    }
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  update();
})();
```

Three discipline points: `passive: true` (the listener never calls `preventDefault`, so the main thread stays free for scrolling); a `requestAnimationFrame` throttle (at most one update per paint); the flip guard (the class changes once per state change, not once per scroll event).

#### What breaks it

1. Two `<header>` elements swapped by opacity: double DOM, broken focus order, content that desyncs.
2. Animating `top` or `margin-top` for the floating offset: layout on every frame. `transform` is the only lever.
3. `backdrop-filter: none` in the floating state: it snaps. `blur(0)` transitions.
4. Letting the nav height change between states: content jitter, the most damaging mistake in this pattern.
5. Different durations per property ("speed up the radius", "delay the shadow"): reads as broken even though everything moves. One curve.
6. A `scroll` listener without `{ passive: true }` or without the rAF throttle: both kill mobile scroll performance.
7. A threshold of 0: the morph fires on the slightest scroll. Use 60px or more.
8. No flip guard: toggling the class on every scroll event thrashes layout.

One orchestrated morph and nothing else: the polish is the single curve and the height-constant arithmetic.

## Knobs

- Threshold: 80 to 120px · one viewport
- Pill width: content sized · capped at 560px
- Cross-fade: `--dur-short` · `--dur-long`

## Mobile

- Below 60rem: the morph is off; the nav renders as the floating pill only. Below 40rem: a corner chip, wordmark left, menu right (as N5).
