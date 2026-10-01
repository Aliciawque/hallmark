### H2 · Split diptych
Headline and one sentence on one side, a capture or a photograph on the other. 7/5 or 6/6.
*Use when:* the claim has a visual proof.
*Not:* H6 (full bleed, not paired). The visual sits beside the text, centres within 60px (44c), never pinned to the viewport corner.

```html
<section class="hero-split">
  <div class="hero-split__copy"><h1>…</h1><p>…</p><a class="cta-outline" href="#">…</a></div>
  <figure class="hero-split__visual" data-slot="hero"></figure>
</section>
```
```css
.hero-split { min-height: 80dvh; display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: var(--gap-columns); align-items: center; padding-block: var(--space-2xl) var(--space-3xl); }
.hero-split__visual { margin: 0; aspect-ratio: 16 / 10; }
@media (max-width: 60rem) { .hero-split { grid-template-columns: minmax(0, 1fr); } }
```

## Knobs

- Ratio: 7/5 · 6/6 · 5/7
- Right side: capture · photograph · proof column
- Divider: air · hairline

## Mobile

- Below 60rem: one column, text first, the visual beneath at 16/9.
