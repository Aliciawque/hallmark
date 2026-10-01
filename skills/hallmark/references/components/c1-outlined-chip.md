### C1 · Outlined chip
A bordered, transparent button carrying the verb of the action ("Save changes"). No arrow, no icon.
*Use when:* the page has one primary action and it should be visible but quiet.
*Not:* the filled primary (a page has one of those); a chip with an arrow or a plus glued to its text (63).

```html
<a class="cta-outline" href="/studio">Open your studio</a>
```
```css
.cta-outline { display: inline-flex; align-items: center; min-height: 44px; padding: var(--space-sm) var(--space-lg); border: var(--rule-hair) solid var(--color-ink); border-radius: var(--radius-input); color: var(--color-ink); text-decoration: none; transition: background-color var(--dur-micro) var(--ease-out), transform var(--dur-micro) var(--ease-out); }
.cta-outline:hover { background: var(--color-paper-2); transform: translateY(-1px); }
.cta-outline:active { transform: translateY(0); }
.cta-outline:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
```

## Knobs

- Shape: rectangular · slab · pill (playful or tactile tones only)
- Density: spacious · compact
- Border: hairline · 2px

## Mobile

- Below 40rem: full width, one per row.
