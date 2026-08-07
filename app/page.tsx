import Image from "next/image";
import Link from "next/link";
import PortfolioMotion from "./PortfolioMotion";
import { projects, type Project } from "./data/projects";
import styles from "./home.module.css";
import "./ux-ui-preview.css";

const byNumber = (number: string) => {
  const project = projects.find((item) => item.number === number);
  if (!project) {
    throw new Error(`Missing portfolio project ${number}`);
  }
  return project;
};

const featuredProjects = ["13", "08", "03"].map(byNumber);
const archiveProjects = ["04", "01", "06", "09", "14", "10", "11", "15"].map(byNumber);

const archiveNotes: Record<string, string> = {
  "04": "A familiar global haircare brand made clearer across pack, label and campaign.",
  "01": "A fashion identity built from naming through digital retail and packaging.",
  "06": "A property identity drawn directly from the building.",
  "09": "A more consistent identity without erasing the school’s history.",
  "14": "Licensed characters worked into the shoes, not simply printed on top.",
  "10": "Technical ingredient benefits turned into products people could picture.",
  "11": "Six restaurant brands connected by one clear group structure.",
  "15": "Three beauty ranges made clearer at shelf while keeping their brand cues.",
};

const capabilityGroups = [
  {
    title: "Direction",
    description: "Find the idea worth backing, then make the brief clearer for everyone.",
    items: [
      "Creative direction",
      "Problem framing",
      "Concept development",
      "Team leadership",
    ],
  },
  {
    title: "Systems",
    description: "Turn that idea into a visual language that can stretch without falling apart.",
    items: [
      "Brand identity",
      "Campaign systems",
      "Packaging systems",
      "UX/UI flows",
    ],
  },
  {
    title: "Delivery",
    description: "Stay with the work through the details, formats and production decisions.",
    items: [
      "Campaign rollout",
      "Exhibition production",
      "Artwork and adaptation",
      "Prototyping and testing",
      "3D visualisation",
    ],
  },
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
      data-project-link
    >
      <span className={styles.projectMedia} data-project-preview>
        <Image
          src={project.images[0]}
          alt={project.imageAlts[0] ?? project.alt}
          width={1800}
          height={1400}
          sizes="(max-width: 760px) 100vw, (max-width: 1180px) 86vw, 78vw"
          priority={priority}
          unoptimized
          data-sharp-image="true"
        />
      </span>
      <span className={styles.projectCaption} data-project-caption>
        <span data-project-number>{project.number}</span>
        <span data-project-client>
          <strong>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
        <span className={styles.projectTitle} data-project-title>
          {project.title}
        </span>
        <span data-project-role>
          <small>Role</small>
          <span>{project.role}</span>
        </span>
        <span className={styles.projectArrow} aria-hidden="true" data-project-arrow>
          ↗
        </span>
      </span>
    </Link>
  );
}

export default function Home() {
  const [sgInnovate, dow, americanExpress] = featuredProjects;

  return (
    <div className={`${styles.page} site-page site-page--home`}>
      <PortfolioMotion />

      <a className={styles.skipLink} href="#work">
        Skip to selected work
      </a>

      <header className={`${styles.header} brand-header`} data-site-header>
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
            sizes="40px"
            priority
          />
          <span data-nav-name>Gerard Teo / DDW</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="#work">Work</Link>
          <Link href="#about">About</Link>
          <Link href="/cv/">CV</Link>
          <Link href="#contact">Contact</Link>
        </nav>
      </header>

      <main>
        <section
          id="top"
          className={styles.hero}
          aria-labelledby="hero-title"
          data-editorial-hero
        >
          <div className={styles.heroIdentity} data-hero-identity>
            <p>Gerard Teo / Singapore</p>
            <p>Art Director / Senior Brand Designer / Creative Lead</p>
          </div>

          <div className={styles.heroStatement} data-hero-stage>
            <div data-hero-heading-wrap>
              <p data-hero-kicker>Think clearly. Build completely.</p>
              <h1 id="hero-title" data-hero-title>
                <span data-hero-primary>Clear thinking.</span>
                <span data-hero-secondary>Properly made.</span>
              </h1>
            </div>

            <div data-hero-copy>
              <p>
                I make complex briefs easier to understand, then turn them into brand
                systems, campaigns, packaging, experiences and visual communication that
                hold together in the real world.
              </p>
              <p data-hero-proofline>
                Brand systems / Campaigns / Packaging / Experiential / Visual communication
              </p>
              <div className={styles.heroActions}>
                <Link href="#work">View selected work <span aria-hidden="true">↓</span></Link>
                <Link href="/cv/">View my CV</Link>
              </div>
            </div>
          </div>

          <dl className="brand-hero-proof" data-hero-proof aria-label="Experience highlights">
            <div>
              <dt>26+</dt>
              <dd>Years across design, direction and production</dd>
            </div>
            <div>
              <dt>3 → 15</dt>
              <dd>Creative team growth at Blacksheep</dd>
            </div>
            <div>
              <dt>6</dt>
              <dd>Major agency networks, plus independent and in-house roles</dd>
            </div>
          </dl>

          <div data-intro-panel data-reveal="intro">
            <p data-intro-kicker>
              Good work gets weaker when thinking, design and production drift apart.
            </p>
            <div data-intro-copy>
              <p>
                I like to stay close to all three. I help make sense of the brief, set a
                clear direction and carry the idea through the awkward real-world details
                that decide whether it works.
              </p>
              <p>
                That means fewer handovers, fewer lost decisions and a finished piece that
                still feels like the original idea.
              </p>
            </div>
            <dl data-intro-facts>
              <div>
                <dt>Direction</dt>
                <dd>A clear idea before the design starts</dd>
              </div>
              <div>
                <dt>System</dt>
                <dd>Rules that keep the work recognisable</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>Hands-on through prototype or production</dd>
              </div>
            </dl>
          </div>
        </section>

        <section id="work" className={styles.selectedWork} aria-labelledby="work-title">
          <header className={`${styles.sectionHeader} brand-section-head`} data-section-header>
            <p>Featured work</p>
            <h2 id="work-title" data-section-heading>Work with a point.</h2>
            <span>
              Three projects showing the range from identity systems to physical experience
              and product thinking.
            </span>
          </header>

          <div className={styles.featuredStack} data-featured-stack>
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
              project={americanExpress}
              className={styles.featureNarrow}
              revealIndex={2}
            />
          </div>
        </section>

        <section id="ux-ui" className="ux-preview-home" aria-labelledby="ux-preview-title">
          <header className="ux-preview-home__header" data-section-header>
            <p>Digital product studies</p>
            <div>
              <h2 id="ux-preview-title" data-section-heading>The screen comes after the problem.</h2>
              <p>
                Two academic studies showing how I frame user needs, organise a flow and
                turn it into a prototype that people can understand and use.
              </p>
            </div>
          </header>

          <div className="ux-preview-home__grid">
            <Link className="ux-preview-card" href="/ux-ui/#healthhub" data-project-link>
              <span className="ux-preview-card__visual" aria-hidden="true">
                <span className="ux-preview-card__device">
                  <span>HEALTHHUB STUDY</span>
                  <strong>Blood glucose result</strong>
                  <small>Keep the result visible while explaining an unfamiliar term.</small>
                  <span className="ux-preview-card__panel">
                    <span>PLAIN-LANGUAGE DEFINITION</span>
                    <strong>Understand the term without leaving the page.</strong>
                    <small>Contextual, source-aware and clearly educational.</small>
                  </span>
                </span>
              </span>
              <span className="ux-preview-card__copy">
                <span>Caregiver experience</span>
                <h3>Medical results, explained in context.</h3>
                <p>Research, user flow, wireframes, Figma prototype and usability testing.</p>
              </span>
            </Link>

            <Link className="ux-preview-card ux-preview-card--finance" href="/ux-ui/#ocbc" data-project-link>
              <span className="ux-preview-card__visual" aria-hidden="true">
                <span className="ux-preview-card__device">
                  <span>OCBC SPRINT CONCEPT</span>
                  <strong>Subscriptions</strong>
                  <small>Bring recurring charges together before the next renewal.</small>
                  <span className="ux-preview-card__panel">
                    <span>POTENTIAL MONTHLY SAVING</span>
                    <strong>S$31.97</strong>
                    <small>Review, keep or set a reminder.</small>
                  </span>
                </span>
              </span>
              <span className="ux-preview-card__copy">
                <span>Personal finance</span>
                <h3>Recurring spending, turned into decisions.</h3>
                <p>Problem framing, journey mapping, interface hierarchy and prototype story.</p>
              </span>
            </Link>
          </div>

          <Link className="ux-preview-home__action" href="/ux-ui/">
            Explore the UX/UI case studies <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <section
          className={`${styles.manifesto} brand-home-manifesto`}
          aria-labelledby="manifesto-title"
          data-principle-section
        >
          <p>Working principle</p>
          <h2 id="manifesto-title" data-section-heading>Clarity before decoration.</h2>
          <p>
            The work should make sense before it tries to impress. Once the idea is clear,
            the visual choices have something solid to do.
          </p>
        </section>

        <section id="archive" className={styles.archive} aria-labelledby="archive-title">
          <header className={`${styles.archiveHeader} brand-section-head`} data-section-header>
            <p>Archive / 8 projects</p>
            <h2 id="archive-title" data-section-heading>A wider cut of the work.</h2>
          </header>

          <div className={styles.archiveList}>
            {archiveProjects.map((project) => (
              <Link
                key={project.number}
                className={styles.archiveItem}
                href={`/work/${project.slug}/`}
                data-archive-item
                data-project-link
              >
                <span data-archive-number>{project.number}</span>
                <span className={styles.archiveName} data-archive-name>
                  <strong>{project.client}</strong>
                  <small>{archiveNotes[project.number] ?? project.title}</small>
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
                    sizes="(max-width: 760px) 100vw, 28vw"
                    unoptimized
                    data-sharp-image="true"
                  />
                </span>
                <span className={styles.archiveArrow} aria-hidden="true" data-archive-arrow>
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="about" className={styles.about} aria-labelledby="about-title">
          <div className={`${styles.aboutTitle} brand-section-head`} data-section-header>
            <p>About / Experience</p>
            <h2 id="about-title" data-section-heading>I lead the work. I still make it.</h2>
          </div>

          <div className={`${styles.aboutStory} brand-about-story brand-about-story--focused`}>
            <div>
              <p>
                I have worked in major agency networks, independent studios and in-house
                teams. Along the way I moved from hands-on designer to creative director
                and studio co-founder.
              </p>
              <p>
                I stay close to the brief, the team and the production details so the idea
                does not get polished into something bland on its way out the door.
              </p>
            </div>
          </div>

          <dl data-about-proof aria-label="Experience evidence">
            <div>
              <dt>26+</dt>
              <dd>Years of design, direction and production experience</dd>
            </div>
            <div>
              <dt>3 → 15</dt>
              <dd>Grew the Blacksheep creative team from three to 15</dd>
            </div>
            <div>
              <dt>Across</dt>
              <dd>Brand, campaigns, packaging, experiential, 3D and digital product studies</dd>
            </div>
          </dl>

          <div className="brand-capability-matrix" aria-label="Creative capabilities">
            {capabilityGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section
          className={`${styles.process} brand-home-process`}
          aria-labelledby="process-title"
          data-process-section
        >
          <header className="brand-section-head" data-section-header>
            <p>Approach</p>
            <h2 id="process-title" data-section-heading>Start with the problem. Build what lasts.</h2>
          </header>
          <ol>
            <li data-reveal="process" data-reveal-delay="0" data-process-point>
              <h3>Get the brief straight</h3>
              <p>Work out who it is for, what is getting in the way and what must change.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="1" data-process-point>
              <h3>Find the visual idea</h3>
              <p>Choose one strong direction and give the team a clear set of rules.</p>
            </li>
            <li data-reveal="process" data-reveal-delay="2" data-process-point>
              <h3>Make it work everywhere</h3>
              <p>Test the idea across real formats and stay with it through prototype or production.</p>
            </li>
          </ol>
        </section>
      </main>

      <footer id="contact" className={styles.footer}>
        <div data-reveal="contact" data-reveal-delay="0">
          <p>Contact</p>
          <h2>Have a role? Or a brief worth solving?</h2>
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
            href="/ux-ui/"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="1"
          >
            <span>View UX/UI work</span>
            <small>Academic product studies and prototype thinking</small>
          </Link>
          <Link
            href="/cv/"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="2"
          >
            <span>View my CV</span>
            <small>Experience, skills and selected roles</small>
          </Link>
          <a
            href="https://www.linkedin.com/in/gerard-teo-0b106429/"
            target="_blank"
            rel="noopener noreferrer"
            data-contact-link
            data-reveal="contact"
            data-reveal-delay="3"
          >
            <span>LinkedIn</span>
            <small>Connect with me there</small>
          </a>
        </div>
        <div className={`${styles.footerLine} brand-footer-line`}>
          <span>Gerard Teo</span>
          <span>Art Director / Senior Brand Designer / Creative Lead</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </footer>
    </div>
  );
}
