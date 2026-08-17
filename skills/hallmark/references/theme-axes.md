# Theme axes - the catalog Rotation lookup

The three diversification axes for every catalog theme, derived from the canonical token values. **This file is read on the catalog fast path only.** The Rotation block in [`SKILL.md`](../SKILL.md) reads it to pick the next theme: two consecutive themes must differ on at least one axis, and two candidates matching on two of three means pick a more distant one.

A derived run never opens this file. The anonymous digest of these coordinates lives in [`direction.md`](direction.md) § D § The worn coordinates; the two are maintained together by hand whenever a theme enters or leaves the catalog.

Bands: paper **dark** < 30% L · **mid** 30-85% · **light** > 85%. Accent: **warm** 10-60° · **cool** 200-300° · **neutral** chroma < 0.05 · **chromatic-other** anything else (sub-tag the hue).

| Theme | Paper band | Display style | Accent hue |
| --- | --- | --- | --- |
| Specimen | light (oat 96%) | high-contrast-serif (Bodoni Moda) | warm (signal orange ~35°) |
| Atelier | light (94%) | roman-serif (Sentient 700) | warm (umber ~40°, low chroma) |
| Brutal | light (98%) | display-heavy (Albert Sans) | warm (red ~25°) |
| Newsprint | light (92%, warm) | slab-serif (Zilla Slab) | warm (brick ~28°) |
| Studio | light (96.5%, cool) | roman-serif (Erode) | chromatic-green (~145°) |
| Manifesto | dark (10%) | display-condensed-bold (Anton) | warm (red ~25°) |
| Terminal | dark (11%, green) | mono (JetBrains Mono) | chromatic-phosphor (~138°) |
| Midnight | dark (15%, blue) | geometric-sans (Geist) | cool (~220°) |
| Almanac | mid (84%, cool slate stock) | grotesk-sans (Hanken Grotesk) | cool (~250°) |
| Garden | light (95.5%) | roman-serif (Young Serif) | chromatic-leaf (~140°) |
| Riso | mid (84%, pink stock) | grotesk-heavy (Public Sans 800/900) | cool (~220°) |
| Sport | light (98%) | display-condensed (Saira Condensed) | warm (~35°) |
| Bloom | light (97%) | geometric-sans (Geist) | warm (~35°) |
| Coral | light (96.5%) | grotesk-sans (General Sans) | warm (coral ~28°) |
| Cobalt | light (98.5%, cool) | grotesk-sans (Familjen Grotesk) | cool (~256°) |
| Aurora | dark (11%, teal) | geometric-sans (Sora) | chromatic-teal-green (~172°) |
| Editorial | light (94%, cream) | display-condensed (Bricolage Grotesque) | warm (coral ~35°) |
| Carnival | light (92%, warm) | display-heavy (Big Shoulders) | chromatic-amber (~95°) |
| Lumen | dark (13%, indigo; day drop flips light) | classical-serif (Instrument Serif) | warm (~50°) |
| Hum | light (97%, warm) | rounded-sans (Chillax) | chromatic-amber (~95°) |
| Grid | light (near-white 99%) | grotesk-heavy (Archivo 800) | one signal ink per page: warm (red ~28, default), cool (ultramarine ~264), or chromatic-yellow (~95, surface-only) |
| Ledger | dark, one of three bindings (navy 20% ~255 / bordeaux ~15 / cloth ~168), ruled: banded / columnar / journal | grotesk-sans + tabular mono (Instrument Sans + IBM Plex Mono) | two inks by side of the book, one of three pairs: teal+brass (default, ~185 / ~82), sage+clay (~150 / ~45), ice+oxide (~215 / ~38) |
| Arcade | dark (aubergine-black ~15%, hue shifts with the colourway; CRT stack: grille / mask / damper) | pixel display + marquee lettering (Silkscreen HUD + Bungee) | two neon inks, one of three colourways: ember+acid (default, ~40 / ~115), sodium+petrol (~72 / ~242), gold+oxblood (~90 / ~25) |

When two candidate themes match on two of the three axes, pick a more distant one. Known close pairs that rule arbitrates: Aurora ~172° vs Ledger ~185° (same teal family), Sport vs Editorial (both light/display-condensed/warm; scoreboard vs magazine register), Studio vs Atelier (both light/roman-serif; accent hue separates green from umber, and the faces are a chipped Erode against a bold Sentient). Display is roman by default; a single italicised word inside a roman heading is banned outright (gate 38a-i), and an italic display *system* is a Reflex gate a theme can carry if it declares one (38a-ii).

---

The rules governing what a theme *file* may and may not carry live in [`themes/README.md`](themes/README.md). Read that only when writing or editing a theme, never when building a page.
