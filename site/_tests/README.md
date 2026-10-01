# Generation tests

Thirteen pages produced by running the Hallmark skill on contrasting briefs without hand-holding it on theme, shape or enrichment. They are kept as a record of what the skill produced at the time, and they predate v2: the themes named below were folded into the current catalog, and the pages trip several gates added since (tracked-caps labels, middle-dot meta strings, arrow suffixes, mono labels, the fold at three widths). Read them as history, not as reference builds.

| # | Brief | Context given | What the skill picked |
| --- | --- | --- | --- |
| 01 | Indie podcast, Tide | skipped ("you pick") | Letter shape, warm cream paper, no enrichment |
| 02 | Open-source CLI, Streampipe | full | Long Document, Terminal (requested), inline CSS-art terminal |
| 03 | Artisan bakery, Maple Street Bread | full | Catalogue, Almanac, hand-built SVG bread silhouettes |
| 04 | Studio manifesto, Meridian | partial ("declarative, no flashy stuff") | Quote-Led, Brutal, no enrichment |
| 05 | SaaS observability, Tracejam | full | Workbench, Midnight, a sticky trace panel |
| 06 | Personal one-pager, Anya | skipped ("just figure it out") | Index-First, near-white paper, no enrichment |
| 07 | Compliance SaaS, Foundry | full | Bento Grid, Newsprint, a logo grid of placeholders |
| 08 | Cohort-based courses, Cohort | full | Stat-Led, warm beige paper, the brief's range as the hero |
| 09 to 13 | Slow Pour, Owl Hours, Soroe Ceramics, Loafer, Alma | mixed | later single-file builds |

Folders 01 to 08 hold `brief.md` (the verbatim prompt and the flow the skill walked), `index.html` and `style.css` with the stamp at the top. Folders 09 to 13 are single `index.html` files. Open any one directly or through the local dev server at `http://localhost:8765/_tests/<folder>/`.

## What the exercise showed

- Eight briefs produced eight structurally different pages: no shape, hero archetype or footer repeated, and no two pages share a font stack.
- Three of the first six shipped with no enrichment (the podcast, the manifesto, the portfolio), which the earlier anti-slop pass had failed to do.
- The two pages that reached for a visual built it in CSS or SVG rather than pulling a library asset.
- The skipped-context flow stated its inferences in one line at the top, as documented.

## What it taught the skill

The friction found here became rules that now live in the skill: the theme deal with a rotation across paper band, display class and accent (`scripts/theme.mjs deal`), the copy budget and the buzzword gate, a scene sentence before any enrichment, one scroll pattern per page, and `overflow-x: clip` on every page. The verbs that were tested beside these pages (`audit`, `redesign`, `study`) now live in a companion pack; their examples are under [`verbs/`](verbs/). Three derived-route examples are under [`custom/`](custom/).
