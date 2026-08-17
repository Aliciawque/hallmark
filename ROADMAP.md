# Roadmap

What's next. (v1.2 shipped: four new themes with the image hook, spec files for every theme, the edit-time lint hook, the Tier A conformance harness, variants v2 with progressive reveal + grafts + thumbnails + scoped injection and the corner dock, and the harness pivot - one core with per-harness adapters for Claude Code / Codex / OpenCode plus the multi-harness installer.)

**Since v1.2: the floor / library split.** The eyebrow is banned outright, in every geometry, with a DOM-shape detector behind it and twelve replacement openings in `section-entry.md`. The 58 gates gained tiers: 34 carry a Floor clause that nothing ships through, 18 are Reflex gates a build can waive on the record with a mechanically re-derived guard and no cap, 6 never block. `FAIL` and `REFLEX` are separate grades, so "0 FAIL" is a true claim about the floor even while a build still owes an argument above it. Themes were cut to a written contract and are material rather than page plans, which took them from 4,070 lines to 2,861. The catalogs stopped being a mandatory pick and became a place to look.

---

## Now

**Pay down the floor debt in the committed corpus.** Now that the gates are tiered, the real number is visible: across every committed page there are **56 Floor findings**, not the 230 the old flat linter reported. They cluster as 18 token improvisations (gate 48), 9 layout animations (14), 8 pages missing `overflow-x: clip` (34), 4 missing reduced-motion fallbacks (27), 4 missing stamps (20), 4 purple gradients (2), 3 long-word wraps (51), 3 missing focus rings (26), 2 double-sticky (56) and one placeholder name (19). Several are access failures and none of them is taste. This is the highest-value cleanup left.

**A Floor violation sits on the flagship example.** `site/examples/tally` italicises one word inside its roman hero headline, which is gate 38a-i, and that page is the first card in the README table. Either fix the headline or stop leading with it.

**Conformance on all three harnesses.** Tier A (`gen-cli.mjs`) drives Claude Code today; run it in a logged-in terminal. Next: the same conformance pass through `codex exec` and OpenCode's non-interactive run, asserting each harness loads its adapter (`harnesses/codex.md` / `harnesses/opencode.md`), holds the load-order discipline, and lands 0-FAIL sloplint. (The old Tier B bare-API open-model matrix is retired from the roadmap; the tooling stays in `eval/` as an archive.)

**Measure the variants speedup.** `eval/variants-bench.md` documents the four-config protocol; run it on a real authenticated machine and publish the wall-clock + token table (parallel + sketch + progressive vs the v1 baseline).

**Second example builds for the four new themes.** Each shipped with a canonical `-01`; add a `-02` on a second brief, and marketing cards on the homepage gallery.

---

## Next

**sloplint as an edit-time hook, on by default.** The hook exists (`scripts/install-hook.mjs`) and is opt-in. Consider shipping a project `.claude/settings.json` with it pre-wired, or a one-line prompt in `init`.

**Grow the direction atlas + rate the draw.** More lineages, usage-weighted dealing, a ratings pass so strong directions surface more often.

**Variants v2.1.** Screenshot thumbnails in the picker are in; next: DOM-injection with write-back for non-file-router apps (the hard AST-codemod path deliberately deferred), and a live variants demo wired on usehallmark.com.

**Brand-first flow.** From a short product description, generate a complete brand (palette, type, voice, imagery via the image hook) locked into a `design.md`; then every page builds against it.

**Theme-aware motion tokens.** Per-theme `--dur-micro` / `--dur-short` / `--dur-long`; Atelier should feel slower than Brutal.

**Multi-page coherence.** Lock the brand axes, vary the page-voice axes: different pages of the same site, not different sites.

**`study` reads your own codebase.** Third input mode: a path. Walk the files, extract the tokens + fingerprint in use, emit the same `design.md`.

**Charts reference.** A `data-viz.md`: small multiples over dense singles, one accent + neutrals, the worst chart types banned outright.

---

## Later

- **More harness adapters.** Claude Code, Codex, and OpenCode are first-class today; Gemini CLI / Copilot adapters only if demand shows up, same one-core-plus-adapter shape.
- **`hallmark explain`** - narrate the choices axis by axis; the skill teaches.
- **Negative-capability rules** - for each anti-pattern, the perceptual reason it fails.
- **Emotion-first prompting** - *nostalgic, optimistic, sceptical* instead of tone adjectives.
- **Sound + haptic policy** - when web sound is acceptable without kitsch.
- **Live preview as an MCP server** - watch, render, screenshot, feed back into the gate sweep (the `--render` tier and `gen-cli.mjs` are the seeds of this).
