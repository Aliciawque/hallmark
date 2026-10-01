### N4 · Hidden behind ⌘K
No visible nav. One small control shows the shortcut; the palette opens with it.
*Use when:* the audience is technical and expects the affordance.
*Not:* N13 (the search is visible in the bar); N2 (always visible). The palette is a `<dialog>` that traps focus and closes on Escape, never a `<div>`.

```html
<button class="kbd-hint" type="button" aria-haspopup="dialog" aria-controls="palette">Menu <kbd>⌘</kbd><kbd>K</kbd></button>
<dialog class="palette" id="palette" aria-label="Go to">…</dialog>
```
```css
.kbd-hint { position: fixed; top: var(--space-md); right: var(--gutter); z-index: var(--z-sticky-nav); min-height: 44px; display: inline-flex; align-items: center; gap: var(--space-xs); padding: 0 var(--space-sm); background: var(--color-paper); border: var(--rule-hair) solid var(--color-rule); border-radius: var(--radius-input); color: var(--color-ink); cursor: pointer; }
.kbd-hint kbd { font-family: var(--font-outlier); font-size: var(--text-xs); padding: 0 var(--space-2xs); border: var(--rule-hair) solid var(--color-rule-2); border-radius: var(--radius-input); }
.kbd-hint:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
```

## Knobs

- Trigger: button and keyboard · keyboard first (the button stays for pointer users)
- Surface: centred modal · top sheet
- Recents: shown · hidden

## Mobile

- Below 60rem: the control reads "Menu" and opens the same dialog by tap.
