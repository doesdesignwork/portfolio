import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const minimumFontSize = 16;
const sideMenuMinimumFontSize = 14;

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
  { name: "landscape-844", width: 844, height: 390 },
  { name: "laptop-1180", width: 1180, height: 820 },
  { name: "desktop-1440", width: 1440, height: 900 },
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

function describeIssue(issue) {
  return `${issue.selector} (${issue.size}px): “${issue.text}”`;
}

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    await page.evaluate(async () => document.fonts.ready);
    await page.waitForTimeout(60);

    const issues = await page.evaluate(
      ({ minimum, sideMenuMinimum }) => {
        const root = document.querySelector(".site-page");
        if (!(root instanceof HTMLElement)) {
          return [{ selector: ".site-page", size: 0, text: "Missing site root" }];
        }

        const isVisible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.display !== "none" &&
            style.visibility !== "hidden" &&
            Number(style.opacity) > 0.01 &&
            rect.width > 1 &&
            rect.height > 1 &&
            element.getAttribute("aria-hidden") !== "true"
          );
        };

        const directText = (element) =>
          [...element.childNodes]
            .filter((node) => node.nodeType === Node.TEXT_NODE)
            .map((node) => node.textContent ?? "")
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();

        const selectorFor = (element) => {
          const tag = element.tagName.toLowerCase();
          const id = element.id ? `#${element.id}` : "";
          const classes = [...element.classList]
            .slice(0, 2)
            .map((value) => `.${value}`)
            .join("");
          return `${tag}${id}${classes}`;
        };

        const problems = [];
        const seen = new Set();

        for (const element of root.querySelectorAll("*")) {
          if (!(element instanceof HTMLElement) || !isVisible(element)) continue;
          if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(element.tagName)) continue;

          const text = directText(element);
          if (!text) continue;

          const size = Number.parseFloat(getComputedStyle(element).fontSize);
          const requiredMinimum = element.closest("aside[data-side-index] nav")
            ? sideMenuMinimum
            : minimum;

          if (!Number.isFinite(size) || size >= requiredMinimum - 0.05) continue;

          const issue = {
            selector: selectorFor(element),
            size: Number(size.toFixed(2)),
            text: text.slice(0, 80),
          };
          const key = `${issue.selector}|${issue.size}|${issue.text}`;
          if (!seen.has(key)) {
            seen.add(key);
            problems.push(issue);
          }
        }

        return problems;
      },
      { minimum: minimumFontSize, sideMenuMinimum: sideMenuMinimumFontSize },
    );

    if (issues.length > 0) {
      failures.push({ route, viewport: viewport.name, issues });
      console.error(`FAIL ${viewport.name} ${route}`);
      for (const issue of issues.slice(0, 20)) {
        console.error(`  - ${describeIssue(issue)}`);
      }
      if (issues.length > 20) {
        console.error(`  - ${issues.length - 20} more undersized text elements`);
      }
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }
  }
}

await browser.close();

if (failures.length > 0) {
  const count = failures.reduce((sum, failure) => sum + failure.issues.length, 0);
  console.error(`\nMinimum font-size audit found ${count} issue(s) across ${failures.length} page/viewport combinations.`);
  process.exit(1);
}

console.log(
  `\nMinimum font-size audit passed at ${minimumFontSize}px, with homepage side-menu navigation at ${sideMenuMinimumFontSize}px, across ${routes.length} routes and ${viewports.length} viewports.`,
);
