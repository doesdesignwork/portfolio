import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const baseUrl = process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";

const routes = [
  "/",
  "/cv/",
  "/services/brand-identity-design-singapore/",
  "/services/experiential-exhibition-design-singapore/",
  "/services/packaging-product-design-singapore/",
  "/work/healthhub-caregiver-ux/",
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
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
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
await mkdir("artifacts/brand-consistency-audit", { recursive: true });

const safeName = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString();
    const runLabel = `${viewport.name} ${route}`;

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

      const issues = await page.evaluate((currentRoute) => {
        const problems = [];
        const root = document.documentElement;
        const tolerance = 2;

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

        const overlaps = (first, second) => {
          const horizontal = Math.min(first.right, second.right) - Math.max(first.left, second.left);
          const vertical = Math.min(first.bottom, second.bottom) - Math.max(first.top, second.top);
          return horizontal > tolerance && vertical > tolerance;
        };

        const label = (element) => {
          const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 56);
          return `${element.tagName.toLowerCase()}${text ? ` “${text}”` : ""}`;
        };

        const normalizeFont = (value) =>
          value.replace(/["']/g, "").split(",")[0].trim().toLowerCase();

        const probe = document.createElement("span");
        probe.style.position = "fixed";
        probe.style.visibility = "hidden";
        probe.textContent = "Aa";
        document.body.append(probe);
        probe.style.fontFamily = "var(--brand-font-display)";
        const displayFont = normalizeFont(getComputedStyle(probe).fontFamily);
        probe.style.fontFamily = "var(--brand-font-text)";
        const textFont = normalizeFont(getComputedStyle(probe).fontFamily);
        probe.remove();
        const allowedFonts = new Set([displayFont, textFont]);

        const parseColor = (value) => {
          const input = value.trim();
          const shortHex = input.match(/^#([0-9a-f]{3})$/i);
          if (shortHex) {
            return [...shortHex[1]].map((channel) => Number.parseInt(channel + channel, 16));
          }
          const longHex = input.match(/^#([0-9a-f]{6})$/i);
          if (longHex) {
            return [0, 2, 4].map((offset) => Number.parseInt(longHex[1].slice(offset, offset + 2), 16));
          }
          const rgb = input.match(/rgba?\(([^)]+)\)/i);
          if (!rgb) return null;
          const parts = rgb[1]
            .split(/[ ,/]+/)
            .filter(Boolean)
            .slice(0, 3)
            .map(Number);
          return parts.length === 3 && parts.every(Number.isFinite) ? parts : null;
        };

        const relativeLuminance = ([red, green, blue]) => {
          const channels = [red, green, blue].map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };

        const contrastRatio = (first, second) => {
          const a = relativeLuminance(first);
          const b = relativeLuminance(second);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        };

        if (root.scrollWidth > window.innerWidth + tolerance) {
          problems.push(`horizontal overflow ${root.scrollWidth}px / ${window.innerWidth}px`);
        }

        const h1s = [...document.querySelectorAll("h1")].filter(visible);
        if (h1s.length !== 1) {
          problems.push(`expected one visible h1, found ${h1s.length}`);
        }

        const textElements = [...document.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, li, dt, dd, figcaption, small, nav a, button",
        )].filter(visible);

        for (const element of textElements) {
          const family = normalizeFont(getComputedStyle(element).fontFamily);
          if (!allowedFonts.has(family)) {
            problems.push(`third font family ${family}: ${label(element)}`);
          }
        }

        for (const heading of [...document.querySelectorAll("h1, h2, h3")].filter(visible)) {
          const family = normalizeFont(getComputedStyle(heading).fontFamily);
          if (family !== displayFont) {
            problems.push(`display heading uses ${family}, expected ${displayFont}: ${label(heading)}`);
          }
        }

        for (const element of [...document.querySelectorAll(
          ".brand-breadcrumb, .brand-project-nav small, .brand-project-nav span, figcaption",
        )].filter(visible)) {
          const family = normalizeFont(getComputedStyle(element).fontFamily);
          if (family !== textFont) {
            problems.push(`functional text uses ${family}, expected ${textFont}: ${label(element)}`);
          }
        }

        const computedRoot = getComputedStyle(root);
        const muted = parseColor(computedRoot.getPropertyValue("--brand-muted"));
        const paper = parseColor(computedRoot.getPropertyValue("--brand-paper"));
        if (!muted || !paper) {
          problems.push("unable to parse brand contrast tokens");
        } else {
          const ratio = contrastRatio(muted, paper);
          if (ratio < 4.5) {
            problems.push(`muted text contrast ${ratio.toFixed(2)}:1 is below WCAG AA`);
          }
        }

        const paragraphs = [...document.querySelectorAll("main p, footer p")]
          .filter(visible)
          .map((element) => (element.textContent ?? "").trim().replace(/\s+/g, " "))
          .filter((text) => text.length >= 80);
        const seen = new Set();
        for (const paragraph of paragraphs) {
          const normalized = paragraph.toLowerCase().replace(/[.,:;!?]/g, "");
          if (seen.has(normalized)) {
            problems.push(`duplicate long paragraph: “${paragraph.slice(0, 72)}…”`);
          }
          seen.add(normalized);
        }

        if (currentRoute === "/") {
          const proof = document.querySelector(".brand-hero-proof");
          const proofRows = proof ? [...proof.querySelectorAll(":scope > div")].filter(visible) : [];
          if (!visible(proof) || proofRows.length !== 3) {
            problems.push(`homepage proof strip expected 3 points, found ${proofRows.length}`);
          }

          const aboutMetrics = [...document.querySelectorAll("#about dl")].filter(visible);
          if (aboutMetrics.length > 0) {
            problems.push("experience section repeats proof metrics");
          }

          const matrix = document.querySelector(".brand-capability-matrix");
          const groups = matrix ? [...matrix.querySelectorAll(":scope > section")].filter(visible) : [];
          if (!visible(matrix) || groups.length !== 4) {
            problems.push(`capability matrix expected 4 groups, found ${groups.length}`);
          }

          for (const container of [proof, matrix]) {
            if (!visible(container)) continue;
            const children = [...container.children].filter(visible);
            for (let firstIndex = 0; firstIndex < children.length; firstIndex += 1) {
              for (let secondIndex = firstIndex + 1; secondIndex < children.length; secondIndex += 1) {
                if (overlaps(
                  children[firstIndex].getBoundingClientRect(),
                  children[secondIndex].getBoundingClientRect(),
                )) {
                  problems.push(`brand grid overlap: ${label(children[firstIndex])} ↔ ${label(children[secondIndex])}`);
                }
              }
            }
          }

          if (visible(proof)) {
            for (const row of proofRows) {
              const term = row.querySelector("dt");
              const description = row.querySelector("dd");
              if (
                visible(term) &&
                visible(description) &&
                overlaps(term.getBoundingClientRect(), description.getBoundingClientRect())
              ) {
                problems.push(`proof collision: ${label(term)} ↔ ${label(description)}`);
              }
            }
          }

          if (window.innerWidth <= 1279) {
            for (const row of proofRows) {
              if (row.getBoundingClientRect().width < (proof?.getBoundingClientRect().width ?? 0) * 0.9) {
                problems.push(`proof row is not full width at ${window.innerWidth}px`);
              }
            }
          }

          if (visible(matrix)) {
            const matrixWidth = matrix.getBoundingClientRect().width;
            const expectedColumns = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1279 ? 2 : 4;
            const expectedGroupWidth = matrixWidth / expectedColumns;
            const widthTolerance = Math.max(4, expectedGroupWidth * 0.08);

            for (const group of groups) {
              const groupWidth = group.getBoundingClientRect().width;
              if (Math.abs(groupWidth - expectedGroupWidth) > widthTolerance) {
                problems.push(
                  `capability group width ${groupWidth.toFixed(1)}px does not match ${expectedColumns}-column layout at ${window.innerWidth}px`,
                );
              }
            }
          }
        }

        return [...new Set(problems)];
      }, route);

      if (issues.length) {
        failures.push({ route, viewport, issues });
        console.error(`FAIL ${runLabel}`);
        issues.forEach((issue) => console.error(`  ${issue}`));
        await page.screenshot({
          path: `artifacts/brand-consistency-audit/${viewport.name}-${safeName(route)}.png`,
          fullPage: true,
        });
      } else {
        console.log(`PASS ${runLabel}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      failures.push({ route, viewport, issues: [message] });
      console.error(`FAIL ${runLabel}\n  ${message}`);
    }
  }
}

await browser.close();

if (failures.length) {
  console.error(`\nBrand consistency audit failed: ${failures.length} rendered case(s).`);
  process.exit(1);
}

console.log(`\nBrand consistency audit passed: ${routes.length} routes × ${viewports.length} viewports.`);