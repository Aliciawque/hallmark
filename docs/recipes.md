# Recipes

Nine prompts you can paste into Claude Code, Codex CLI or OpenCode with Hallmark installed. Each is the prompt verbatim and what the skill is expected to infer; the picks are not fixed, because the theme deal rotates against the project's log and two runs of the same prompt should not land on the same shape or theme.

The first recipe is the one to try in a fresh project to see the flow before reading anything else.

## 00. Try it: Coffeebox

> Build me a landing page for Coffeebox, a small-batch coffee subscription. Roast on Sunday, ship on Monday, drink Tuesday. Audience: people who already buy good coffee and want fewer trips to the shop. Tone: warm, hand-set, editorial, like a small café's chalkboard.

Explicit audience, use and tone; genre editorial. Expect a deal of three warm editorial themes, library photographs of roasting and beans standing in for the user's own (a quarter to a third of the page, the theme's type and rules carrying the rest), and a hero that states the Sunday-to-Tuesday fact.

## 01. Tide, an indie podcast

> Design a landing page for Tide, an indie podcast about long-form interviews with small-studio designers. Just go ahead, pick the rest yourself.

The user opted out: the skill infers designers and design-curious listeners, listen and subscribe, quiet editorial, and says so in one line at the top. Expect type to carry it, one photograph as a band at most, and a row of "listen where you listen" links.

## 02. Streampipe, an open-source CLI

> Build me a landing page for Streampipe, a small, fast, single-binary CLI for parsing log and event streams from stdin. Filter, transform, route. Composes with anything that emits lines. Audience: developers. Use: install and read docs. Tone: technical. Use the Terminal theme.

A theme named by the user is built as asked (stamp `theme: Terminal (by request)`). Expect real command lines in `<pre>` blocks, an install section and a flag table, mono as the material rather than a costume.

## 03. Maple Street Bread, an artisan bakery

> Build a landing page for Maple Street Bread, a small artisan bakery in Lisbon. Sourdough, slow, by hand. We open at seven, thirty loaves, gone by noon, no online orders. Audience: locals. Use: see what we bake, find us. Tone: warm, hand-set.

Expect a catalogue of the breads in library photographs (each a stand-in for the bakery's own), hours and a map link, and no call to action beyond visiting, because the prompt has none.

## 04. Meridian, a studio manifesto

> A studio manifesto for Meridian, a small environmental-products design practice in Lisbon. Declarative, no flashy stuff.

Partial context; the skill infers peers and clients, read it and sign on, declarative editorial. Expect one statement at display scale, numbered principles as a real `<ol>`, no testimonials, no pricing.

## 05. Tracejam, SaaS observability

> Build me a landing page for Tracejam, a tracing and observability tool for distributed systems. Audience: SREs and platform engineers. Use case: try it or contact sales. Tone: technical.

Genre modern-minimal. Expect the product built in a `data-slot` beside the hero's text, a demo strip instead of a feature grid, and a pricing table with the user's tiers or a text slot where a price belongs, never invented figures.

## 06. Anya, a personal one-pager

> Personal site for Anya, a software architect in Lisbon. Don't ask, just figure it out.

The user opted out. Expect an index-style page: a short bio, a tabular work history, a list of writing with dates, one contact row. Restraint is the credibility signal.

## 07. Foundry, compliance SaaS

> Build me a landing page for Foundry, SOC 2 and ISO 27001 compliance automation for B2B SaaS. Show how many companies got compliant, what it costs, who uses it. Audience: founders and CTOs. Tone: technical but trustworthy.

The prompt asks for counts and logos the user has not supplied: Hallmark asks for them once at Step 1 and otherwise leaves them out (gate 46a). Expect a bento or stat-led shape with one real number if one is given.

## 08. Cohort, cohort-based courses

> Build a landing page for Cohort, the platform for cohort-based courses. Run live courses with 30 to 500 students. Built for educators, not LMS sales teams. Audience: course operators and indie creators. Tone: warm, salon-room, editorial.

The prompt's own range is the hero. Expect the figures set in tabular numerals, one sentence under them, and no marquee or card stack.

## Redesigning what exists

Three prompts for a page, a site or an app that is already there. Each starts by recording what the page says and does, and ends by proving none of it went missing.

> `/hallmark audit ./index.html`

A report and nothing else: the findings by gate, a four-line read of the page, and the depth that would settle them.

> Polish our site with hallmark. We like our colours and fonts; it just feels dated.

Polish depth. The system and the layout stay; the tells, the contrast, the states and the motion are fixed in place, and layout findings are listed for you instead of rebuilt.

> `/hallmark redesign ./src/app`

It asks once what stays, what is wrong and what is new to show, or on *go ahead* redesigns in full: the content and the wiring stay, the system and the composition change. App screens are recomposed inside the shell they have. The handoff shows the before and after counts, what was kept, and anything dropped with its reason.

## Reading a recipe

Each prompt carries or withholds the four things Step 1 asks for (material, audience, use, tone). When all four are present the skill builds without a question; when one is missing it infers and states the inference. A theme named in the prompt is built by request; otherwise `scripts/theme.mjs deal` prints three candidates that clear the project's log and the skill picks one. Two consecutive runs of one recipe in the same project produce different shapes or themes by design.
