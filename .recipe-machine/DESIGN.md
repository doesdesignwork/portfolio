# Recipe Machine Visual System

## Direction
A modern kitchen workbench with the visual confidence of contemporary food packaging and an independent cookbook. Product-first, warm, graphic, and tactile without becoming rustic.

## Design dials
- DESIGN_VARIANCE: 6
- MOTION_INTENSITY: 4
- VISUAL_DENSITY: 5

## Theme
Single light theme.

## Color
- Canvas: #f3f0e8
- Surface: #fffdf8
- Ink: #181815
- Muted ink: #6d6960
- Border: #d9d4c8
- Accent: #cf4525
- Accent hover: #b93f29
- Focus: #181815
- Semantic success may use green only when it conveys actual system state.

Use the orange-red accent consistently for active controls, primary buttons, progress, and selected states. Do not introduce a second decorative accent.

## Typography
- Display and UI: Helvetica Neue, Arial, system sans-serif fallback.
- Utility labels and numeric metadata: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas.
- No decorative serif.
- Headings are dense and direct with tight tracking.
- Body copy stays between 16px and 18px with comfortable line height.

## Shape
- Main surfaces: 24px radius.
- Controls and smaller containers: 14px radius.
- Pills are reserved for ingredient tokens and segmented controls only.
- Avoid gratuitous card nesting.

## Layout
- Maximum app width: 1240px.
- Compact hero with workspace visible quickly.
- Sticky workflow rail at desktop/tablet widths.
- Workspace panels use strong internal grouping rather than huge vertical gaps.
- Results can become asymmetric on wide screens, with imagery carrying hierarchy.

## Motion
Use motion only for feedback and state transition:
- buttons: 120-180ms hover/press response
- panel reveals: opacity + 8px translate
- loading skeleton: subtle luminance sweep
- modal: short scale/fade
- respect prefers-reduced-motion

## Imagery
Generated dish photography is the primary visual material in results. Until available, use quiet loading surfaces, not decorative fake photography.

## Copy rules
- Functional labels, not poetic section names.
- No section numbering.
- No em-dashes or en-dashes.
- No version stamps in the footer.
- No fake precision or decorative status copy.

## Component rules
### Primary button
Solid accent background, dark or white text only when contrast passes. Strong weight, no gradients.

### Secondary button
Surface fill with single border. Dark text.

### Ingredient token
Compact pill, surface or accent tint, explicit remove affordance.

### Input fields
Warm white surface, 1px border, strong focus ring, large enough for kitchen use.

### Recipe card
Photography first, then title, one-line description, concise metadata, ingredient-use summary, CTA. No recipe numbering.

### Recipe dialog
Large desktop sheet with image and cooking content. Single-column mobile layout.
