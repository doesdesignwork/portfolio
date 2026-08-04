import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/services/experiential-exhibition-design-singapore/",
  "/services/packaging-product-design-singapore/",
  "/work/modajar-fashion-brand-identity/",
  "/work/brewerkz-beer-packaging/",
  "/work/american-express-dbs-card-concepts/",
  "/work/sunsilk-unilever-packaging-design/",
  "/work/herdsman-retail-branding-perth/",
  "/work/100-pasir-panjang-property-branding/",
  "/work/beneo-palatinit-product-visualisation/",
  "/work/dow-chinaplas-exhibition-design/",
  "/work/raffles-institution-identity-design/",
  "/work/beneo-functional-food-product-concepts/",
  "/work/passion-group-hospitality-brand-architecture/",
  "/work/munch-food-retail-brand-identity/",
  "/work/sginnovate-brand-identity/",
  "/work/skechers-collaboration-footwear-concepts/",
  "/work/unilever-beauty-packaging/",
];

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-912", width: 912, height: 1368 },
  { name: "laptop-1180", width: 1180, height: 820 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const auditedContainers = [
  ".brand-header",
  ".interior-header",
  ".brand-project-title",
  ".brand-project-facts",
  ".brand-story-fields section",
  ".brand-project-story > header",
  ".brand-project-gallery > header",
  ".brand-related-services",
  ".brand-project-nav",
  ".brand-service-intro",
  ".brand-service-grid",
  ".brand-proof-grid",
  ".brand-cv-layout",
  ".brand-cv-role",
  ".brand-section-head",
  ".brand-about-story",
  "[data-intro-panel]",
  "[data-intro-facts] > div",
  "[data-project-caption]",
  "[data-process-point]",
  "[data-archive-item]",
  "[class*='capabilities']",
  "[class*='contactLinks']",
  "[class*='footerLine']",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });
await context.route("**/*", async (route) => {
  if (["image", "media"].includes(route.request().resourceType())) {
    await route.abort();
    return;
  }
  await route.continue();
});

const page = await context.newPage();
page.setDefaultNavigationTimeout(20_000);
const failures = [];
await mkdir("artifacts/text-column-audit", { recursive: true });

const safeName = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    const label = `${viewport.name} ${route}`;

    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
      await page.evaluate(async () => document.fonts.ready);
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        `,
      });
      await page.waitForTimeout(80);

      const issues = await page.evaluate((selectors) => {
        const problems = [];
        const tolerance = 2;
        const root = document.documentElement;

        const visible = (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) > 0.01 &&
            rect.width > 1 &&
            rect.height > 1
          );
        };

        const overlap = (first, second) => {
          const horizontal = Math.min(first.right, second.right) - Math.max(first.left, second.left);
          const vertical = Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top);
          return horizontal > tolerance && vertical > tolerance;
        };

        const name = (element) => {
          const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 46);
          return `${element.tagName.toLowerCase()}${element.id ? `#${element.id}` : ""}${text ? ` “${text}”` : ""}`;
        };

        if (root.scrollWidth > window.innerWidth + tolerance) {
          problems.push(`horizontal overflow ${root.scrollWidth}px / ${window.innerWidth}px`);
        }

        for (const selector of selectors) {
          for (const container of document.querySelectorAll(selector)) {
            if (!visible(container)) continue;
            const children = [...container.children].filter((child) => {
              if (!visible(child)) return false;
              const position = getComputedStyle(child).position;
              return position !== "absolute" && position !== "fixed";
            });

            for (let firstIndex = 0; firstIndex < children.length; firstIndex += 1) {
              for (let secondIndex = firstIndex + 1; secondIndex < children.length; secondIndex += 1) {
                const first = children[firstIndex];
                const second = children[secondIndex];
                if (overlap(first.getBoundingClientRect(), second.getBoundingClientRect())) {
                  problems.push(`overlap in ${selector}: ${name(first)} ↔ ${name(second)}`);
                }
              }
            }
          }
        }

        for (const row of document.querySelectorAll(".brand-story-fields section")) {
          if (!visible(row)) continue;
          const heading = row.querySelector(":scope > h3");
          const copy = row.querySelector(":scope > p");
          if (!visible(heading) || !visible(copy)) continue;

          const rowRect = row.getBoundingClientRect();
          const headingRect = heading.getBoundingClientRect();
          const copyRect = copy.getBoundingClientRect();

          if (overlap(headingRect, copyRect)) {
            problems.push(`project story collision: ${name(heading)} ↔ ${name(copy)}`);
          }

          if (window.innerWidth <= 900) {
            const verticalGap = copyRect.top - headingRect.bottom;
            if (verticalGap < 8) {
              problems.push(`project story mobile gap ${verticalGap.toFixed(1)}px: ${name(row)}`);
            }
            if (Math.abs(copyRect.left - headingRect.left) > 3) {
              problems.push(`project story mobile columns remain split: ${name(row)}`);
            }
            if (headingRect.width < rowRect.width * 0.88 || copyRect.width < rowRect.width * 0.88) {
              problems.push(`project story mobile child is not full width: ${name(row)}`);
            }
          } else {
            const horizontalGap = copyRect.left - headingRect.right;
            if (horizontalGap < 20) {
              problems.push(`project story desktop gap ${horizontalGap.toFixed(1)}px: ${name(row)}`);
            }
          }
        }

        for (const element of document.querySelectorAll(
          ".brand-project-title > *, .brand-service-intro > *, .brand-cv-layout > *",
        )) {
          if (!visible(element)) continue;
          const rect = element.getBoundingClientRect();
          if (rect.left < -tolerance || rect.right > window.innerWidth + tolerance) {
            problems.push(`content leaves viewport: ${name(element)}`);
          }
        }

        return [...new Set(problems)];
      }, auditedContainers);

      if (issues.length) {
        failures.push({ route, viewport, issues });
        console.error(`FAIL ${label}`);
        issues.forEach((issue) => console.error(`  ${issue}`));
        await page.screenshot({
          path: `artifacts/text-column-audit/${viewport.name}-${safeName(route)}.png`,
          fullPage: true,
        });
      } else {
        console.log(`PASS ${label}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ route, viewport, issues: [message] });
      console.error(`FAIL ${label}\n  ${message}`);
    }
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nText-column audit failed: ${failures.length} rendered case(s).`);
  process.exit(1);
}

console.log(`\nText-column audit passed: ${routes.length} routes × ${viewports.length} viewports.`);
