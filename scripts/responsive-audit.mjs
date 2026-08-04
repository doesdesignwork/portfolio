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

const auditedContainers = [
  ".brand-header",
  ".interior-header",
  "[class*='heroIdentity']",
  "[class*='heroStatement']",
  "[data-intro-panel]",
  "[data-intro-facts]",
  ".brand-section-head",
  "[data-project-caption]",
  "[data-archive-item]",
  ".brand-about-story",
  "#about dl > div",
  "[class*='capabilities']",
  "[data-process-point]",
  "[class*='contactLinks']",
  "[class*='footerLine']",
  ".brand-project-title",
  ".brand-project-facts",
  ".brand-story-fields section",
  ".brand-project-nav",
  ".brand-service-intro",
  ".brand-service-grid",
  ".brand-proof-grid",
  ".brand-cv-layout",
  ".brand-cv-role",
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ reducedMotion: "reduce" });

// Images are not required to calculate text and grid geometry. Blocking their
// payloads keeps the audit deterministic on image-heavy case-study routes while
// preserving intrinsic width and height attributes in the rendered markup.
await context.route("**/*", async (route) => {
  const type = route.request().resourceType();
  if (["image", "media"].includes(type)) {
    await route.abort();
    return;
  }
  await route.continue();
});

const page = await context.newPage();
page.setDefaultNavigationTimeout(15_000);
const failures = [];

await mkdir("artifacts/responsive-audit", { recursive: true });

function safeName(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");
}

async function openRenderedPage(url) {
  let lastError;

  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15_000 });
      await page.waitForLoadState("load", { timeout: 5_000 }).catch(() => {});
      await page.evaluate(async () => {
        await document.fonts.ready;
      });
      await page.waitForTimeout(80);
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
      console.error(`FAIL ${viewport.name} ${route}`);
      console.error(`  - navigation failure: ${error instanceof Error ? error.message : String(error)}`);
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
      const root = document.documentElement;
      const tolerance = 2;

      if (root.scrollWidth > window.innerWidth + tolerance) {
        problems.push(
          `horizontal overflow: document ${root.scrollWidth}px / viewport ${window.innerWidth}px`,
        );
      }

      const isVisible = (element) => {
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

      const intersects = (a, b) => {
        const width = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const height = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return width > tolerance && height > tolerance;
      };

      const label = (element) => {
        const name = element.tagName.toLowerCase();
        const id = element.id ? `#${element.id}` : "";
        const classes = [...element.classList]
          .slice(0, 2)
          .map((item) => `.${item}`)
          .join("");
        const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 54);
        return `${name}${id}${classes}${text ? ` “${text}”` : ""}`;
      };

      const directText = (element) =>
        [...element.childNodes]
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent ?? "")
          .join("")
          .trim();

      const numericStyle = (element, property) => {
        const value = Number.parseFloat(getComputedStyle(element)[property]);
        return Number.isFinite(value) ? value : 0;
      };

      const renderedLineCount = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const lineHeight = Number.parseFloat(style.lineHeight);
        if (!Number.isFinite(lineHeight) || lineHeight <= 0) return 1;
        return Math.max(1, Math.round(rect.height / lineHeight));
      };

      const normalizeFont = (value) => value.replace(/\s+/g, " ").trim().toLowerCase();
      const fontProbe = document.createElement("span");
      fontProbe.textContent = "Aa";
      fontProbe.style.position = "fixed";
      fontProbe.style.visibility = "hidden";
      fontProbe.style.fontFamily = "var(--brand-font-display)";
      document.body.append(fontProbe);
      const displayFont = normalizeFont(getComputedStyle(fontProbe).fontFamily);
      fontProbe.style.fontFamily = "var(--brand-font-text)";
      const textFont = normalizeFont(getComputedStyle(fontProbe).fontFamily);
      fontProbe.remove();
      const allowedFonts = new Set([displayFont, textFont]);

      for (const selector of selectors) {
        for (const container of document.querySelectorAll(selector)) {
          if (!isVisible(container)) continue;

          const children = [...container.children].filter((child) => {
            if (!(child instanceof HTMLElement) || !isVisible(child)) return false;
            const style = getComputedStyle(child);
            return !["absolute", "fixed"].includes(style.position);
          });

          for (let i = 0; i < children.length; i += 1) {
            for (let j = i + 1; j < children.length; j += 1) {
              const first = children[i];
              const second = children[j];
              if (intersects(first.getBoundingClientRect(), second.getBoundingClientRect())) {
                problems.push(
                  `sibling overlap in ${label(container)}: ${label(first)} ↔ ${label(second)}`,
                );
              }
            }
          }
        }
      }

      for (const row of document.querySelectorAll("#about dl > div")) {
        const term = row.querySelector(":scope > dt");
        const description = row.querySelector(":scope > dd");
        if (
          term instanceof HTMLElement &&
          description instanceof HTMLElement &&
          isVisible(term) &&
          isVisible(description) &&
          intersects(term.getBoundingClientRect(), description.getBoundingClientRect())
        ) {
          problems.push(`metric collision: ${label(term)} ↔ ${label(description)}`);
        }
      }

      // Process headings must never fall back into the removed number column.
      for (const row of document.querySelectorAll("[data-process-point]")) {
        if (!(row instanceof HTMLElement) || !isVisible(row)) continue;
        const heading = row.querySelector(":scope > h3");
        const copy = row.querySelector(":scope > p");
        if (!(heading instanceof HTMLElement) || !(copy instanceof HTMLElement)) continue;

        const headingRect = heading.getBoundingClientRect();
        const copyRect = copy.getBoundingClientRect();
        const headingLines = renderedLineCount(heading);

        if (window.innerWidth > 700) {
          if (headingRect.width < 170) {
            problems.push(`process title column too narrow: ${Math.round(headingRect.width)}px in ${label(row)}`);
          }
          if (headingLines > 3) {
            problems.push(`process title wraps into ${headingLines} lines: ${label(heading)}`);
          }
          if (copyRect.width < 260) {
            problems.push(`process copy column too narrow: ${Math.round(copyRect.width)}px in ${label(row)}`);
          }
        }
      }

      // Adjacent fact rows may use one separator, not a top-and-bottom pair.
      const factRows = [...document.querySelectorAll("[data-intro-facts] > div")].filter(
        (element) => element instanceof HTMLElement && isVisible(element),
      );
      for (let index = 0; index < factRows.length - 1; index += 1) {
        const current = factRows[index];
        const next = factRows[index + 1];
        const currentRect = current.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const verticalGap = nextRect.top - currentRect.bottom;
        const sameColumn = Math.abs(currentRect.left - nextRect.left) < 4;
        const duplicateBorders =
          numericStyle(current, "borderBottomWidth") > 0 &&
          numericStyle(next, "borderTopWidth") > 0;

        if (sameColumn && verticalGap < 32 && duplicateBorders) {
          problems.push(`double separator between ${label(current)} and ${label(next)}`);
        }
      }

      const introPanel = document.querySelector("[data-intro-panel]");
      const lastFact = factRows.at(-1);
      if (
        introPanel instanceof HTMLElement &&
        lastFact instanceof HTMLElement &&
        isVisible(introPanel) &&
        numericStyle(introPanel, "borderBottomWidth") > 0 &&
        numericStyle(lastFact, "borderBottomWidth") > 0 &&
        introPanel.getBoundingClientRect().bottom - lastFact.getBoundingClientRect().bottom < 80
      ) {
        problems.push("double terminal separator below intro facts");
      }

      const textElements = document.querySelectorAll(
        ".site-page h1, .site-page h2, .site-page h3, .site-page h4, .site-page h5, .site-page h6, .site-page p, .site-page dt, .site-page dd, .site-page strong, .site-page small, .site-page a, .site-page figcaption, .site-page li, .site-page button, .site-page label, .site-page span",
      );

      for (const element of textElements) {
        if (!(element instanceof HTMLElement) || !isVisible(element)) continue;
        const text = directText(element);
        if (!text) continue;

        const style = getComputedStyle(element);
        const font = normalizeFont(style.fontFamily);
        if (!allowedFonts.has(font)) {
          problems.push(`unexpected font ${style.fontFamily}: ${label(element)}`);
        }

        const clipsX = ["hidden", "clip"].includes(style.overflowX);
        const clipsY = ["hidden", "clip"].includes(style.overflowY);
        if (clipsX && element.scrollWidth > element.clientWidth + tolerance) {
          problems.push(`clipped horizontal text: ${label(element)}`);
        }
        if (clipsY && element.scrollHeight > element.clientHeight + tolerance) {
          problems.push(`clipped vertical text: ${label(element)}`);
        }
      }

      const displayTargets = document.querySelectorAll(
        ".site-page--home [class*='heroStatement'] h1, .site-page--home #manifesto-title, .site-page--home #work-title, .site-page--home #archive-title, .site-page--home #about-title, .site-page--home #process-title, .site-page--home footer h2, .site-page--home [class*='projectTitle'], .site-page--home [class*='projectCaption'] strong, .site-page--home [class*='archiveName'] strong, .site-page--home #about dt, .site-page--home [class*='capabilities'] strong, .site-page--home [class*='contactLinks'] > a > span, .site-page--project .brand-project-title h1, .site-page--project .brand-project-story > header h2, .site-page--project .brand-project-gallery > header h2, .site-page--project .brand-project-nav strong, .site-page--project [class*='margin'] > span, .site-page--service .brand-interior-hero h1, .site-page--service .brand-proof-card strong, .site-page--service .brand-cta h2, .site-page--cv .brand-interior-hero h1, .site-page--cv .brand-cv-title, .site-page--cv .brand-cv-role h3",
      );

      for (const element of displayTargets) {
        if (!(element instanceof HTMLElement) || !isVisible(element)) continue;
        const font = normalizeFont(getComputedStyle(element).fontFamily);
        if (font !== displayFont) {
          problems.push(`display font mismatch: ${label(element)}`);
        }
      }

      return [...new Set(problems)];
    }, auditedContainers);

    if (issues.length > 0) {
      failures.push({ route, viewport, issues });
      await page.screenshot({
        path: `artifacts/responsive-audit/${safeName(route)}-${viewport.name}.png`,
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
  console.error(`\nResponsive audit failed in ${failures.length} route/viewport combinations.`);
  process.exit(1);
}

console.log(
  `\nResponsive, separator and typography audit passed: ${routes.length} routes × ${viewports.length} viewports.`,
);
