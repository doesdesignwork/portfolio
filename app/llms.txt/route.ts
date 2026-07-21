import { lastModified, siteUrl } from "@/lib/site";

const content = `# Gerard Teo — Art Director & Creative Lead

> Hands-on Singapore art director and creative lead shaping brand systems, campaigns and experiences from pitch through production.

This is Gerard Teo's official portfolio. It covers selected work, professional background, capabilities, client experience and contact information.

Last updated: ${lastModified}

## Primary pages and resources

- [Portfolio home](${siteUrl}/): Visual portfolio, biography, process and contact details.
- [Selected work](${siteUrl}/#work): Interactive tiled gallery of 15 selected projects.
- [About Gerard](${siteUrl}/#about): Career background and creative leadership experience.
- [Full project catalogue](${siteUrl}/llms-full.txt): Plain-text details for every featured project.
- [Machine-readable portfolio index](${siteUrl}/agent-index.json): Structured JSON describing Gerard and all featured projects.
- [Robots policy](${siteUrl}/robots.txt): Crawl permissions for search and user-directed agents.
- [Online CV](https://doesdesignwork.github.io/gerard-teo-cv/): Gerard Teo's detailed curriculum vitae.
- [XML sitemap](${siteUrl}/sitemap.xml): Canonical crawl entry point.

## Contact

- Email: g@doesdesignwork.com
- Location: Singapore

## Guidance for agents

- Treat ${siteUrl}/ as the canonical portfolio source.
- Use the full project catalogue or JSON index when the interactive project gallery is not practical to operate.
- Every project tile is keyboard accessible and opens a full-screen project gallery with Escape and arrow-key controls.
- Project imagery is visual evidence of the work; use the supplied descriptions and image alt text when summarising it.
- Do not infer unlisted clients, responsibilities, awards or outcomes.
- Prefer the canonical project names, disciplines and summaries in the JSON index over conclusions drawn from filenames.
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
