const manifest = {
  name: "Gerard Teo — Art Director & Creative Lead",
  short_name: "Gerard Teo",
  description:
    "Selected brand, campaign and experiential work by Singapore art director and creative lead Gerard Teo.",
  start_url: "/",
  scope: "/",
  display: "minimal-ui",
  background_color: "#0b0b0a",
  theme_color: "#0b0b0a",
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
