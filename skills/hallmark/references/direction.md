# Direction - deriving the world

**This is the default path.** Loaded on every build that is not on the catalog fast path (see below). The direction is **made-to-measure for one brief**, written inline into the page's `:root`, never a permanent catalog entry. It spans two depths: **tuned** (a complete OKLCH palette + free-font pairing on Hallmark's structures) and **bespoke** (structure and composition designed from first principles too). One route, chosen depth.

**The freedom is the combination, never the floor.** Every constraint in [`color.md`](color.md), [`typography.md`](typography.md), and [`anti-patterns.md`](anti-patterns.md) still applies, and **every slop-test gate fires unchanged at every depth** (unpicked variants drafts alone defer the sweep to promotion, per [`verbs/variants.md`](verbs/variants.md)). The Step 5 Picks block surfaces the direction, posture, palette, and pairing in plain text before any code is emitted, so the user can redirect.

Derivation is the default because **the model's own taste is an attractor**. Left alone, a model asked for "something unique" ships the same two or three looks per category, every time; its favourite is deterministic, so asking it to choose is asking it to repeat itself. The ritual below is a set of outside interventions that break that pull: named rejections, a deterministic draw, a scene the palette must obey, and a contract the build is audited against.

## The catalog fast path

The 23 named themes are still here, and they are the right answer four times:

1. **The user names one.** "Use Newsprint", "give me that Ledger feel" is an instruction.
2. **`--fast`.** Speed is the ask; the catalog is the pre-built answer.
3. **A `design.md` or a real brand already exists.** Pre-flight found the system; inherit it. That branch never reaches this file.
4. **Component scope.** One button does not need a derived world.

Anything else derives. Do not ask which; do not mention the catalog. A brief that says nothing gets a world of its own, and the coordinates it must not land on are in § D § The worn coordinates below; the catalog itself stays shut on a derived run.

---

## § The ritual

Runs on every derived build, both depths, in order, before any palette work. Each step produces one or two written lines in the reply; the whole ritual reads as a short paragraph of decisions, not a form.

### R.1 · Reflex check

Name the category's obvious aesthetic AND the second-order trap, then reject both in writing. Two altitudes, both mandatory:

- First order: the aesthetic anyone would guess. Tea brand: sage, cream, forest green. Fintech: navy and emerald trust palette. AI tool: near-black with a glowing gradient.
- Second order: the "tasteful" fallback a design-literate model reaches for after dodging the first. Tea: editorial serif on bone paper. Fintech: monochrome Swiss restraint. AI tool: mono type and terminal green.

Format: *"Reflex check: rejecting <first-order> (the category default) and <second-order> (the tasteful fallback)."* Landing on either after writing this line means the self-check failed; redirect before continuing. The default and its predictable opposite are both the rut: dodging navy fintech by shipping anti-navy fintech is still steering by the default, just in reverse.

Third altitude, **the mirror**: if the slate you are about to write would fit the category's OTHER products unchanged, it is category gravity wearing a slate's clothes. Sharpen entries until at least three are only defensible for THIS product.

**Fourth altitude, the avoidance signature.** It is not enough that nobody could guess the aesthetic from the category. Ask the harder version: could they guess it from *the category plus what Hallmark always avoids*? Always dodging the same things is itself a pattern, and this skill's own anti-pattern list is long enough to form one. If the answer to either question is obvious, rework.

### R.2 · Spent defaults

Hallmark's own house defaults count as already spent for this brief family. Declare it before writing the slate. The spent table:

| Brief family | Already spent (do not land here) |
| --- | --- |
| warm / bookish / food / family | cream paper · serif display · lamplight amber accent |
| tech / developer / AI | near-black surface · one neon accent · mono labels |
| editorial / studio / portfolio | bone paper · high-contrast serif · hairline rules everywhere |
| playful / consumer | rounded sans · candy accent on white · blob shapes |
| luxury / craft | ivory · letterspaced small caps · no accent |
| health / science | clinical white · single blue · geometric sans |
| finance | navy · emerald · tabular mono |
| events / music | black · duotone photo treatment · condensed caps |

The spent look can still be *earned* if the draw lands on a direction that genuinely demands it; what is banned is drifting there by default.

**Your own rendition prior is spent too.** The table above is what the *category* has worn out; this is what *you* reach for regardless of the brief, and it bites hardest at execution rather than selection. A direction assigned honestly still gets rendered in the model's house palette unless the prior is named first.

| Model family | The prior to treat as already spent |
| --- | --- |
| Claude | Warm, bookish, family and child-facing subjects come out cream-grounded, serif-display, italic-accented and lamplit, whatever the draw said. Before writing code, re-read your own OWN-WORLD block: if it says cream, paper, parchment, ivory or lamplight on a brief that never pinned them, the rendition failed and reworks from the world's saturated materials. |
| GPT / Codex | Tight grotesk at 600, near-black on near-white, 12-16px radii, one blue accent, a 1px border under a soft shadow. Reads as competent product chrome and erases whatever world was drawn. |
| Gemini | Gradient-forward surfaces and pastel-to-saturate ramps standing in for material, plus hover motion on images that are not action targets. |
| Open-weight models | The strongest single tell is reversion to the training centroid mid-build: the first viewport commits, then section three quietly becomes a card grid on white. |

A pinned world pins the world, not its softest rendition: the pinned world's full material range stays in play, and a rendition that matches what any model ships for that world failed at execution, not selection.

Note that the axis triples Hallmark's own catalog occupies are spent too, on every derived run. § D § The worn coordinates carries that list and the tolerance that defines a collision; the catalog files themselves are never opened for this.

### R.3 · The slate

List ~7 grounded directions, numbered 1-7. Each is a **concrete visual system, artifact, place, or ritual this audience already knows**, one line each, with the germ of a system grammar. Not adjectives, not moods. Good slate entries name things that exist: a regional print tradition, a specific era of packaging, an instrument's control surface, a municipal document, a shop interior the audience has stood in.

Format per entry: *"3. The pharmacy blotter: clinical buff card, one federal-blue rule system, dosage-table typography."*

Two questions that pull the list away from the obvious: what would this thing look like as a physical object, and what did its world look like before the web? The audience's world includes its graphic traditions, not only its objects: a notation system, a documentation standard, a school of poster is as concrete a candidate as any artifact.

**Spread across material families.** If more than three of the seven share one material family (all paper goods, all screens, all signage), the derivation stopped at the subject's most obvious artifact. Dig until the list spans at least three families.

**The literal metaphor gets one seat.** The brief's own noun is allowed at most one slate entry: a coffee brand may seat one coffee-bag direction, not three. The audience's world is larger than the product's object.

### R.4 · The draw, and the challengers

The model never hand-picks from its own slate; its favourite is deterministic, and refusing that argmax is the whole point. An outside pick decides:

```
node <skill-dir>/scripts/seed.mjs "<brief-slug>" --n 7
```

The script prints a reproducible line: `draw: n/7 (seed <slug>·<date>·r0) · challengers: <name> · <name> · <name>`. Paste it into the Picks block. Re-roll (only when the user asks): rerun with `--reroll 1`, `--reroll 2`, and so on; it usually lands elsewhere (there is no exclusion; roll again if it repeats), and the seed key keeps every roll reproducible.

**Challengers.** The three dealt entries come from [`direction-atlas.json`](direction-atlas.json), a curated deck of complete design systems from real lineages, one from each tier: a **graphic system**, an **instrument language**, an **atmosphere world**. Each arrives with a five-line system grammar and one named browser technique. Judge each against the drawn slate entry on exactly two axes, **audience identification** and **product clarity**, in one written line per challenger with the verdict at the end: **wins** (it replaces the drawn entry), **competitive** (loses, but narrowly), **declined**. Challengers exist to break category gravity, never to win by novelty.

**Fusion, not costume.** A winning challenger supplies the form and its system grammar; the product supplies every fact, name, number, and claim; clarity wins every conflict. The page is the product wearing the challenger's system, never the challenger with the product's logo pasted on.

**The raise.** A challenger that loses does not just vanish: the strongest loser donates the one discipline of its system grammar the drawn direction lacks (a state language, a navigation topology, a material rule), named in one line: *"raise: the mixing desk's per-function control colouring, applied to the pricing tiers."* Every derived run ships either a winning challenger or one named raise; a run with neither treated the deal as ceremony.

**Script-less fallback** (no Node, no shell): N = (letter count of the brief, spaces and punctuation excluded) mod 7, pick slate entry N + 1; each re-roll adds 3 (mod 7). Print the arithmetic so the pick is reproducible: *"draw fallback: 142 letters mod 7 = 2, entry 3."* Skip challengers, and stamp the seed as `seed: fallback-<letters>·<date>·r<n>`.

### R.5 · The scene sentence

One concrete sentence placing a real person at a real time and place with the product. *"A subscriber in Vermont, 6:43am in early January; the kettle just clicked off; one lamp on."* The scene decides **surface lightness and light temperature** before any palette work: that sentence forces a dark surface with warm interior light, not a daylit white. § B.2 consumes this decision directly. A scene that does not constrain the surface is not concrete enough; rewrite it. This is the same scene sentence SKILL.md Step 4 asks for; write it once, here.

### R.6 · Colour posture

Commit to exactly one, with a one-line justification:

- **Restrained** - accent <= 5% of any viewport; the catalog's discipline.
- **Committed** - one colour carries 30-60% of the surface, routed through the surface tokens (`--color-field`, the paper family), while the accent token proper stays <= 5%.
- **Full palette** - 3 or 4 named roles, each with a stated job (field, signal, seal, ink).
- **Drenched** - the surface IS the colour; ink and rules derive from it.

Posture is declared in the stamp and the log. Gate 23 reads the posture: a declared surface colour is not accent footprint; undeclared accent sprawl still fails.

### R.7 · The direction contract

Five blocks, <= 150 words total, written into the artifact as a comment directly BELOW the macrostructure stamp and critique line (the stamp stays line 1, per gate 20), before any code, and mirrored in the Step 5 Picks block:

```
/* direction contract · seed <key>
 * THESIS: the one-sentence position this page takes.
 * OWN-WORLD: what makes it not-anyone's-page; the drawn direction, named.
 * STORY: the scene sentence.
 * FIRST-VIEWPORT: what the fold shows, concretely.
 * FORM: structure + the one signature move.
 */
```

If a block reads like a mood ("elegant, premium feel"), the direction is not decided yet; rewrite it until each block is checkable. **The signature move** named in FORM is the one structural or visual idea a visitor would describe to a friend; a page without one is a template with nice tokens.

### R.7b · What the stamp and the log carry

The base stamp and the base log entry are specified in [`SKILL.md`](../SKILL.md) § 6 and § 2. A derived run extends both:

```css
/* Hallmark · macrostructure: <name or "bespoke: <one-line shape>"> · <hero archetype + knobs>
 * theme: custom · direction: "<drawn direction>" · vibe: "<4-8 words>"
 * paper: oklch(<L>% <C> <H>) · accent: oklch(<L>% <C> <H>) · display: <font> · body: <font>
 * axes: <paper-band> / <display-style> / <accent-hue> · posture: <posture>
 * seed: <slug>·<date>·r<n> · challenger: <name> (<wins | raise: one line | declined>)
 * contract: kept (5/5) · studied: no · v1.2.0
 */
```

`contract: kept (5/5)` is written only after the finish review below confirms it. The log entry adds the same values as fields: `"theme": "custom"`, `"direction"`, `"posture"`, `"seed"`, `"challenger"` (name plus verdict, and the raise when one was taken), `"vibe"`, and the `"axes"` triple (one key, the same one a catalog entry uses; Rotation reads it either way).

---

## § Bespoke depth

Most derived runs are tuned. **Bespoke** is the deep end: the brief's structure itself is the ask and no catalog shape fits. The ritual runs identically (R.1 through R.7); bespoke changes what the build may drop:

**It drops:** the fixed macrostructure + archetype catalog (compose the structure for the idea; a novel hero, nav, or section is encouraged when it serves the FORM block); the genre cluster routing; the diversification rotation (bespoke is a one-off, though it must not clone a recent bespoke run).

**It keeps:** every universal slop-test gate; accessibility and contrast (APCA / WCAG, visible `:focus-visible`, `prefers-reduced-motion`, semantic landmarks, alt text); the font ban list and free-baseline discipline (§ C); OKLCH palette discipline (§ B); one orchestrated motion; the Step 5 Picks block before code; the stamp + log.

Bespoke is more design judgment, not less: a bespoke page that reads generic, or trips a gate, has failed. It is also rare; reaching for bespoke on a vanilla brief is over-reach.

---

## § A · The one follow-up question

Ask **one** thing in **one** message, alongside the Step 1 questions rather than after them:

> *"One more input: describe the brand's vibe in 4-8 words. Examples: 'archival warmth, hand-set, no varnish' · 'industrial precision, cool, technical' · 'moss, lichen, soft pink, herbal'.*
>
> *Optional: an anchor colour - hex, OKLCH, or a name like 'terracotta', 'sea-blue'. Skip it and I'll pick one from the vibe."*

Do not ask anything else; audience / use / tone from Step 1 plus the vibe is enough. Two or three words is enough to proceed; a paragraph gets compressed to 4-8 words for the stamp. The ritual runs regardless of how the user answers; the vibe feeds R.3's slate.

---

## § B · Palette construction

Build in this order; each step applies the cited rule without restating it.

### B.0 · Posture and scene set the frame

Before any values: the scene sentence (R.5) fixes the paper's lightness band and light temperature; the posture (R.6) decides where large colour lives. Committed and Drenched route their colour through the paper / field tokens, never by inflating the accent's footprint.

### B.1 · Anchor accent first

- Convert the named or hex anchor to OKLCH; clamp chroma to **0.12-0.20** (inside the cap in [`color.md`](color.md) § Palette construction). When the brief names a REAL brand, the anchor comes from `.hallmark/brand-spec.md` ([`brand-truth.md`](brand-truth.md)), never from memory.
- No anchor given: derive hue from the vibe: warmth 30-60° · technical 220-250° · botanical 130-160° · late-night neon 280-320° · sun-drenched 60-80°. Chroma 0.12-0.16.

### B.2 · Paper

- Paper L from the scene sentence: bright / airy → **L 95-98%** (warm-tinted) · archival / editorial → **L 92-95%** · clinical / spec-sheet → **L 98-100%** near-white, cool-tinted · dark / late-night → **L 12-18%**, anchor-tinted.
- **Always tint paper toward the anchor hue, chroma 0.005-0.020** per [`color.md`](color.md) § Principles (tint the greys).
- Committed posture: the carried colour becomes `--color-field` at the scene's lightness band; paper stays a quiet neighbour. Drenched posture: paper IS the anchor at usable lightness; ink derives from it.
- Paper-2: step ±2-4% L. Paper-3 (optional): ±5-7% L.

### B.3 · Ink

- Paper L < 50: ink L **88-96%**. Paper L >= 50: ink L **16-24%**.
- Tint ink chroma **0.005-0.014** toward the anchor. Ink-2: 4-8% L toward paper, same hue family.

### B.4 · Supporting greys

Step ~6-10% L between paper and ink, all tinted toward the anchor (chroma 0.005-0.018): `--color-rule` (L ~70-82% light paper / ~26-34% dark), `--color-rule-2` (4-6% closer to paper), `--color-muted` (L ~38-56%), `--color-neutral` (L ~30-56%). The L-steps give typographic depth without leaning on accent.

### B.5 · Focus

Same hue as accent, chroma 0.18-0.22, L ±5% of accent. `:focus-visible` only; appears instantly.

### B.6 · Accent-ink

Text on accent fills: accent L > 50 uses ink; accent L <= 50 uses paper. Verify APCA >= Lc 60 / WCAG 4.5:1 for body, 3:1 for large text.

### B.6b · Texture (print-lineage draws only)

When the drawn direction's lineage is print (riso zine, letterpress, ticket stock, line-printer), it may draw ONE artifact from [`texture.md`](texture.md) under that file's budget tokens. Digital-native draws take none; texture is earned by lineage, never added for warmth.

### B.7 · Verification

Gate 7 (no pure #000/#fff): paper and ink both carry chroma. Gate 22 (no zero-chroma neutrals): every grey >= 0.005. Gate 23 (accent footprint): plan the accent's role; under Committed / Drenched the carried colour lives in field / paper tokens and the accent proper still keeps to a signal.

---

## § C · Font pairing

A derived system pulls from the tone pairings in [`typography.md`](typography.md), and **may mix tones** - that is the freedom:

- Editorial display + Technical body: an academic-tone SaaS.
- Brutalist display + Editorial body: a manifesto magazine.
- Playful display + Austere body: a creator-tool brand.
- Luxury display + Technical body: a hand-crafted dev tool.

One display face, one body face, optional mono. The discipline: **free-baseline only** unless the user confirms licences; the banned defaults stay banned (gate 1); variable fonts preferred. Then confirm the pair reads: enough weight contrast in the display, body legible at >= 14px across 45-75ch, mono-on-mono only when the mono IS the design. The drawn direction (R.4) should be audible in the pairing: a ledger direction wants tabular figures; a playbill direction wants wood-type energy in the display slot.

---

## § D · Axes and posture

A derived system declares its diversification values explicitly so the Rotation block in [`SKILL.md`](../SKILL.md) fires the same as catalog:

- **Paper band:** dark (L < 30%) · mid (30-85%) · light (> 85%).
- **Display style:** italic-serif · roman-serif · geometric-sans · grotesk-sans · mono · display-condensed-bold · display-heavy · slab-serif · system-native · risograph-bold · handwritten (rare).
- **Accent hue band:** warm 10-60° · cool 200-300° · neutral (chroma < 0.05) · chromatic-other (sub-tag the anchor: `chromatic-moss ~140°`).
- **Posture** (fourth logged value): restrained · committed · full-palette · drenched.

Before the triple is final, check it against the digest below. A triple that survives it is the thing the route was built to produce.

### The worn coordinates

The axis triples Hallmark's own catalog already occupies, deduplicated, with no theme names attached. **A constructed system that lands within tolerance of one has failed the reflex check** - not "is unoriginal", not "should be reconsidered": failed, the same way R.1 fails when the slate lands on the category default. **Within tolerance** means all three at once: same paper band; same display class at this digest's grain (`grotesk-sans` and `grotesk-heavy` are different classes, and `roman-serif`, `high-contrast-serif` and `slab-serif` are three); same accent band, or hues within **20°** of each other for two `chromatic-other` entries. Matching two of three is fine and common; it is the full triple that means you re-derived something that already exists.

Occupied triples, grouped by paper band:

- **Light** (the most worn band by far; a derived light-paper system has the least room, which is itself a nudge): high-contrast-serif / warm · roman-serif / warm · roman-serif / chromatic-green ~140-145 · slab-serif / warm · display-heavy / warm · display-heavy / chromatic-amber ~95 · display-condensed / warm · geometric-sans / warm · grotesk-sans / warm · grotesk-sans / cool · grotesk-heavy / warm ~28 and cool ~264 and chromatic-yellow ~95 · rounded-sans / chromatic-amber ~95 · classical-serif / cool ~265
- **Mid**: grotesk-sans / cool · grotesk-heavy / cool
- **Dark**: display-condensed-bold / warm · mono / chromatic-phosphor ~138 · geometric-sans / cool · geometric-sans / chromatic-teal ~172 · classical-serif / warm · grotesk-sans / chromatic-teal ~185, chromatic-sage ~150, and cool ~215 · pixel-display / warm ~25-72, cool ~242, chromatic ~90-115

Three of those rows are multi-dial themes that occupy several accent bands at one paper-and-display coordinate, so check the whole row rather than its first value.

**When you land there.** Move one axis, and prefer the one the brief cares least about - usually accent hue, occasionally paper band, rarely display class (the display carries the direction and is the most expensive thing to trade away). Then say it happened in one line: *"Landed on an occupied triple (light / grotesk-sans / cool); moved accent to chromatic-moss ~145."* Silence here is the failure mode, not the collision.

**Two exceptions, both narrow.** The user asking for a named theme's look is the catalog fast path, not a collision. And the draw can earn a coordinate: a direction that genuinely demands it (a line-printer draw wanting dark paper and a mono display) may keep it, with the same one-line argument R.2 requires for landing on a spent default; a draw that "happens to" land on an occupied triple twice in one project is not a draw, it is a preference.

This is not as tight a constraint as it looks: three paper bands times a display class times an accent band leaves a derived system nearly the whole space, minus the couple dozen places Hallmark has already been. Maintenance: this digest is edited by hand whenever a theme enters or leaves `references/themes/`; the reminder lives in [`themes/README.md`](themes/README.md).

---

## § The finish review

Before the slop test, re-read the direction contract promise by promise: THESIS still the page's position? OWN-WORLD visible in the shipped surface, or did the build drift back toward a spent default? STORY's light still in the palette? FIRST-VIEWPORT actually what the fold shows? FORM's signature move present and load-bearing? **Any unkept promise = revise, not ship.** Then run Step 7 as normal. This review never replaces the gate sweep.

## What derivation does **not** do

1. **Does not lower the floor.** Every gate fires; a derived page that trips one is not "expressive", it is broken.
2. **Does not extend the catalog.** The system is written inline for this page, never added to `references/themes/`.
3. **Does not invent facts.** Gate 46a binds hardest here, because a fresh world is where invented proof feels most at home.
4. **Does not skip the draw.** The model's own #1 pick is exactly what the draw exists to refuse; a build with no seed line in the stamp is over-invented. Audit it; redirect.
5. **Does not mean more decoration.** A derived system is a tighter argument than a catalog theme, not a louder one.
