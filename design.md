# Does Design Work / Design System

This document is the canonical visual, interaction and content-design specification for Gerard Teo's portfolio.

If implementation and this document disagree, the intended design should be corrected in code. Do not preserve an obsolete visual rule simply because it already exists in a legacy stylesheet.

---

## 1. Brand idea

### Core proposition

**Clear thinking. Properly made.**

The portfolio should feel like the work of a senior designer who understands ideas, systems, detail and production. It should not feel like a template, a trend showcase or a junior product-design portfolio trying to imitate a SaaS site.

### Working principle

**Clarity before decoration.**

Visual sophistication should come from proportion, hierarchy, type, composition, evidence and interaction quality. Decoration is secondary.

### Personality

The design language is:

- editorial,
- exact,
- contemporary,
- intelligent,
- restrained,
- tactile enough to feel authored,
- confident without being loud,
- production-minded rather than concept-only.

Avoid:

- generic startup aesthetics,
- gratuitous gradients,
- over-rounded card systems,
- glass everywhere,
- novelty cursor effects,
- excessive floating pills,
- fake 3D device mockups,
- animation for animation's sake,
- decorative noise that competes with the work.

---

## 2. Professional positioning

Primary framing:

**Gerard Teo**  
**Art Director / Senior Brand & Experience Designer**

Supporting idea:

> I make complex briefs easier to understand, then turn them into brands, products, campaigns and experiences that hold together in the real world.

The portfolio should show an established practice in:

- creative direction,
- brand systems,
- campaigns,
- packaging,
- experiential/spatial design,
- 3D visualisation,
- production and rollout.

It should also show a credible expanding practice in:

- UX research synthesis,
- product prioritisation,
- user/task flows,
- prototyping,
- usability testing,
- digital product thinking.

Do not describe Gerard as a veteran Product Designer unless the portfolio later contains sufficient shipped product evidence to support that claim.

---

## 3. Visual hierarchy

The site has one dominant voice and several supporting voices.

### Dominant statement

`Clear thinking. Properly made.`

This is the largest and most memorable homepage proposition.

### Secondary statements

Examples:

- `Clarity before decoration.`
- `Work with a point.`
- `I lead the work and stay close to it.`
- `Start with the problem. Build what lasts.`

These should remain clearly subordinate to the hero in scale and visual force.

### Evidence over ornament

Large type should introduce a point, not fill empty space. Every major section should answer at least one of these:

- What was the problem?
- What decision did Gerard make?
- What system was built?
- What changed?
- What evidence supports the claim?

---

## 4. Colour system

### Canonical palette

| Token | Value | Use |
|---|---:|---|
| Gunmetal | `#252A2E` | Primary dark surface, dark text, footer, dark editorial sections |
| Graphite | `#343A3F` | Secondary dark tone, hover/depth variation |
| Warm Paper | `#F2F0EB` | Main page background |
| Bright Paper | `#FAF9F6` | Elevated light surfaces, cards, reversed copy |
| Violet | `#5A4FCF` | Primary signal colour on light surfaces |
| Lime | `#C4CF4F` | Signal colour on gunmetal/dark surfaces |
| Muted | `#626866` | Secondary copy on light surfaces |
| Silver | `#9DA19E` | Tertiary labels and quiet interface detail |

### Usage rule

**Violet on paper. Lime on gunmetal.**

This is the core colour grammar.

Use violet for:

- key words on warm/bright paper,
- active light-surface navigation states,
- key statistics,
- paper-surface links/actions,
- selected evidence labels,
- focus accents on light surfaces.

Use lime for:

- signal text on gunmetal,
- dark-surface navigation indicators,
- dark CTA actions,
- section labels on dark surfaces,
- controlled accent details inside the availability interaction.

Use bright paper/white text on violet panels.

### Do not

- introduce orange as a new brand accent,
- use violet and lime everywhere at once,
- put lime on warm paper as a default signal,
- put violet on gunmetal when lime is the intended dark-surface signal,
- create unrelated per-project colour systems that override the site brand.

Legacy orange values may exist in old modules. They are not the current design system.

---

## 5. Typography

### Typeface roles

**Display / editorial typography:** Krub  
CSS role: `--brand-font-display`

**Body / UI / navigation typography:** Inter  
CSS role: `--brand-font-text`

Do not introduce an additional serif or display font into the live system unless the entire type strategy is intentionally reconsidered.

### Type scale

Current design tokens should remain approximately:

- Display XL: `clamp(62px, 7.4vw, 118px)`
- Display LG: `clamp(48px, 6vw, 92px)`
- Display MD: `clamp(34px, 4vw, 62px)`
- Body LG: approximately `21–29px`
- Body MD: approximately `18–22px`
- Minimum visible supporting/UI text: `16px`
- Desktop vertical side-navigation exception: `14px`

### Type behaviour

- Display copy uses tight but controlled tracking.
- Body copy should remain comfortable and editorial, not compressed.
- Use generous line height for long-form reading.
- Avoid full-width long paragraphs. Keep readable measures around `60–68ch` where appropriate.
- Use uppercase labels sparingly for metadata and hierarchy.
- Statistics may use tabular numerals when animated.

### Whole-word wrapping rule

**No normal word may ever break across lines.**

Required behaviour:

- `word-break: keep-all` or equivalent for visible editorial copy,
- `overflow-wrap: normal`,
- `hyphens: none`,
- wrapping occurs only at natural spaces.

If a large word does not fit:

1. reduce the display size at that breakpoint,
2. widen or reflow the container,
3. change the grid,
4. shorten copy only if editorially justified.

Never solve the problem with a mid-word fracture.

Exceptions are limited to genuinely unbreakable technical strings such as long URLs or code.

---

## 6. Layout system

### Page width

- Canonical content width: approximately `1320px`.
- Use responsive gutters via `--brand-gutter`.
- Minimum supported viewport: `320px`.
- No horizontal page overflow.

### Section rhythm

Use large vertical separation between major ideas rather than stacking many small cards.

Approximate tokens:

- Major section spacing: `84–160px`
- Smaller section spacing: `52–100px`
- Grid gap: `28–84px`

### Grid behaviour

Prefer asymmetric editorial grids on desktop.

At smaller widths:

- reflow first,
- stack second,
- reduce display scale third,
- never shrink important UI below the readability floor.

Do not hide strategically important information merely to make a desktop composition fit mobile.

### Borders and separators

Use thin rules as structure, not decoration.

- Light surface: gunmetal/ink with low opacity.
- Dark surface: bright paper with low opacity.

Avoid gratuitous boxes around every content group.

---

## 7. Top navigation

### Visual treatment

The persistent top navigation is **white frosted translucent glass**.

Current intent:

- bright-paper white with visible translucency,
- strong blur,
- slight saturation,
- subtle internal highlight,
- very soft shadow,
- dark navigation copy.

Approximate implementation:

- background around `rgba(250, 249, 246, 0.76)`,
- blur around `24px`,
- restrained saturation enhancement,
- subtle bottom border.

Do not turn the whole site into glassmorphism. Frosted glass is reserved for persistent navigation because it floats above changing page content.

### Information architecture

Primary links remain:

- Work
- About
- Contact
- CV

`About` must remain accessible on mobile.

The CV page stays available through navigation, but large duplicate CV action buttons are intentionally reduced/removed unless specifically needed.

---

## 8. Desktop side navigation

The side rail is a persistent orientation device on larger screens.

### Current design

- narrow vertical rail,
- warm-paper/frosted surface,
- vertical section labels,
- active section uses violet,
- inactive labels are quiet,
- entrance uses a controlled slide-in and stagger.

### Retired element

`GT / 01–05` is removed.

Do not reintroduce:

- initials as a rail marker,
- section counters,
- `01 / 05`,
- equivalent decorative numbering in that position.

The rail should provide navigation, not consume attention.

---

## 9. Availability CTA

Copy:

**Available for the right work**

### Intent

This is the one deliberately expressive micro-interaction in the side rail. It should feel alive but sophisticated.

### Visual behaviour

Idle:

- text remains readable,
- `right` carries violet emphasis,
- a compact organic gunmetal/violet blob is present,
- subtle breathing/liquid morphing.

Hover/focus:

- blob expands fluidly,
- text gains stronger contrast,
- `right` can transition to lime on the dark form,
- a small directional orb/arrow appears,
- shape morphs rather than simply scaling a rectangle.

### Hard rule

**No orange or rectangular backing plate behind the blob.**

The organic form is the container. Do not place it on a coloured rectangle.

### Accessibility

- keyboard focus gets the same informational state as hover,
- reduced-motion state is static and readable,
- the interaction must remain a real `mailto:` link.

---

## 10. Motion system

Motion is a design language, not a collection of tricks.

### Principle

**Movement should reveal hierarchy, evidence, state or authorship.**

### Kinetic display headings

All genuine large display headings use scroll-triggered kinetic scaling.

Current motion arc:

- enter around scale `0.90`,
- slight vertical offset around `48px`,
- small perspective tilt around `2.2deg`,
- low initial opacity,
- grow toward a restrained overshoot around scale `1.055`,
- settle to scale `1.0`,
- vertical position settles close to final baseline.

The effect should be visible but not elastic/cartoonish.

Do not apply it to:

- small utility labels,
- normal body copy,
- tiny metadata,
- controls.

### Statistics

Homepage statistics animate once when entering the viewport.

Current examples:

- `26+`
- `3 → 15`
- `6`

Behaviour:

- count in once,
- preserve suffixes/arrows,
- approximately one second,
- small settle after completion,
- no repeated counting on minor scroll movements.

### Side navigation

The rail enters from the left with:

- smooth slide,
- slight overshoot,
- settle,
- staggered labels.

Active navigation changes should glide rather than snap.

### Images

Scroll-linked image movement remains subtle. Avoid large parallax distances.

### Reduced motion

When `prefers-reduced-motion: reduce` is enabled:

- headings are fully opaque and static,
- counters resolve immediately,
- availability animation stops,
- decorative transitions are effectively removed,
- content order and meaning remain unchanged.

### Print/PDF

Print output must never capture headings at reduced opacity, scaled states or translated positions.

---

## 11. Imagery

The portfolio should show real work clearly.

### Principles

- Do not crop important design work merely to make a tile dramatic.
- Use `object-fit: contain` where the full artefact matters.
- Avoid repeating the same image unnecessarily.
- Prefer high-resolution source material.
- Let one strong application fill space rather than arranging many tiny thumbnails.
- Use captions when context materially changes understanding.

### Project cover behaviour

Project covers may include small evidence labels such as:

- `One identity system / multiple applications`
- `Visitor flow / four application zones`

These labels should reveal design logic, not advertise vague qualities.

---

## 12. Homepage project hierarchy

The featured work should communicate range intentionally.

Preferred narrative:

1. **Brand systems** — SGInnovate or equivalent system-led work.
2. **Product/UX thinking** — HealthHub medical-literacy capstone until stronger shipped product work exists.
3. **Spatial experience** — Dow ChinaPlas or similar visitor/system work.
4. **Consumer/packaging craft** — Sunsilk, Modajar or another strong consumer-facing project.

The homepage should not become a flat archive of every project.

---

## 13. Case-study design

Every case study should answer a meaningful design question.

### Shared principles

Show:

- context,
- the problem,
- constraints,
- the key decision,
- the system/logic,
- applications/prototype,
- outcome/validation,
- learning where useful.

### Do not force identical intellectual structure

Different disciplines need different evidence.

#### Brand

Show:

- organising idea,
- identity rules,
- system flexibility,
- applications,
- consistency across touchpoints.

#### Packaging

Show:

- range architecture,
- constants vs variables,
- hierarchy,
- shelf differentiation,
- production constraints.

#### Spatial / exhibition

Show:

- visitor movement,
- zoning,
- hierarchy,
- sightlines,
- scale,
- physical implementation.

#### Product / UX

Show:

- research evidence,
- problem selection,
- scope choices,
- user/task flow,
- real prototype artefacts,
- usability evidence,
- what failed,
- what changes next.

Do not disguise course work as shipped client work.

---

## 14. HealthHub product case study

Canonical framing:

**HealthHub Medical Literacy UX Capstone**

Core problem:

> Lab results can be visible while their meaning remains unclear.

Core HMW:

> How might we help caregivers and patients understand lab results without ever leaving the app?

Verified capstone evidence includes:

- 76 survey responses,
- 32 caregivers within the survey sample,
- 10 interviews,
- 13 Maze usability-test participants,
- 69.2% first-attempt task success,
- 87.4s average task duration in the first-round Maze task.

Important content rule:

The project is an **academic concept study**. Do not imply:

- HealthHub commissioned it,
- HealthHub adopted it,
- it shipped,
- it has production analytics.

Do not promote the self-timed `54s → 13s` comparison as validated user-performance evidence.

Use real capstone artefacts wherever practical instead of decorative device mockups.

---

## 15. Copy voice

Writing should be:

- concise,
- specific,
- intelligent,
- grounded,
- slightly opinionated,
- free of agency cliché.

Prefer:

- `The result was visible. The meaning wasn't.`
- `Good product judgement is often subtraction.`
- `Clarity before decoration.`

Avoid:

- `innovative solutions`,
- `passionate creative`,
- `pixel-perfect experiences`,
- `cutting-edge`,
- `world-class` as self-description,
- vague claims such as `delivered impact` without evidence.

The copy should sound like a senior practitioner explaining decisions, not a personal-brand motivational post.

---

## 16. Buttons and links

The portfolio is editorial. Links should generally feel like text actions, not a SaaS control panel.

Use:

- underlines,
- thin rules,
- restrained filled actions on dark CTA surfaces,
- directional arrows where they clarify navigation.

Avoid:

- many pill buttons,
- nested buttons,
- multiple competing primary actions,
- oversized rounded CTA clusters.

Primary conversion paths can distinguish:

- **Discuss a role**
- **Discuss a project**

---

## 17. Shape and radius language

The default site language is structural and editorial, not soft-card UI.

Use square or subtly softened geometry for most content.

Rounded forms are reserved for:

- the organic availability blob,
- small interface/prototype elements where the source product requires it,
- carefully chosen elevated surfaces such as the CV sidebar,
- small functional buttons.

Do not make every section a rounded card.

---

## 18. Depth and shadows

Use shadows sparingly.

Appropriate:

- frosted persistent navigation,
- archive hover preview,
- availability blob,
- isolated prototype/device evidence.

Avoid universal card shadows.

Depth should come primarily from:

- scale,
- spacing,
- contrast,
- layering,
- motion.

---

## 19. Responsive behaviour

### Minimum viewport

`320px`

### Required checks

At minimum consider:

- 320 portrait,
- 390 portrait,
- 600–768 tablet,
- phone landscape,
- 1024 tablet landscape,
- 1180 laptop,
- 1440 desktop,
- 1920 wide desktop.

### Rules

- no horizontal overflow,
- no clipped CTA content,
- no hidden important navigation,
- no mid-word breaks,
- no overlapping heading motion,
- no text below the readability floor,
- no inaccessible hover-only content,
- images stay legible and appropriately scaled.

---

## 20. Accessibility

The design is not complete unless it remains usable.

Required:

- semantic landmarks,
- logical heading hierarchy,
- keyboard access,
- visible focus states,
- useful image alt text,
- reduced-motion support,
- colour contrast appropriate to the surface,
- readable type,
- touch-safe navigation,
- no information encoded only by colour or hover.

---

## 21. Machine-readable brand consistency

The portfolio has human-facing and agent/search-facing representations.

When a project or positioning statement changes, keep these aligned:

- page copy,
- metadata,
- JSON-LD,
- `llms.txt`,
- `llms-full.txt`,
- `agent-index.json`,
- CV wording where relevant.

The machine-readable version must not make stronger claims than the visible portfolio.

---

## 22. Implementation source map

The current implementation contains legacy layers. New work should treat the following as the most important sources of intent:

- `design.md` — canonical design specification.
- `AGENTS.md` — implementation and evidence contract.
- `app/amber-gunmetal.css` — current violet/lime/gunmetal palette behaviour.
- `app/readable-type-scale.css` — readability floor and responsive type rules.
- `app/site-interaction-polish.css` — frosted navigation, availability CTA and site-wide interaction language.
- `app/no-word-breaks.css` — whole-word wrapping guard.
- `app/final-responsive-guard.css` — responsive collision protection.
- route/component CSS — local layout rules.

Legacy values in `globals.css`, older modules or early palette layers should not be treated as new design guidance when they conflict with the final layers above.

When practical, consolidate old conflicting rules rather than continuing to add overrides indefinitely.

---

## 23. Design QA checklist

Before merging a visual change, verify:

### Brand

- Uses only canonical palette roles.
- Uses Krub/Inter correctly.
- Looks like the same portfolio, not a new mini-theme.

### Typography

- No word breaks.
- No hyphenation.
- No important text below 16px.
- Large headings retain clear hierarchy.

### Motion

- Large display headings receive kinetic scaling.
- Motion does not cause clipping/overflow.
- Reduced motion is stable.
- Motion supports hierarchy or state.

### Navigation

- White frosted top navigation remains legible.
- Work/About/Contact/CV remain accessible.
- GT/01–05 does not return.
- Side rail does not cover content.

### CTA

- Availability blob has no rectangular/orange backing.
- Hover, focus and reduced-motion states work.

### Content

- Claims are supported.
- Credits are correct.
- Academic work is clearly labelled.
- Metrics are not overstated.

### Responsive

- 320px works.
- No horizontal overflow.
- No clipped words.
- No collision between motion and layout.

### Accessibility

- Keyboard path works.
- Focus states are visible.
- Contrast remains correct.
- Hover is not the only way to access information.

---

## 24. Final design test

When considering a new idea, ask:

> Does this make the work easier to understand, the thinking easier to see, or the experience meaningfully better?

If the answer is only “it looks more impressive,” it probably does not belong.
