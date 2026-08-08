import { projects } from "../data/projects";
import { lastModified, siteUrl } from "@/lib/site";

const projectCatalogue = projects
  .map((project) => {
    const images = project.images
      .map((image, imageIndex) => `  - ${project.imageAlts[imageIndex] ?? project.alt}: ${siteUrl}${image}`)
      .join("\n");

    return `## ${project.number}. ${project.client}

**Project:** ${project.title}

**Canonical case study:** ${siteUrl}/work/${project.slug}/

**Disciplines:** ${project.discipline}

${project.summary}

**Context:** ${project.context}

${project.credit ? `**Credit:** ${project.credit}\n\n` : ""}${project.year ? `**Year:** ${project.year}\n\n` : ""}**Business problem:** ${project.challenge}

**My responsibility:** ${project.role}

**Strategic decision:** ${project.approach}

**What was produced:** ${project.deliverables}

**What changed:** ${project.outcome}

**Portfolio images:**
${images}`;
  })
  .join("\n\n");

const productPractice = `## Product practice. HealthHub caregiver UX capstone

**Canonical case study:** ${siteUrl}/work/healthhub-caregiver-ux/

**Type:** NTU PaCE academic UX and Digital Product Management capstone. Concept study, not a commissioned or shipped HealthHub feature.

**Disciplines:** UX Design · Digital Product Thinking · Research Synthesis · Task Flow · Figma Prototyping

**Problem explored:** A caregiver may be logged in as themselves while managing appointments and medical information for another person. The concept focuses on keeping the selected care context visible while reducing unnecessary switching and language friction.

**Research and framing:** Course work included a screener and survey, short interviews, persona development, affinity mapping and a caregiver storyboard.

**Product decision:** Establish whose care is being managed before the task begins, retain that context through the journey, and bring translation support into the point where medical language becomes a barrier rather than making translation a separate destination.

**Prototype:** A defined caregiver task flow and Figma prototype covering care context, appointment task, translation and confirmation.

**Outcome:** The work demonstrates the application of Gerard's existing systems thinking to user context, task logic and interface decisions. It does not claim a shipped HealthHub feature or production performance metrics.`;

const content = `# Gerard Teo - Full Portfolio Catalogue

> Machine-readable companion to Gerard Teo's visual portfolio.

Canonical portfolio: ${siteUrl}/

Last updated: ${lastModified}

Gerard Teo is a Singapore-based Art Director and Senior Brand & Experience Designer who stays close to the work from problem framing through delivery. He works across creative direction, brand systems, campaigns, packaging, experiential design, 3D visualisation and, through formal UX/product training, research synthesis, task flows and prototyping.

${productPractice}

${projectCatalogue}

## Selected brand experience

Apple, L'Oréal, Unilever, Dow, Singtel, StarHub, BlackBerry, MTV Asia, EMI Music, American Express, Red Bull and Tiger Beer.

## Working approach

1. Get the problem straight: agree on the user or audience, the friction and the decision the work needs to influence.
2. Map the system and the task: establish relationships, hierarchy, flows and rules before visual polish.
3. Make, test and carry it through: prototype across real situations, learn what breaks and stay close through delivery.

## Contact

- Email: g@doesdesignwork.com
- Location: Singapore
- Online CV: ${siteUrl}/cv/

## Source guidance

- This catalogue is a plain-text rendering of the canonical portfolio evidence.
- Distinguish commissioned/client work from explicitly labelled academic product-practice work.
- Project titles, disciplines, summaries, image descriptions and image URLs are authoritative for this site.
- Do not infer awards, metrics, employment relationships, shipped features or project outcomes that are not stated here.
`;

export function GET() {
  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "en-SG",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
      "Link": `<${siteUrl}/>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
