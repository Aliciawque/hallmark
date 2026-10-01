### Recipe 2 · Minimal-line mascot

A small SVG character, face only, about 120 by 120 units, with personality and none of the uncanny-valley risk of a rendered figure. Two ellipse eyes with a blink loop, one quadratic-curve mouth, two stem accents (hair, hat, horns, antennae). Sits beside text. It does not react to the pointer; a hover state on a non-interactive element is a tell (11).

```html
<figure class="mascot" aria-label="A drawn face with two eyes and a small smile">
  <svg viewBox="0 0 120 130" class="mascot__svg">
    <circle class="mascot__head" cx="60" cy="60" r="42" />

    <ellipse class="mascot__eye mascot__eye--l" cx="46" cy="56" rx="4" ry="6" />
    <ellipse class="mascot__eye mascot__eye--r" cx="74" cy="56" rx="4" ry="6" />

    <path class="mascot__mouth" d="M 50 76 Q 60 84 70 76" />

    <path class="mascot__accent" d="M 32 22 Q 40 12 52 18" />
    <path class="mascot__accent" d="M 88 22 Q 80 12 68 18" />
  </svg>
</figure>
```

```css
.mascot { display: inline-block; width: 80px; height: 86px; margin: 0; vertical-align: -8px; }
.mascot__svg { width: 100%; height: 100%; color: var(--color-ink); }
.mascot__head { fill: color-mix(in oklab, var(--color-paper-2) 94%, var(--color-accent)); stroke: var(--color-ink); stroke-width: 2; }
.mascot__eye  { fill: var(--color-ink); animation: blink 5s var(--ease-in-out) infinite; }
.mascot__eye--r { animation-delay: 80ms; }   /* one eye lags a little, as a drawn face would */
@keyframes blink {
  0%, 8%, 92%, 100% { ry: 6px; }
  12%, 14%          { ry: 0.8px; }
}
.mascot__mouth { fill: none; stroke: var(--color-ink); stroke-width: 1.6; stroke-linecap: round; }
.mascot__accent { fill: none; stroke: var(--color-accent); stroke-width: 1.2; opacity: 0.6; stroke-linecap: round; }

@media (prefers-reduced-motion: reduce) {
  .mascot__eye { animation: none; }
}
```

**Use when** a small product, studio or indie brand needs personality without a generated character. **Avoid when** the mascot must be expressive across many states; the `@property` route is for simple loops, and articulated emotion is tier F territory.
