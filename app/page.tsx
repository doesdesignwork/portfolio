"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { ScrollMotion } from "./components/scroll-motion";
import { projects, type Project } from "./data/projects";

const featuredProjectNumbers = ["13", "08", "01"];
const featuredProjects = featuredProjectNumbers
  .map((number) => projects.find((project) => project.number === number))
  .filter((project): project is Project => Boolean(project));
const selectedProjectNumbers = ["03", "04", "06", "09", "14", "10", "11", "15"];
const selectedProjects = selectedProjectNumbers
  .map((number) => projects.find((project) => project.number === number))
  .filter((project): project is Project => Boolean(project));
const selectedProjectClusterNumbers = new Set(["14", "10", "11", "15"]);
const selectedProjectsBeforeCluster = selectedProjects.filter(
  (project) => !selectedProjectClusterNumbers.has(project.number),
);
const selectedProjectsInCluster = selectedProjects.filter((project) =>
  selectedProjectClusterNumbers.has(project.number),
);
const navigableProjects = [...featuredProjects, ...selectedProjects];

const galleryTileSizes: Record<string, string> = {
  "03": "tile-2x2",
  "04": "tile-1x1",
  "06": "tile-1x1",
  "09": "tile-2x1",
  "10": "tile-1x1",
  "11": "tile-1x1",
  "14": "tile-2x1",
  "15": "tile-2x2",
};

const modalImageLimits: Record<string, { width: number; height: number }> = {
  "/assets/brewerkz-packaging.webp": { width: 526, height: 466 },
  "/assets/herdsman-packaging.webp": { width: 500, height: 378 },
  "/assets/herdsman-sauces.webp": { width: 511, height: 360 },
  "/assets/herdsman-egg.webp": { width: 514, height: 362 },
  "/assets/herdsman-store.webp": { width: 516, height: 362 },
  "/assets/raffles-card.webp": { width: 493, height: 362 },
  "/assets/raffles-signage.webp": { width: 248, height: 362 },
  "/assets/passion-entrance.webp": { width: 640, height: 620 },
  "/assets/passion-signage.webp": { width: 437, height: 424 },
  "/assets/munch-packaging.webp": { width: 515, height: 362 },
  "/assets/munch-menu-board.webp": { width: 514, height: 392 },
  "/assets/munch-menu.webp": { width: 330, height: 232 },
};

const imagePreloadCache = new Map<string, Promise<void>>();

const loadProjectImage = (source: string) => {
  if (typeof window === "undefined") return Promise.resolve();

  const cached = imagePreloadCache.get(source);
  if (cached) return cached;

  const loadPromise = new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      image.decode().catch(() => undefined).finally(resolve);
    };
    image.onerror = () => resolve();
    image.src = source;
  });

  imagePreloadCache.set(source, loadPromise);
  return loadPromise;
};

const preloadProjectImages = (project: Project) => {
  if (typeof window === "undefined") return;

  project.images.forEach((source) => void loadProjectImage(source));
};

const preloadAdjacentProjectImages = (project: Project, imageIndex: number) => {
  if (project.images.length < 2) return;
  const previous = (imageIndex - 1 + project.images.length) % project.images.length;
  const next = (imageIndex + 1) % project.images.length;
  void loadProjectImage(project.images[previous]);
  void loadProjectImage(project.images[next]);
};

const projectHash = (project: Project) => `#project-${project.number}`;

const projectIndexFromHash = (hash: string) => {
  const match = /^#project-(\d{2})$/.exec(hash);
  if (!match) return -1;
  return projects.findIndex((project) => project.number === match[1]);
};

const capabilities = [
  "Creative direction",
  "Brand systems",
  "Campaigns",
  "Experiential",
  "Packaging",
  "3D visualisation",
];

export default function Home() {
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const projectCopyRef = useRef<HTMLElement>(null);
  const aboutCopyMeasureRef = useRef<HTMLDivElement>(null);
  const careerLedgerRef = useRef<HTMLDListElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastProjectTriggerRef = useRef<HTMLButtonElement>(null);
  const imageRequestRef = useRef(0);
  const [activeProject, setActiveProject] = useState(0);
  const [activeProjectImage, setActiveProjectImage] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isProjectImageLoading, setIsProjectImageLoading] = useState(false);

  const selectedProject = projects[activeProject];
  const selectedImageIndex = Math.min(
    activeProjectImage,
    selectedProject.images.length - 1,
  );
  const selectedImageSource = selectedProject.images[selectedImageIndex];
  const selectedImageLimit = modalImageLimits[selectedImageSource];
  const selectedImageScale = selectedImageSource.startsWith("/assets/brewerkz-")
    ? 1
    : 1.35;
  const selectedImageStyle = selectedImageLimit
    ? ({
        "--modal-image-max-width": `${Math.round(selectedImageLimit.width * selectedImageScale)}px`,
        "--modal-image-max-height": `${Math.round(selectedImageLimit.height * selectedImageScale)}px`,
      } as CSSProperties)
    : undefined;

  const closeProject = useCallback(() => {
    imageRequestRef.current += 1;
    setIsProjectImageLoading(false);
    setIsProjectOpen(false);
    if (projectIndexFromHash(window.location.hash) >= 0) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }, []);

  const changeProjectImage = useCallback(
    async (nextIndex: number) => {
      const project = projects[activeProject];
      const safeIndex =
        (nextIndex + project.images.length) % project.images.length;
      if (safeIndex === activeProjectImage) return;

      const requestId = imageRequestRef.current + 1;
      imageRequestRef.current = requestId;
      const dialogScroll = projectDialogRef.current?.scrollTop ?? 0;
      const copyScroll = projectCopyRef.current?.scrollTop ?? 0;
      setIsProjectImageLoading(true);

      await loadProjectImage(project.images[safeIndex]);
      if (requestId !== imageRequestRef.current) return;

      setActiveProjectImage(safeIndex);
      preloadAdjacentProjectImages(project, safeIndex);
      window.requestAnimationFrame(() => {
        if (projectDialogRef.current) projectDialogRef.current.scrollTop = dialogScroll;
        if (projectCopyRef.current) projectCopyRef.current.scrollTop = copyScroll;
        setIsProjectImageLoading(false);
      });
    },
    [activeProject, activeProjectImage],
  );

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    const projectIndex = projects.indexOf(project);
    preloadProjectImages(project);
    preloadAdjacentProjectImages(project, 0);
    lastProjectTriggerRef.current = trigger;
    window.history.pushState(null, "", projectHash(project));
    setActiveProject(projectIndex);
    setActiveProjectImage(0);
    setIsProjectOpen(true);
  };

  const changeProject = (nextProject: Project) => {
    const projectIndex = projects.indexOf(nextProject);
    imageRequestRef.current += 1;
    preloadProjectImages(nextProject);
    preloadAdjacentProjectImages(nextProject, 0);
    window.history.replaceState(null, "", projectHash(nextProject));
    setActiveProject(projectIndex);
    setActiveProjectImage(0);
    setIsProjectImageLoading(false);
    if (projectCopyRef.current) projectCopyRef.current.scrollTop = 0;
  };

  const showPreviousProject = () => {
    const currentIndex = navigableProjects.findIndex(
      (project) => project.number === selectedProject.number,
    );
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    changeProject(
      navigableProjects[
        (safeIndex - 1 + navigableProjects.length) % navigableProjects.length
      ],
    );
  };

  const showNextProject = () => {
    const currentIndex = navigableProjects.findIndex(
      (project) => project.number === selectedProject.number,
    );
    const safeIndex = currentIndex < 0 ? 0 : currentIndex;
    changeProject(navigableProjects[(safeIndex + 1) % navigableProjects.length]);
  };

  const showPreviousImage = () => {
    void changeProjectImage(selectedImageIndex - 1);
  };

  const showNextImage = () => {
    void changeProjectImage(selectedImageIndex + 1);
  };

  const navigateToSection = useCallback((href: string) => {
    const targetId = decodeURIComponent(href.slice(1));
    const target = document.getElementById(targetId);
    if (!target) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const scrollPaddingTop =
      Number.parseFloat(window.getComputedStyle(root).scrollPaddingTop) || 0;
    const destination =
      targetId === "top"
        ? 0
        : Math.max(
            0,
            window.scrollY + target.getBoundingClientRect().top - scrollPaddingTop,
          );

    root.classList.add("is-programmatic-scroll");
    window.history.pushState(
      null,
      "",
      `${window.location.pathname}${window.location.search}${href}`,
    );

    let hasSettled = false;
    let fallbackTimer = 0;
    const finishNavigation = () => {
      if (hasSettled) return;
      hasSettled = true;
      window.clearTimeout(fallbackTimer);
      window.removeEventListener("scrollend", finishNavigation);

      if (targetId === "top") {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
      root.classList.remove("is-programmatic-scroll");
    };

    window.addEventListener("scrollend", finishNavigation, { once: true });
    const shouldScrollInstantly = targetId === "top" || reducedMotion;
    window.scrollTo({
      top: destination,
      behavior: shouldScrollInstantly ? "auto" : "smooth",
    });

    if (shouldScrollInstantly) {
      window.requestAnimationFrame(finishNavigation);
    } else {
      fallbackTimer = window.setTimeout(finishNavigation, 1600);
    }
  }, []);

  const handleSectionNavigation = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>) => {
      const href = event.currentTarget.getAttribute("href");
      if (
        !href?.startsWith("#") ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();
      navigateToSection(href);
    },
    [navigateToSection],
  );

  useEffect(() => {
    const syncProjectFromUrl = () => {
      const projectIndex = projectIndexFromHash(window.location.hash);
      if (projectIndex < 0) {
        setIsProjectOpen(false);
        return;
      }

      const project = projects[projectIndex];
      preloadProjectImages(project);
      preloadAdjacentProjectImages(project, 0);
      setActiveProject(projectIndex);
      setActiveProjectImage(0);
      setIsProjectOpen(true);
    };

    syncProjectFromUrl();
    window.addEventListener("hashchange", syncProjectFromUrl);
    window.addEventListener("popstate", syncProjectFromUrl);
    return () => {
      window.removeEventListener("hashchange", syncProjectFromUrl);
      window.removeEventListener("popstate", syncProjectFromUrl);
    };
  }, []);

  useEffect(() => {
    if (!isProjectOpen) return;

    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeProject();
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        projectDialogRef.current?.querySelectorAll<HTMLElement>(
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
    };

    window.addEventListener("keydown", handleDialogKeys);
    return () => {
      window.removeEventListener("keydown", handleDialogKeys);
      window.requestAnimationFrame(() => lastProjectTriggerRef.current?.focus());
    };
  }, [closeProject, isProjectOpen]);

  useEffect(() => {
    if (!isProjectOpen) return;

    const handleGalleryKeys = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        void changeProjectImage(selectedImageIndex - 1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        void changeProjectImage(selectedImageIndex + 1);
      }
    };

    window.addEventListener("keydown", handleGalleryKeys);
    return () => window.removeEventListener("keydown", handleGalleryKeys);
  }, [changeProjectImage, isProjectOpen, selectedImageIndex]);

  useEffect(() => {
    const copy = aboutCopyMeasureRef.current;
    const ledger = careerLedgerRef.current;
    if (!copy || !ledger) return;

    const updateCareerScale = () => {
      const copyHeight = copy.getBoundingClientRect().height;
      const heightBasedSize = Math.max(46, Math.min(92, copyHeight / 4.7));

      ledger.style.setProperty(
        "--career-ledger-height",
        `${Math.round(copyHeight)}px`,
      );
      ledger.style.setProperty(
        "--career-number-size",
        `${heightBasedSize.toFixed(2)}px`,
      );

      const numberLabels = Array.from(ledger.querySelectorAll("dt"));
      let fittedSize = heightBasedSize;

      for (let pass = 0; pass < 2; pass += 1) {
        ledger.style.setProperty(
          "--career-number-size",
          `${fittedSize.toFixed(2)}px`,
        );
        const fitRatio = numberLabels.reduce((smallestRatio, label) => {
          if (label.scrollWidth <= label.clientWidth) return smallestRatio;
          return Math.min(smallestRatio, label.clientWidth / label.scrollWidth);
        }, 1);
        if (fitRatio === 1) break;
        fittedSize = Math.max(46, fittedSize * fitRatio * 0.98);
      }

      ledger.style.setProperty(
        "--career-number-size",
        `${fittedSize.toFixed(2)}px`,
      );
    };

    const resizeObserver = new ResizeObserver(updateCareerScale);
    resizeObserver.observe(copy);
    updateCareerScale();

    return () => resizeObserver.disconnect();
  }, []);

  const renderFeaturedProject = (project: Project, index: number) => (
    <button
      key={project.number}
      id={`project-${project.number}`}
      className={`featured-project featured-project-${index + 1}`}
      type="button"
      onClick={(event) => openProject(project, event.currentTarget)}
      onPointerEnter={() => preloadProjectImages(project)}
      onFocus={() => preloadProjectImages(project)}
      aria-label={`Open ${project.client}: ${project.title}`}
    >
      <span className="featured-project-media">
        <Image
          src={project.images[0]}
          alt={project.alt}
          width={1800}
          height={1300}
          sizes={index === 0 ? "(max-width: 900px) 100vw, 72vw" : "(max-width: 900px) 100vw, 48vw"}
        />
      </span>
      <span className="project-caption">
        <span className="project-number">{project.number}</span>
        <span>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
        <span className="project-title">{project.title}</span>
        <span className="project-open">View project</span>
      </span>
    </button>
  );

  const renderSelectedProject = (project: Project) => {
    const tileSize = galleryTileSizes[project.number] ?? "tile-1x1";

    return (
      <button
        key={project.number}
        id={`project-${project.number}`}
        className={`selected-project selected-project-${project.number} ${tileSize}`}
        type="button"
        onClick={(event) => openProject(project, event.currentTarget)}
        onPointerEnter={() => preloadProjectImages(project)}
        onFocus={() => preloadProjectImages(project)}
        aria-label={`Open ${project.client}: ${project.title}`}
      >
        <span className="selected-project-media">
          <Image
            src={project.images[0]}
            alt={project.alt}
            width={1400}
            height={1100}
            sizes={
              tileSize === "tile-1x1"
                ? "(max-width: 720px) 50vw, 25vw"
                : "(max-width: 720px) 100vw, 50vw"
            }
          />
        </span>
        <span className="selected-project-copy">
          <span>{project.number}</span>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
      </button>
    );
  };

  return (
    <main className="site-shell">
      <ScrollMotion />
      <div className="scroll-progress" aria-hidden="true">
        <span />
      </div>
      <a className="skip-link" href="#work" onClick={handleSectionNavigation}>Skip to selected work</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Gerard Teo, home" onClick={handleSectionNavigation}>
          <Image
            src="/assets/g-image.webp"
            alt=""
            width={640}
            height={640}
            sizes="54px"
            priority
          />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work" onClick={handleSectionNavigation}>Work</a>
          <a href="#about" onClick={handleSectionNavigation}>About</a>
          <a href="#contact" onClick={handleSectionNavigation}>Contact</a>
          <a
            href="https://doesdesignwork.github.io/gerard-teo-cv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </nav>
      </header>

      <section
        id="top"
        className="hero snap-panel panel-hero"
        aria-labelledby="hero-title"
        data-snap-section
      >
        <div className="hero-heading">
          <p className="hero-eyebrow">Gerard Teo / Art Director and Creative Lead / Singapore</p>
          <h1 id="hero-title">
            <span>Clear thinking.</span>
            {" "}
            <em>Properly made.</em>
          </h1>
        </div>

        <div className="hero-support">
          <p>I turn complex briefs into brand systems, campaigns and experiences people can understand and use.</p>
          <div className="hero-actions">
            <a href="#work" onClick={handleSectionNavigation}>View selected work</a>
            <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer">Leadership CV</a>
          </div>
        </div>

        <section className="hero-work-preview" aria-labelledby="featured-preview-title">
          <h2 id="featured-preview-title" className="sr-only">Featured work preview</h2>
          <figure className="hero-work-main">
            <div>
              <Image
                src={featuredProjects[0].images[0]}
                alt={featuredProjects[0].alt}
                width={1800}
                height={1300}
                sizes="(max-width: 900px) 100vw, 66vw"
                priority
              />
            </div>
            <figcaption><span>{featuredProjects[0].client}</span><small>{featuredProjects[0].discipline}</small></figcaption>
          </figure>
          <figure className="hero-work-secondary">
            <div>
              <Image
                src={featuredProjects[1].images[0]}
                alt={featuredProjects[1].alt}
                width={1200}
                height={900}
                sizes="(max-width: 900px) 50vw, 32vw"
              />
            </div>
            <figcaption><span>{featuredProjects[1].client}</span><small>{featuredProjects[1].discipline}</small></figcaption>
          </figure>
        </section>
      </section>

      <section
        className="manifesto snap-panel panel-manifesto"
        aria-labelledby="manifesto-title"
        data-reveal
        data-snap-section
      >
        <h2 id="manifesto-title">
          <span>The idea has to work</span>
          {" "}
          <span>before the design can.</span>
        </h2>
        <p>Get the brief straight. Find the point. Build a visual world that survives every screen, space and deadline.</p>
      </section>

      <section
        id="work"
        className="work-section snap-panel panel-work"
        aria-labelledby="work-title"
        data-snap-section
      >
        <header className="work-heading" data-reveal>
          <p>Strategy / Direction / Execution</p>
          <h2 id="work-title">Selected work</h2>
          <span>Three case studies that show how I turn complexity into a clear, usable system.</span>
        </header>

        <div className="featured-work">
          {featuredProjects.map(renderFeaturedProject)}
        </div>
      </section>

      <section
        className="more-work-section snap-panel panel-more-work"
        aria-labelledby="more-work-title"
        data-snap-section
      >
        <header
          className="more-work-heading"
          data-reveal
        >
          <span className="more-work-kicker">Selected archive / {selectedProjects.length} projects</span>
          <h3 id="more-work-title">A wider cut of the work.</h3>
          <p>{selectedProjects.length} projects across identity, packaging, campaigns, products and experience.</p>
        </header>
        <div className="selected-work">
          {selectedProjectsBeforeCluster.map(renderSelectedProject)}
          <div className="selected-project-cluster">
            {selectedProjectsInCluster.map(renderSelectedProject)}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="about-section snap-panel panel-about"
        aria-labelledby="about-title"
        data-snap-section
      >
        <div className="about-heading" data-reveal>
          <h2 id="about-title">
            <span>I lead the work.</span>
            {" "}
            <span>I still make it.</span>
          </h2>
        </div>
        <div className="about-content" data-reveal>
          <div className="about-copy">
            <div ref={aboutCopyMeasureRef} className="about-copy-main">
              <p>I move between setting the direction and making sure the work lands. I co-founded Blacksheep Communications, helped grow its design team from three to 15 and stayed close to the work, clients and production.</p>
              <p>Across Ogilvy, Batey, DDB, Saatchi, McCann and Hogarth Worldwide on Apple, I learned how ideas survive demanding brand systems and real production. Today I work across events and experiences at C2, while The Fat Oracle is my independent practice for brand, packaging and 3D.</p>
            </div>
            <p className="brand-line">Selected experience includes Apple, Unilever, Dow, American Express, L&apos;Oréal, Singtel, Red Bull and Tiger Beer.</p>
          </div>
          <section className="career-highlights" aria-labelledby="career-highlights-title">
            <h3 id="career-highlights-title" className="sr-only">Career highlights</h3>
            <dl ref={careerLedgerRef} className="career-ledger">
              <div><dt>26+</dt><dd>Years across design, direction and production</dd></div>
              <div><dt>3 to 15</dt><dd>Creative team growth at Blacksheep</dd></div>
              <div><dt>6</dt><dd>Experience across six major agency networks, alongside independent practice</dd></div>
            </dl>
          </section>
        </div>

        <ul className="capability-index" aria-label="Capabilities" data-reveal>
          {capabilities.map((capability, index) => (
            <li key={capability}><b>{String(index + 1).padStart(2, "0")}</b><span>{capability}</span></li>
          ))}
        </ul>
      </section>

      <section
        className="process-section snap-panel panel-process"
        aria-labelledby="process-title"
        data-snap-section
      >
        <div className="process-heading" data-reveal>
          <h2 id="process-title">
            <span>One idea.</span>
            {" "}
            <span>Built all the way through.</span>
          </h2>
        </div>
        <ol data-reveal>
          <li><b>01</b><h3>Find the real brief</h3><p>Agree on the audience, the problem and the decision the work needs to influence.</p></li>
          <li><b>02</b><h3>Build one clear world</h3><p>Set the idea, tone and anchor visual, then make every touchpoint belong.</p></li>
          <li><b>03</b><h3>Make it hold up</h3><p>Take it across screens, spaces and formats without watering the idea down.</p></li>
        </ol>
      </section>

      <footer
        id="contact"
        className="contact-section snap-panel panel-contact"
        data-snap-section
      >
        <h2 data-reveal>
          <span>Have a role?</span>
          {" "}
          <span>Or a brief worth solving?</span>
        </h2>
        <div className="contact-links" data-reveal>
          <a href="mailto:g@doesdesignwork.com"><span>Email Gerard</span><small>g@doesdesignwork.com</small></a>
          <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer"><span>Leadership CV</span><small>Experience and role fit</small></a>
          <a href="https://www.linkedin.com/in/gerard-teo-0b106429/" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>Connect professionally</small></a>
        </div>
        <div className="footer-line">
          <span>Gerard Teo / Singapore</span>
          <span>Art Director / Creative Lead / Hands-on maker</span>
          <a href="#top" onClick={handleSectionNavigation}>Back to top</a>
        </div>
      </footer>

      {isProjectOpen && (
        <div
          ref={projectDialogRef}
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          aria-describedby="project-dialog-summary"
          onClick={closeProject}
        >
          <button
            ref={closeButtonRef}
            className="project-dialog-close"
            type="button"
            onClick={closeProject}
          >
            Close project
          </button>

          <div className="project-dialog-shell" onClick={(event) => event.stopPropagation()}>
            <div
              className={`project-dialog-media${selectedImageLimit ? " is-resolution-limited" : ""}`}
              aria-busy={isProjectImageLoading}
            >
              <Image
                src={selectedImageSource}
                alt={`${selectedProject.alt}, image ${selectedImageIndex + 1} of ${selectedProject.images.length}`}
                width={selectedImageLimit?.width ?? 1800}
                height={selectedImageLimit?.height ?? 1400}
                style={selectedImageStyle}
                loading="eager"
                fetchPriority="high"
                unoptimized
              />
              {selectedProject.images.length > 1 && (
                <div className="project-image-controls">
                  <button type="button" onClick={showPreviousImage}>Previous image</button>
                  <span aria-live="polite">{String(selectedImageIndex + 1).padStart(2, "0")} / {String(selectedProject.images.length).padStart(2, "0")}</span>
                  <button type="button" onClick={showNextImage}>Next image</button>
                </div>
              )}
            </div>

            <aside ref={projectCopyRef} className="project-dialog-copy">
              <div className="project-dialog-topline"><span>{selectedProject.number}</span><strong>{selectedProject.client}</strong></div>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p id="project-dialog-summary" className="project-summary">{selectedProject.summary}</p>
              <p className="project-discipline">{selectedProject.discipline}</p>

              <dl className="project-facts">
                <div><dt>Context</dt><dd>{selectedProject.context}</dd></div>
                <div><dt>My contribution</dt><dd>{selectedProject.role}</dd></div>
                {selectedProject.year && <div><dt>Year</dt><dd>{selectedProject.year}</dd></div>}
                {selectedProject.credit && <div><dt>Credit</dt><dd>{selectedProject.credit}</dd></div>}
              </dl>

              <div className="project-story">
                <section><h3>Challenge</h3><p>{selectedProject.challenge}</p></section>
                <section><h3>My contribution</h3><p>{selectedProject.approach}</p></section>
                <section><h3>What was delivered</h3><p>{selectedProject.deliverables}</p></section>
              </div>

              <div className="project-thumbnails" role="group" aria-label={`${selectedProject.client} image gallery`}>
                {selectedProject.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={selectedImageIndex === index ? "is-active" : ""}
                    onClick={() => void changeProjectImage(index)}
                    aria-label={`Show image ${index + 1} of ${selectedProject.images.length}`}
                    aria-pressed={selectedImageIndex === index}
                  >
                    <Image
                      src={image}
                      alt=""
                      width={320}
                      height={220}
                      loading="eager"
                      unoptimized
                    />
                  </button>
                ))}
              </div>

              <div className="project-dialog-actions">
                <div>
                  <button type="button" onClick={showPreviousProject}>Previous project</button>
                  <button type="button" onClick={showNextProject}>Next project</button>
                </div>
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    closeProject();
                    window.requestAnimationFrame(() => navigateToSection("#contact"));
                  }}
                >
                  Discuss a project
                </a>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}
