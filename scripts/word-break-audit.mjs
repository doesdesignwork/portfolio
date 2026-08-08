import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/work/sginnovate-brand-identity/",
  "/work/healthhub-caregiver-ux/",
];

const viewports = [
  { name: "mobile-320", width: 320, height: 720 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1180", width: 1180, height: 820 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  for (const route of routes) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();

    await page.goto(new URL(route, baseUrl).toString(), {
      waitUntil: "domcontentloaded",
      timeout: 15_000,
    });
    await page.evaluate(async () => document.fonts.ready);
    await page.waitForTimeout(120);

    const result = await page.evaluate(() => {
      const root = document.querySelector(".site-page");
      if (!(root instanceof HTMLElement)) {
        return { brokenWords: ["Missing .site-page"], overflow: true };
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

      const describe = (element) => {
        const tag = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : "";
        const classes = [...element.classList]
          .slice(0, 2)
          .map((value) => `.${value}`)
          .join("");
        return `${tag}${id}${classes}`;
      };

      const brokenWords = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        const parent = node.parentElement;
        const text = node.textContent ?? "";

        if (
          parent &&
          isVisible(parent) &&
          !parent.closest("script, style, noscript, code, pre, kbd, samp") &&
          !parent.closest('a[href^="http"]')
        ) {
          const matcher = /[^\s]+/g;
          let match;

          while ((match = matcher.exec(text))) {
            const token = match[0];
            if (token.length < 3) continue;

            const range = document.createRange();
            range.setStart(node, match.index);
            range.setEnd(node, match.index + token.length);
            const rects = [...range.getClientRects()].filter(
              (rect) => rect.width > 0.25 && rect.height > 0.25,
            );

            if (rects.length > 1) {
              brokenWords.push(`${describe(parent)}: “${token.slice(0, 70)}” split across ${rects.length} lines`);
              if (brokenWords.length >= 20) break;
            }
          }
        }

        if (brokenWords.length >= 20) break;
        node = walker.nextNode();
      }

      return {
        brokenWords,
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
      };
    });

    if (result.brokenWords.length || result.overflow) {
      failures.push({ route, viewport: viewport.name, ...result });
      console.error(`FAIL ${viewport.name} ${route}`);
      if (result.overflow) console.error("  - horizontal overflow detected");
      result.brokenWords.forEach((issue) => console.error(`  - ${issue}`));
    } else {
      console.log(`PASS ${viewport.name} ${route}`);
    }

    await context.close();
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nWhole-word wrapping audit failed in ${failures.length} route/viewport combinations.`);
  process.exit(1);
}

console.log(`\nWhole-word wrapping audit passed across ${routes.length} routes and ${viewports.length} viewports.`);
