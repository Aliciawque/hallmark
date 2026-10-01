### N9 · Edge-aligned minimal
Wordmark hard left, one action hard right, nothing between. The absence is the design.
*Use when:* luxury, quiet, atelier pages where the brand earns silence; the default bar when a page has one destination.
*Not:* N1 (fills the middle). Four links "to fill the space" makes N1 with extra steps. The action is a verb ("Book a fitting"), never "Get" with an arrow (63).

```html
<header class="nav-edge">
  <a class="wordmark" href="/" aria-label="Studio, home">Studio</a>
  <a class="cta-outline" href="/book">Book a fitting</a>
</header>
```
```css
.nav-edge { display: flex; justify-content: space-between; align-items: center; padding: var(--space-md) var(--gutter); }
.nav-edge .wordmark { font-family: var(--font-display); font-size: var(--text-md); text-decoration: none; }
```

## Knobs

- Action: outlined · filled pill · typographic link
- Wordmark: display face · body face · the outlier
- Padding block: `--space-sm` · `--space-md` · `--space-lg`

## Mobile

- Below 40rem: the action keeps a 44px hit target.
