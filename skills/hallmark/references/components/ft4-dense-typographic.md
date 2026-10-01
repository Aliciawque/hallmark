### Ft4 · Dense typographic
One block of text, credits, references, licence and address, in the body face a step smaller, ragged-right or justified with `hyphens: auto`. A colophon, not a sitemap. Mono only when mono is the theme's material (64).
*Use when:* the brand is editorial and a colophon-style sign-off fits.
*Don't confuse with:* Ft3 Index (which navigates).

```html
<footer class="foot-dense">
  <p>Set in the display and body faces named in the stamp. MIT licensed. 137 Marlow Street, 2026.</p>
</footer>
```
```css
.foot-dense { padding: var(--space-2xl) var(--gutter); max-width: 65ch; font-size: var(--text-sm); color: var(--color-muted); line-height: 1.6; }
.foot-dense p { margin: 0; }
```

## Knobs

- Family: body · display at text size · mono, only on a mono theme
- Layout: single block · short paragraphs · a log, one entry per line
- Includes: build hash · date · type credit
