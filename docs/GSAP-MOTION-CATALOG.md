# Khatwa homepage motion catalog

Scope: Phase 3C/3D, `redesign/react-v2`. Code: `react-v2/src/motion/patterns.js`, the existing `useGsap.js`, and homepage-only `home.css`.

All pattern functions receive `{ gsap, ScrollTrigger }` and a concrete DOM element. Call them within the existing `useGsap` context; they must not be created at module scope or during server rendering. `createSectionMotion` composes them using opt-in data attributes. The homepage's `useSection` helper binds a component ref and locale/filter dependencies to that context.

| Pattern | Target / trigger | Motion and purpose | Reduced motion |
| --- | --- | --- | --- |
| `scrollReveal` | `[data-motion-reveal]`, top enters bottom 92% | 18px rise, opacity .45 → 1, .72s `power3.out`; Why points/testimonials. No visibility hiding. | No tween; full visibility. |
| `textReveal` | `[data-motion-heading]` | Whole-word 12px/opacity .4 reveal, .72s, .22s total stagger; editorial heading hierarchy. Complete accessible label; no Arabic letter splitting. | Static original words, full opacity. |
| `imageReveal` | `[data-motion-image]` | Vertical rectangular clip wipe, .9s; image surface only. Text/CTA remains present. | `clip-path: none`. |
| `imageParallax` | `[data-motion-parallax]` child; frame triggers top-bottom → bottom-top | −2% → +2% Y, scrub .6; mild depth inside reserved media frame. Desktop ≥60rem and fine pointer only. | No parallax; mobile static image. |
| CSS card hover | Fine-pointer service/project links, project focus | Linked row/card −2px, image scale 1.025, 180ms card/600ms image; communicates clickability. Details are visible without hover. | No transform; visible focus/colors remain. |
| `sectionTransition` | `[data-motion-rule]` | Rule scaleX .08 → 1 from center, .72s; joins the intro to its contents. | Full rule. |
| `timelineReveal` | `[data-motion-timeline]` / each `[data-motion-step]` | Number scale .8/opacity .4, .5s; copy 14px/opacity .45, .72s starting .08s later. Independent progressive stages, no pin. | Static ordered timeline. |
| `ctaEntrance` | `[data-motion-cta]`, top enters bottom 92% | Copy 24px/opacity .4, .72s; blue glow scale .7/opacity 0 → final over 1.2s. One-time entrance, no continuous glow loop. | Visible copy, static glow. |
| CSS brand marquee | `BrandMarquee` | Two identical groups, linear −50% over 48s, reversed for RTL. Original service labels only. Decorative copies `aria-hidden`; one screen-reader text version. | Animation disabled, one group wraps; duplicate group and pause button hidden. |

Scroll entrances are `once: true`. Distances and durations are modest, with no bounce, text parallax, scroll hijacking, long pinned panels, WebGL or extra dependencies.

The marquee pause button has a localized name and `aria-pressed` state. It also pauses on hover/focus, outside the viewport via IntersectionObserver, and when the document is hidden. Observer/listener cleanup runs on unmount. It does not require scroll-driven React state updates.

## Lifecycle and fallback contract

- The existing hook registers GSAP/ScrollTrigger once, sets up only on the client, and reverts the previous scoped context before dependencies change.
- `prefers-reduced-motion` is observed live: activation reverts all tweens/triggers and leaves default visible HTML/CSS; disabling it rebuilds the current scope once.
- Project-grid scopes are marked `data-motion-scope`. Parent section selectors exclude nested scopes, so filtering can rebuild only the grid without a second set of image animations.
- Mask and desktop parallax use the same frame trigger intentionally. Tests distinguish the one `clipPath` tween from the one scrub tween rather than incorrectly expecting one total trigger per frame.
- `focusin` completes local reveal tweens immediately. Copy/links never animate to `visibility:hidden` or opacity zero. Only imagery is clipped during a reveal; focused project content remains usable.
- `matchMedia` resources, focus listeners and pending font-ready refresh guards are cleaned up. Each component's cleanup runs inside the hook's `context.revert()`.
- Dimensions and aspect ratios are reserved; motion uses transforms/opacity except the deliberate image mask. No continuous scroll event listeners were added.
- Static prerendering contains the complete homepage. Without JavaScript all six subsequent sections and the six real project links remain visible. With reduced motion all words and media remain visible.

Existing hero motion remains unchanged: three-phrase load reveal, visible-only ambient blue glows/scroll indicator, and desktop scroll depth. This phase composes compatible patterns for the subsequent six sections.

## Validation evidence

`react-v2/tests/interactions.test.mjs` verifies real GSAP behavior in StrictMode: stable trigger counts after locale/reduced-motion changes and three repeated filter cycles, distinct mask/parallax registrations and zero triggers after unmount. JSDOM supplies deterministic nonzero layout geometry because it does not perform layout. Real Edge captures separately verify rendering, viewport behavior, focus, touch and static/reduced-motion fallbacks; DOM tests alone do not establish smooth frame rates.

Manual approval remains required for motion pacing, perceived intensity and device-specific smoothness. See [HOMEPAGE-VISUAL-QA.md](HOMEPAGE-VISUAL-QA.md).
