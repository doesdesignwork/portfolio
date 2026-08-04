import Image from "next/image";
import Link from "next/link";
import PortfolioMotion from "./PortfolioMotion";
import { projects, type Project } from "./data/projects";
import styles from "./home.module.css";
import "./numberless-layout.css";

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
  "Creative direction",
  "Brand systems",
  "Campaigns",
  "Experiential",
  "Packaging",
  "3D visualisation",
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
      <span className={styles.projectCaption} data-project-caption>
        <span>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
        <span className={styles.projectTitle} data-project-title>
          {project.title}
        </span>
        <span
          className={styles.projectArrow}
          aria-hidden="true"
          data-magnetic-indicator
          data-project-arrow
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
    <div className={`${styles.page} site-page site-page--home`}>
      <PortfolioMotion />

      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>

      <header className={`${styles.header} brand-header`}>
        <Link
          className={`${styles.wordmark} brand-wordmark`}
          href="#top"
          aria-label="Gerard Teo, portfolio home"
        >
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

      <aside
        className={styles.marginRail}
        aria-label="Page index"
        data-side-index
        data-active-section="top"
      >
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
                <span>
                  <em>Properly made.</em>
                </span>
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
            <p data-intro-kicker>
              Direction, design and delivery belong in the same conversation.
            </p>
            <div data-intro-copy>
              <p>
                I work where strategy becomes something visible: clarifying the brief,
                setting the creative direction and building the system through to final
                production.
              </p>
              <p>
                That means fewer handovers, fewer diluted ideas and a clearer line from
                the first decision to the finished experience.
              </p>
            </div>
            <dl data-intro-facts>
              <div>
                <dt>Direction</dt>
                <dd>A clear visual point before production starts</dd>
              </div>
              <div>
                <dt>System</dt>
                <dd>One idea across screens, spaces and formats</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Hands-on through artwork and production</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className={`${styles.manifesto} brand-home-manifesto`}
          aria-labelledby="manifesto-title"
        >
          <p>Working principle</p>
          <h2 id="manifesto-title">Clarity before decoration.</h2>
          <p>
            A strong system makes decisions easier, keeps teams aligned and gives the
            final work a recognisable point of view.
          </p>
        </section>

        <section id="work" className={styles.selectedWork} aria-labelledby="work-title">
          <header className={`${styles.sectionHeader} brand-section-head`}>
            <p>Selected case studies</p>
            <h2 id="work-title">Work with a point.</h2>
            <span>
              Brand systems, campaigns and physical experiences, shown with the
              decisions and responsibility behind them.
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
          <header className={`${styles.archiveHeader} brand-section-head`}>
            <p>Selected archive</p>
            <h2 id="archive-title">A wider cut of the work.</h2>
          </header>

          <div className={styles.archiveList}>
            {archiveProjects.map((project) => (
              <Link
                key={project.number}
                className={styles.archiveItem}
                href={`/work/${project.slug}/`}
                data-archive-item
              >
                <span className={styles.archiveName} data-archive-name>
                  <strong>{project.client}</strong>
                  <small>{project.title}</small>
                </span>
                <span className={styles.archiveDiscipline} data-archive-discipline>
                  {project.discipline}
                </span>
                <span className={styles.archivePreview} data-archive-preview>
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
                <span
                  className={styles.archiveArrow}
                  aria-hidden="true"
                  data-archive-arrow
                >
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <div className={`${styles.aboutTitle} brand-section-head`}>
            <p>Experience</p>
            <h2 id="about-title">I lead the work. I make it.</h2>
          </div>

          <div className={`${styles.aboutStory} brand-about-story`}>
            <div>
              <p>
                I have worked across agency networks, independent practice and
                production teams, moving from hands-on designer to creative director
                and studio co-founder.
              </p>
              <p>
                The common thread is accountability. I stay close to the brief, the
                team and the final output, especially when a project has many
                stakeholders, formats or production constraints.
              </p>
            </div>

            <dl className={styles.metrics}>
              <div>
                <dt>26+</dt>
                <dd>Years across design, direction and production</dd>
              </div>
              <div>
                <dt>3 → 15</dt>
                <dd>Creative-team growth at Blacksheep</dd>
              </div>
              <div>
                <dt>3 modes</dt>
                <dd>Agency, independent and in-house practice</dd>
              </div>
            </dl>
          </div>

          <ul
            className={styles.capabilities}
            aria-label="Capabilities"
            data-capability-list
          >
            {capabilities.map((label) => (
              <li key={label}>
                <strong>{label}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section
          className={`${styles.process} brand-home-process`}
          aria-labelledby="process-title"
          data-process-section
        >
          <header className="brand-section-head">
            <p>How I build the work</p>
            <h2 id="process-title">From brief to durable system.</h2>
          </header>
          <ol>
            <li data-reveal="process" data-reveal-delay="0" data-process-point>
              <h3>Define the decision</h3>
              <p>Clarify the audience, the problem and what the work must change.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="1" data-process-point>
              <h3>Set the visual logic</h3>
              <p>Build a recognisable idea, hierarchy and set of rules for the team.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="2" data-process-point>
              <h3>Carry it into production</h3>
              <p>Test the system across real formats and protect the idea through delivery.</p>
            </li>
          </ol>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div data-reveal="contact" data-reveal-delay="0">
          <p>Selected roles and collaborations</p>
          <h2>Bring me the brief.</h2>
        </div>
        <div className={`${styles.contactLinks} brand-contact-links`}>
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
            <small>Experience, capabilities and role fit</small>
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
        <div className={`${styles.footerLine} brand-footer-line`}>
          <span>Gerard Teo / Singapore</span>
          <span>Art Director / Senior Brand Designer / Creative Lead</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </footer>
    </div>
  );
}
