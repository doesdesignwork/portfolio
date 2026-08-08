"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const roundToDevicePixel = (value: number) => {
  const density = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  return Math.round(value * density) / density;
};

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

const renderCounterValue = (template: string, progress: number) => {
  const eased = easeOutCubic(clamp(progress, 0, 1));
  return template.replace(/\d+/g, (token) =>
    String(Math.round(Number(token) * eased)),
  );
};

const kineticHeadingScale = (progress: number) => {
  const p = clamp(progress, 0, 1);
  const peakAt = 0.68;
  const startScale = 0.9;
  const peakScale = 1.055;

  if (p <= peakAt) {
    const entry = easeOutCubic(p / peakAt);
    return startScale + (peakScale - startScale) * entry;
  }

  const settle = easeOutCubic((p - peakAt) / (1 - peakAt));
  return peakScale + (1 - peakScale) * settle;
};

export default function SiteImageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const activeTargets = new Set<HTMLElement>();
    const targets = new Set<HTMLElement>();
    const activeHeadings = new Set<HTMLElement>();
    const headings = new Set<HTMLElement>();
    const loadListeners: Array<[HTMLImageElement, () => void]> = [];
    const counterFrames = new Set<number>();
    let observer: IntersectionObserver | null = null;
    let headingObserver: IntersectionObserver | null = null;
    let counterObserver: IntersectionObserver | null = null;
    let frame = 0;
    let setupFrame = 0;

    const update = () => {
      frame = 0;
      if (reduceMotion.matches) return;

      const viewportHeight = window.innerHeight;
      const range = window.innerWidth <= 760 ? 7 : clamp(viewportHeight * 0.018, 9, 16);

      activeTargets.forEach((target) => {
        const bounds = target.getBoundingClientRect();
        const travel = viewportHeight + bounds.height;
        const progress = travel ? (bounds.top + bounds.height) / travel : 0.5;
        const offset = roundToDevicePixel(
          clamp((0.5 - progress) * range * 2, -range, range),
        );
        target.style.setProperty("--scroll-image-y", `${offset}px`);
      });

      activeHeadings.forEach((heading) => {
        const bounds = heading.getBoundingClientRect();
        const entryStart = viewportHeight * 0.98;
        const entryEnd = viewportHeight * 0.27;
        const progress = clamp(
          (entryStart - bounds.top) / Math.max(1, entryStart - entryEnd),
          0,
          1,
        );
        const eased = easeOutCubic(progress);
        const y = roundToDevicePixel((1 - eased) * 48 - eased * 4);
        const tilt = (1 - eased) * 2.2;
        const scale = kineticHeadingScale(progress);
        const opacity = 0.12 + eased * 0.88;

        heading.style.setProperty("--scroll-heading-y", `${y}px`);
        heading.style.setProperty("--scroll-heading-tilt", `${tilt.toFixed(3)}deg`);
        heading.style.setProperty("--scroll-heading-scale", scale.toFixed(4));
        heading.style.setProperty("--scroll-heading-opacity", opacity.toFixed(3));
      });
    };

    const queueUpdate = () => {
      if (frame || reduceMotion.matches) return;
      frame = window.requestAnimationFrame(update);
    };

    const registerImage = (image: HTMLImageElement) => {
      const sourceWidth = Number(image.dataset.sourceWidth || image.naturalWidth || 0);
      const sourceHeight = Number(image.dataset.sourceHeight || image.naturalHeight || 0);
      if (!sourceWidth || !sourceHeight) return;

      image.dataset.qualityImage = "true";
      image.dataset.sourceWidth = String(sourceWidth);
      image.dataset.sourceHeight = String(sourceHeight);
      image.style.setProperty("--source-image-width", `${sourceWidth}px`);
      image.style.maxWidth = `${sourceWidth}px`;
      image.style.marginInline = "auto";

      if (
        sourceWidth < 240 ||
        sourceHeight < 180 ||
        image.closest("header") ||
        image.closest("[data-archive-preview]") ||
        image.closest("[data-no-scroll-motion]")
      ) {
        return;
      }

      const target =
        image.closest<HTMLElement>("figure") ??
        image.parentElement ??
        image;

      if (targets.has(target)) return;
      targets.add(target);
      target.dataset.scrollImageMotion = "true";
      target.style.setProperty("--scroll-image-y", "0px");
      observer?.observe(target);
    };

    const registerHeading = (heading: HTMLElement) => {
      if (headings.has(heading)) return;
      headings.add(heading);
      heading.dataset.scrollHeadingMotion = "kinetic-scale";
      heading.style.setProperty("--scroll-heading-y", "48px");
      heading.style.setProperty("--scroll-heading-tilt", "2.2deg");
      heading.style.setProperty("--scroll-heading-scale", "0.9");
      heading.style.setProperty("--scroll-heading-opacity", "0.12");

      const textAlign = window.getComputedStyle(heading).textAlign;
      heading.style.transformOrigin = textAlign === "right" ? "100% 62%" : textAlign === "center" ? "50% 62%" : "0 62%";
      headingObserver?.observe(heading);
    };

    const animateCounter = (counter: HTMLElement) => {
      if (counter.dataset.counterAnimated === "true") return;
      const template = counter.dataset.counterTemplate || counter.textContent?.trim() || "";
      if (!/\d/.test(template)) return;

      counter.dataset.counterAnimated = "true";
      counter.dataset.counterTemplate = template;
      const start = performance.now();
      const duration = 1050;

      const tick = (now: number) => {
        const progress = clamp((now - start) / duration, 0, 1);
        counter.textContent = renderCounterValue(template, progress);

        if (progress < 1) {
          const nextFrame = window.requestAnimationFrame(tick);
          counterFrames.add(nextFrame);
        } else {
          counter.textContent = template;
          counter.classList.add("is-counter-complete");
        }
      };

      counter.textContent = renderCounterValue(template, 0);
      const counterFrame = window.requestAnimationFrame(tick);
      counterFrames.add(counterFrame);
    };

    const setup = () => {
      root.classList.add("image-motion-enabled", "text-motion-enabled");
      if (reduceMotion.matches) root.classList.add("motion-reduced");

      document
        .querySelectorAll<HTMLElement>("aside[data-side-index] > div:first-child")
        .forEach((marker) => {
          if (marker.querySelector("[data-section-counter]") || marker.textContent?.includes("GT")) {
            marker.remove();
          }
        });

      if (!reduceMotion.matches) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const target = entry.target as HTMLElement;
              if (entry.isIntersecting) {
                activeTargets.add(target);
                target.dataset.scrollImageActive = "true";
              } else {
                activeTargets.delete(target);
                target.removeAttribute("data-scroll-image-active");
              }
            });
            queueUpdate();
          },
          { rootMargin: "18% 0px 18% 0px", threshold: 0 },
        );

        headingObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const heading = entry.target as HTMLElement;
              if (entry.isIntersecting) {
                activeHeadings.add(heading);
                heading.dataset.scrollHeadingActive = "true";
              } else {
                activeHeadings.delete(heading);
                heading.removeAttribute("data-scroll-heading-active");
              }
            });
            queueUpdate();
          },
          { rootMargin: "18% 0px 18% 0px", threshold: 0 },
        );

        counterObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const counter = entry.target as HTMLElement;
              animateCounter(counter);
              counterObserver?.unobserve(counter);
            });
          },
          { threshold: 0.42, rootMargin: "0px 0px -8% 0px" },
        );
      }

      const images = Array.from(
        document.querySelectorAll<HTMLImageElement>(
          ".site-page main img[data-quality-image='true'], .site-page footer img[data-quality-image='true'], .site-page main img[data-sharp-image='true'], .site-page footer img[data-sharp-image='true']",
        ),
      );

      images.forEach((image) => {
        if (image.complete && image.naturalWidth) {
          registerImage(image);
          return;
        }
        const onLoad = () => {
          registerImage(image);
          queueUpdate();
        };
        loadListeners.push([image, onLoad]);
        image.addEventListener("load", onLoad, { once: true });
      });

      const headingCandidates = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".site-page main h1, .site-page main h2, .site-page main h3, .site-page article h1, .site-page article h2, .site-page article h3, .site-page footer h2, .site-page footer h3",
        ),
      );

      headingCandidates
        .filter((heading) => {
          const size = Number.parseFloat(window.getComputedStyle(heading).fontSize);
          return heading.tagName !== "H3" || size >= 24;
        })
        .forEach(registerHeading);

      const counters = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".site-page--home .brand-hero-proof dt",
        ),
      );
      counters.forEach((counter) => {
        counter.dataset.counterTemplate = counter.textContent?.trim() || "";
        counter.dataset.scrollCounter = "true";
        if (reduceMotion.matches) {
          counter.dataset.counterAnimated = "true";
          return;
        }
        counterObserver?.observe(counter);
      });

      update();
    };

    setupFrame = window.requestAnimationFrame(setup);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      observer?.disconnect();
      headingObserver?.disconnect();
      counterObserver?.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      loadListeners.forEach(([image, listener]) => image.removeEventListener("load", listener));
      if (frame) window.cancelAnimationFrame(frame);
      if (setupFrame) window.cancelAnimationFrame(setupFrame);
      counterFrames.forEach((counterFrame) => window.cancelAnimationFrame(counterFrame));
      targets.forEach((target) => {
        target.style.removeProperty("--scroll-image-y");
        target.removeAttribute("data-scroll-image-motion");
        target.removeAttribute("data-scroll-image-active");
      });
      headings.forEach((heading) => {
        heading.style.removeProperty("--scroll-heading-y");
        heading.style.removeProperty("--scroll-heading-tilt");
        heading.style.removeProperty("--scroll-heading-scale");
        heading.style.removeProperty("--scroll-heading-opacity");
        heading.style.removeProperty("transform-origin");
        heading.removeAttribute("data-scroll-heading-motion");
        heading.removeAttribute("data-scroll-heading-active");
      });
      document.querySelectorAll<HTMLElement>("[data-scroll-counter]").forEach((counter) => {
        const template = counter.dataset.counterTemplate;
        if (template) counter.textContent = template;
        counter.removeAttribute("data-scroll-counter");
        counter.removeAttribute("data-counter-animated");
        counter.removeAttribute("data-counter-template");
      });
      root.classList.remove("image-motion-enabled", "text-motion-enabled", "motion-reduced");
    };
  }, [pathname]);

  return null;
}
