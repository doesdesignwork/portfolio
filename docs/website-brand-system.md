# Does Design Work / Website Brand System

## Brand idea

**Clear thinking. Properly made.**

The website should feel like the work of a senior designer who can clarify a problem, establish a visual system and carry it through production. It is editorial rather than decorative, direct rather than theatrical, and confident without becoming loud.

## Design principles

1. **Clarity before decoration**
   Every page needs one obvious reading path. Typography, spacing and motion should support that path rather than compete with it.

2. **One system, different content roles**
   Homepage, case studies, services and CV use the same visual language. Their copy differs because each page has a different job.

3. **Evidence over adjectives**
   Use responsibilities, decisions, outputs and observable outcomes. Avoid unsupported performance claims and generic statements about passion or creativity.

4. **Hands-on seniority**
   The design should express both direction and craft. Large editorial statements sit beside precise labels, facts, captions and production detail.

## Core palette

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#151515` | Primary text, dark sections and navigation |
| Graphite | `#2c2c29` | Secondary dark detail |
| Warm paper | `#f2f0eb` | Main page background |
| Bright paper | `#faf9f6` | Reversed text and elevated paper sections |
| Signal orange | `#e34832` | Active states, emphasis and selected CTA fields |
| Muted grey | `#77756f` | Supporting copy, labels and captions |

Orange is a signal, not wallpaper. Use it for active navigation, key words, selected cards and calls to action. Text on a solid orange field is always bright paper white.

## Typography

### Display

- Font token: `--brand-font-display`
- Current implementation: Krub
- Uses: H1, H2, major metrics and section statements
- Character: compact, direct and contemporary
- Weight: generally 600–700
- Tracking: negative for large display sizes

### Reading text

- Font token: `--brand-font-text`
- Current implementation: Inter
- Uses: body copy, navigation, labels, facts, captions and CV content
- Body line-height: approximately 1.5–1.58

### Labels

- 11–12px
- Uppercase
- 0.08–0.09em letter spacing
- Used for section names, metadata and structural guidance

Do not introduce a third display family or decorative italic treatment without revising the entire system.

## Layout system

- Header height: `72px`, `68px` on mobile
- Desktop side index: `112px`
- Maximum content width: `1320px`
- Reading width: approximately `760px`
- Section spacing: `84–160px`, responsive
- Main gutter: `22–84px`, responsive
- Borders: 1px rules using ink at 18% or bright paper at 24%
- Corner radius: none by default

Every grid child must be allowed to shrink. Long titles, client names and metadata must wrap at natural word boundaries without entering adjacent columns.

## Page roles and content rules

### Homepage

**Job:** Position Gerard, establish point of view and route visitors to work or CV.

Use:
- One concise hero proposition
- One operating-model introduction
- Selected projects
- A short experience summary with proof metrics
- A three-step process
- A direct contact section

Do not repeat the same years-of-experience or team-growth proof in both introduction and experience sections.

### Case studies

**Job:** Demonstrate thinking, responsibility and execution.

Sequence:
1. Summary
2. Role / credit / year
3. Challenge
4. Decision
5. System
6. Outcome
7. Applications

Role appears once in the facts area. Do not repeat it as a second narrative section. Outcome statements must remain evidence-based.

### Service pages

**Job:** Explain a capability and connect it to proof.

Sequence:
1. Capability proposition
2. Where Gerard adds value
3. Problems solved
4. Outputs
5. Working method
6. Related case studies

The metadata description, visible introduction and working method must add different information rather than paraphrasing one another.

### CV

**Job:** Provide detailed chronology, responsibilities, education and tools.

The CV may repeat factual names, dates and roles from the homepage, but it should not reuse the homepage positioning paragraphs verbatim.

## Shared components

### Header

- Black field with bright paper navigation
- Signal-orange underline on hover
- Same wordmark size and navigation order on every page

### Side index

- Active section is indicated by orange text and stronger weight
- No boxes, brackets, moving bars or background pills

### Section heading

- Small uppercase label
- Large display heading
- Optional short supporting sentence

### CTA

- Ink or signal-orange field
- Bright paper text only
- One contextual prompt and one action
- CTA wording should reflect the page context rather than repeating the same sentence site-wide

### Cards

- Strong hierarchy: number / client / role or discipline / outcome
- Orange may identify selected cards, but a page should not become a checkerboard of unrelated colours

## Motion

- Motion clarifies state or sequence
- Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Avoid hiding essential content for several seconds
- Respect `prefers-reduced-motion`
- Never move the reading position when a project image changes

## Accessibility and quality checks

Before deployment:

- Verify white text on every solid orange panel
- Check all headings at 320px, 760px, 960px, 1180px and wide desktop
- Confirm no horizontal overflow
- Confirm active navigation uses colour and weight only
- Confirm focus states remain visible
- Check that images keep their natural aspect ratio
- Confirm every page has one H1 and a logical heading sequence
- Review repeated claims, especially experience, role, process and CTA language
