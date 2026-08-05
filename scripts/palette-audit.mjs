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
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-912", width: 912, height: 1368 },
  { name: "desktop-1440", width: 1440, height: 900 },
];

const expected = {
  ink: [37, 42, 46],
  paper: [242, 240, 235],
  paperBright: [250, 249, 246],
  signal: [0, 87, 255],
  bright: [77, 216, 255],
};

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
await mkdir("artifacts/palette-audit", { recursive: true });

const safeName = (route) =>
  route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "-");

for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  for (const route of routes) {
    const runLabel = `${viewport.name} ${route}`;
    try {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "domcontentloaded" });
      await page.evaluate(async () => document.fonts.ready);
      await page.waitForTimeout(60);

      const issues = await page.evaluate(({ currentRoute, expectedColors }) => {
        const problems = [];
        const rootStyle = getComputedStyle(document.documentElement);

        const parseColor = (value) => {
          const input = value.trim();
          const hex = input.match(/^#([0-9a-f]{6})$/i);
          if (hex) {
            return {
              rgb: [0, 2, 4].map((offset) => Number.parseInt(hex[1].slice(offset, offset + 2), 16)),
              alpha: 1,
            };
          }
          const rgb = input.match(/rgba?\(([^)]+)\)/i);
          if (!rgb) return null;
          const parts = rgb[1].split(/[ ,/]+/).filter(Boolean).map(Number);
          if (parts.length < 3 || parts.slice(0, 3).some((part) => !Number.isFinite(part))) {
            return null;
          }
          return { rgb: parts.slice(0, 3), alpha: Number.isFinite(parts[3]) ? parts[3] : 1 };
        };

        const same = (first, second, tolerance = 1) =>
          first.every((value, index) => Math.abs(value - second[index]) <= tolerance);

        const luminance = ([red, green, blue]) => {
          const channels = [red, green, blue].map((channel) => {
            const value = channel / 255;
            return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };

        const contrast = (first, second) => {
          const a = luminance(first);
          const b = luminance(second);
          return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        };

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

        const label = (element) => {
          const text = (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 48);
          return `${element.tagName.toLowerCase()}${text ? ` “${text}”` : ""}`;
        };

        const tokens = {
          ink: parseColor(rootStyle.getPropertyValue("--brand-ink")),
          paper: parseColor(rootStyle.getPropertyValue("--brand-paper")),
          paperBright: parseColor(rootStyle.getPropertyValue("--brand-paper-bright")),
          signal: parseColor(rootStyle.getPropertyValue("--brand-signal")),
          bright: parseColor(rootStyle.getPropertyValue("--brand-signal-bright")),
        };

        for (const [name, parsed] of Object.entries(tokens)) {
          const property = name === "bright"
            ? "--brand-signal-bright"
            : name === "paperBright"
              ? "--brand-paper-bright"
              : `--brand-${name}`;
          if (!parsed || !same(parsed.rgb, expectedColors[name])) {
            problems.push(`unexpected ${name} token: ${rootStyle.getPropertyValue(property).trim()}`);
          }
        }

        if (tokens.signal && tokens.paper && contrast(tokens.signal.rgb, tokens.paper.rgb) < 4.5) {
          problems.push(`electric cobalt on paper contrast is ${contrast(tokens.signal.rgb, tokens.paper.rgb).toFixed(2)}:1`);
        }
        if (tokens.bright && tokens.ink && contrast(tokens.bright.rgb, tokens.ink.rgb) < 4.5) {
          problems.push(`bright cyan-blue on gunmetal contrast is ${contrast(tokens.bright.rgb, tokens.ink.rgb).toFixed(2)}:1`);
        }

        const retiredColors = [
          [227, 72, 50],
          [6, 112, 50],
          [182, 245, 0],
          [21, 21, 21],
          [21, 21, 18],
          [0, 0, 0],
        ];

        const isOrange = ([red, green, blue]) =>
          red >= 150 && green >= 35 && green <= 175 && blue <= 110 && red >= green + 45;

        const isGreen = ([red, green, blue]) =>
          green >= 88 && green >= red * 1.3 && green >= blue * 1.12;

        for (const element of [...document.querySelectorAll("body *")].filter(visible)) {
          if (["IMG", "VIDEO", "CANVAS", "PICTURE", "SOURCE"].includes(element.tagName)) continue;
          const style = getComputedStyle(element);
          const candidates = [
            ["text", parseColor(style.color), true],
            ["background", parseColor(style.backgroundColor), false],
            ["border-top", parseColor(style.borderTopColor), Number.parseFloat(style.borderTopWidth) > 0],
            ["border-right", parseColor(style.borderRightColor), Number.parseFloat(style.borderRightWidth) > 0],
            ["border-bottom", parseColor(style.borderBottomColor), Number.parseFloat(style.borderBottomWidth) > 0],
            ["border-left", parseColor(style.borderLeftColor), Number.parseFloat(style.borderLeftWidth) > 0],
          ];

          for (const [property, parsed, relevant] of candidates) {
            if (!relevant || !parsed || parsed.alpha < 0.08) continue;
            if (
              retiredColors.some((color) => same(parsed.rgb, color)) ||
              isOrange(parsed.rgb) ||
              isGreen(parsed.rgb)
            ) {
              problems.push(`${property} retains retired orange/green/black ${parsed.rgb.join(",")}: ${label(element)}`);
              break;
            }
          }
        }

        if (currentRoute === "/cv/") {
          const actionLinks = [...document.querySelectorAll(".brand-action-row a")].filter(visible);
          if (actionLinks.length < 4) {
            problems.push(`expected 4 CV action links, found ${actionLinks.length}`);
          } else {
            const firstStyle = getComputedStyle(actionLinks[0]);
            const firstText = parseColor(firstStyle.color);
            const firstBackground = parseColor(firstStyle.backgroundColor);
            if (!firstText || !same(firstText.rgb, expectedColors.paperBright)) {
              problems.push(`primary CV action text is not bright paper: ${label(actionLinks[0])}`);
            }
            if (!firstBackground || !same(firstBackground.rgb, expectedColors.signal)) {
              problems.push(`primary CV action background is not electric cobalt: ${label(actionLinks[0])}`);
            }
            for (const link of actionLinks.slice(1)) {
              const color = parseColor(getComputedStyle(link).color);
              if (!color || !same(color.rgb, expectedColors.signal)) {
                problems.push(`secondary CV action is not electric cobalt: ${label(link)}`);
              }
            }
          }

          const ctaLabel = document.querySelector(".brand-cta > p");
          const ctaAction = document.querySelector(".brand-cta > a");
          if (!visible(ctaLabel) || !visible(ctaAction)) {
            problems.push("CV closing CTA is missing");
          } else {
            const labelColor = parseColor(getComputedStyle(ctaLabel).color);
            const actionStyle = getComputedStyle(ctaAction);
            const actionColor = parseColor(actionStyle.color);
            const actionBackground = parseColor(actionStyle.backgroundColor);
            if (!labelColor || !same(labelColor.rgb, expectedColors.bright)) {
              problems.push(`CV closing label is not bright cyan-blue: ${label(ctaLabel)}`);
            }
            if (!actionColor || !same(actionColor.rgb, expectedColors.ink)) {
              problems.push(`CV closing action text is not gunmetal: ${label(ctaAction)}`);
            }
            if (!actionBackground || !same(actionBackground.rgb, expectedColors.bright)) {
              problems.push(`CV closing action background is not bright cyan-blue: ${label(ctaAction)}`);
            }
          }

          const ruleFreeSelectors = [
            ".brand-interior-hero",
            ".brand-cv-section",
            ".brand-cv-section > h2",
            ".brand-cv-role",
            ".brand-cv-sidebar",
            ".brand-cv-sidebar h2",
            ".brand-cv-sidebar a",
            ".brand-cv-sidebar li",
          ];
          for (const selector of ruleFreeSelectors) {
            for (const element of [...document.querySelectorAll(selector)].filter(visible)) {
              const style = getComputedStyle(element);
              const borderWidths = [
                style.borderTopWidth,
                style.borderRightWidth,
                style.borderBottomWidth,
                style.borderLeftWidth,
              ].map(Number.parseFloat);
              if (borderWidths.some((width) => width > 0)) {
                problems.push(`CV structural rule remains on ${selector}: ${label(element)}`);
              }
            }
          }
        }

        return [...new Set(problems)];
      }, { currentRoute: route, expectedColors: expected });

      if (issues.length) {
        failures.push({ route, viewport, issues });
        console.error(`FAIL ${runLabel}`);
        issues.forEach((issue) => console.error(`  ${issue}`));
        await page.screenshot({
          path: `artifacts/palette-audit/${viewport.name}-${safeName(route)}.png`,
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
  console.error(`\nPalette audit failed: ${failures.length} rendered case(s).`);
  process.exit(1);
}

console.log(`\nPalette audit passed: ${routes.length} routes × ${viewports.length} viewports.`);
