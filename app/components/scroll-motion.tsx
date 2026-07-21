"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      snapTimer = window.setTimeout(snapToNearestSection, 140);
    };

    const handleSnapKey = (event: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
          event.key,
        )
      ) {
        cancelSnap();
      }
    };

    window.addEventListener("scroll", queueSnap, { passive: true });
    window.addEventListener("wheel", cancelSnap, { passive: true });
    window.addEventListener("touchstart", cancelSnap, { passive: true });
    window.addEventListener("pointerdown", cancelSnap, { passive: true });
    window.addEventListener("keydown", handleSnapKey);

    const context = gsap.context(() => {
      gsap.from(".site-header", {
        autoAlpha: 0,
        y: -16,
        duration: 0.5,
        ease: "power3.out",
      });

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTimeline
        .from(".hero-eyebrow", { autoAlpha: 0, y: 16, duration: 0.45 })
        .from(
          ".hero h1 > *",
          { autoAlpha: 0, yPercent: 72, duration: 0.8, stagger: 0.09 },
          "-=0.18",
        )
        .from(
          ".hero-support > *",
          { autoAlpha: 0, y: 22, duration: 0.5, stagger: 0.08 },
          "-=0.38",
        )
        .from(
          ".hero-work-preview figure",
          { autoAlpha: 0, y: 34, duration: 0.68, stagger: 0.1 },
          "-=0.22",
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
        autoAlpha: 0,
        yPercent: 45,
        duration: 0.78,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 76%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".manifesto p", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".manifesto",
          start: "top 66%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".work-heading > *", {
        autoAlpha: 0,
        y: 28,
        duration: 0.68,
        stagger: 0.08,
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
            autoAlpha: 0,
            y: 34,
            clipPath: "inset(0 0 12% 0)",
            duration: 0.78,
            ease: "power3.out",
          })
          .from(
            captionItems,
            { autoAlpha: 0, y: 14, duration: 0.42, stagger: 0.045, ease: "power2.out" },
            "-=0.38",
          );
      });

      gsap.from(".more-work-heading > *", {
        autoAlpha: 0,
        y: 26,
        duration: 0.64,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".more-work-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.utils.toArray<HTMLElement>(".selected-project").forEach((project, index) => {
        gsap.from(project, {
          autoAlpha: 0,
          y: 26,
          scale: 0.985,
          duration: 0.58,
          delay: (index % 4) * 0.045,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.from(".about-heading h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.74,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".about-content > *", {
        autoAlpha: 0,
        y: 30,
        duration: 0.68,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".capability-index span", {
        autoAlpha: 0,
        y: 18,
        duration: 0.48,
        stagger: 0.055,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".capability-index",
          start: "top 86%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-heading h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.74,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-heading",
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".process-section li", {
        autoAlpha: 0,
        y: 24,
        duration: 0.56,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section ol",
          start: "top 84%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-section h2 span", {
        autoAlpha: 0,
        yPercent: 42,
        duration: 0.76,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-links a", {
        autoAlpha: 0,
        y: 22,
        duration: 0.52,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 88%",
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

    return () => {
      isActive = false;
      window.clearTimeout(snapTimer);
      cancelSnap();
      window.removeEventListener("scroll", queueSnap);
      window.removeEventListener("wheel", cancelSnap);
      window.removeEventListener("touchstart", cancelSnap);
      window.removeEventListener("pointerdown", cancelSnap);
      window.removeEventListener("keydown", handleSnapKey);
      window.removeEventListener("load", refresh);
      context.revert();
    };
  }, []);

  return null;
}
