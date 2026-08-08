<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js-specific code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Does Design Work / Agent Contract

This repository is Gerard Teo's professional portfolio. Treat it as a designed product, not a generic website. Every change must preserve the same brand character, evidence standards, responsive quality and interaction language.

## Mandatory reading order

Before changing UI, content, motion, layout or styling:

1. Read this file.
2. Read `design.md` in the repository root.
3. Inspect the existing component/route being changed.
4. Inspect the current canonical CSS layers that affect it.
5. For Next.js APIs or conventions, read the relevant documentation in `node_modules/next/dist/docs/` before coding.

`design.md` is the canonical design-system brief. If an old CSS rule conflicts with it, fix or consolidate the CSS. Do not reinterpret the design brief to preserve an obsolete rule.

## Product goal

The portfolio should communicate:

- Senior creative judgement.
- Strong brand and visual-systems experience.
- Hands-on production craft.
- A credible expansion into UX and digital product thinking.
- Clarity, restraint and evidence rather than decorative excess.

The site should feel contemporary and distinctive without looking like a trend demo.

## Positioning guardrails

Preferred professional framing:

- `Art Director / Senior Brand & Experience Designer`
- Brand systems, campaigns, packaging and physical experiences are established practice.
- UX and digital product work are an expanding practice supported by formal training and real capstone evidence.

Never inflate the positioning to imply years of shipped product-design experience that the portfolio does not prove.

## Content integrity

Never invent or imply:

- clients,
- awards,
- shipped features,
- production metrics,
- user-research findings,
- business outcomes,
- ownership of work completed by another agency/team,
- responsibilities not supported by source material.

Use source documents and the project data as evidence.

Specific attribution rules:

- SGInnovate work was completed while working at The Fat Oracle (TFO) and must retain that credit.
- HealthHub is an NTU PaCE academic capstone. It is not a commissioned or shipped HealthHub feature.
- HealthHub research/test figures must be described as capstone sample results, not population estimates or production metrics.
- Do not present the self-timed `54s → 13s` HealthHub comparison as validated user-performance evidence.

## Brand-system rules

Do not introduce a new font, palette, visual theme, corner-radius language, shadow language or motion language unless `design.md` is intentionally updated in the same change.

Prefer design tokens over raw values. Existing legacy values may remain temporarily, but new work should use the canonical tokens in `design.md` and the current CSS variables.

Do not create a new global override stylesheet for every fix. Prefer, in order:

1. Fix the component/route rule at its source.
2. Fix the existing canonical design-system layer.
3. Add a route-scoped stylesheet for a genuinely unique case study.
4. Add a new global layer only when the behaviour is truly site-wide and documented in `design.md`.

## Typography rules

- Display typography: Krub via `--brand-font-display`.
- Body/UI typography: Inter via `--brand-font-text`.
- Keep the existing responsive display hierarchy.
- Visible interface/supporting text should not render below 16px, except the desktop vertical side-navigation labels, which may be 14px.
- Body copy starts at approximately 18px.
- No mid-word breaks anywhere in normal portfolio copy.
- No automatic hyphenation.
- Headings and editorial copy may wrap only at natural spaces.
- Long code/URL strings are the only acceptable exception when preventing horizontal overflow.

If a heading does not fit, adjust layout, measure, font size or breakpoint. Never solve it by splitting a word.

## Colour rules

Canonical palette and usage are defined in `design.md`.

Critical behaviour:

- Violet is the primary signal on warm/bright paper.
- Lime is the signal colour on gunmetal/dark surfaces.
- Do not casually mix violet and lime on the same surface.
- Avoid adding orange. Orange values in old modules are legacy and must not become new brand decisions.
- White/bright-paper copy may be used on violet signal panels.

## Header and navigation invariants

- Persistent top navigation is white frosted translucent glass.
- Navigation copy is dark on the frosted surface.
- The main navigation keeps `Work`, `About`, `Contact`, `CV` accessible.
- Do not hide `About` to solve mobile pressure. Solve the layout instead.
- The legacy `GT / 01–05` marker is retired and must not return in markup, CSS or generated UI.
- The left side navigation may animate in on larger viewports but must not obstruct content or create horizontal overflow.
- CV remains available in primary navigation, but do not reintroduce redundant large `View my CV` / `Download CV` action buttons unless explicitly requested.

## Availability CTA invariants

`Available for the right work` is a deliberately expressive interaction.

- Keep the copy exactly clear and readable.
- Keep the organic morphing blob.
- No rectangular/orange backing plate behind the blob.
- `right` is the emphasis word.
- Motion should feel liquid and controlled, not noisy.
- Hover/focus can expand the blob and reveal the directional arrow.
- Keyboard focus must receive the same information as hover.
- Reduced-motion users receive a static, fully legible version.

## Motion rules

Motion must reveal hierarchy, evidence or state. Do not add movement simply to make a section feel busier.

Current motion language:

- Site-wide large display headings use scroll-linked kinetic scaling with a small overshoot and settle.
- Large headings may combine scale, subtle vertical drift, small perspective tilt and opacity.
- Homepage statistics count up once when entering the viewport.
- The side rail enters with a controlled slide/stagger.
- Project interaction can reveal evidence or system logic.
- Image scroll motion remains subtle.
- `prefers-reduced-motion: reduce` must resolve animated UI to a stable static state.
- Print/PDF output must never capture text in an animated/transformed intermediate state.

Do not add WebGL, heavy 3D or another animation framework without a clear product reason.

## Case-study rules

Case studies must show decisions, not just galleries.

Prefer this logic where relevant:

1. Context / problem.
2. Evidence or constraint.
3. Key design/product decision.
4. System, flow or design logic.
5. Real work/prototype/application.
6. Validation or observable outcome.
7. What changed / what was learned.

Do not force every discipline into identical headings. Brand, packaging, spatial and product work should reveal the evidence native to that discipline.

For product/UX work, favour real artefacts, flows, research evidence and prototypes over decorative phone mockups.

## Homepage hierarchy

The homepage should communicate breadth without becoming a catalogue.

Preferred featured narrative:

1. Brand systems.
2. Product/UX thinking.
3. Spatial/experiential design.
4. Consumer/packaging craft.

`Clear thinking. Properly made.` is the dominant proposition. Secondary section headlines must not compete with it at the same scale.

## Responsive rules

- Minimum supported viewport width: 320px.
- No horizontal page overflow.
- Never hide strategically important navigation or evidence simply to make a layout fit.
- Reflow grids before shrinking important text below the readability floor.
- Portrait, tablet, phone-landscape and desktop must all be considered.
- Large headings must remain whole-word wrapped at every supported width.
- Interactive targets should remain comfortable for touch.

## Accessibility

Every change must preserve:

- semantic heading order,
- keyboard navigation,
- visible focus states,
- sufficient contrast,
- meaningful link labels,
- useful alt text for portfolio imagery,
- reduced-motion support,
- readable type,
- no information available only on hover.

## SEO and machine-readable consistency

When positioning, project facts or case-study evidence changes, update the relevant human-facing and machine-facing sources together:

- route metadata,
- structured data,
- `llms.txt`,
- `llms-full.txt`,
- `agent-index.json`,
- sitemap if route inventory changes.

Humans and agents should receive the same factual story.

## Quality gate before merge

At minimum run:

```bash
npm ci
npm run lint
npm run typecheck
npm run audit:images
npm run build
```

For visual/system changes also run the browser audits in `scripts/`, especially:

```bash
node scripts/responsive-audit.mjs
node scripts/transition-proof-audit.mjs
node scripts/heading-motion-audit.mjs
node scripts/word-break-audit.mjs
node scripts/font-size-audit.mjs
node scripts/image-caption-audit.mjs
node scripts/column-spacing-audit.mjs
node scripts/text-column-audit.mjs
node scripts/brand-consistency-audit.mjs
node scripts/amber-palette-audit.mjs
node scripts/image-motion-audit.mjs
```

The GitHub responsive-audit workflow is the merge gate for these checks.

## Working method

- Make changes on a feature branch.
- Keep commits focused and descriptive.
- Open/update a PR.
- Do not merge while visual QA is failing.
- Fix the product/design issue rather than weakening a test merely to get green CI.
- When a test is genuinely based on an obsolete design rule, update the test and document the new intended rule in `design.md`.

## Definition of done

A change is done only when:

- it is factually accurate,
- it follows `design.md`,
- it works from 320px through desktop,
- there are no mid-word breaks,
- there is no horizontal overflow,
- interaction works with keyboard and reduced motion,
- machine-readable content remains aligned,
- CI is green.
