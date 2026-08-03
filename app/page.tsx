import Image from "next/image";
import Link from "next/link";
import PortfolioMotion from "./PortfolioMotion";
import { projects, type Project } from "./data/projects";
import styles from "./home.module.css";
import "./home-fixes.css";
import "./side-index.css";

const byNumber = (number: string) => {
  const project = projects.find((item) => item.number === number);
  if (!project) {
    throw new Error(`Missing portfolio project ${number}`);
  }
  return project;
};

const featuredProjects = ["13", "08", "01"].map(byNumber);
const archiveProjects = ["03", "04", "06", "09", "14", "10", "11", "15"].map(byNumber);

const capabilities = [
  ["01", "Creative direction"],
  ["02", "Brand systems"],
  ["03", "Campaigns"],
  ["04", "Experiential"],
  ["05", "Packaging"],
  ["06", "3D visualisation"],
] as const;

const sideSections = [
  ["top", "Introduction"],
  ["work", "Selected work"],
  ["archive", "Archive"],
  ["about", "Experience"],
  ["contact", "Contact"],
] as const;

function ProjectLink({
  project,
  priority = false,
  className = "",
  revealIndex = 0,
}: {
  project: Project;
  priority?: boolean;
  className?: string;
  revealIndex?: number;
}) {
  return (
    <Link
      className={`${styles.projectCard} ${className}`}
      href={`/work/${project.slug}/`}
      aria-label={`View ${project.client} case study: ${project.title}`}
      data-reveal="case-study"
      data-reveal-delay={revealIndex}
      data-magnetic="true"
    >
      <span className={styles.projectMedia}>
        <Image
          src={project.images[0]}
          alt={project.imageAlts[0] ?? project.alt}
          width={1800}
          height={1400}
          sizes="(max-width: 760px) 100vw, 70vw"
          priority={priority}
          unoptimized
          data-sharp-image="true"
        />
      </span>
      <span className={styles.projectCaption}>
        <span className={styles.projectNumber}>{project.number}</span>
        <span>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
        <span className={styles.projectTitle}>{project.title}</span>
        <span
          className={styles.projectArrow}
          aria-hidden="true"
          data-magnetic-indicator
        >
          ↗
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  const [sgInnovate, dow, modajar] = featuredProjects;

  return (
    <div className={styles.page}>
      <PortfolioMotion />

      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>

      <header className={styles.header}>
        <Link className={styles.wordmark} href="#top" aria-label="Gerard Teo, portfolio home">
          <Image
            src="/assets/g-image.webp"
            alt=""
            width={640}
            height={640}
            sizes="48px"
            priority
          />
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
          <Link href="/cv/">CV</Link>
        </nav>
      </header>

      <aside className={styles.marginRail} aria-label="Page index" data-side-index data-active-section="top">
        <div>
          <span>GT</span>
          <span data-section-counter aria-live="polite">
            <b data-section-counter-current>01</b>
            <span> / 05</span>
          </span>
        </div>
        <nav>
          {sideSections.map(([id, label], index) => (
            <Link
              key={id}
              href={`#${id}`}
              data-section-link={id}
              aria-current={index === 0 ? "location" : undefined}
            >
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <p data-availability>
          <span>Available for the </span>
          <strong data-right-work>right</strong>
          <span> work</span>
          <i aria-hidden="true" />
        </p>
      </aside>

      <main>
        <section id="top" className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroIdentity}>
            <p>Gerard Teo</p>
            <p>Art Director / Senior Brand Designer</p>
          </div>

          <div className={styles.heroStatement}>
            <h1 id="hero-title">
              <span data-hero-line>
                <span>Clear thinking.</span>
              </span>
              <span data-hero-line>
                <span><em>Properly made.</em></span>
              </span>
            </h1>
            <div>
              <p>
                I turn complex briefs into brand systems, campaigns and experiences
                people can understand, remember and use.
              </p>
              <div className={styles.heroActions}>
                <Link href="#work">View selected work</Link>
                <Link href="/cv/">Leadership CV</Link>
              </div>
            </div>
          </div>

          <div data-intro-panel data-reveal="intro">
            <p data-intro-kicker>Senior enough to set the direction. Still close enough to make the work.</p>
            <div data-intro-copy>
              <p>
                I have spent 26+ years across brand identity, campaigns, packaging,
                exhibitions and production, working inside major agency networks,
                building an independent practice and leading creative teams.
              </p>
              <p>
                My useful zone is the stretch between strategy and craft: untangling
                the brief, finding the visual point and carrying it through until the
                final thing survives screens, spaces, budgets and deadlines.
              </p>
            </div>
            <dl data-intro-facts>
              <div>
                <dt>26+</dt>
                <dd>Years of design and direction</dd>
              </div>
              <div>
                <dt>3 → 15</dt>
                <dd>Creative-team growth</dd>
              </div>
              <div>
                <dt>Idea → delivery</dt>
                <dd>No disappearing after the concept deck</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.manifesto} aria-labelledby="manifesto-title">
          <p>Strategy / Direction / Execution</p>
          <h2 id="manifesto-title">The idea has to work before the design can.</h2>
          <p>
            Get the brief straight. Find the point. Build one visual world that
            survives every screen, space and deadline.
          </p>
        </section>

        <section id="work" className={styles.selectedWork} aria-labelledby="work-title">
          <header className={styles.sectionHeader}>
            <p>Selected case studies</p>
            <h2 id="work-title">Work with a point.</h2>
            <span>
              Brand systems, campaigns and physical experiences, shown with the
              thinking and responsibility behind them.
            </span>
          </header>

          <div className={styles.featuredStack}>
            <ProjectLink
              project={sgInnovate}
              priority
              className={styles.featureWide}
              revealIndex={0}
            />
            <ProjectLink
              project={dow}
              className={styles.featureOffset}
              revealIndex={1}
            />
            <ProjectLink
              project={modajar}
              className={styles.featureNarrow}
              revealIndex={2}
            />
          </div>
        </section>

        <section id="archive" className={styles.archive} aria-labelledby="archive-title">
          <header className={styles.archiveHeader}>
            <p>Selected archive / {archiveProjects.length} projects</p>
            <h2 id="archive-title">A wider cut of the work.</h2>
          </header>

          <div className={styles.archiveList}>
            {archiveProjects.map((project) => (
              <Link
                key={project.number}
                className={styles.archiveItem}
                href={`/work/${project.slug}/`}
              >
                <span className={styles.archiveNumber}>{project.number}</span>
                <span className={styles.archiveName}>
                  <strong>{project.client}</strong>
                  <small>{project.title}</small>
                </span>
                <span className={styles.archiveDiscipline}>{project.discipline}</span>
                <span className={styles.archivePreview}>
                  <Image
                    src={project.images[0]}
                    alt={project.imageAlts[0] ?? project.alt}
                    width={900}
                    height={650}
                    sizes="(max-width: 760px) 100vw, 32vw"
                    unoptimized
                    data-sharp-image="true"
                  />
                </span>
                <span className={styles.archiveArrow} aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <div className={styles.aboutTitle}>
            <p>Experience</p>
            <h2 id="about-title">I lead the work. I still make it.</h2>
          </div>

          <div className={styles.aboutStory}>
            <div>
              <p>
                I move between setting the direction and making sure the work lands.
                I co-founded Blacksheep Communications, helped grow its design team
                from three to 15 and stayed close to the work, clients and production.
              </p>
              <p>
                Across Ogilvy, Batey, DDB, Saatchi, McCann and Hogarth Worldwide on
                Apple, I learned how ideas survive demanding brand systems and real
                production. Today I work across events and experiences at C Square
                Creative Communications, while The Fat Oracle is my independent
                practice for brand, packaging and 3D.
              </p>
            </div>

            <dl className={styles.metrics}>
              <div><dt>26+</dt><dd>Years across design, direction and production</dd></div>
              <div><dt>3 → 15</dt><dd>Creative-team growth at Blacksheep</dd></div>
              <div><dt>6</dt><dd>Major agency networks plus independent practice</dd></div>
            </dl>
          </div>

          <ul className={styles.capabilities} aria-label="Capabilities">
            {capabilities.map(([number, label]) => (
              <li key={number}>
                <span>{number}</span>
                <strong>{label}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.process} aria-labelledby="process-title">
          <header>
            <p>How the work gets done</p>
            <h2 id="process-title">One idea. Built all the way through.</h2>
          </header>
          <ol>
            <li data-reveal="process" data-reveal-delay="0">
              <span>01</span>
              <h3>Find the real brief</h3>
              <p>Agree on the audience, the problem and the decision the work must influence.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="1">
              <span>02</span>
              <h3>Build one clear world</h3>
              <p>Set the idea, tone and anchor visual, then make every touchpoint belong.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="2">
              <span>03</span>
              <h3>Make it hold up</h3>
              <p>Take it across screens, spaces and formats without watering the idea down.</p>
            </li>
          </ol>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div data-reveal="contact" data-reveal-delay="0">
          <p>Have a role?</p>
          <h2>Or a brief worth solving?</h2>
        </div>
        <div className={styles.contactLinks}>
          <a
            href="mailto:g@doesdesignwork.com"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="0"
          >
            <span>Email Gerard</span>
            <small>g@doesdesignwork.com</small>
          </a>
          <Link
            href="/cv/"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="1"
          >
            <span>Leadership CV</span>
            <small>Experience and role fit</small>
          </Link>
          <a
            href="https://www.linkedin.com/in/gerard-teo-0b106429/"
            target="_blank"
            rel="noopener noreferrer"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="2"
          >
            <span>LinkedIn</span>
            <small>Connect professionally</small>
          </a>
        </div>
        <div className={styles.footerLine}>
          <span>Gerard Teo / Singapore</span>
          <span>Art Director / Senior Brand Designer / Creative Lead</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </footer>
    </div>
  );
}
