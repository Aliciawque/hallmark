## Tier E · Generated stills

For characters or specific scenes when hand-building is uneconomical: a small mascot in five poses, an evocative atmospheric still for an agency selling a thing. The model catalogue, with what each is good at, lives in [`assets.md`](../assets.md) § Generated illustration; this file is the discipline. Pick by need: production-grade SVG output for marks and icons; reference-image consistency for a character across panels; photorealism for skin, fabric and product. None of them output animation.

### The callable hook (opt-in)

When `TOGETHER_API_KEY` is set and the user has asked for a generated image, fetch one instead of recommending a manual round trip:

```
node <skill-dir>/scripts/imagegen.mjs "<prompt>" --size 1536x1024 [--model ...] [--out <path>]
```

The script's default model is photoreal; pass `--model` for one that renders legible in-image text and holds brand consistency (it carries a SynthID watermark). It caches by prompt hash under `.hallmark/img-cache/` and writes a provenance sidecar. **With no key it exits with code 3 and you fall back to CSS art or a labelled slot.** Never auto-fire it; it serves image-heavy briefs on request, and every generated asset is still post-processed and provenance-stamped as below.

### Discipline when generating

- **Always post-process.** Grain, an asymmetric crop, a drawn overlay, a colour grade toward the theme's paper. Raw model output looks generated; the post-process is what makes it the page's.
- **Use reference images** for brand consistency: feed the existing brand assets so generations stay on style.
- **Stamp the provenance** in the CSS stamp (`generated: <model> via scripts/imagegen.mjs · post-processed`). Future audits need to know.
- **Verify the watermark** where the model embeds one.
- **No multi-frame animation.** Never assemble stills into a Lottie loop; that is tier F territory and almost always worse than one still.

### Anti-patterns of generated stills

- **Symmetrical compositions.** Algorithmic; crop asymmetrically.
- **Smooth-mesh faces.** The generic generated-character look. Avoid character-led stills if you cannot get past it, or lean on reference images and prompt for asymmetry and imperfection.
- **Default lighting and blue-tinted backgrounds.** Specify the theme's colour and an unusual light in the prompt.
- **Six fingers, doubled furniture, impossible rooms.** Rarer now, still lurking. Always inspect.
