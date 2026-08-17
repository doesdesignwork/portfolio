# Recipe Machine Product Context

## Register
Product surface. The interface exists to help someone turn available food into a practical meal quickly.

## Audience
Home cooks using a phone or laptop while standing in or near the kitchen. They may have leftovers, partial ingredients, or no clear plan for dinner. They value speed, clarity, low waste, and not being forced to shop for a long list of extras.

## Product purpose
Recipe Machine accepts a food photo or typed ingredient list, helps verify what is available, applies a small set of cooking preferences, then produces one or more practical recipes with complete ingredients, steps, and a visual of the finished dish.

## Personality
Practical. Clever. Appetising.

## Voice
Short, useful, confident. No startup hype, faux-chef poetry, or unnecessary technical language.

## Product principles
1. The next action should always be obvious.
2. Ingredient verification matters more than AI theatrics.
3. Recipes should use what is already available before suggesting extras.
4. Generated food imagery supports the decision, but recipe content must remain usable if image generation is slow or unavailable.
5. Mobile use is first-class.
6. Food-safety uncertainty must be stated plainly.

## Accessibility
- Maintain strong text contrast.
- All core controls work by keyboard.
- Focus states remain visible.
- Do not encode state using color alone.
- Respect reduced-motion preferences.
- Keep tap targets comfortably sized on mobile.

## Anti-references
- Generic AI SaaS dashboards.
- Purple-blue glow interfaces.
- Glassmorphism-heavy layouts.
- Editorial portfolio pages with tiny labels, section numbers, huge dead space, and decorative metadata.
- Recipe blogs that bury the recipe under storytelling.

## Recipe scope
- Recipe type supports Meals only, Juices only, or Meals + juices.
- Meal-time intent supports Any time, Breakfast, Lunch, and Dinner.
- Juice recipes must use juice-friendly produce only and must never suggest meat, eggs, grains, dairy, oils, or sauces in a juice.
- Meal-time selection must materially change recipe ranking and generation, including the built-in fallback engine.
