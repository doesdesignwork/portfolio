"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects";


const capabilities = [
  "Creative direction",
  "Brand identity",
  "Campaign systems",
  "Experiential design",
  "Motion storytelling",
  "UX thinking",
];

const featuredProjectNumbers = ["13", "08", "01"];
const featuredProjects = featuredProjectNumbers
  .map((number) => projects.find((project) => project.number === number))
  .filter((project): project is (typeof projects)[number] => Boolean(project));
const selectedProjects = projects.filter((project) => !project.featured);

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const projectPageRef = useRef<HTMLDivElement>(null);
  const lastProjectTriggerRef = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeProject, setActiveProject] = useState(0);
  const [activeProjectImage, setActiveProjectImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isProjectPreloadReady, setIsProjectPreloadReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("gerard-theme");
    const initial = stored === "light" || stored === "dark"
      ? stored
      : window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    document.documentElement.dataset.theme = initial;
    const frame = window.requestAnimationFrame(() => setTheme(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleLightboxKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "Tab") {
        const focusable = Array.from(
          projectPageRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        setActiveProjectImage((current) => (current - 1 + projects[activeProject].images.length) % projects[activeProject].images.length);
      }
      if (event.key === "ArrowRight") {
        setActiveProjectImage((current) => (current + 1) % projects[activeProject].images.length);
      }
    };
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => lightboxCloseRef.current?.focus());
    window.addEventListener("keydown", handleLightboxKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKeys);
      window.requestAnimationFrame(() => lastProjectTriggerRef.current?.focus());
    };
  }, [isLightboxOpen, activeProject]);

  useEffect(() => {
    const root = rootRef.current;
    const hero = heroRef.current;
    if (!root || !hero) return;

    const landing = root.querySelector<HTMLElement>(".showreel-intro-panel");
    const heroStage = hero.querySelector<HTMLElement>(".hero-stage");
    const parallaxElements = Array.from(root.querySelectorAll<HTMLElement>("[data-parallax]"));
    const scrollSections = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-section]"));
    const scrollTextElements = Array.from(root.querySelectorAll<HTMLElement>("[data-scroll-text]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let lastProgress = -1;
    let lastLandingProgress = -1;
    const update = () => {
      if (landing) {
        const landingRect = landing.getBoundingClientRect();
        const landingRange = Math.max(1, Math.min(landingRect.height, window.innerHeight) * .72);
        const landingProgress = Math.min(1, Math.max(0, -landingRect.top / landingRange));
        if (Math.abs(landingProgress - lastLandingProgress) > .001) {
          root.style.setProperty("--landing-progress", landingProgress.toFixed(4));
          lastLandingProgress = landingProgress;
        }
      }
      const heroRect = hero.getBoundingClientRect();
      const stageHeight = heroStage?.getBoundingClientRect().height ?? window.innerHeight;
      const stickyTop = heroStage ? Number.parseFloat(window.getComputedStyle(heroStage).top) || 0 : 0;
      const scrollRange = Math.max(1, heroRect.height - stageHeight);
      const progress = Math.min(1, Math.max(0, (stickyTop - heroRect.top) / scrollRange));
      if (Math.abs(progress - lastProgress) > .001) {
        root.style.setProperty("--hero-progress", progress.toFixed(4));
        lastProgress = progress;
      }

      if (!reduceMotion) {
        const viewportCenter = window.innerHeight / 2;
        parallaxElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) return;
          const elementCenter = rect.top + rect.height / 2;
          const strength = Number(element.dataset.parallax ?? 0.04);
          const offset = Math.max(-36, Math.min(36, (viewportCenter - elementCenter) * strength));
          element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
        });

        scrollSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.bottom < -window.innerHeight || rect.top > window.innerHeight * 2) return;
          const elementCenter = rect.top + rect.height / 2;
          const travel = Math.max(window.innerHeight + rect.height, 1);
          const normalized = Math.max(-1, Math.min(1, (viewportCenter - elementCenter) / (travel / 2)));
          const visibility = Math.max(0, 1 - Math.abs(normalized));
          const shift = window.innerWidth <= 900 ? 30 : 44;
          const scaleFloor = window.innerWidth <= 900 ? 0.99 : 0.984;
          const scale = scaleFloor + visibility * (1 - scaleFloor);
          section.style.setProperty("--scroll-section-y", `${(normalized * shift).toFixed(2)}px`);
          section.style.setProperty("--scroll-section-scale", scale.toFixed(4));
        });

        scrollTextElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < -window.innerHeight * .2 || rect.top > window.innerHeight * 1.2) return;
          const delayStep = Number(element.dataset.scrollScrubDelay ?? element.dataset.textDelay ?? 0);
          const stagger = Math.min(window.innerHeight * .14, delayStep * window.innerHeight * .028);
          const enterStart = window.innerHeight * .94 - stagger;
          const enterEnd = window.innerHeight * .54 - stagger;
          const enterProgress = Math.max(0, Math.min(1, (enterStart - rect.top) / Math.max(enterStart - enterEnd, 1)));
          const exitStart = window.innerHeight * .36 + stagger * .35;
          const exitEnd = window.innerHeight * .08 + stagger * .15;
          const exitProgress = Math.max(0, Math.min(1, (rect.bottom - exitEnd) / Math.max(exitStart - exitEnd, 1)));
          const offset = ((1 - enterProgress) * 42) - ((1 - exitProgress) * 30);
          element.style.setProperty("--scroll-scrub-y", `${offset.toFixed(2)}px`);
          // Scroll motion can add life, but essential content must remain readable.
          element.style.opacity = "1";
          element.style.clipPath = "none";
        });
      }
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    root.classList.add("interactions-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    root.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      revealObserver.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const work = workRef.current;
    if (!work) return;

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsProjectPreloadReady(true);
          preloadObserver.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );
    preloadObserver.observe(work);
    return () => preloadObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isProjectPreloadReady) return;
    const project = projects[activeProject];
    const imageCount = project.images.length;
    const preloadSources = new Set([
      project.images[(activeProjectImage + 1) % imageCount],
      projects[(activeProject + 1) % projects.length].images[0],
    ]);

    preloadSources.forEach((src) => {
      const asset = new window.Image();
      asset.decoding = "async";
      asset.fetchPriority = "low";
      asset.src = src;
    });
  }, [activeProject, activeProjectImage, isProjectPreloadReady]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("gerard-theme", nextTheme);
  };

  const selectedProject = projects[activeProject];
  const activeImageIndex = Math.min(activeProjectImage, selectedProject.images.length - 1);
  const selectedImage = selectedProject.images[activeImageIndex];
  const selectedImageAlt = `${selectedProject.alt} — image ${activeImageIndex + 1} of ${selectedProject.images.length}`;
  const showPreviousProject = () => {
    setActiveProjectImage(0);
    setActiveProject((current) => (current - 1 + projects.length) % projects.length);
  };
  const showNextProject = () => {
    setActiveProjectImage(0);
    setActiveProject((current) => (current + 1) % projects.length);
  };
  const showPreviousImage = () => {
    setActiveProjectImage((current) => (current - 1 + selectedProject.images.length) % selectedProject.images.length);
  };
  const showNextImage = () => {
    setActiveProjectImage((current) => (current + 1) % selectedProject.images.length);
  };
  const openProject = (index: number, trigger: HTMLButtonElement) => {
    const nextIndex = (index + projects.length) % projects.length;
    lastProjectTriggerRef.current = trigger;
    setActiveProject(nextIndex);
    setActiveProjectImage(0);
    setIsLightboxOpen(true);
  };
  const handleProjectPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
    const y = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
    event.currentTarget.style.setProperty("--tile-rotate-x", `${(-y * 7).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tile-rotate-y", `${(x * 7).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--tile-light-x", `${((x + 0.5) * 100).toFixed(1)}%`);
    event.currentTarget.style.setProperty("--tile-light-y", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const resetProjectPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--tile-rotate-x", "0deg");
    event.currentTarget.style.setProperty("--tile-rotate-y", "0deg");
  };

  const renderProjectTile = (
    project: (typeof projects)[number],
    sequenceIndex: number,
    featured = false,
  ) => {
    const index = projects.indexOf(project);
    const desktopSize = featured || sequenceIndex % 5 < 2 ? "50vw" : "33vw";

    return (
      <button
        key={project.number}
        type="button"
        id={`project-${project.number}`}
        className="project-tile"
        data-project-index={index}
        style={{ "--tile-delay": `${(sequenceIndex % 8) * 55}ms` } as CSSProperties}
        onPointerMove={handleProjectPointerMove}
        onPointerLeave={resetProjectPointer}
        onPointerCancel={resetProjectPointer}
        onClick={(event) => openProject(index, event.currentTarget)}
        aria-label={`Open ${project.client}: ${project.title}`}
      >
        <span className="project-tile-media">
          <Image
            src={project.images[0]}
            alt={project.alt}
            width={1600}
            height={1200}
            sizes={`(max-width: 640px) 100vw, (max-width: 1100px) 50vw, ${desktopSize}`}
          />
        </span>
        <span className="project-tile-copy">
          <span>{project.number}</span>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
          <i aria-hidden="true">Open ↗</i>
        </span>
      </button>
    );
  };

  return (
    <main ref={rootRef} className="site-shell">
      <header className="site-header">
        <a className="skip-link" href="#work">Skip to selected work</a>
        <a className="wordmark" href="#top" aria-label="Gerard Teo, home">
          <Image
            src="/assets/g-image.webp"
            alt=""
            width={640}
            height={640}
            sizes="64px"
            priority
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a
            href="https://doesdesignwork.github.io/gerard-teo-cv/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Gerard Teo's online CV in a new tab"
          >
            CV
          </a>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {theme === "dark" ? "☾" : "☀"}
            </span>
          </button>
        </nav>
      </header>

      <section id="top" className="showreel-intro-panel" aria-labelledby="showreel-title">
        <p className="showreel-overline">Gerard Teo · Art Director &amp; Creative Lead · Singapore</p>
        <h1 id="showreel-title">
          <span className="intro-line-group">
            <b>Good</b>
            <b>work</b>
            <b>doesn’t</b>
            <b>need a</b>
            <b>speech.</b>
          </span>
          <span className="intro-line-group">
            <b>It needs a</b>
            <b>point.</b>
          </span>
        </h1>
        <div className="showreel-intro-meta">
          <span>Hands-on creative direction for brands, pitches and experiences</span>
          <span>Brand systems · Campaigns · Experiential · 3D</span>
          <a href="#work">See selected work ↓</a>
        </div>
      </section>

      <section ref={heroRef} id="intro" className="hero" aria-labelledby="hero-title">
        <div className="hero-stage">
        <div className="hero-copy">
          <p className="eyebrow" data-scroll-text>Art Director · Creative Lead · Still hands-on · Singapore</p>
          <h2 className="hero-title" id="hero-title" data-scroll-text data-text-delay="1">
            Clear thinking.
            <span>Properly made.</span>
          </h2>
          <p className="hero-intro" data-scroll-text data-text-delay="2">
            I turn messy briefs into work people can understand, remember and
            actually use. Strategy first. Craft all the way through.
          </p>
          <a className="text-link" href="#work" data-scroll-text data-text-delay="3">
            <span aria-hidden="true">→</span> See the work
          </a>
        </div>
        <p className="role-line" data-scroll-text data-text-delay="4">
          Creative Direction <i /> Brand Systems <i /> Campaigns <i /> 3D &amp; Experience
        </p>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll to explore</span>
          <b />
        </div>
        </div>
      </section>

      <section className="statement" aria-label="Design philosophy" data-scroll-section>
        <p className="section-kicker" data-scroll-text data-scroll-scrub>How I work</p>
        <h2 data-parallax="0.045" data-scroll-text data-scroll-scrub data-scroll-scrub-delay="1">
          If the idea is not clear, <em>design will not save it.</em>
        </h2>
        <p className="statement-note" data-parallax="0.07" data-scroll-text data-scroll-scrub data-scroll-scrub-delay="2">
          Get the brief straight. Find the point. Build the work properly.
        </p>
      </section>

      <section ref={workRef} id="work" className="work-section" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-kicker" data-scroll-text data-scroll-scrub>Strategy · Direction · Execution</p>
          <h2 id="work-title" data-parallax="0.055" data-scroll-text data-scroll-scrub data-scroll-scrub-delay="1">The work.</h2>
        </div>

        <div className="portfolio-group-heading">
          <h3>Featured case studies</h3>
          <p>Three projects that show how I turn complexity into a clear, usable system.</p>
        </div>
        <div className="project-gallery is-featured" aria-label="Featured case studies" data-reveal>
          {featuredProjects.map((project, index) => renderProjectTile(project, index, true))}
        </div>

        <div className="portfolio-group-heading is-secondary">
          <h3>More selected work</h3>
          <p>{selectedProjects.length} projects across identity, packaging, campaigns, products and experience.</p>
        </div>
        <div className="project-gallery is-selected" aria-label="More selected projects" data-reveal>
          {selectedProjects.map((project, index) => renderProjectTile(project, index))}
        </div>
      </section>

      <section className="capability-band" aria-label="Capabilities">
        <div className="marquee-track">
          {[...capabilities, ...capabilities].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <i>◆</i>
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="about" aria-labelledby="about-title" data-reveal data-scroll-section>
        <div className="about-stat" data-parallax="0.08" data-scroll-text aria-label="Grew a creative team from three to fifteen">
          <div className="about-number" aria-hidden="true">
            <span>3</span>
            <span className="about-number-separator" />
            <span>15</span>
          </div>
          <p>Creative team growth</p>
        </div>
        <div className="about-copy" data-parallax="0.035">
          <p className="section-kicker" data-scroll-text>Hands-on creative leadership</p>
          <h2 id="about-title" data-scroll-text data-text-delay="1">I lead the work. I still make it.</h2>
          <p data-scroll-text data-text-delay="2">
            I move between setting the direction and making sure the work lands.
            I co-founded Blacksheep Communications, helped grow its design team
            from three to 15 and stayed close to the work, clients and production.
          </p>
          <p data-scroll-text data-text-delay="3">
            Across Ogilvy, Batey, DDB, Saatchi, McCann and Hogarth Worldwide on
            Apple, I learned how ideas survive demanding brand systems and real
            production. Today I work across events and experiences at C2, while
            The Fat Oracle is my independent practice for brand, packaging and 3D.
          </p>
          <div className="about-actions" data-scroll-text data-text-delay="4">
            <a
              className="text-link"
              href="https://doesdesignwork.github.io/gerard-teo-cv/#director"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span aria-hidden="true">↗</span> Hiring? View leadership CV
            </a>
            <a className="text-link is-secondary" href="#contact">
              <span aria-hidden="true">→</span> Have a project? Start a conversation
            </a>
          </div>
        </div>
      </section>

      <section className="brand-proof" aria-labelledby="brand-proof-title" data-reveal data-scroll-section>
        <div className="brand-proof-heading">
          <p className="section-kicker" data-scroll-text>Brands I’ve worked with</p>
          <h2 id="brand-proof-title" data-scroll-text data-text-delay="1">Trusted by leaders.</h2>
        </div>
        <div className="brand-name-grid" data-parallax="0.028">
          <span>Apple</span><span>L’Oréal</span><span>Unilever</span><span>Dow</span>
          <span>Singtel</span><span>StarHub</span><span>BlackBerry</span><span>MTV Asia</span>
          <span>EMI Music</span><span>American Express</span><span>Red Bull</span><span>Tiger Beer</span>
        </div>
      </section>

      <section className="process" aria-labelledby="process-title" data-reveal data-scroll-section>
        <div className="section-heading">
          <p className="section-kicker" data-scroll-text>How the work gets done</p>
          <h2 id="process-title" data-parallax="0.05" data-scroll-text data-text-delay="1">The idea comes first. Everything else earns its place.</h2>
        </div>
        <ol data-parallax="0.025">
          <li data-scroll-text><b>01</b><span>Get to the real brief</span><p>Cut through the noise. Agree on the audience, the problem and the decision the work needs to influence.</p></li>
          <li data-scroll-text data-text-delay="1"><b>02</b><span>Build one clear world</span><p>Set the idea, tone and anchor visual. Then make every touchpoint belong.</p></li>
          <li data-scroll-text data-text-delay="2"><b>03</b><span>Make it work everywhere</span><p>Take it across screens, spaces and formats without watering it down.</p></li>
        </ol>
      </section>

      <footer id="contact" className="contact" data-reveal data-scroll-section>
        <p className="section-kicker" data-parallax="0.04" data-scroll-text>Hiring a creative lead—or have a brief to solve?</p>
        <h2 data-parallax="0.065" data-scroll-text data-text-delay="1">Let’s make work<br />with a point.</h2>
        <div className="contact-actions" data-parallax="0.085" data-scroll-text data-text-delay="2">
          <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer">Hiring? View leadership CV <span>↗</span></a>
          <a href="mailto:g@doesdesignwork.com">Have a project? Email Gerard <span>↗</span></a>
          <a href="https://www.linkedin.com/in/gerard-teo-0b106429/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <span>↗</span></a>
        </div>
        <div className="footer-line" data-scroll-text data-text-delay="3">
          <span>Gerard Teo · Singapore</span>
          <span>Open to Art Director · Creative Lead · Selected independent projects</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>

      {isLightboxOpen && (
        <div
          ref={projectPageRef}
          className="project-page-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-page-title"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button ref={lightboxCloseRef} className="project-page-close" type="button" onClick={() => setIsLightboxOpen(false)} aria-label="Close project">
            Close <span aria-hidden="true">×</span>
          </button>
          <div className="project-page-shell" onClick={(event) => event.stopPropagation()}>
            <div className="project-page-media">
              <Image
                src={selectedImage}
                alt={selectedImageAlt}
                width={1800}
                height={1400}
                sizes="100vw"
              />
              {selectedProject.images.length > 1 && (
                <>
                  <button className="project-page-arrow is-previous" type="button" onClick={showPreviousImage} aria-label="Previous project image">←</button>
                  <button className="project-page-arrow is-next" type="button" onClick={showNextImage} aria-label="Next project image">→</button>
                </>
              )}
              <span className="project-page-count">{String(activeImageIndex + 1).padStart(2, "0")} / {String(selectedProject.images.length).padStart(2, "0")}</span>
            </div>
            <aside className="project-page-copy">
              <div className="project-page-topline"><span>{selectedProject.number}</span><b>{selectedProject.client}</b></div>
              <h2 id="project-page-title">{selectedProject.title}</h2>
              <p>{selectedProject.summary}</p>
              <small>{selectedProject.discipline}</small>
              <dl className="project-page-facts">
                <div><dt>Context</dt><dd>{selectedProject.context}</dd></div>
                <div><dt>My role</dt><dd>{selectedProject.role}</dd></div>
              </dl>
              <div className="project-page-story">
                <section><h3>Challenge</h3><p>{selectedProject.challenge}</p></section>
                <section><h3>Approach</h3><p>{selectedProject.approach}</p></section>
                <section><h3>Result</h3><p>{selectedProject.result}</p></section>
              </div>
              <div className="project-page-thumbs" aria-label={`${selectedProject.client} image gallery`}>
                {selectedProject.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={activeImageIndex === index ? "is-active" : ""}
                    onClick={() => setActiveProjectImage(index)}
                    aria-label={`Show image ${index + 1} of ${selectedProject.images.length}`}
                    aria-pressed={activeImageIndex === index}
                  >
                    <Image src={image} alt="" width={320} height={220} sizes="110px" />
                  </button>
                ))}
              </div>
              <div className="project-page-actions">
                <div aria-label="Browse projects">
                  <button type="button" onClick={showPreviousProject} aria-label="Previous project">←</button>
                  <button type="button" onClick={showNextProject} aria-label="Next project">→</button>
                </div>
                <div className="project-page-links">
                  <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer">View leadership CV ↗</a>
                  <a href="#contact" onClick={() => setIsLightboxOpen(false)}>Discuss a project ↗</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}
