import { projects } from "../data/projects";
import { services } from "../data/services";
import { lastModified, siteUrl } from "@/lib/site";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");

const imageEntries = (images: string[]) =>
  images
    .map(
      (image) => `    <image:image>
      <image:loc>${escapeXml(`${siteUrl}${image}`)}</image:loc>
    </image:image>`,
    )
    .join("\n");

const staticUrls = [
  { path: "/", priority: "1.0", changefreq: "monthly" },
  ...services.map((service) => ({
    path: `/services/${service.slug}/`,
    priority: "0.8",
    changefreq: "monthly",
  })),
];

const staticEntries = staticUrls
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n");

const projectEntries = projects
  .map(
    (project) => `  <url>
    <loc>${escapeXml(`${siteUrl}/work/${project.slug}/`)}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${project.featured ? "0.9" : "0.7"}</priority>
${imageEntries(project.images)}
  </url>`,
  )
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticEntries}
${projectEntries}
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
