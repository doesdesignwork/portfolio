# Recipe Machine Design Context

## Direction
Recipe Machine should feel like a warm contemporary cookbook on a sunny kitchen counter, not an AI dashboard. The product is practical, generous, food-first, and visually appetising.

## Core aesthetic
- Warm cream canvas and paper-like surfaces.
- Tomato red is the primary action colour.
- Herb green is the secondary/selected state colour.
- Butter yellow, peach and soft rose add appetite and friendliness.
- Lora is used for expressive food/editorial headings.
- DM Sans is used for readable interface text.
- Controls should feel tactile and rounded, like labels, crockery and cookbook tabs rather than enterprise UI.
- Food and cooking language should dominate. Technology and provider language stay hidden unless needed for troubleshooting.

## Layout
- Preserve a clean single-task flow: ingredients, mood, cook.
- Keep strong hierarchy but avoid giant severe typography.
- Prefer generous recipe-card compositions and food photography over technical dashboards.
- Mobile layouts must remain single-column and comfortable.

## Interaction
- Primary actions are tomato red.
- Active selections lean herb green rather than black.
- Motion remains subtle and functional.
- Image generation is non-blocking and optional.
- Failed food imagery must never make a complete recipe feel broken.

## Voice
Warm, useful, encouraging, lightly playful. Copy should sound like a capable kitchen helper, not infrastructure software.

Examples:
- "What are you in the mood for?"
- "How much time do you have?"
- "Let’s cook."
- "Here’s what you can make."

Avoid visible phrases such as "recipe engine", "provider", "inference", "local AI" or quota jargon in normal use.

## Reliability rules
- Recipes render before images.
- Food images can be turned off.
- Image generation can retry automatically and per card.
- A missing image uses a warm placeholder and a friendly retry action.
- Image provider failure never blocks recipes, ingredients, juices, meal-time choices or recipe detail.

## Design dials
- Visual variance: 6
- Motion: 4
- Density: 5
- Overall feeling: sophisticated but welcoming, contemporary but domestic.
