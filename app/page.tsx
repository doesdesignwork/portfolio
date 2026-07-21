"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "./data/projects";

const featuredProjectNumbers = ["13", "08", "01"];
const featuredProjects = featuredProjectNumbers
  .map((number) => projects.find((project) => project.number === number))
  .filter((project): project is Project => Boolean(project));
const selectedProjects = projects.filter(
  (project) => !featuredProjectNumbers.includes(project.number),
);

const capabilities = [
  "Creative direction",
  "Brand systems",
  "Campaigns",
  "Experiential",
  "Packaging",
  "3D visualisation",
];

export default function Home() {
  const rootRef = useRef<HTMLElement>(null);
  const projectDialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastProjectTriggerRef = useRef<HTMLButtonElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [activeProjectImage, setActiveProjectImage] = useState(0);
  const [isProjectOpen, setIsProjectOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" },
    );

    root.querySelectorAll("[data-reveal]").forEach((element) => {
      revealObserver.observe(element);
    });

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isProjectOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProjectOpen(false);
      if (event.key === "ArrowLeft") {
        setActiveProjectImage(
          (current) =>
            (current - 1 + projects[activeProject].images.length) %
            projects[activeProject].images.length,
        );
      }
      if (event.key === "ArrowRight") {
        setActiveProjectImage(
          (current) =>
            (current + 1) % projects[activeProject].images.length,
        );
      }
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
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeys);
      window.requestAnimationFrame(() => lastProjectTriggerRef.current?.focus());
    };
  }, [activeProject, isProjectOpen]);

  const selectedProject = projects[activeProject];
  const selectedImageIndex = Math.min(
    activeProjectImage,
    selectedProject.images.length - 1,
  );

  const openProject = (project: Project, trigger: HTMLButtonElement) => {
    const projectIndex = projects.indexOf(project);
    lastProjectTriggerRef.current = trigger;
    setActiveProject(projectIndex);
    setActiveProjectImage(0);
    setIsProjectOpen(true);
  };

  const showPreviousProject = () => {
    setActiveProject((current) => (current - 1 + projects.length) % projects.length);
    setActiveProjectImage(0);
  };

  const showNextProject = () => {
    setActiveProject((current) => (current + 1) % projects.length);
    setActiveProjectImage(0);
  };

  const showPreviousImage = () => {
    setActiveProjectImage(
      (current) =>
        (current - 1 + selectedProject.images.length) %
        selectedProject.images.length,
    );
  };

  const showNextImage = () => {
    setActiveProjectImage(
      (current) => (current + 1) % selectedProject.images.length,
    );
  };

  const renderFeaturedProject = (project: Project, index: number) => (
    <button
      key={project.number}
      id={`project-${project.number}`}
      className={`featured-project featured-project-${index + 1}`}
      type="button"
      onClick={(event) => openProject(project, event.currentTarget)}
      aria-label={`Open ${project.client}: ${project.title}`}
      data-reveal
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

  const renderSelectedProject = (project: Project, index: number) => (
    <button
      key={project.number}
      id={`project-${project.number}`}
      className={`selected-project selected-project-${(index % 6) + 1}`}
      type="button"
      onClick={(event) => openProject(project, event.currentTarget)}
      aria-label={`Open ${project.client}: ${project.title}`}
      data-reveal
    >
      <span className="selected-project-media">
        <Image
          src={project.images[0]}
          alt={project.alt}
          width={1400}
          height={1100}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
      </span>
      <span className="selected-project-copy">
        <span>{project.number}</span>
        <strong>{project.client}</strong>
        <small>{project.discipline}</small>
      </span>
    </button>
  );

  return (
    <main ref={rootRef} className="site-shell">
      <a className="skip-link" href="#work">Skip to selected work</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Gerard Teo, home">
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
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a
            href="https://doesdesignwork.github.io/gerard-teo-cv/"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-heading">
          <p className="hero-eyebrow">Gerard Teo / Art Director and Creative Lead / Singapore</p>
          <h1 id="hero-title">
            <span>Clear thinking.</span>
            <em>Properly made.</em>
          </h1>
        </div>

        <div className="hero-support">
          <p>I turn complex briefs into brand systems, campaigns and experiences people can understand and use.</p>
          <div className="hero-actions">
            <a href="#work">View selected work</a>
            <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer">Leadership CV</a>
          </div>
        </div>

        <div className="hero-work-preview" aria-label="Selected work preview">
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
        </div>
      </section>

      <section className="manifesto" aria-labelledby="manifesto-title" data-reveal>
        <h2 id="manifesto-title">The idea has to work before the design can.</h2>
        <p>Get the brief straight. Find the point. Build a visual world that survives every screen, space and deadline.</p>
      </section>

      <section id="work" className="work-section" aria-labelledby="work-title">
        <header className="work-heading" data-reveal>
          <p>Strategy / Direction / Execution</p>
          <h2 id="work-title">Selected work</h2>
          <span>Three case studies that show how I turn complexity into a clear, usable system.</span>
        </header>

        <div className="featured-work">
          {featuredProjects.map(renderFeaturedProject)}
        </div>

        <header className="more-work-heading" data-reveal>
          <h3>More work</h3>
          <p>{selectedProjects.length} projects across identity, packaging, campaigns, products and experience.</p>
        </header>
        <div className="selected-work" aria-label="More selected projects">
          {selectedProjects.map(renderSelectedProject)}
        </div>
      </section>

      <section id="about" className="about-section" aria-labelledby="about-title">
        <div className="about-heading" data-reveal>
          <h2 id="about-title">I lead the work. I still make it.</h2>
        </div>
        <div className="about-content" data-reveal>
          <div className="about-copy">
            <p>I move between setting the direction and making sure the work lands. I co-founded Blacksheep Communications, helped grow its design team from three to 15 and stayed close to the work, clients and production.</p>
            <p>Across Ogilvy, Batey, DDB, Saatchi, McCann and Hogarth Worldwide on Apple, I learned how ideas survive demanding brand systems and real production. Today I work across events and experiences at C2, while The Fat Oracle is my independent practice for brand, packaging and 3D.</p>
            <p className="brand-line">Selected experience includes Apple, Unilever, Dow, American Express, L&apos;Oréal, Singtel, Red Bull and Tiger Beer.</p>
          </div>
          <div className="career-ledger" aria-label="Career highlights">
            <div><strong>26+</strong><span>Years across design, direction and production</span></div>
            <div><strong>3 to 15</strong><span>Creative team growth at Blacksheep</span></div>
            <div><strong>6</strong><span>Major agency networks and independent practice</span></div>
          </div>
        </div>

        <div className="capability-index" aria-label="Capabilities" data-reveal>
          {capabilities.map((capability, index) => (
            <span key={capability}><b>{String(index + 1).padStart(2, "0")}</b>{capability}</span>
          ))}
        </div>
      </section>

      <section className="process-section" aria-labelledby="process-title">
        <div className="process-heading" data-reveal>
          <h2 id="process-title">One idea. Built all the way through.</h2>
        </div>
        <ol data-reveal>
          <li><b>01</b><h3>Find the real brief</h3><p>Agree on the audience, the problem and the decision the work needs to influence.</p></li>
          <li><b>02</b><h3>Build one clear world</h3><p>Set the idea, tone and anchor visual, then make every touchpoint belong.</p></li>
          <li><b>03</b><h3>Make it hold up</h3><p>Take it across screens, spaces and formats without watering the idea down.</p></li>
        </ol>
      </section>

      <footer id="contact" className="contact-section">
        <h2 data-reveal>Have a role or a brief worth solving?</h2>
        <div className="contact-links" data-reveal>
          <a href="mailto:g@doesdesignwork.com"><span>Email Gerard</span><small>g@doesdesignwork.com</small></a>
          <a href="https://doesdesignwork.github.io/gerard-teo-cv/#director" target="_blank" rel="noopener noreferrer"><span>Leadership CV</span><small>Experience and role fit</small></a>
          <a href="https://www.linkedin.com/in/gerard-teo-0b106429/" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>Connect professionally</small></a>
        </div>
        <div className="footer-line">
          <span>Gerard Teo / Singapore</span>
          <span>Art Director / Creative Lead / Hands-on maker</span>
          <a href="#top">Back to top</a>
        </div>
      </footer>

      {isProjectOpen && (
        <div
          ref={projectDialogRef}
          className="project-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-dialog-title"
          onClick={() => setIsProjectOpen(false)}
        >
          <button
            ref={closeButtonRef}
            className="project-dialog-close"
            type="button"
            onClick={() => setIsProjectOpen(false)}
          >
            Close project
          </button>

          <div className="project-dialog-shell" onClick={(event) => event.stopPropagation()}>
            <div className="project-dialog-media">
              <Image
                src={selectedProject.images[selectedImageIndex]}
                alt={`${selectedProject.alt}, image ${selectedImageIndex + 1} of ${selectedProject.images.length}`}
                width={1800}
                height={1400}
                sizes="(max-width: 900px) 100vw, 68vw"
              />
              {selectedProject.images.length > 1 && (
                <div className="project-image-controls">
                  <button type="button" onClick={showPreviousImage}>Previous image</button>
                  <span>{String(selectedImageIndex + 1).padStart(2, "0")} / {String(selectedProject.images.length).padStart(2, "0")}</span>
                  <button type="button" onClick={showNextImage}>Next image</button>
                </div>
              )}
            </div>

            <aside className="project-dialog-copy">
              <div className="project-dialog-topline"><span>{selectedProject.number}</span><strong>{selectedProject.client}</strong></div>
              <h2 id="project-dialog-title">{selectedProject.title}</h2>
              <p className="project-summary">{selectedProject.summary}</p>
              <p className="project-discipline">{selectedProject.discipline}</p>

              <dl className="project-facts">
                <div><dt>Context</dt><dd>{selectedProject.context}</dd></div>
                <div><dt>My role</dt><dd>{selectedProject.role}</dd></div>
              </dl>

              <div className="project-story">
                <section><h3>Challenge</h3><p>{selectedProject.challenge}</p></section>
                <section><h3>Approach</h3><p>{selectedProject.approach}</p></section>
                <section><h3>Result</h3><p>{selectedProject.result}</p></section>
              </div>

              <div className="project-thumbnails" aria-label={`${selectedProject.client} image gallery`}>
                {selectedProject.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    className={selectedImageIndex === index ? "is-active" : ""}
                    onClick={() => setActiveProjectImage(index)}
                    aria-label={`Show image ${index + 1} of ${selectedProject.images.length}`}
                    aria-pressed={selectedImageIndex === index}
                  >
                    <Image src={image} alt="" width={320} height={220} sizes="110px" />
                  </button>
                ))}
              </div>

              <div className="project-dialog-actions">
                <div>
                  <button type="button" onClick={showPreviousProject}>Previous project</button>
                  <button type="button" onClick={showNextProject}>Next project</button>
                </div>
                <a href="#contact" onClick={() => setIsProjectOpen(false)}>Discuss a project</a>
              </div>
            </aside>
          </div>
        </div>
      )}
    </main>
  );
}
