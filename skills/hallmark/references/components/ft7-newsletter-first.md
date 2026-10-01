### Ft7 · Newsletter-first
The form (label, input, submit) is the *primary* element of the footer; wordmark, links and copyright sit beneath in the body face, a step smaller.
*Use when:* the brand legitimately publishes and the page has *already* offered a subscription above the fold. The footer is a final invitation, not an ambush.
*Don't confuse with:* Ft1 (which asks for nothing).

```html
<footer class="foot-news">
  <form class="foot-news__form" action="/subscribe" method="post">
    <label for="foot-email">Monthly letters from the studio</label>
    <div class="foot-news__row">
      <input id="foot-email" name="email" type="email" required autocomplete="email">
      <button type="submit" class="cta-outline">Subscribe</button>
    </div>
  </form>
  <ul class="foot-news__meta">
    <li class="wordmark">Studio</li>
    <li>© 2026</li>
    <li><a href="/imprint">Imprint</a></li>
  </ul>
</footer>
```
```css
.foot-news { padding: var(--space-2xl) var(--gutter); display: grid; gap: var(--space-lg); max-width: 56ch; }
.foot-news__form label { display: block; font-size: var(--text-sm); margin-block-end: var(--space-2xs); }
.foot-news__row { display: flex; gap: var(--space-xs); }
.foot-news__row input, .foot-news__row button { min-height: 44px; }
.foot-news__row input { flex: 1; min-width: 0; padding-inline: var(--space-sm); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-input); background: var(--color-paper); font-size: var(--text-md); }
.foot-news__row input:focus-visible { outline: 2px solid var(--color-focus); outline-offset: -2px; }
.foot-news__meta { display: flex; gap: var(--space-lg); list-style: none; padding: 0; margin: 0; font-size: var(--text-sm); color: var(--color-muted); }
```

When the form is the page's main action (a petition, a mailing list that is the product), the submit is the page's primary style; otherwise the one filled primary lives above and the footer submit is secondary (F4). Input and button share a height (39a).

*Anti-pattern:* Ft7 when the page never said "subscribe" above the fold. If you did not ask, do not ambush: take Ft2 instead.

## Knobs

- Layout: stacked · inline · split (form left, meta right)
- Submit style: outline · typographic
- Privacy line under the form: yes · no

*Mobile:* below 40rem the input and button stack, each full width.
