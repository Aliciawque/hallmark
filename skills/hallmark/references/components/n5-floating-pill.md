### N5 · Floating pill
A rounded, content-sized nav, visibly detached from the edges, `--space-md` from the top, a blurred backdrop and a hairline ring. It is a pill from the first paint, or it starts as a full bar and morphs into the pill once the reader scrolls.
*Use when:* modern-minimal or atmospheric pages where the hero has a surface or imagery for the blur to sit over, or a playful page with the pill on solid paper and no blur; the morph only when one kinetic moment earns its place on the page.
*Not:* N9 (edge-aligned, in flow); N2 (a corner chip). A pill 95% of the viewport wide is a full width bar with round ends; if the links push it past 720px, drop a link or use N9.

```html
<nav class="nav-pill" aria-label="Primary">
  <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
  <ul class="nav-pill__links"><li><a href="/catalog">Catalog</a></li><li><a href="/voice">Voice</a></li></ul>
  <a class="btn btn--primary" href="/start">Start</a>
</nav>
```
```css
.nav-pill { position: fixed; top: var(--space-md); left: 50%; transform: translateX(-50%); z-index: var(--z-sticky-nav);
  display: inline-flex; align-items: center; gap: var(--space-md); padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  background: color-mix(in oklab, var(--color-paper) 78%, transparent); backdrop-filter: blur(14px) saturate(120%);
  border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-pill); }
.nav-pill__links { display: flex; gap: var(--space-sm); list-style: none; margin: 0; padding: 0; }
.nav-pill a { font-size: var(--text-sm); text-decoration: none; }
```

#### On scroll: the morph from a bar

One DOM, two visual modes: `.nav` (outer, `position: sticky; top: 0`) owns the bar look, `.nav__inner` owns the pill look, cross-faded on one class toggle (`.is-floating`) with one timing curve.

```html
<header class="nav">
  <div class="nav__inner">
    <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
    <ul class="nav__links">…</ul>
    <a class="btn btn--primary" href="/install">Install</a>
  </div>
</header>
```

##### The four laws

**1. Total nav height stays constant.** If the outer's height changes when the state flips, every pixel below shifts and the page reads as jumping mid-scroll. Compensate the inner's shrink with the outer's `padding-block` so the sum is the same in both states (the 10b guard).

**2. The visible offset is `transform: translateY()`, never `padding` or `margin`.** The pill sits detached from the viewport top; adding padding to the outer breaks law 1. `transform` leaves layout alone: the pill drops visually and the box stays put.

**3. Cross-fade ownership of every shared visual.** For every property the outer carries at rest (background, border, backdrop-filter, box-shadow), neutralise it in `.is-floating` and put it in the transition list. Forget one, say a stale `backdrop-filter: blur(14px)` on the outer in floating mode, and an invisible blurred strip drags across the viewport behind nothing.

**4. One timing curve across every property.** Eight properties on eight curves read as eight animations. The same eight on `var(--dur-long)` and `var(--ease-out)` read as one motion.

##### The property morph, one curve

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

##### The scroll handler

```js
(() => {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:80px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => nav.classList.toggle("is-floating", !entry.isIntersecting)).observe(sentinel);
})();
```

An observer on an 80px sentinel at the top of the page flips the class once per change: no scroll listener, no throttle, nothing running while the reader scrolls (`craft.md` § 5).

##### What breaks it

1. Two `<header>` elements swapped by opacity: double DOM, broken focus order, content that desyncs.
2. Animating `top` or `margin-top` for the floating offset: layout on every frame. `transform` is the only lever.
3. `backdrop-filter: none` in the floating state: it snaps. `blur(0)` transitions.
4. Letting the nav height change between states: content jitter, the most damaging mistake in this pattern.
5. Different durations per property ("speed up the radius", "delay the shadow"): reads as broken even though everything moves. One curve.
6. A `scroll` listener where the sentinel would do: it runs on every frame to answer a question that changes twice.
7. A sentinel shorter than 60px: the morph fires on the slightest scroll.

One orchestrated morph and nothing else: the polish is the single curve and the height-constant arithmetic.

## Knobs

- Scroll: always a pill · morphs from a full bar past 80 to 120px
- Width: content sized · capped at 720px · capped at 560px
- Backdrop: blur and saturate · solid paper
- Anchor: top centre · top right

## Mobile

- Below 60rem: the morph is off and the links drop; wordmark and action stay in the pill. Below 40rem: a corner chip, wordmark left, menu right.
