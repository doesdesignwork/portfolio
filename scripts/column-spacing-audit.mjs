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
  { name: "mobile-360", width: 360, height: 800 },
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-430", width: 430, height: 932 },
  { name: "tablet-600", width: 600, height: 960 },
  { name: "landscape-844", width: 844, height: 390 },
  { name: "landscape-932", width: 932, height: 430 },
  { name: "landscape-956", width: 956, height: 440 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-820", width: 820, height: 1180 },
  { name: "tablet-912", width: 912, height: 1368 },
  { name: "tablet-landscape", width: 1024, height: 768 },
  { name: "laptop-1180", width: 1180, height: 820 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1536", width: 1536, height: 960 },
  { name: "desktop-1920", width: 1920, height: 1080 },
];

const dividerGroups = [
  "[data-intro-facts]",
  ".brand-project-facts",
  ".brand-service-grid",
  ".brand-proof-grid",
  ".brand-contact-links",
  ".brand-project-nav",
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
page.setDefaultNavigationTimeout(15_000);
const failures = [];

await mkdir("artifacts/column-spacing-audit", { recursive: true });

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
}

async function openRenderedPage(url) {
  let lastError;
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
      await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
      await page.evaluate(async () => document.fonts.ready);
      await page.waitForTimeout(60);
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(250);
    }
  }
  throw lastError;
}

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();

    try {
      await openRenderedPage(url);
    } catch (error) {
      failures.push({
        route,
        viewport,
        issues: [`navigation failure: ${error instanceof Error ? error.message : String(error)}`],
      });
      continue;
    }

    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-duration: 0.001ms !important;
          animation-delay: 0ms !important;
          transition-duration: 0.001ms !important;
          scroll-behavior: auto !important;
        }
      `,
    });

    const issues = await page.evaluate((selectors) => {
      const problems = [];
      const minDividerGutter = 18;
      const tolerance = 2;

      const isVisible = (element) => {
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

      const numericStyle = (element, property) => {
        const value = Number.parseFloat(getComputedStyle(element)[property]);
        return Number.isFinite(value) ? value : 0;
      };

      const label = (element) => {
        const name = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : "";
        const classes = [...element.classList]
          .slice(0, 2)
          .map((item) => `.${item}`)
          .join("");
        const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 48);
        return `${name}${id}${classes}${text ? ` “${text}”` : ""}`;
      };

      const textBounds = (container) => {
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
        const rects = [];
        let node = walker.nextNode();

        while (node) {
          if ((node.textContent ?? "").trim()) {
            const parent = node.parentElement;
            if (parent && isVisible(parent)) {
              const parentStyle = getComputedStyle(parent);
              if (!["absolute", "fixed"].includes(parentStyle.position)) {
                const range = document.createRange();
                range.selectNodeContents(node);
                for (const rect of range.getClientRects()) {
                  if (rect.width > 0.5 && rect.height > 0.5) rects.push(rect);
                }
                range.detach();
              }
            }
          }
          node = walker.nextNode();
        }

        if (rects.length === 0) return null;
        return {
          left: Math.min(...rects.map((rect) => rect.left)),
          right: Math.max(...rects.map((rect) => rect.right)),
          top: Math.min(...rects.map((rect) => rect.top)),
          bottom: Math.max(...rects.map((rect) => rect.bottom)),
        };
      };

      const sameRow = (first, second) => {
        const overlap = Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top);
        return overlap > Math.min(first.height, second.height) * 0.45;
      };

      for (const selector of selectors) {
        for (const group of document.querySelectorAll(selector)) {
          if (!(group instanceof HTMLElement) || !isVisible(group)) continue;

          const children = [...group.children]
            .filter((child) => {
              if (!(child instanceof HTMLElement) || !isVisible(child)) return false;
              const style = getComputedStyle(child);
              return !["absolute", "fixed"].includes(style.position);
            })
            .sort((a, b) => {
              const ar = a.getBoundingClientRect();
              const br = b.getBoundingClientRect();
              return Math.abs(ar.top - br.top) < 4 ? ar.left - br.left : ar.top - br.top;
            });

          for (let index = 0; index < children.length - 1; index += 1) {
            const first = children[index];
            const second = children[index + 1];
            const firstRect = first.getBoundingClientRect();
            const secondRect = second.getBoundingClientRect();

            if (!sameRow(firstRect, secondRect) || secondRect.left < firstRect.left) continue;

            const dividerWidth = Math.max(
              numericStyle(first, "borderRightWidth"),
              numericStyle(second, "borderLeftWidth"),
            );
            if (dividerWidth < 0.5) continue;

            const firstText = textBounds(first);
            const secondText = textBounds(second);
            if (!firstText || !secondText) continue;

            const leftGap = firstRect.right - firstText.right;
            const rightGap = secondText.left - secondRect.left;

            if (leftGap < minDividerGutter - tolerance) {
              problems.push(
                `content too close to divider (${Math.round(leftGap)}px) in ${label(first)}`,
              );
            }
            if (rightGap < minDividerGutter - tolerance) {
              problems.push(
                `content too close to divider (${Math.round(rightGap)}px) in ${label(second)}`,
              );
            }
          }
        }
      }

      const intro = document.querySelector("[data-intro-facts]");
      if (intro instanceof HTMLElement && isVisible(intro)) {
        const cards = [...intro.children].filter(isVisible);

        if (window.innerWidth >= 761 && window.innerWidth <= 1180 && cards.length === 3) {
          const rects = cards.map((card) => card.getBoundingClientRect());
          const aligned = rects.every((rect) => Math.abs(rect.top - rects[0].top) < 3);
          if (!aligned) problems.push("intro fact columns are not aligned on one row");

          const heights = rects.map((rect) => rect.height);
          if (Math.max(...heights) - Math.min(...heights) > 3) {
            problems.push("intro fact columns have inconsistent heights");
          }

          const required = 24;
          const firstRight = numericStyle(cards[0], "paddingRight");
          const middleLeft = numericStyle(cards[1], "paddingLeft");
          const middleRight = numericStyle(cards[1], "paddingRight");
          const lastLeft = numericStyle(cards[2], "paddingLeft");

          if (firstRight < required) problems.push(`intro first-column right padding is ${firstRight}px`);
          if (middleLeft < required) problems.push(`intro middle-column left padding is ${middleLeft}px`);
          if (middleRight < required) problems.push(`intro middle-column right padding is ${middleRight}px`);
          if (lastLeft < required) problems.push(`intro last-column left padding is ${lastLeft}px`);

          if (numericStyle(cards[0], "borderRightWidth") < 0.5) {
            problems.push("intro first divider is missing");
          }
          if (numericStyle(cards[1], "borderRightWidth") < 0.5) {
            problems.push("intro second divider is missing");
          }
          if (numericStyle(cards[2], "borderRightWidth") > 0.5) {
            problems.push("intro last column has an extra outer divider");
          }
        }

        if (window.innerWidth <= 760) {
          const introRect = intro.getBoundingClientRect();
          for (const card of cards) {
            const rect = card.getBoundingClientRect();
            if (Math.abs(rect.width - introRect.width) > 3) {
              problems.push(`stacked intro fact does not fill its row: ${label(card)}`);
            }
            if (numericStyle(card, "borderRightWidth") > 0.5) {
              problems.push(`stacked intro fact retains a vertical divider: ${label(card)}`);
            }
          }
        }
      }

      const root = document.documentElement;
      if (root.scrollWidth > window.innerWidth + tolerance) {
        problems.push(`horizontal overflow: ${root.scrollWidth}px / ${window.innerWidth}px`);
      }

      return [...new Set(problems)];
    }, dividerGroups);

    if (issues.length > 0) {
      failures.push({ route, viewport, issues });
      await page.screenshot({
        path: `artifacts/column-spacing-audit/${safeName(route)}-${viewport.name}.png`,
        fullPage: true,
      });
      console.error(`FAIL ${viewport.name} ${route}`);
      for (const issue of issues) console.error(`  - ${issue}`);
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }
  }
}

await browser.close();

if (failures.length > 0) {
  console.error(`\nColumn spacing audit failed in ${failures.length} route/viewport combinations.`);
  process.exit(1);
}

console.log(`\nColumn spacing audit passed: ${routes.length} routes × ${viewports.length} viewports.`);
