import Image from "next/image";
import Link from "next/link";
import { Roboto_Flex } from "next/font/google";
import PortfolioMotion from "./PortfolioMotion";
import { projects, type Project } from "./data/projects";
import styles from "./home.module.css";
import "./numberless-layout.css";
import "./ux-ui-preview.css";
import "./brutalist-motion-preview.css";

const brutalFont = Roboto_Flex({
  variable: "--font-brutal",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const byNumber = (number: string) => {
  const project = projects.find((item) => item.number === number);
  if (!project) {
    throw new Error(`Missing portfolio project ${number}`);
  }
  return project;
};

const featuredProjects = ["13", "04", "01"].map(byNumber);
const archiveProjects = ["03", "08", "06", "09", "14", "10", "11", "15"].map(byNumber);
const tickerProjects = ["13", "04", "01", "08", "03", "14", "11"].map(byNumber);

const archiveNotes: Record<string, string> = {
  "03": "Four premium card ideas, including two DBS co-branded directions.",
  "08": "A busy technical booth broken into clear, easy-to-find zones.",
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

const sideSections = [
  ["top", "Introduction"],
  ["work", "Selected work"],
  ["ux-ui", "UX/UI"],
  ["archive", "Archive"],
  ["about", "Experience"],
  ["contact", "Contact"],
] as const;

function CharacterLine({ text, accent = false }: { text: string; accent?: boolean }) {
  return (
    <span data-hero-line={accent ? "accent" : "base"} aria-hidden="true">
      {Array.from(text).map((character, index) => (
        <span data-hero-char key={`${character}-${index}`}>
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

function TickerTitle({ text }: { text: string }) {
  return (
    <span className="brutal-ticker__word">
      {Array.from(text).map((character, index) => (
        <span data-ticker-letter key={`${character}-${index}`}>
          {character === " " ? "\u00A0" : character}
        </span>
      ))}
    </span>
  );
}

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
          <strong data-project-stretch>{project.client}</strong>
          <small>{project.discipline}</small>
        </span>
        <span
          className={styles.projectTitle}
          data-project-title
          data-project-stretch
        >
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
  const [sgInnovate, sunsilk, modajar] = featuredProjects;

  return (
    <div className={`${styles.page} site-page site-page--home ${brutalFont.variable}`}>
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
          <Link href="#ux-ui">UX/UI</Link>
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
            <span> / 06</span>
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
          <a
            href="mailto:g@doesdesignwork.com"
            aria-label="Email Gerard about the right work"
            data-availability-link
          >
            <span>Available for the </span>
            <strong data-right-work>right</strong>
            <span> work</span>
            <i aria-hidden="true" />
          </a>
        </p>
      </aside>

      <main>
        <section
          id="top"
          className={styles.hero}
          aria-labelledby="hero-title"
          data-brutal-hero
        >
          <div className={styles.heroIdentity} data-hero-identity>
            <p>Gerard Teo</p>
            <p>Art Director / Senior Brand Designer / UX-minded Creative</p>
          </div>

          <div className={styles.heroStatement} data-hero-statement>
            <h1 id="hero-title" data-hero-title aria-label="Clear thinking. Properly made.">
              <CharacterLine text="Clear thinking." />
              <CharacterLine text="Properly made." accent />
            </h1>
            <div data-hero-copy>
              <p>
                I make complex briefs easier to understand, then turn them into brands,
                campaigns, experiences and digital products that hold together in the real
                world.
              </p>
              <div className={styles.heroActions}>
                <Link href="#work">View selected work</Link>
                <Link href="/ux-ui/">View UX/UI work</Link>
                <Link href="/cv/">View my CV</Link>
              </div>
            </div>
          </div>

          <dl className="brand-hero-proof" data-hero-proof aria-label="Experience highlights">
            <div>
              <dt>26+</dt>
              <dd>Years designing, directing and producing work</dd>
            </div>
            <div>
              <dt>3 → 15</dt>
              <dd>Grew the Blacksheep creative team from 3 to 15</dd>
            </div>
            <div>
              <dt>UX</dt>
              <dd>Research, flows, wireframes and interactive prototypes</dd>
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

        <section className="brutal-ticker" data-scroll-ticker aria-label="Selected project ticker">
          <div className="brutal-ticker__track" data-ticker-track aria-hidden="true">
            {[0, 1].map((groupIndex) => (
              <div className="brutal-ticker__group" key={groupIndex}>
                {tickerProjects.map((project) => (
                  <span className="brutal-ticker__item" key={`${groupIndex}-${project.number}`}>
                    <TickerTitle text={project.client} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section
          className={`${styles.manifesto} brand-home-manifesto`}
          aria-labelledby="manifesto-title"
        >
          <p>Working principle</p>
          <h2 id="manifesto-title">Clarity before decoration.</h2>
          <p>
            The work should make sense before it tries to impress. Once the idea is clear,
            the visual choices have something solid to do.
          </p>
        </section>

        <section id="work" className={styles.selectedWork} aria-labelledby="work-title">
          <header className={`${styles.sectionHeader} brand-section-head`}>
            <p>Selected case studies</p>
            <h2 id="work-title">Work with a point.</h2>
            <span>
              A few projects that show how I think, make decisions and carry an idea into
              the finished work.
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
              project={sunsilk}
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

        <section id="ux-ui" className="ux-preview-home" aria-labelledby="ux-preview-title">
          <header className="ux-preview-home__header">
            <p>UX/UI &amp; product studies</p>
            <div>
              <h2 id="ux-preview-title">The screen comes after the problem.</h2>
              <p>
                Two academic studies showing how I frame user needs, organise a flow and
                turn it into a prototype that people can understand and use.
              </p>
            </div>
          </header>

          <div className="ux-preview-home__grid">
            <Link
              className="ux-preview-card"
              href="/ux-ui/#healthhub"
              data-project-link
              data-magnetic="true"
            >
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
                <h3 data-project-stretch>Medical results, explained in context.</h3>
                <p>Research, user flow, wireframes, Figma prototype and usability testing.</p>
              </span>
            </Link>

            <Link
              className="ux-preview-card ux-preview-card--finance"
              href="/ux-ui/#ocbc"
              data-project-link
              data-magnetic="true"
            >
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
                <h3 data-project-stretch>Recurring spending, turned into decisions.</h3>
                <p>Problem framing, journey mapping, interface hierarchy and prototype story.</p>
              </span>
            </Link>
          </div>

          <Link className="ux-preview-home__action" href="/ux-ui/">
            Explore the UX/UI case studies <span aria-hidden="true">↗</span>
          </Link>
        </section>

        <section id="archive" className={styles.archive} aria-labelledby="archive-title">
          <header className={`${styles.archiveHeader} brand-section-head`}>
            <p>Selected archive</p>
            <h2 id="archive-title">More of the work.</h2>
          </header>

          <div className={styles.archiveList}>
            {archiveProjects.map((project) => (
              <Link
                key={project.number}
                className={styles.archiveItem}
                href={`/work/${project.slug}/`}
                data-archive-item
                data-project-link
                data-magnetic="true"
              >
                <span className={styles.archiveName} data-archive-name>
                  <strong data-project-stretch>{project.client}</strong>
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
            <h2 id="about-title">I lead the work and stay close to it.</h2>
          </div>

          <div className={`${styles.aboutStory} brand-about-story brand-about-story--focused`}>
            <div>
              <p>
                I have worked in major agency networks, independent studios and in-house
                teams. Along the way I moved from hands-on designer to creative director
                and studio co-founder.
              </p>
              <p>
                I still like making the thing. I stay close to the brief, the team and the
                production details so the idea does not get polished into something bland
                on its way out the door.
              </p>
            </div>
          </div>

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
          <header className="brand-section-head">
            <p>How the work gets made</p>
            <h2 id="process-title">Start with the problem. Build what lasts.</h2>
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
          <p>Selected roles and collaborations</p>
          <h2>Got a brief that needs sorting out?</h2>
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
