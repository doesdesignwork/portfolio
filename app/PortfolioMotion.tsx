"use client";

import { useEffect } from "react";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const sectionOrder = ["top", "work", "archive", "about", "contact"] as const;

export default function PortfolioMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const sideIndex = document.querySelector<HTMLElement>("[data-side-index]");
    const sectionLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-section-link]"),
    );
    const sections = sectionOrder
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const counterCurrent = document.querySelector<HTMLElement>(
      "[data-section-counter-current]",
    );

    root.classList.add("motion-enabled");

    if (reduceMotion.matches) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      root.classList.add("motion-reduced");
    }

    let activeSection = "";
    let counterTimer: number | undefined;

    const setActiveSection = (id: string, animate = true) => {
      if (!sectionOrder.includes(id as (typeof sectionOrder)[number])) return;
      if (activeSection === id) return;

      activeSection = id;
      sideIndex?.setAttribute("data-active-section", id);

      sectionLinks.forEach((link) => {
        const isActive = link.dataset.sectionLink === id;
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      const index = sectionOrder.indexOf(id as (typeof sectionOrder)[number]) + 1;
      if (counterCurrent) {
        window.clearTimeout(counterTimer);
        counterCurrent.classList.remove("is-changing");

        if (animate && !reduceMotion.matches) {
          requestAnimationFrame(() => {
            counterCurrent.textContent = String(index).padStart(2, "0");
            counterCurrent.classList.add("is-changing");
            counterTimer = window.setTimeout(
              () => counterCurrent.classList.remove("is-changing"),
              380,
            );
          });
        } else {
          counterCurrent.textContent = String(index).padStart(2, "0");
        }
      }
    };

    let scrollFrame = 0;
    const updateActiveFromScroll = () => {
      scrollFrame = 0;
      if (!sections.length) return;

      const readingLine = window.innerHeight * 0.36;
      let current = sections[0];

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) {
          current = section;
        }
      });

      const pageBottom = window.scrollY + window.innerHeight;
      if (pageBottom >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1];
      }

      setActiveSection(current.id);
    };

    const queueSectionUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(updateActiveFromScroll);
    };

    sectionLinks.forEach((link) => {
      const handleClick = () => {
        const target = link.dataset.sectionLink;
        if (target) setActiveSection(target);
      };

      link.addEventListener("click", handleClick);
      link.dataset.sectionReady = "true";
    });

    window.addEventListener("scroll", queueSectionUpdate, { passive: true });
    window.addEventListener("resize", queueSectionUpdate);
    updateActiveFromScroll();

    let revealObserver: IntersectionObserver | null = null;

    if (!reduceMotion.matches) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver?.unobserve(entry.target);
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -8% 0px",
        },
      );

      revealItems.forEach((item) => revealObserver?.observe(item));
    }

    const cleanups: Array<() => void> = [];

    if (!reduceMotion.matches && finePointer.matches) {
      const magneticItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-magnetic]"),
      );

      magneticItems.forEach((item) => {
        const handleMove = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const relativeX = event.clientX - (bounds.left + bounds.width / 2);
          const relativeY = event.clientY - (bounds.top + bounds.height / 2);
          const x = clamp((relativeX / bounds.width) * 30, -15, 15);
          const y = clamp((relativeY / bounds.height) * 30, -15, 15);

          item.style.setProperty("--mag-x", `${x.toFixed(2)}px`);
          item.style.setProperty("--mag-y", `${y.toFixed(2)}px`);
          item.setAttribute("data-magnetic-active", "true");
        };

        const handleLeave = () => {
          item.style.setProperty("--mag-x", "0px");
          item.style.setProperty("--mag-y", "0px");
          item.removeAttribute("data-magnetic-active");
        };

        item.addEventListener("pointermove", handleMove);
        item.addEventListener("pointerleave", handleLeave);
        item.addEventListener("blur", handleLeave, true);

        cleanups.push(() => {
          item.removeEventListener("pointermove", handleMove);
          item.removeEventListener("pointerleave", handleLeave);
          item.removeEventListener("blur", handleLeave, true);
        });
      });
    }

    return () => {
      revealObserver?.disconnect();
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", queueSectionUpdate);
      window.removeEventListener("resize", queueSectionUpdate);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      window.clearTimeout(counterTimer);
      sectionLinks.forEach((link) => {
        link.removeAttribute("data-section-ready");
      });
      root.classList.remove("motion-enabled", "motion-reduced");
    };
  }, []);

  return null;
}
