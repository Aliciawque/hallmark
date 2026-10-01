---
name: Enamel
slug: enamel
genre: playful
paper: mid 33 262
display: grotesk-sans Familjen Grotesk
accent: neutral 85
posture: drenched
keywords: hardware, trade, shop, workshop, tools, ironmonger, brewery, distillery, railway, heritage, counter, ledger, drawers, parts, catalogue, sign, repair, industrial, stock
material: fired blue enamel on steel, cream keylines twice over, rivets, drawers and number plates, Familjen Grotesk alone
signature: a double-keylined plate with a rivet in each corner, and one drawer pulled out of the bank
---

# Enamel

Fired blue enamel on steel: a saturated blue ground, cream keylines twice over, a rivet in each corner, drawers with pulls, number plates, Familjen Grotesk alone. The signature is the double-keylined plate with a rivet in each corner and one drawer pulled out of the bank.

## Tokens

```css
:root {
  --color-paper: oklch(33% 0.09 262); --color-paper-2: oklch(27% 0.08 262); --color-paper-3: oklch(38% 0.09 262);
  --color-ink: oklch(95% 0.012 85); --color-ink-2: oklch(84% 0.04 250); --color-muted: oklch(76% 0.05 250);
  --color-rule: oklch(44% 0.08 262);
  --color-accent: oklch(95% 0.012 85); --color-accent-ink: oklch(27% 0.08 262); --color-focus: oklch(76% 0.05 250);
  --color-damage: oklch(52% 0.15 40); --color-damage-2: oklch(38% 0.12 40);
  --font-display: "Familjen Grotesk", ui-sans-serif, system-ui, sans-serif; --font-body: var(--font-display);
  --font-outlier: "IBM Plex Mono", ui-monospace, monospace;
  --radius-card: 8px; --radius-pill: 3px; --rule-hair: 1px; --rule-bar: 2px;
  --shadow-card: none;
  --tracking-display: -0.02em;
}
```

One dial, the colourway, stated in the stamp (`enamel: sign`).

| Colourway | Ground | Key and ink | Note |
| --- | --- | --- | --- |
| `sign` (default) | oklch(33% 0.09 262) | cream oklch(95% 0.012 85) | the blue sign; muted oklch(76% 0.05 250) |
| `bottle` | oklch(36% 0.07 165) | cream oklch(95% 0.02 90) | the green sign; muted oklch(78% 0.05 150) |
| `cream-plate` | cream oklch(95% 0.012 85) | blue oklch(30% 0.09 262) | the sign reversed: plates, drawers and buttons invert; muted oklch(46% 0.06 262); paper band becomes light |

## Faces

- **Display:** Familjen Grotesk 700, line-height 1.02, `--tracking-display`, roman, sentence case, one weight and one colour per head. Only the wordmark is uppercase, tracked 0.04em.
- **Body:** Familjen Grotesk 400 and 500, 15 to 17px, line-height 1.5, in `--color-ink-2`. One family; the character comes from the keylines, never a font swap.
- **Plate text:** Familjen Grotesk 600 at 13 to 14px, sentence case, untracked, for drawer labels and plate titles; captions, table heads and meta are 500, one step smaller, sentence case, in `--color-muted`. Figures are 700 tabular at 16 to 40px for drawer numbers, counts and prices. Mono appears only inside code.

## Material

- The plate: a `--rule-bar` keyline in the key, radius 8, and a second keyline 4px inside it (two inset box-shadows, plate colour then key). Four 10px rivets, key with a plate-coloured centre, one per corner. Every container is a plate; there is no card.
- The drawer: a plate at radius 6 with a pull, a 30 by 6px rounded bar top right. The one that is out inverts to key, shifts 6px down and left, and shows its hole as a hard offset in the plate colour. In a bank of drawers one is always out.
- The chip: a rust blob with a darker centre and an irregular radius at the edge of a plate; at most one per plate. Rust is damage, not accent.
- Rules: `--rule-bar` in key above a section or a list; `--rule-hair` in `--color-rule` between rows; a dashed `--rule-bar` key line for a chain. Flat throughout: no soft shadow, no gradient, no texture, no photograph. The drawer's hard offset is the only depth.
- The control pair: a key-filled button at radius 3 in plate text beside a `--rule-bar` key outline; a third form is plate text on a `--rule-bar` key underline.

## Motion

A drawer slides out on click over 150ms ease-out and nothing else animates. Everything else is a state: a plate inverts, a search dims the drawers, a year lights. No scroll reveals, no swinging sign.

## Voice

A shopkeeper's: the drawer number, the count, the year, the price. Plain nouns, short lines, a ledger's honesty.

## Do-nots

- Never a second family; a serif on a plate is a pub sign and a mono label is a different shop.
- Never rust as an accent; a rust button or heading is damage spread over the whole sign.
- Never a single keyline; one line is a card, the second line 4px inside is the material.
- Never a radius over 8: plates 8, drawers 6, buttons 3.

## Build hint

```html
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

```css
.display { font: 700 var(--text-display)/1.02 var(--font-display); letter-spacing: var(--tracking-display); }
.plate-text { font-weight: 600; font-size: 13.5px; }
.plate { position: relative; background: var(--color-paper-2); border: var(--rule-bar) solid var(--color-ink); border-radius: var(--radius-card);
  box-shadow: inset 0 0 0 4px var(--color-paper-2), inset 0 0 0 5px var(--color-ink); }
.drawer { position: relative; background: var(--color-paper-2); border: var(--rule-bar) solid var(--color-ink); border-radius: 6px; padding: 12px; transition: transform 150ms ease-out; }
.drawer::after { content: ""; position: absolute; right: 12px; top: 12px; width: 30px; height: 6px; border-radius: 3px; background: var(--color-ink); }
.drawer.out { background: var(--color-ink); color: var(--color-accent-ink); transform: translate(-6px, 6px);
  box-shadow: 8px -8px 0 var(--color-paper-2), 8px -8px 0 2px var(--color-ink); }
.btn { background: var(--color-accent); color: var(--color-accent-ink); border-radius: var(--radius-pill); padding: 14px 28px; }
.btn--secondary { background: transparent; color: var(--color-ink); border: var(--rule-bar) solid var(--color-ink); }
::selection { background: oklch(76% 0.05 250 / 0.35); }
```
