# Does Design Work / Website Brand System

## Brand idea

**Clear thinking. Properly made.**

The website should feel like the work of a senior designer who can clarify a problem, establish a visual system and carry it through production. It is editorial rather than decorative, direct rather than theatrical, and confident without becoming loud.

## Positioning

**Senior creative direction, brand systems and hands-on delivery.**

The practice is presented as **Does Design Work**, not as a generic studio label. The name operates as a standard applied to every case study:

- Does the idea solve the right problem?
- Does the visual system remain recognisable across formats?
- Does the work survive production?
- Does it help people understand, remember or act?

## Design principles

1. **Clarity before decoration**
   Every page needs one obvious reading path. Typography, spacing and motion should support that path rather than compete with it.

2. **One system, different content roles**
   Homepage, case studies, services, online CV and PDF CV use the same visual language. Their copy differs because each format has a different job.

3. **Evidence over adjectives**
   Use responsibilities, decisions, outputs and observable outcomes. Avoid unsupported performance claims and generic statements about passion or creativity.

4. **Hands-on seniority**
   The design should express both direction and craft. Large editorial statements sit beside precise labels, facts, captions and production detail.

5. **Proof before biography**
   Key evidence supports the homepage proposition near the first fold. The Experience section then explains leadership and accountability instead of repeating the same figures.

## Core palette

| Token | Value | Use |
| --- | --- | --- |
| Gunmetal ink | `#252a2e` | Primary text, headers, footers and dark CTA fields |
| Graphite | `#343a3f` | Secondary dark detail and elevated dark surfaces |
| Warm paper | `#f2f0eb` | Main page and CV background |
| Bright paper | `#faf9f6` | Reversed text and elevated paper sections |
| Signal green | `#067032` | Text, borders, focus states and emphasis on white or paper |
| Bright neon lime | `#b6f500` | Text, links and indicators on gunmetal surfaces |
| Muted grey | `#626866` | Supporting copy, labels and captions |

The neon signal uses two coordinated values because one green cannot remain vivid and readable on both light and dark backgrounds. Signal green has WCAG AA contrast on warm paper and white. Bright neon lime has high contrast on gunmetal.

Green is a signal, not wallpaper. Use it for active navigation, key statements, proof figures, selected headings and calls to action. Avoid large bright-lime fields on light backgrounds.

## Typography

### Display

- Font token: `--brand-font-display`
- Current implementation: Krub
- Uses: H1, H2, H3 display statements, project names and proof figures
- Character: compact, direct and contemporary
- Weight: generally 600–700
- Tracking: negative for large display sizes

### Reading text

- Font token: `--brand-font-text`
- Current implementation: Inter
- Uses: body copy, navigation, labels, facts, captions, metadata and CV content
- Body copy begins at 18px on the website
- Body line-height: approximately 1.5–1.58

### Labels and interface text

- Minimum rendered size: 16px
- Homepage desktop side-menu navigation: deliberate 14px exception
- Uppercase only where the label acts as structural guidance
- Moderate tracking rather than wide decorative spacing

Do not introduce a third display family, decorative serif or synthetic italic treatment without revising the entire system.

The PDF CV follows the same hierarchy and palette using standard PDF-safe sans-serif fonts so the file remains searchable, portable and reliable.

## Layout system

- Header height: `72px`, `68px` on mobile
- Desktop side index: `128px`
- Maximum content width: `1320px`
- Reading width: approximately `760px`
- Section spacing: `84–160px`, responsive
- Main gutter: `22–84px`, responsive
- Borders: 1px rules using gunmetal at 18% or bright paper at 24%
- Corner radius: none by default

Every grid child must be allowed to shrink. Long titles, client names and metadata wrap at natural word boundaries without entering adjacent columns.

Desktop multi-column sections switch to row or stacked layouts before a column falls below a comfortable reading width. Do not retain a desktop grid merely because it technically fits.

## Page roles and content rules

### Homepage

**Job:** Position Gerard, establish point of view and route visitors to work or CV.

Use:
- One concise hero proposition
- One supporting value statement
- One three-point proof strip near the hero
- One operating-model introduction
- Selected projects
- A distinct archive line for each project
- An Experience section about leadership and accountability
- Capabilities grouped under Direction, Systems and Delivery
- A three-step process
- A direct contact section

Do not repeat the same years-of-experience or team-growth proof in the Experience section. Tools do not appear in the homepage capability matrix.

### Case studies

**Job:** Demonstrate thinking, responsibility and execution.

Sequence:
1. Summary
2. Role / credit / year
3. Lead image
4. Challenge
5. Decision
6. System
7. Outcome
8. Applications

Role appears once in the facts area. Do not repeat it as a second narrative section. Outcome statements must remain evidence-based. Where a commercial metric is unavailable, describe the observable design result without implying sales or organisational impact.

The first image should explain the project quickly. The final image should leave a complete application or system view rather than an incidental detail where suitable source material exists.

### Service pages

**Job:** Explain a capability and connect it to proof.

Sequence:
1. Capability proposition
2. Where Gerard adds value
3. Problems solved
4. Outputs
5. Working method
6. Related case studies

The metadata description, visible introduction and working method must add different information rather than paraphrasing one another. Software belongs in the CV, not in the service proposition.

### Online and PDF CV

**Job:** Provide detailed chronology, responsibilities, education, tools and direct contact routes.

Both CV formats use the same human, factual voice. They may repeat names, dates and roles from the homepage, but should not reuse homepage positioning paragraphs verbatim.

Current work is described plainly:
- C Square Creative Communications / C2 Global Exhibitions: current in-house design role
- The Fat Oracle: independent creative practice

Do not inflate the independent practice into an unsupported corporate title. Keep the PDF to two searchable A4 pages with clickable contact and portfolio links.

## Shared components

### Header

- Gunmetal field with bright paper navigation
- Signal-green underline or text on hover
- Same wordmark size and navigation order on every page

### Side index

- Active section is indicated by signal-green text and stronger weight
- No boxes, brackets, moving bars or background pills

### Section heading

- Small structural label
- Large display heading
- Optional short supporting sentence

### Hero proof strip

- Three evidence points only
- Display figures in signal green
- Text descriptions in accessible muted grey
- Three columns on wide desktop
- Full-width rows on tablet and landscape phone
- Stacked figure and description on narrow mobile

### Capability matrix

- Direction, Systems and Delivery
- Value and responsibility first, software excluded
- One divider between adjacent groups
- Three columns only when each group has sufficient width
- Single-column rows on tablet and mobile

### CTA

- Gunmetal field with bright neon-lime action text, or a signal-green field with bright-paper text
- On paper, action text and borders use signal green
- One contextual prompt and one action
- CTA wording reflects the page context rather than repeating the same sentence site-wide
- The online CV closing label and action are neon lime on gunmetal

### Cards

- Strong hierarchy: client, role or discipline, and a distinct project proposition
- Green may identify selected cards, but a page should not become a checkerboard of unrelated colours

## Motion

- Motion clarifies state or sequence
- Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Avoid hiding essential content for several seconds
- Respect `prefers-reduced-motion`
- Never move the reading position when a project image changes
- Scroll-linked image movement acts on the media container, not the image pixels

## Content review rules

Before deployment:

- Remove exact repeated paragraphs within a page
- Check the homepage hero, introduction, Experience and process for paraphrased repetition
- Keep proof figures in one location
- Confirm each archive description communicates a different design decision
- Verify current employer, independent-practice and project-credit language
- Avoid measurable-impact language unless a verified metric is available
- Keep tools separate from capability and value propositions
- Confirm the online CV and PDF CV carry the same factual role descriptions

## Accessibility and quality checks

Before deployment:

- Verify signal green reaches WCAG AA contrast on warm paper and white
- Verify bright neon lime reaches WCAG AA contrast on gunmetal
- Confirm no visible orange or black interface colours remain
- Check all headings at 320px, 390px, 430px, 768px, 912px, 1180px, 1440px and 1920px
- Confirm no horizontal overflow
- Confirm active navigation uses colour and weight only
- Confirm focus states remain visible
- Check that images keep their natural aspect ratio and never upscale beyond the source
- Confirm every page has one H1 and a logical heading sequence
- Verify only the display and reading type families are visible
- Check hero proof and capability groups for collisions, narrow columns and duplicate dividers
- Review repeated claims, especially experience, role, process and CTA language
- Render and inspect both PDF CV pages before publishing
- Verify PDF text extraction and clickable links
