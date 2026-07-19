import { projects } from "../data/projects";

const siteUrl = "https://cinematic-site-studio.gerardteo.chatgpt.site";
const lastModified = "2026-07-19";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const projectImages = Array.from(
  new Set(projects.flatMap((project) => project.images)),
);

const imageEntries = projectImages
  .map(
    (image) => `    <image:image>
      <image:loc>${escapeXml(`${siteUrl}${image}`)}</image:loc>
    </image:image>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastModified}</lastmod>
${imageEntries}
  </url>
</urlset>`;

export function GET() {
  return new Response(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
