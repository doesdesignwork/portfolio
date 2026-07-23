"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger owns the entrance states; reduced-motion users bypass them entirely.
export function ScrollMotion() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const scope = document.querySelector<HTMLElement>(".site-shell");
    if (!scope) return;

    let isActive = true;
    let snapReady = false;
    let isSnapping = false;
    let snapTimer: number | undefined;
    let snapTween: gsap.core.Tween | undefined;
    const snapSections = Array.from(
      scope.querySelectorAll<HTMLElement>("[data-snap-section]"),
    );

    const cancelSnap = () => {
      if (snapTween) snapTween.kill();
      snapTween = undefined;
      isSnapping = false;
    };

    const snapToNearestSection = () => {
      if (!snapReady || isSnapping || snapSections.length === 0) return;

      const headerHeight =
        document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
      const currentScroll = window.scrollY;
      const sectionPositions = snapSections.map((section) =>
        Math.max(0, currentScroll + section.getBoundingClientRect().top - headerHeight),
      );
      const targetScroll = sectionPositions.reduce((nearest, position) =>
        Math.abs(position - currentScroll) < Math.abs(nearest - currentScroll)
          ? position
          : nearest,
      );
      const distance = targetScroll - currentScroll;
      const snapRange = Math.min(300, window.innerHeight * 0.34);

      if (Math.abs(distance) < 2 || Math.abs(distance) > snapRange) return;

      const position = { y: currentScroll };
      isSnapping = true;
      snapTween = gsap.to(position, {
        y: targetScroll,
        duration: 0.52,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => window.scrollTo(0, position.y),
        onComplete: () => {
          snapTween = undefined;
          isSnapping = false;
        },
        onInterrupt: () => {
          snapTween = undefined;
          isSnapping = false;
        },
      });
    };

    const queueSnap = () => {
      if (!snapReady || isSnapping) return;
      window.clearTimeout(snapTimer);
      snapTimer = window.setTimeout(snapToNearestSection, 160);
    };

    const handleSnapKeyDown = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
          event.key,
        )
      ) {
        cancelSnap();
      }
    };

    const handleSnapKeyUp = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
          event.key,
        )
      ) {
        queueSnap();
      }
    };

    const handleWheel = () => {
      cancelSnap();
      queueSnap();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", cancelSnap, { passive: true });
    window.addEventListener("touchend", queueSnap, { passive: true });
    window.addEventListener("pointerdown", cancelSnap, { passive: true });
    window.addEventListener("keydown", handleSnapKeyDown);
    window.addEventListener("keyup", handleSnapKeyUp);

    const context = gsap.context(() => {
      gsap.from(".site-header", {
        y: -10,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power3.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { y: 10, autoAlpha: 0, duration: 0.22 })
        .from(
          ".hero h1 > *",
          { yPercent: 18, autoAlpha: 0, duration: 0.4, stagger: 0.04 },
          "-=0.12",
        )
        .from(
          ".hero-support > *",
          { y: 14, autoAlpha: 0, duration: 0.3, stagger: 0.04 },
          "-=0.26",
        )
        .from(
          ".hero-work-preview figure",
          {
            y: 20,
            autoAlpha: 0,
            clipPath: "inset(0 0 8% 0)",
            duration: 0.44,
            stagger: 0.06,
          },
          "-=0.18",
        );

      gsap.to(".hero h1", {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".hero-work-main img", {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-work-preview",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".manifesto h2 span", {
        yPercent: 16,
        autoAlpha: 0,
        duration: 0.42,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".manifesto p", {
        y: 14,
        autoAlpha: 0,
        duration: 0.36,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 66%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".work-heading > *", {
        y: 16,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".featured-project").forEach((project) => {
        const media = project.querySelector(".featured-project-media");
        const captionItems = project.querySelectorAll(".project-caption > *");
        const projectTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: "top 84%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .from(media, {
            y: 20,
            autoAlpha: 0,
            clipPath: "inset(0 0 8% 0)",
            duration: 0.46,
            ease: "power3.out",
          })
          .from(
            captionItems,
            {
              y: 9,
              autoAlpha: 0,
              duration: 0.28,
              stagger: 0.03,
              ease: "power2.out",
            },
            "-=0.28",
          );
      });

      gsap.from(".more-work-heading > *", {
        y: 15,
        autoAlpha: 0,
        duration: 0.38,
        stagger: 0.045,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".more-work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".selected-project").forEach((project, index) => {
        const media = project.querySelector(".selected-project-media");
        const copy = project.querySelector(".selected-project-copy");
        const projectTimeline = gsap.timeline({
          delay: (index % 4) * 0.025,
          scrollTrigger: {
            trigger: project,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });

        projectTimeline
          .from(media, {
            y: 18,
            autoAlpha: 0,
            scale: 0.992,
            clipPath: "inset(0 0 7% 0)",
            duration: 0.42,
            ease: "power3.out",
          })
          .from(
            copy,
            {
              y: 9,
              autoAlpha: 0,
              duration: 0.26,
              ease: "power2.out",
            },
            "-=0.24",
          );
      });

      gsap.from(".about-heading h2 span", {
        yPercent: 15,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      const aboutTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      aboutTimeline
        .from(".about-copy > *", {
          y: 16,
          autoAlpha: 0,
          duration: 0.4,
          stagger: 0.055,
          ease: "power3.out",
        })
        .from(
          ".career-ledger > div",
          {
            y: 14,
            autoAlpha: 0,
            duration: 0.34,
            stagger: 0.045,
            ease: "power2.out",
          },
          "-=0.24",
        );

      gsap.from(".capability-index li", {
        y: 10,
        autoAlpha: 0,
        duration: 0.3,
        stagger: 0.035,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".capability-index",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-heading h2 span", {
        yPercent: 15,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-section li", {
        y: 13,
        autoAlpha: 0,
        duration: 0.34,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section ol",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-section h2 span", {
        yPercent: 15,
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-links a", {
        y: 12,
        autoAlpha: 0,
        duration: 0.32,
        stagger: 0.045,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".footer-line > *", {
        y: 8,
        autoAlpha: 0,
        duration: 0.28,
        stagger: 0.04,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".footer-line",
          start: "top 94%",
          toggleActions: "play none none reverse",
        },
      });

    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    const layoutImages = Array.from(
      scope.querySelectorAll<HTMLImageElement>(".hero img, .featured-work img"),
    );
    Promise.all([
      document.fonts.ready,
      ...layoutImages.map((image) => image.decode().catch(() => undefined)),
    ]).then(() => {
      if (!isActive) return;
      window.requestAnimationFrame(() => {
        if (!isActive) return;
        refresh();
        snapReady = true;
      });
    });
    window.addEventListener("load", refresh, { once: true });
    window.requestAnimationFrame(refresh);
    window.requestAnimationFrame(() => {
      snapReady = true;
    });

    return () => {
      isActive = false;
      window.clearTimeout(snapTimer);
      cancelSnap();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", cancelSnap);
      window.removeEventListener("touchend", queueSnap);
      window.removeEventListener("pointerdown", cancelSnap);
      window.removeEventListener("keydown", handleSnapKeyDown);
      window.removeEventListener("keyup", handleSnapKeyUp);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return null;
}
