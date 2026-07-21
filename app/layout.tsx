import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { projects } from "./data/projects";
import { lastModified, siteUrl } from "@/lib/site";
import "./globals.css";

const siteTitle = "Gerard Teo | Art Director & Creative Lead Singapore";
const siteDescription =
  "Gerard Teo is a hands-on Singapore art director and creative lead shaping brand systems, campaigns and experiences from pitch through production.";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const editorialFont = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Gerard Teo Portfolio",
  title: {
    default: siteTitle,
    template: "%s - Gerard Teo",
  },
  description: siteDescription,
  keywords: [
    "Gerard Teo",
    "art director Singapore",
    "creative lead Singapore",
    "creative direction",
    "brand identity design",
    "campaign design",
    "experiential design",
    "packaging design",
    "visual identity",
    "creative portfolio",
  ],
  authors: [{ name: "Gerard Teo", url: siteUrl }],
  creator: "Gerard Teo",
  publisher: "Gerard Teo",
  category: "Design",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    types: {
      "text/markdown": "/llms.txt",
      "text/plain": "/llms-full.txt",
      "application/json": "/agent-index.json",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    siteName: "Gerard Teo Portfolio",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/assets/modajar-identity-final.webp",
        width: 1026,
        height: 716,
        alt: "Gerard Teo portfolio, Modajar fashion brand identity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/assets/modajar-identity-final.webp"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#0c0c0b",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Gerard Teo",
      url: siteUrl,
      email: "mailto:g@doesdesignwork.com",
      jobTitle: "Art Director & Creative Lead",
      sameAs: [
        "https://www.linkedin.com/in/gerard-teo-0b106429/",
        "https://doesdesignwork.github.io/gerard-teo-cv/",
      ],
      mainEntityOfPage: { "@id": `${siteUrl}/#profile-page` },
      subjectOf: {
        "@type": "WebPage",
        name: "Gerard Teo - Online CV",
        url: "https://doesdesignwork.github.io/gerard-teo-cv/",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "SG",
        addressLocality: "Singapore",
      },
      knowsAbout: [
        "Creative direction",
        "Brand identity",
        "Campaign systems",
        "Experiential design",
        "Packaging design",
        "Motion storytelling",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Gerard Teo Portfolio",
      description: siteDescription,
      inLanguage: "en-SG",
      publisher: { "@id": `${siteUrl}/#person` },
      copyrightHolder: { "@id": `${siteUrl}/#person` },
      dateModified: lastModified,
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: "Gerard Teo - Art Director & Creative Lead",
      description: siteDescription,
      inLanguage: "en-SG",
      mainEntity: { "@id": `${siteUrl}/#person` },
      dateModified: lastModified,
      hasPart: {
        "@type": "ItemList",
        name: "Selected work",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@id": `${siteUrl}/#project-${project.number}` },
        })),
      },
    },
    ...projects.map((project) => ({
      "@type": "CreativeWork",
      "@id": `${siteUrl}/#project-${project.number}`,
      identifier: `gerard-teo-project-${project.number}`,
      url: `${siteUrl}/#project-${project.number}`,
      name: `${project.client} - ${project.title}`,
      headline: project.title,
      description: project.summary,
      genre: project.discipline.split(" · "),
      image: project.images.map((image) => `${siteUrl}${image}`),
      thumbnailUrl: `${siteUrl}${project.images[0]}`,
      creator: { "@id": `${siteUrl}/#person` },
      copyrightHolder: { "@id": `${siteUrl}/#person` },
      isPartOf: { "@id": `${siteUrl}/#profile-page` },
      keywords: project.discipline,
      dateModified: lastModified,
      inLanguage: "en-SG",
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="LLM-readable site summary"
        />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms-full.txt"
          title="Full machine-readable project catalogue"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/agent-index.json"
          title="Structured portfolio index"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${editorialFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
