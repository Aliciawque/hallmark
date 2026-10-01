### S3 · Sticky pinned
Heading remains in viewport while content scrolls beneath. Orientation aid.
*Use when:* the section is dense and the reader benefits from always seeing where they are. The persistence is itself the opening: nothing needs to introduce a heading that never leaves (`craft.md` § 7 item 12).
*Don't confuse with:* S1 Ordinal by structure (which does not move).

```html
<header class="head-sticky">
  <h2>…</h2>
</header>
```
```css
/* If the page has a sticky top nav, offset by its height so the sticky
   head docks beneath it instead of bleeding over (gate 56).
   --z-sticky (in-page) sits below the nav's --z-sticky-nav. */
.head-sticky { position: sticky; top: var(--banner-height, 0px); background: var(--color-paper); padding-block: var(--space-sm); border-bottom: var(--rule-hair) solid var(--color-rule); z-index: var(--z-sticky); }
```

**Sticky pairing rule.** If the page emits a sticky `<header>`, `<nav>` or `.banner` (anything with `position: sticky; top: 0`), it must also declare `--banner-height` (a px value matching the nav's height) and `--z-sticky-nav` (at least 1 above `--z-sticky`) in `tokens.css`. The recipe above pulls both; without them the section head paints over the nav during scroll (gate 56).

## Knobs

- Offset: `--banner-height` dock · 0 (no sticky nav)
- Border-bottom: hairline · ink, 1px
- Dock behaviour: pinned throughout · released at the section's end

*Mobile:* below 60rem the head stays sticky and `--banner-height` is re-measured; below 40rem it unsticks (`position: static`) and the border stays as the section rule.
