# Imagery

What a page shows. Every page build reads this at Step 4. A page looks made when it shows the real thing: the place, the food, the object, the hands at work, the product running. It looks generated when it shows a gradient box where a picture should be, a drawing of a loaf, or a heading with nothing under it. Gate numbers in parentheses point at `gates.md`.

## 1. What fills a page

In order, the first that fits:

1. **The user's own images and recordings**, asked for at Step 1. They go in first and win every slot.
2. **The product itself, built.** Software is shown as its working interface (§ 4).
3. **Photographs from the library**, picked by script and treated in the theme's way (§ 2, § 5).
4. **Generated stills**, only when `TOGETHER_API_KEY` is set and the user asked for them (§ 6).
5. **Type at full scale**, when the brief is about words.

Which briefs want which:

- **A place, a material, food or drink, an object, a craft, the outdoors, an event, people at work** (a bakery, a ski school, a gin, a weaving studio, a venue, a tailor, a farm): photographs lead, as they do on three in four real sites in these trades. The hero's photograph is the largest thing on the first screen (full-bleed behind the head, or beside it at 60 to 75% of the screen tall), and the page carries about one a screen after it, a third of them large, the rest in pairs and sets with a fact each.
- **Software** (SaaS, an app, a developer tool): the product leads, and the hero visual is its interface. One or two photographs may set the scene: where it is used, the material it handles, hands at the work it serves.
- **Words** (docs, an API, a CLI, a type specimen, a manifesto or a letter about an idea): type and code carry it; one photograph as a full-bleed band is the most a page takes. A manifesto or a letter about something physical (repair, a river, a street) shows it like any other page.

A photograph never stands in for a fact: the brief's numbers, names and claims stay in type, and a picture of a person never stands in for a customer, a teammate or a testimonial (F9).

## 2. The library

Hallmark carries a library of verified photographs (Unsplash, free licence, no attribution), tagged by subject, tone and temperature. Ask it for each subject the page needs, concretely:

```
node <skill-dir>/scripts/theme.mjs photos "apple orchard in autumn" "cider bottles on a table" "hands picking apples" --theme <slug> [--n 3] [--orient portrait|landscape] [--log .hallmark/log.json]
```

It ranks the library for each subject, skips photos the last builds used, applies the theme's treatment, and prints for each pick the id, what it shows, its size and a ready URL. Look at what it says each photo shows and keep only those that fit the sentence the section makes; re-ask with other words before settling for a near miss.

- **Never write an image URL from memory.** Use only what the script printed or the user supplied; an id that does not exist is a broken image (76).
- **For production,** `--save <dir>` downloads the picks into the project and prints local paths, so the page does not hotlink; drafts may hotlink the CDN.
- **Size and crop on the CDN:** the printed URL carries the treatment and no size; add `&w=<px>` (and `&ar=<w>:<h>` to crop; `&crop=entropy` keeps the busy part in frame, `&crop=focalpoint&fp-x=0.5&fp-y=0.35&fp-z=1.2` sets the point and the zoom by hand). Give `srcset` at 800, 1600 and 2400 wide with a `sizes` that matches the layout, and `width` and `height` from the ratio you cropped to.
- **The hero photograph** is the LCP: `fetchpriority="high"`, never `loading="lazy"`; every other image is lazy.
- **A stand-in stays swappable.** Wrap it in its slot (§ 3) with `data-alt` naming what the user's own picture should show, and list it in the handoff.
- **No Node:** say so in the Picks block and use slots with the user's material only; never guess an id.

## 3. Slots

A slot is any picture the user will replace: `data-slot="<name>"` (`hero`, `demo-2`, `photo-1`), a `data-alt` saying what belongs there, and a real size (an `aspect-ratio` or a fixed height). The CSS is in the scaffold's `base.css`; the script below swaps in the user's files without touching the layout, and drops a stand-in that fails to load so the slot falls back to its wash:

```js
window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector(`[data-slot="${k}"]`); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } };
document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });
```

- **A slot always shows something:** the user's image, a library photograph, or the product built at full fidelity. The wash (`--color-paper-2` stepping to `--color-paper-3`, with the accent mixed in at one corner) is only the colour behind a photo while it loads; a slot that shows nothing but its wash is an empty picture (81).
- **No visible placeholder labels.** No "your screenshot here", no ratio notes, no "sample" chips on the page; `data-alt` and the handoff carry that.
- A child that must stay once the user's image lands (a credit, a plate number) carries `data-keep`; text set over a slotted photograph (a Poster hero's head and scrim) sits in a sibling layer above the slot (`z-index: 2` or more, since the slot's image takes 1), never inside it.
- Never more than four slots in one row, and never a set of frames for things the page has no pictures of (a team, a list of venues): set those in type (68).

## 4. The product, built

On a software page, the hero visual is the product's main screen built in HTML and CSS: real controls, at least eight elements, the brief's nouns, the theme's surfaces and type, at the size `layout.md` § 6 gives the visual. Sample values read as samples: `example.com`, *Example Kitchen*, round plausible amounts, never a figure a visitor could take as a claim (46a). It sits in a `data-slot` so the user's screenshot replaces it. Show it from other angles lower down: a detail cropped large, a second screen, a state change. No drawn browser bar, device frame, traffic lights or notch (47a, 47b).

A working control (a calculator on the user's prices, a booking form) is a fine section and a fine close, once a page; it is not the default hero.

## 5. Placing and treating photographs

- **Big or not at all.** A photograph spans six of twelve columns and stands 440px tall or more, or runs full-bleed; one at thumbnail size reads as clip art (a set of four or more may run smaller, each with its fact). In the hero it stands 60 to 75% of the screen tall beside the text, or, on a photograph-led page, fills the screen behind the head (the Poster posture, the most common first screen in these trades). The test: delete the picture in your head; if the screen still says the same thing, the picture is too weak or too small.
- **One subject a frame, cropped tight,** its weight leaning toward the text. Vary the ratio down the page (4:5 beside text, 16:9 or 21:9 across, 1:1 in a pair) and the size (8 and 4 columns, never three equal frames unless they are a true set: three dishes, three rooms).
- **Text over a photograph** sits on its calmest part over a scrim from the theme's ink (a gradient from the text's edge, 35 to 65%), at 4.5:1 or better against the image under it; never centred white type over a busy frame. The scrim is a legibility layer, not decoration: keep it behind the text's side of the frame only, and on a theme that refuses gradients use a solid ink plate under the text instead.
- **Facts on the pictures:** captions and card lines are facts from the brief in the label style, beside or under the picture: the dish and its price, the room and its hours, the date, the material, the place. Never a credit line, never a caption that claims a stand-in as the user's own person, place or product.
- **Pick for the treatment.** A duotone or tint flattens a pale subject (white paper, snow, a white wall) into a flat field that reads as an empty picture; choose frames with tonal range, and look at each one through the treatment before it ships.
- **The theme's treatment, on every photo of the page.** The theme's `photo:` header sets it and the script applies it on the CDN: `natural`, `warm`, `muted`, `mono`, `duotone` in two of the theme's tokens, or `tint` in one, with small adjustments (`con=`, `sat=`, `exp=`) after it. The frame is the theme's: its radius, an inset outline of ink at 6 to 10% (`outline: 1px solid ...; outline-offset: -1px`), its texture if it has one. Never a border and a wide shadow together.
- **Rhythm.** A photograph-led page puts one on most screens; a software page alternates the product and a photograph or a type-led section; a word-led page takes one at most.

## 6. Generated stills

Only when `TOGETHER_API_KEY` is set and the user asked for generated images (or for a subject the library cannot reach):

```
node <skill-dir>/scripts/imagegen.mjs "<prompt>" --size 1536x1024 --out <project>/images/<name>.png
```

Prompt like a photographer's brief: one concrete subject, the place, the light and the lens (*a stack of rye loaves on a flour-dusted steel counter, early window light from the left, 50mm, shallow depth*), with *no text, no people facing the camera*. Look at every result before it ships; six fingers, doubled furniture and melted labels go back. The treatment and frame are the same as a library photo's. Stamp `generated: <model> via imagegen.mjs`. Never auto-fire it.

## 7. Never

- **A drawn illustration** (80): an SVG or CSS figure of an object, plant, animal, person, product, building, landscape or scene, at any size past an icon. SVG is for icons from one set, the user's logo, charts and diagrams of real data or a real system with their labels, and plain geometry (a rule, a grid, a dot pattern as texture).
- **An empty picture** (81): a slot showing only its wash, or a gradient field standing where a picture should be.
- **A counting device** (82): a row or grid of identical ticks, dots, bars or icons standing for a quantity, one mark for each bottle or identity. Set the number.
- **Illustration packs and characters**: unDraw, Humaaans, Storyset, Lottie mascots, 3D blobs, isometric scenes.
- Stock faces as proof (F9); a logo wall without the user's logos (46a); mesh blobs, orbs or aurora behind text (29); an image that zooms or rotates on hover (11); text baked into a picture; a photo of a screen showing someone else's interface.

## 8. Icons, logos, video, 3D

- **Icons:** one library a page (Lucide by default; Phosphor or Heroicons in a project that uses them), at 16, 20, 24 or 32px on the set's grid, `currentColor`, never in a coloured tile (3, F5) and never an emoji (30a).
- **Logos:** the user's own, monochrome, one treatment a row, 32 to 48px tall (20 to 28px in a footer); Simple Icons (`https://cdn.simpleicons.org/<slug>/<hex>`) only for a platform or brand the page names. Never an invented wall (46a).
- **Video:** the user's screen recording or footage. `autoplay muted loop playsinline` with a `poster`, sources AV1 or VP9 WebM then H.264 MP4, under 2 MB for ten seconds, never `loading="lazy"` on the LCP's poster, a visible pause control on any loop past five seconds, captions when it speaks.
- **3D and WebGL** only when the product is 3D and the visitor handles it, with a still fallback.
- **Motion libraries:** CSS and `@property` first; Motion for orchestrated entrances in React; GSAP only when a timeline is the product.

## 9. Stamp, log and handoff

- Stamp: `imagery: photographs, library 5, mono · product sample in hero and demo-2` (or `imagery: none`).
- Log: the entry's `imagery` field carries the same words, and `photos` lists the ids used, so the next build's picks rotate.
- Handoff: every stand-in photograph and every built sample, with its slot name, its size and what the user's own picture should show, then the one picture that would most improve the page.
