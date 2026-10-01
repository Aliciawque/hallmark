### N5 · Floating pill
A rounded, content-sized nav, visibly detached from the edges, `--space-md` from the top, a blurred backdrop and a hairline ring.
*Use when:* modern-minimal or atmospheric pages where the hero has a surface or imagery for the blur to sit over.
*Not:* N1 (full width); N2 (a corner chip). A pill 95% of the viewport wide is a full width bar with round ends; if the links push it past 720px, drop a link or use N1.

```html
<nav class="nav-pill" aria-label="Primary">
  <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
  <ul class="nav-pill__links"><li><a href="/catalog">Catalog</a></li><li><a href="/voice">Voice</a></li></ul>
  <a class="cta-fill" href="/start">Start</a>
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

## Knobs

- Width: content sized · capped at 720px · capped at 560px
- Backdrop: blur and saturate · solid paper
- Anchor: top centre · top right

## Mobile

- Below 60rem: the links drop; wordmark and action stay in the pill. Below 40rem: a corner chip, wordmark left, menu right.
