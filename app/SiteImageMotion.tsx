"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const roundToDevicePixel = (value: number) => {
  const density = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
  return Math.round(value * density) / density;
};

export default function SiteImageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const activeTargets = new Set<HTMLElement>();
    const targets = new Set<HTMLElement>();
    const loadListeners: Array<[HTMLImageElement, () => void]> = [];
    let observer: IntersectionObserver | null = null;
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

    const setup = () => {
      root.classList.add("image-motion-enabled");
      if (reduceMotion.matches) root.classList.add("motion-reduced");

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

      update();
    };

    setupFrame = window.requestAnimationFrame(setup);
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      loadListeners.forEach(([image, listener]) => image.removeEventListener("load", listener));
      if (frame) window.cancelAnimationFrame(frame);
      if (setupFrame) window.cancelAnimationFrame(setupFrame);
      targets.forEach((target) => {
        target.style.removeProperty("--scroll-image-y");
        target.removeAttribute("data-scroll-image-motion");
        target.removeAttribute("data-scroll-image-active");
      });
      root.classList.remove("image-motion-enabled", "motion-reduced");
    };
  }, [pathname]);

  return null;
}
