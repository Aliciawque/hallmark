### Ft5 · Statement
One large display sentence dominates the footer: a closing line, not a sitemap. Wordmark, minimal links and copyright sit beneath in the body face, a step smaller. The sentence is concrete and pairs with the page's argument; a slogan is gate 19 filler.
*Use when:* the page wants a *closing line*: editorial, manifesto, atmospheric, and still has a fact it has not used; on a thin brief whose facts are all spent, Ft2's one line instead.
*Don't confuse with:* Ft1 Mast-headed (which leads with the wordmark, not a sentence).

```html
<footer class="foot-stmt">
  <p class="foot-stmt__line">Every plate is cut by hand in Marlow.</p>
  <div class="foot-stmt__meta">
    <span class="wordmark">Studio</span>
    <span>© 2026</span>
    <span>MIT licensed</span>
  </div>
</footer>
```
```css
.foot-stmt { padding: var(--space-2xl) var(--gutter) var(--space-xl); display: grid; gap: var(--space-lg); }
.foot-stmt__line { font-family: var(--font-display); font-size: clamp(1.75rem, 5vw, 3.25rem); line-height: 1.0; letter-spacing: -0.02em; max-width: 28ch; margin: 0; overflow-wrap: break-word; min-width: 0; }
.foot-stmt__meta { display: flex; gap: var(--space-xl); align-items: baseline; padding-block-start: var(--space-sm); border-top: var(--rule-hair) solid var(--color-rule); font-size: var(--text-sm); color: var(--color-muted); }
.foot-stmt__meta .wordmark { margin-inline-end: auto; color: var(--color-ink); }
```

*Anti-pattern:* a Statement footer on a docs root or hub, where the sentence is marketing; take Ft3 there.

## Knobs

- Sentence width: 28ch · 38ch · 50ch
- Wordmark position: under the sentence · top-right · none
- Rule above meta: hairline · double · none

*Mobile:* below 60rem the sentence stays full width and the meta row stacks.
