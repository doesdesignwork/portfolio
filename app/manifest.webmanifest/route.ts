const manifest = {
  name: "Gerard Teo - Art Director & Senior Brand Designer",
  short_name: "Gerard Teo",
  description:
    "Selected brand, campaign and experiential work by Singapore art director and senior brand designer Gerard Teo.",
  start_url: "/",
  scope: "/",
  display: "minimal-ui",
  background_color: "#151512",
  theme_color: "#151512",
  lang: "en-SG",
  icons: [
    {
      src: "/favicon.svg",
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any",
    },
  ],
};

export function GET() {
  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
      "Content-Type": "application/manifest+json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
