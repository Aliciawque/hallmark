# Microinteractions

Loaded when the page has stateful UI. `craft.md` § 5 owns the durations, the three easings and the bans; `gates.md` owns the tells (10, 11, 12, 15, 16, 17, 18, 26, 27, 62). This file owns the recipes and the motion character, and repeats neither.

A microinteraction is one event with four parts: trigger, rules, feedback, loops and modes. Each recipe below names the trigger, what changes, the duration, the easing and the accessibility note.

## Principles

- **Motion has intent or motion is cut.** Every animation must clarify, guide, or confirm. If you cannot name what a transition communicates, it is decoration. Decoration is slop.
- **Silent success.** A successful action does *not* deserve a "Done!" toast. If the user sees the result, they don't need a confirmation. Reserve toasts for failures and for actions that hide their own effect.
- **Optimism with rollback.** Update the UI immediately on user action. Send the request in the background. If it fails, animate the rollback and offer Undo. Round-trip latency is a perception killer.
- **Restraint, not restraint-as-personality.** Hallmark is not "no motion." Hallmark is *the right motion in the right place.* A drag handle that springs into focus on grab is good. A page where every card pulses on hover is slop.
- **Reduced motion is a first-class state, not an afterthought.** Every interaction defines its reduced-motion behaviour explicitly. Default is: collapse spatial motion to opacity crossfade, keep duration ≤ 150ms, preserve functional state changes.
- **Keyboard first, hover second.** Every hover affordance has a focus equivalent. No interaction is hover-only.

## When to ship motion by default

The skill biases toward motion-cut. But certain archetypes feel **broken without** motion, they're so visually busy (or so number-led) that complete stillness reads as a screenshot rather than an interface. For these archetypes, ship 2 to 3 small purposeful microinteractions automatically, without waiting for the user to ask.

**Default-on archetypes:** Bento Grid · Stat-Led · Workbench · Marquee Hero · Conversational FAQ

**Default-off archetypes:** Manifesto · Letter · Quote-Led · Type Specimen · Long Document · Index-First · Photographic

For default-on, pick **two or three** from this menu (never more than three primitives per page):

| Microinteraction | When to ship | Recipe |
| --- | --- | --- |
| **Number reveal** | Stat-Led hero, headline numbers anywhere | IntersectionObserver fires on viewport entry; `requestAnimationFrame` counts from 0 to target over 1.2 to 1.6 s with `--ease-out`. Reduced-motion: skip animation, render final value. |
| **Pricing card lift** | Pricing tier cards | `translateY(-3px)` + shadow upgrade on `:hover`, 180 ms `--ease-out`. Active state: drop back to `translateY(0)` over 60 ms (the press). |
| **CTA hover lift** | Primary CTA buttons | `translateY(-1.5px)` + background-fade. 200 ms `--ease-out`. Active state at 60 ms. |
| **Marquee scroll** | Marquee Hero, customer-logo strip | `@keyframes marquee` `translateX(-100%)` over 40 to 60 s, infinite. Pauses on hover. Reduced-motion: stops the scroll, shows the first three items. |
| **Stagger reveal** | Testimonials, feature cards, gallery | IntersectionObserver fires on each card; 100 ms stagger; opacity 0 → 1 + `translateY(8px → 0)`; `--ease-out` 400 ms. **One-shot only, never re-fires on scroll.** |
| **Recommended-tier pulse** | The middle pricing tier | One-shot `@keyframes pulse-border` 2 s, runs once on viewport entry. Subtle: opacity 0.4 → 1 → 0.4 on the border. Don't loop. |
| **Caret blink** | *Inside* a typed command (install code, terminal nav, code mockup), never as standalone decoration | `@keyframes blink` 1 s steps(2) infinite on a 1ch-wide block, placed at the end of a typed command line so it reads as a "you'd type next" affordance. Reduced-motion: solid block, no blink. **Hard rule:** the caret must sit inside `<pre class="code">…▮</pre>` or an N8 Terminal nav line, never as a standalone `<span>` floating in a hero. |
| **Number tick on data update** | Dashboard live values | See *Number tick* recipe below. |

### Hard rules for default-on motion

1. Every animation respects `prefers-reduced-motion: reduce`, either skip entirely or run at 0.01 s.
2. **No more than three distinct animation primitives per page.** A counter + a hover-lift + a marquee = three. Don't add a fourth. The temptation to layer "just one more" is the slop pull.
3. No scroll-linked animations on viewports below 40 rem (existing mobile rule, [`component-cookbook.md` § Mobile collapse](component-cookbook.md)).
4. No animation longer than 2 s except continuous loops (marquee, ambient breathing, caret blink).
5. The removal test still applies: if nobody would notice the animation gone, cut it.

### What never gets default motion

- Body text reveals on scroll. Reading is not a cinematic experience.
- Background gradient shifts. Distracting.
- Cursor followers. Always slop.
- Section-by-section fade-up-stagger. Pick one orchestrated entrance, not twelve.
- Tab content sliding sideways. Crossfade only (see Tab change recipe below).

When the page is default-off (Editorial, Manifesto, etc.), motion is *opt-in*, the user must ask. Stillness is the brand on those pages.

## Recipes

Durations are `--dur-micro` 120ms, `--dur-short` 220ms and `--dur-long` 420ms; enters `--ease-out`, exits `--ease-in`, toggles `--ease-in-out` (`craft.md` § 5). A spring appears only under a declared spring posture on a playful theme, on the primary control and one character moment (gate 12); nothing else overshoots.

### Button press

Trigger: pointer down. Changes: `transform: scale(0.98)` on press, base styling on release. Duration: 100ms in, 150ms out. Easing: in `--ease-in`, out `--ease-out`. A11y: focus ring stays visible; never animate the focus ring's existence.

```css
.btn {
  transition: background-color var(--dur-short) var(--ease-out),
              transform 100ms var(--ease-out);
}
.btn:hover { background: var(--color-ink); color: var(--color-paper); }
.btn:active { transform: translateY(1px); }
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }
```

### Input focus

Trigger: focus. Changes: the outline appears instantly, the border may deepen one step, an optional tint on the field. Duration: colour at `--dur-short`, the ring at 0. Easing: `--ease-out`. The label sits above the field at rest and never moves (a floating label starts as a placeholder, which is the tell). A11y: `:focus-visible` only; reduced motion keeps the colour change.

### Form validation

Trigger: blur after the field has been touched once (the "touched" pattern), then re-validate on every input. Never validate on every keystroke from the start, it's hostile. Changes: icon scales in (200ms `--ease-out`), border tints, helper text replaces. Three-part error message: what broke, why, how to fix.

### Toast notification

Trigger: action completes (or fails). Stack at one viewport corner; new toasts push existing ones in one direction; existing toasts do **not** reposition when a new one arrives. Duration: 400ms slide-in `--ease-out`, 4 to 6s dwell, 300ms slide-out `--ease-in`. Pause auto-dismiss on hover/focus. **Use sparingly:** if the action's effect is visible (a row was deleted; you can see the row is gone), no toast. Errors *always* get a toast with retry/undo.

### Modal open / close

Trigger: explicit user action (click, key shortcut). Backdrop fades 300ms `--ease-out`. Content scales 0.96 → 1.0 + opacity 0 → 1, 300ms `--ease-out`. Close: 220ms `--ease-in`, scale 1.0 → 0.98, opacity → 0. Use the native `<dialog>` element, it handles focus trap and `::backdrop` for free. `inert` on background. First focus to first interactive element, not the close button. Reduced motion: opacity-only crossfade, 150ms.

### Dropdown / menu

Trigger: click or key shortcut. Open: 180ms `--ease-out`, optional 30ms-stagger items if there are ≤ 8 of them. Close: 140ms `--ease-in`. Light-dismiss on outside click and Escape. Use the Popover API where available. Anchor positioning: flip when within 16px of viewport edge.

### Tooltip

Trigger: mouse hover (with **800 to 1000ms delay** to prevent flash on casual movement) OR keyboard focus (with **0ms delay**, keyboard users reached this deliberately, never delay them). Animation: 150ms `--ease-out` opacity. WCAG 1.4.13: tooltip must be hoverable (you can move pointer onto it without it disappearing), persistent (doesn't disappear on accidental movement), and dismissible (Escape).

### Tab change

Trigger: click or arrow-key. Underline slides `transform: translateX()` + width transition, 250ms `--ease-out`. Outgoing content fades 100ms `--ease-in`, incoming fades 150ms `--ease-out` with a 50ms delay. **Never animate the tab content's height**, animate `grid-template-rows: 0fr → 1fr` if the tabs change height.

### Number tick

Trigger: data loaded. Counter increments from 0 to value over 400ms with `--ease-out` applied to the *value*, not the element. Use `Intl.NumberFormat` for locale-correct separators. A11y: announce the final value with `aria-live="polite"`, *not* every tick. Reduced motion: skip the tick, show the final value.

### Copy-to-clipboard

Trigger: click. Changes: button label swaps to "Copied" with a check icon; revert after 2.5s. **No toast.** The label change *is* the feedback. Restore on `mouseleave` if user moves away sooner.

```js
btn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(value);
  btn.dataset.state = "copied";
  setTimeout(() => delete btn.dataset.state, 2500);
});
```

```css
.copy-btn[data-state="copied"] .copy-btn__label::after { content: "Copied"; }
.copy-btn[data-state="copied"] .copy-btn__label > * { opacity: 0; }
```

### Drag handle

Trigger: hover (after **1 to 2s delay**, Notion's pattern). Changes: handle reveals via opacity transition, cursor switches to `grab`. On grab: cursor `grabbing`, ghost element at 50% opacity follows pointer, drop indicator (1px line, accent colour) tracks the nearest valid drop target. Spring stiffness 280 / damping 26 on release-snap. A11y: arrow-key reorder when the row is focused; announce drag state with `aria-live`.

### Optimistic update with rollback

Trigger: any action with a known-correct local prediction (toggle, like, archive, reorder). Changes: state mutates immediately; the row visibly updates. Async request fires. On success: nothing happens, silent success is the marker of taste. On failure: 200ms colour rollback animation + a toast with one Undo button. The toast does not auto-dismiss while the user might still want it.

```js
const prevState = item.completed;
item.completed = !prevState; render();
try {
  await api.update(item);
} catch {
  item.completed = prevState; render();
  toast({ tone: "error", message: "Couldn't save.", action: { label: "Try again", run: retry } });
}
```

### Search-as-you-type

Trigger: input event. Debounce by 250ms before requesting; while debouncing, show a subtle indicator (border opacity or label colour shift). Highlight matches in results with `<mark>`. A11y: announce result count with `aria-live="polite"` after debounce settles, never per keystroke.

### Command palette navigation

Trigger: ⌘K or `/`. Open: instant, no animation. Arrow-keys move selection, **the indicator transitions** between rows (120ms `--ease-out` on the highlight's `transform: translateY()`), but the items themselves don't move. Enter selects. Escape closes. Items stagger-fade in on first open only, never on filter change. The text input stays focused throughout. This is the Linear / Raycast / Vercel pattern.

### Page-load reveals

One orchestrated entrance. Stagger by DOM index, capped at ~500ms total. Use `IntersectionObserver`, never scroll listeners. After first reveal, no more on-scroll animations; let the page just *be there*. A system whose motion character is **still** skips reveals entirely; that is correct, not a bug.

## Motion character

Microinteractions adapt to the system's declared **motion character**. Every system declares exactly one: a catalog theme in its file, a derived direction in its contract (the character should be audible in the FORM block). The same button press is louder in a severe system than in a calm one.

| Character | Duration scale | Easing flavour | Feels like |
| --- | --- | --- | --- |
| **still** | 0× | none | Print. The page does not move. Exception: a caret may blink *inside* a typed command where the user would type; never standalone (see the Caret blink row above). |
| **severe** | 0.7-0.75× | `--ease-out` (sharp) | Fast, decisive, snaps into place. No spring anywhere. |
| **brisk** | 0.85-0.9× | `--ease-out` | Snappy, technical, functional; a reference book or an instrument panel. |
| **calm** | 1.0-1.3× | `--ease-out` (gentle at the high end) | Restrained through generous; springs only where the genre allows them. |

If the character is **still**, you do not animate. The page does not move. That is a deliberate design choice; it is not broken.

## When in doubt, cut

Most pages have too much motion, not too little. Before shipping, walk through every animation in your output and ask: *what would happen if this animation were instant?* If the answer is "nothing, the user wouldn't notice", remove the animation. If the answer is "the user would lose information about what changed", keep it.

The static answer is usually the right one.
