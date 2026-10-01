### E6 · Animated loop, pure CSS or SVG

One small custom-built loop: an orbiting dot, a breathing rectangle, a moving gradient stop, a type-mask reveal. Small, custom, and looping only when reduced motion is off.

*Use when:* the page is otherwise still and one small animated element gives it life.
*Avoid when:* the page already has movement; more movement makes the page anxious.

**Knobs:**
- Medium (CSS keyframes · SVG with CSS · a library only when orchestration needs it, see `craft/tier-c-animation.md`)
- Placement (margin · inline with the headline · corner accent)
- Loop duration (4s or less; anything longer drags)

**Example.** A collaborative whiteboard app. A two-second pure-CSS loop beside the headline: a single dot orbiting a slow ellipse, standing for real-time presence without a Lottie. Built with `@property --angle` interpolating 0deg to 360deg on `transform: rotate()`. Margin-placed, about 64 by 64px, the accent at low chroma. Zero bytes of bundle; `animation: none` under reduced motion.
