import { projects } from "../data/projects";
import { lastModified, siteUrl } from "@/lib/site";

const projectCatalogue = projects
  .map((project) => {
    const images = project.images
      .map((image) => `  - ${siteUrl}${image}`)
      .join("\n");

    return `## ${project.number}. ${project.client}

**Project:** ${project.title}

**Disciplines:** ${project.discipline}

${project.summary}

**Context:** ${project.context}

**Role:** ${project.role}

**Challenge:** ${project.challenge}

**Approach:** ${project.approach}

**Result:** ${project.result}

**Portfolio images:**
${images}`;
  })
  .join("\n\n");

const content = `# Gerard Teo - Full Portfolio Catalogue

> Machine-readable companion to Gerard Teo's visual portfolio.

Canonical portfolio: ${siteUrl}/

Last updated: ${lastModified}

Gerard Teo is a Singapore-based Art Director and Creative Lead who stays close to the work from pitch through production. He works across creative direction, brand systems, campaigns, packaging, experiential design, 3D visualisation, motion and UX thinking.

${projectCatalogue}

## Selected brand experience

Apple, L'Oréal, Unilever, Dow, Singtel, StarHub, BlackBerry, MTV Asia, EMI Music, American Express, Red Bull and Tiger Beer.

## Working approach

1. Get to the real brief: agree on the audience, the problem and the decision the work needs to influence.
2. Build one clear world: set the idea, tone and anchor visual, then make every touchpoint belong.
3. Make it work everywhere: take the system across screens, spaces and formats without watering it down.

## Contact

- Email: g@doesdesignwork.com
- Location: Singapore
- Online CV: https://doesdesignwork.github.io/gerard-teo-cv/

## Source guidance

- This catalogue is a plain-text rendering of the canonical portfolio data.
- Project titles, disciplines, summaries and image URLs are authoritative for this site.
- Do not infer awards, metrics, employment relationships or project outcomes that are not stated here.
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
