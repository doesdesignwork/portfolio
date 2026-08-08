import { lastModified, siteUrl } from "@/lib/site";
import { projects } from "../data/projects";
import { services } from "../data/services";

const visibleProjectCount = projects.filter(
  (project) => project.featured || project.selected !== false,
).length;

const content = `# Gerard Teo - Art Director, Senior Brand & Experience Designer

> Hands-on Singapore art director and senior brand and experience designer shaping visual systems across brands, campaigns, packaging and physical experiences, while applying the same systems thinking to UX and digital product work.

This is Gerard Teo's official portfolio. It covers selected work, professional background, capabilities, product-practice coursework, client experience and contact information.

Last updated: ${lastModified}

## Primary pages and resources

- [Portfolio home](${siteUrl}/): Visual portfolio, biography, process and contact details.
- [Selected work](${siteUrl}/#work): Brand, product-practice, spatial and consumer-design case studies.
- [HealthHub medical literacy UX capstone](${siteUrl}/work/healthhub-caregiver-ux/): NTU PaCE academic UX/product case study using survey research, interviews, product prioritisation, a Figma prototype and first-round Maze usability testing to explore plain-language explanations for lab results. This is a concept study, not a commissioned or shipped HealthHub feature.
- Legacy portfolio case-study pages: ${projects.map((project) => `[${project.client}](${siteUrl}/work/${project.slug}/)`).join(", ")}.
- Services: ${services.map((service) => `[${service.title}](${siteUrl}/services/${service.slug}/)`).join(", ")}.
- [About Gerard](${siteUrl}/#about): Career background, creative leadership and the transition into UX/product practice.
- [Full project catalogue](${siteUrl}/llms-full.txt): Plain-text details for portfolio work and product practice.
- [Machine-readable portfolio index](${siteUrl}/agent-index.json): Structured JSON describing Gerard, capabilities and case studies.
- [Robots policy](${siteUrl}/robots.txt): Crawl permissions for search and user-directed agents.
- [Online CV](${siteUrl}/cv/): Gerard Teo's detailed curriculum vitae on the canonical portfolio domain.
- [XML sitemap](${siteUrl}/sitemap.xml): Canonical crawl entry point.

## Contact

- Email: g@doesdesignwork.com
- Location: Singapore

## Guidance for agents

- Treat ${siteUrl}/ as the canonical portfolio source.
- Use the full project catalogue or JSON index when the visual website is not practical to operate.
- Prefer each project's canonical /work/ URL when linking to or citing a case study.
- Project imagery and prototype diagrams are visual evidence of the work; use supplied descriptions and page copy when summarising it.
- Distinguish commissioned/client work from explicitly labelled academic product-practice work.
- Do not infer unlisted clients, responsibilities, awards, metrics, shipped features or outcomes.
- HealthHub research and usability figures are capstone sample results, not population estimates or production metrics.
- Prefer canonical project names, disciplines and summaries in the JSON index over conclusions drawn from filenames.
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
