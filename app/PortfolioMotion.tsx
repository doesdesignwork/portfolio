"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const sectionOrder = ["top", "work", "ux-ui", "archive", "about", "contact"] as const;

export default function PortfolioMotion() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    let animationContext: gsap.Context | null = null;

    if (!reduceMotion.matches) {
      animationContext = gsap.context(() => {
        const heroChars = gsap.utils.toArray<HTMLElement>("[data-hero-char]");

        if (heroChars.length) {
          gsap.set(heroChars, {
            yPercent: 145,
            rotateZ: 4,
            scaleY: 0.72,
            opacity: 0,
          });

          gsap.to(heroChars, {
            yPercent: 0,
            rotateZ: 0,
            scaleY: 1,
            opacity: 1,
            duration: 1.02,
            stagger: {
              each: 0.018,
              from: "start",
            },
            ease: "elastic.out(1.3, 0.34)",
            delay: 0.08,
            force3D: true,
          });
        }

        const tickerSection = document.querySelector<HTMLElement>("[data-scroll-ticker]");
        const tickerTrack = tickerSection?.querySelector<HTMLElement>("[data-ticker-track]");
        const tickerLetters = gsap.utils.toArray<HTMLElement>("[data-ticker-letter]");

        if (tickerTrack && tickerSection) {
          const tickerTween = gsap.to(tickerTrack, {
            xPercent: -50,
            duration: 26,
            repeat: -1,
            ease: "none",
          });

          const tickerState = { speed: 1 };
          let tickerSpeedTween: gsap.core.Tween | null = null;

          const applyTickerSpeed = () => {
            tickerTween.timeScale(tickerState.speed);
          };

          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              const downwardVelocity = Math.max(0, self.getVelocity());
              const targetSpeed = clamp(1 + downwardVelocity / 850, 1, 5.2);

              tickerSpeedTween?.kill();
              tickerSpeedTween = gsap.to(tickerState, {
                speed: targetSpeed,
                duration: 0.08,
                ease: "power2.out",
                overwrite: true,
                onUpdate: applyTickerSpeed,
                onComplete: () => {
                  tickerSpeedTween = gsap.to(tickerState, {
                    speed: 1,
                    duration: 0.72,
                    delay: 0.04,
                    ease: "power3.out",
                    overwrite: true,
                    onUpdate: applyTickerSpeed,
                  });
                },
              });
            },
          });

          if (tickerLetters.length) {
            gsap.fromTo(
              tickerLetters,
              {
                yPercent: 125,
                rotateZ: 3,
                opacity: 0,
              },
              {
                yPercent: 0,
                rotateZ: 0,
                opacity: 1,
                duration: 0.58,
                stagger: 0.004,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: tickerSection,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          }
        }
      }, document.body);
    }

    if (!reduceMotion.matches && finePointer.matches) {
      const magneticItems = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-link]"),
      );

      magneticItems.forEach((item) => {
        const xTo = gsap.quickTo(item, "x", {
          duration: 0.16,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(item, "y", {
          duration: 0.16,
          ease: "power3.out",
        });
        const stretchTargets = Array.from(
          item.querySelectorAll<HTMLElement>("[data-project-stretch]"),
        );

        const handleMove = (event: PointerEvent) => {
          const bounds = item.getBoundingClientRect();
          const relativeX = event.clientX - (bounds.left + bounds.width / 2);
          const relativeY = event.clientY - (bounds.top + bounds.height / 2);
          const x = clamp((relativeX / bounds.width) * 18, -9, 9);
          const y = clamp((relativeY / bounds.height) * 18, -9, 9);

          xTo(x);
          yTo(y);
          item.setAttribute("data-magnetic-active", "true");
        };

        const stretchIn = () => {
          if (!stretchTargets.length) return;
          gsap.to(stretchTargets, {
            fontVariationSettings: '"wdth" 138',
            fontStretch: "138%",
            scaleX: 1.075,
            duration: 0.28,
            ease: "power3.out",
            overwrite: true,
          });
        };

        const reset = () => {
          xTo(0);
          yTo(0);
          item.removeAttribute("data-magnetic-active");
          if (stretchTargets.length) {
            gsap.to(stretchTargets, {
              fontVariationSettings: '"wdth" 100',
              fontStretch: "100%",
              scaleX: 1,
              duration: 0.34,
              ease: "power3.out",
              overwrite: true,
            });
          }
        };

        item.addEventListener("pointerenter", stretchIn);
        item.addEventListener("pointermove", handleMove);
        item.addEventListener("pointerleave", reset);
        item.addEventListener("focus", stretchIn);
        item.addEventListener("blur", reset);

        cleanups.push(() => {
          item.removeEventListener("pointerenter", stretchIn);
          item.removeEventListener("pointermove", handleMove);
          item.removeEventListener("pointerleave", reset);
          item.removeEventListener("focus", stretchIn);
          item.removeEventListener("blur", reset);
        });
      });
    }

    return () => {
      animationContext?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
