### HP2 · Marquee overflow

The h1 is set larger than the viewport on purpose and bleeds past the right edge: the headline is loud enough that the page cannot contain it. `html` and `body` already carry `overflow-x: clip` (34), so the spill never becomes a scroll width; the hero needs no clip of its own, and never `overflow-x: hidden`, which breaks sticky and fixed descendants.

*Use when:* the theme is loud (Brutal, Manifesto, Sport) and the title is short, six words or fewer. A long title plus overflow is noise.
*Avoid when:* the title carries information that must be read in full (a privacy notice, a terms page).

```html
<header class="hero hero--overflow">
  <h1 class="hero__display hero__display--xxl">LOUDER THAN THE ROOM.</h1>
  <p class="hero__lede">A festival for the bands nobody books.</p>
</header>
```
```css
.hero--overflow { padding: var(--space-2xl) var(--gutter); }
.hero__display--xxl { font-family: var(--font-display); font-weight: 800; font-size: clamp(4rem, 14vw, 14rem); line-height: 0.92; letter-spacing: -0.04em; margin: 0; white-space: nowrap; }
@media (max-width: 60rem) { .hero__display--xxl { white-space: normal; line-height: 1; font-size: clamp(2.5rem, 10vw, 5rem); } }
```

The single-line lockup may sit under 1.0 because it cannot wrap (55b); the moment it can wrap, under 60rem, line-height returns to 1.0 (55a). The uppercase is the theme's display voice, never a label.
