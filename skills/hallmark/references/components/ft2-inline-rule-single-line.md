### Ft2 · Inline-rule single line
A single horizontal line of credits, address and copyright, each its own element with air between. Hairline rule above. No columns, no middle dots (63).
*Use when:* the page is editorial and the footer is an afterthought.
*Don't confuse with:* Ft4 Dense typographic (which packs more in).

```html
<footer class="foot-line">
  <p>© 2026</p>
  <p>137 Marlow Street</p>
  <p>MIT licensed</p>
</footer>
```
```css
.foot-line { display: flex; flex-wrap: wrap; gap: var(--space-xl); padding: var(--space-lg) var(--gutter); border-top: var(--rule-hair) solid var(--color-rule); font-size: var(--text-sm); color: var(--color-muted); }
.foot-line p { margin: 0; }
```

## Knobs

- Order: wordmark, links, credit · credit, wordmark, links
- Separator: the gap · a vertical hairline (`border-inline-start` on each `p` after the first) · a line break each
- Density: dense · spaced

*Mobile:* below 40rem the items stack into a vertical list and the hairline separator becomes a soft return.
