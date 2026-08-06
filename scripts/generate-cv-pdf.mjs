import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT = process.argv[2] ?? "public/gerard-teo-creative-lead-senior-designer-cv.pdf";
const W = 595.2756;
const H = 841.8898;

const C = {
  paper: [0.94902, 0.941176, 0.921569],
  ink: [0.145098, 0.164706, 0.180392],
  bright: [0.980392, 0.976471, 0.964706],
  violet: [0.352941, 0.309804, 0.811765],
  lime: [0.768627, 0.811765, 0.309804],
  muted: [0.384314, 0.407843, 0.4],
  line: [0.768627, 0.772549, 0.745098],
  tint: [0.9239, 0.9165, 0.9509],
};

const esc = (value) => String(value)
  .replaceAll("\\", "\\\\")
  .replaceAll("(", "\\(")
  .replaceAll(")", "\\)");

const rgb = (colour, stroke = false) =>
  `${colour.join(" ")} ${stroke ? "RG" : "rg"}`;

const rect = (x, y, width, height, colour) =>
  `${rgb(colour)}\n${x} ${y} ${width} ${height} re f`;

const roundedRectPath = (x, y, width, height, radius) => {
  const k = 0.5522847498;
  const r = Math.min(radius, width / 2, height / 2);
  const right = x + width;
  const top = y + height;
  return [
    `${x + r} ${y} m`,
    `${right - r} ${y} l`,
    `${right - r + k * r} ${y} ${right} ${y + r - k * r} ${right} ${y + r} c`,
    `${right} ${top - r} l`,
    `${right} ${top - r + k * r} ${right - r + k * r} ${top} ${right - r} ${top} c`,
    `${x + r} ${top} l`,
    `${x + r - k * r} ${top} ${x} ${top - r + k * r} ${x} ${top - r} c`,
    `${x} ${y + r} l`,
    `${x} ${y + r - k * r} ${x + r - k * r} ${y} ${x + r} ${y} c`,
    "h",
  ].join("\n");
};

const roundedRect = (
  x,
  y,
  width,
  height,
  radius,
  fill,
  stroke = null,
  strokeWidth = 0.6,
) => {
  const commands = [];
  if (fill) commands.push(rgb(fill));
  if (stroke) commands.push(rgb(stroke, true), `${strokeWidth} w`);
  commands.push(roundedRectPath(x, y, width, height, radius));
  commands.push(fill && stroke ? "B" : fill ? "f" : "S");
  return commands.join("\n");
};

const rule = (x1, y1, x2, y2, colour = C.line, width = 0.6) =>
  `${rgb(colour, true)}\n${width} w\n${x1} ${y1} m ${x2} ${y2} l S`;

const text = (x, y, value, size = 10, bold = false, colour = C.ink) =>
  `${rgb(colour)}\nBT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(value)}) Tj ET`;

const textLines = (
  target,
  x,
  y,
  lines,
  size = 10,
  leading = 13,
  bold = false,
  colour = C.ink,
) => {
  lines.forEach((line, index) => {
    target.push(text(x, y - index * leading, line, size, bold, colour));
  });
};

const annotations = [];
const addLink = (page, coordinates, url) => {
  annotations.push({ page, rect: coordinates, url });
};

const chip = (target, page, x, y, width, label, url, primary = false) => {
  target.push(
    roundedRect(
      x,
      y,
      width,
      28,
      6,
      primary ? C.violet : C.tint,
    ),
  );
  target.push(
    text(
      x + 11,
      y + 9.2,
      label,
      8.8,
      true,
      primary ? C.bright : C.violet,
    ),
  );
  addLink(page, [x, y, x + width, y + 28], url);
};

const sidebarSection = (target, x, y, title, lines, options = {}) => {
  const {
    gapAfter = 20,
    lineSize = 8.7,
    lineLeading = 12.2,
    boldLines = [],
  } = options;
  target.push(text(x, y, title.toUpperCase(), 8.6, true, C.violet));
  let cursor = y - 19;
  lines.forEach((line, index) => {
    const isBullet = line.startsWith("• ");
    const clean = isBullet ? line.slice(2) : line;
    if (isBullet) {
      target.push(rect(x, cursor + 3.4, 2.5, 2.5, C.violet));
      target.push(
        text(x + 10, cursor, clean, lineSize, boldLines.includes(index), C.ink),
      );
    } else {
      target.push(
        text(x, cursor, clean, lineSize, boldLines.includes(index), C.ink),
      );
    }
    cursor -= lineLeading;
  });
  return cursor - gapAfter;
};

const roleBlock = (
  target,
  y,
  dates,
  title,
  company,
  descriptionLines,
  withRule = true,
) => {
  const xDate = 36;
  const xBody = 126;
  const companyLines = Array.isArray(company) ? company : [company];
  const companyLeading = 11.4;
  const descriptionLeading = 12.2;

  target.push(text(xDate, y, dates.toUpperCase(), 8.2, true, C.violet));
  target.push(text(xBody, y, title, 12.4, true, C.ink));
  textLines(
    target,
    xBody,
    y - 16,
    companyLines,
    8.7,
    companyLeading,
    true,
    C.muted,
  );

  const descriptionY =
    y - 16 - (companyLines.length - 1) * companyLeading - 16;
  textLines(
    target,
    xBody,
    descriptionY,
    descriptionLines,
    8.9,
    descriptionLeading,
    false,
    C.ink,
  );

  const bottom =
    descriptionY - (descriptionLines.length - 1) * descriptionLeading - 17;
  if (withRule) {
    target.push(rule(36, bottom, 368, bottom, C.line, 0.55));
    return bottom - 21;
  }
  return bottom - 2;
};

const footer = (target, pageNumber) => {
  target.push(
    text(
      36,
      22,
      "Gerard Teo / CV / Singapore / Updated August 2026",
      7.7,
      false,
      C.muted,
    ),
  );
  target.push(text(540, 22, `${pageNumber} / 2`, 7.7, false, C.muted));
};

const pageOne = [];
pageOne.push(rect(0, 0, W, H, C.paper));
pageOne.push(
  text(
    36,
    806,
    "GERARD TEO / CV / SINGAPORE / UPDATED AUGUST 2026",
    8.2,
    true,
    C.muted,
  ),
);
pageOne.push(rule(36, 792, 559, 792, C.ink, 0.8));
pageOne.push(text(36, 737, "Gerard Teo", 42, true, C.ink));
pageOne.push(
  text(
    36,
    704,
    "Art Director and Senior Brand Designer",
    18.5,
    true,
    C.violet,
  ),
);
pageOne.push(
  text(36, 682, "CREATIVE LEAD / HANDS-ON MAKER", 8.9, true, C.muted),
);
textLines(
  pageOne,
  36,
  650,
  [
    "I have spent 26+ years making brands, campaigns, packaging and experiences",
    "across agency, independent and in-house teams. I clarify the brief, set the",
    "direction and stay close to the making so the idea does not get lost.",
  ],
  10.6,
  15.2,
  false,
  C.ink,
);

chip(
  pageOne,
  1,
  36,
  578,
  88,
  "Email Gerard",
  "mailto:g@doesdesignwork.com",
  true,
);
chip(
  pageOne,
  1,
  132,
  578,
  82,
  "Portfolio",
  "https://www.doesdesignwork.com/",
);
chip(
  pageOne,
  1,
  222,
  578,
  83,
  "Online CV",
  "https://www.doesdesignwork.com/cv/",
);
chip(
  pageOne,
  1,
  313,
  578,
  72,
  "LinkedIn",
  "https://www.linkedin.com/in/gerard-teo-0b106429/",
);

pageOne.push(rule(36, 550, 559, 550, C.line, 0.8));
pageOne.push(text(36, 523, "CURRENT WORK", 9.2, true, C.violet));

let yOne = 495;
yOne = roleBlock(
  pageOne,
  yOne,
  "Jan 2026 - Present",
  "Graphic Designer",
  [
    "C Square Creative Communications / C2 Global",
    "Exhibitions, Singapore",
  ],
  [
    "I design brand, event and exhibition work from early concept",
    "through artwork and production.",
  ],
);
yOne = roleBlock(
  pageOne,
  yOne,
  "Jan 2014 - Present",
  "Independent Creative Lead / Designer",
  "The Fat Oracle (TFO) - Independent practice",
  [
    "I take on selected identity, campaign, packaging and",
    "visualisation projects, working directly with clients",
    "and production partners.",
  ],
);

pageOne.push(roundedRect(390, 118, 169, 432, 12, C.bright));
let sideOne = 523;
sideOne = sidebarSection(
  pageOne,
  408,
  sideOne,
  "Contact",
  [
    "+65 9878 2541",
    "g@doesdesignwork.com",
    "doesdesignwork.com",
    "LinkedIn / Gerard Teo",
  ],
  { lineSize: 8.6, lineLeading: 14, gapAfter: 25 },
);
addLink(1, [408, 499, 481, 512], "tel:+6598782541");
addLink(1, [408, 485, 521, 498], "mailto:g@doesdesignwork.com");
addLink(1, [408, 471, 505, 484], "https://www.doesdesignwork.com/");
addLink(
  1,
  [408, 457, 514, 470],
  "https://www.linkedin.com/in/gerard-teo-0b106429/",
);
sideOne = sidebarSection(
  pageOne,
  408,
  sideOne,
  "What I bring",
  [
    "• Creative direction and clearer briefs",
    "• Brand identities and campaign systems",
    "• Events, exhibitions and spatial",
    "  communication",
    "• Packaging, print and production",
    "• Pitches and stakeholder presentations",
    "• 3D visualisation, UX and digital design",
  ],
  { lineSize: 8.4, lineLeading: 12.7, gapAfter: 24 },
);
sideOne = sidebarSection(
  pageOne,
  408,
  sideOne,
  "Selected brands",
  [
    "Apple, L'Oreal, Unilever, Dow Chemical,",
    "Singtel, StarHub, BlackBerry, MTV Asia,",
    "EMI Music and UOB Travel.",
  ],
  { lineSize: 8.4, lineLeading: 12.7, gapAfter: 0 },
);
footer(pageOne, 1);

const pageTwo = [];
pageTwo.push(rect(0, 0, W, H, C.paper));
pageTwo.push(
  text(36, 806, "GERARD TEO / CV / SELECTED EXPERIENCE", 8.2, true, C.muted),
);
pageTwo.push(rule(36, 792, 559, 792, C.ink, 0.8));
pageTwo.push(text(36, 752, "Selected experience", 28, true, C.ink));
pageTwo.push(
  text(
    36,
    726,
    "26+ YEARS / DESIGN / DIRECTION / DELIVERY",
    8.9,
    true,
    C.violet,
  ),
);

let yTwo = 694;
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "Sep 2020 - Apr 2024",
  "Freelance Designer",
  "Northstar Travel Media, Singapore",
  [
    "Turned approved concepts and wireframes into responsive",
    "email campaigns, final templates and production-ready assets.",
  ],
);
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "Sep 2021 - Nov 2022",
  "Content Designer - Apple Account",
  "Hogarth Worldwide, Singapore",
  [
    "Adapted and checked Apple retail and digital campaign",
    "materials against detailed global brand and production",
    "standards.",
  ],
);
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "Sep 2013 - Nov 2014",
  "Senior Designer & 3D Visualisation Lead",
  "Crepuscule Asia, Singapore",
  [
    "Combined design direction with hands-on brand, packaging",
    "and 3D visualisation work for Unilever and L'Oreal.",
  ],
);
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "May 2011 - Nov 2011",
  "Design Director",
  "Orbital Group Pte Ltd, Singapore",
  [
    "Led pitch and campaign design for BlackBerry, Munich",
    "Automobiles and Pacific Healthcare.",
  ],
);
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "Jan 2004 - Jul 2009",
  "Co-Founder / Creative Director",
  "Blacksheep Communications Pte Ltd, Singapore",
  [
    "Co-founded the studio, grew the design team from 3 to 15",
    "people and stayed closely involved with the work, clients",
    "and production.",
  ],
);
yTwo = roleBlock(
  pageTwo,
  yTwo,
  "Jan 2001 - Jan 2009",
  "Creative Designer to Creative Director",
  "CP&GD Design Communications Pte Ltd, Singapore",
  [
    "Progressed from hands-on designer to creative lead across",
    "print, outdoor and digital campaigns.",
  ],
  false,
);

pageTwo.push(roundedRect(390, 160, 169, 596, 12, C.bright));
let sideTwo = 727;
sideTwo = sidebarSection(
  pageTwo,
  408,
  sideTwo,
  "Education & development",
  [
    "NTU PaCE, 2026",
    "Advanced Professional Certificate in UX",
    "Design & Digital Product Management.",
    "",
    "Course work included a HealthHub caregiver",
    "and medical-translation flow, plus an OCBC",
    "subscription-management sprint.",
    "",
    "(SCTP) Associate Data Analyst",
    "NTUC LearningHub / Attained Jan 2024",
    "",
    "Concept Creation-3",
    "MAGES Institute / Attained Mar 2022",
  ],
  {
    lineSize: 8.15,
    lineLeading: 11.8,
    gapAfter: 24,
    boldLines: [0, 8, 11],
  },
);
sideTwo = sidebarSection(
  pageTwo,
  408,
  sideTwo,
  "Tools",
  [
    "Photoshop, Illustrator, InDesign,",
    "After Effects and Figma.",
    "",
    "Blender, Cinema 4D, Spline and Webflow.",
    "",
    "ChatGPT, Firefly, Midjourney and Runway.",
  ],
  { lineSize: 8.25, lineLeading: 12.1, gapAfter: 22 },
);
sideTwo = sidebarSection(
  pageTwo,
  408,
  sideTwo,
  "Portfolio links",
  ["Selected work", "Online CV", "LinkedIn"],
  { lineSize: 8.5, lineLeading: 14, gapAfter: 0, boldLines: [0, 1, 2] },
);
addLink(2, [408, 394, 474, 408], "https://www.doesdesignwork.com/#work");
addLink(2, [408, 380, 460, 394], "https://www.doesdesignwork.com/cv/");
addLink(
  2,
  [408, 366, 455, 380],
  "https://www.linkedin.com/in/gerard-teo-0b106429/",
);

pageTwo.push(roundedRect(20, 18, W - 40, 116, 12, C.ink));
pageTwo.push(text(38, 105, "GET IN TOUCH", 8.8, true, C.lime));
pageTwo.push(
  text(
    38,
    78,
    "Need a senior creative who still makes the work?",
    17.4,
    true,
    C.bright,
  ),
);
pageTwo.push(
  text(
    38,
    55,
    "See the projects, then tell me what needs solving.",
    9.4,
    false,
    C.bright,
  ),
);
pageTwo.push(roundedRect(454, 55, 84, 30, 6, C.lime));
pageTwo.push(text(467, 65, "Email Gerard", 8.7, true, C.ink));
addLink(2, [454, 55, 538, 85], "mailto:g@doesdesignwork.com");
pageTwo.push(text(527, 29, "2 / 2", 7.7, false, C.muted));

const objects = [];
const reserve = () => {
  objects.push(null);
  return objects.length;
};
const setObject = (id, value) => {
  objects[id - 1] = value;
};
const addObject = (value) => {
  objects.push(value);
  return objects.length;
};

const catalogId = reserve();
const pagesId = reserve();
const regularFontId = addObject(
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
);
const boldFontId = addObject(
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
);
const infoId = addObject(
  "<< /Author (Gerard Teo) /Title (Gerard Teo - Art Director and Senior Brand Designer CV) /Subject (Art Director, Creative Lead and Senior Brand Designer CV) /Keywords (Gerard Teo, Art Director, Creative Lead, Senior Brand Designer, Singapore) >>",
);

const streamObject = (content) => {
  const bytes = Buffer.byteLength(content, "ascii");
  return `<< /Length ${bytes} >>\nstream\n${content}\nendstream`;
};

const pageContents = [pageOne.join("\n"), pageTwo.join("\n")];
const contentIds = pageContents.map((content) =>
  addObject(streamObject(content)),
);
const annotationIds = { 1: [], 2: [] };
for (const annotation of annotations) {
  const id = addObject(
    `<< /Type /Annot /Subtype /Link /Rect [${annotation.rect.join(" ")}] /Border [0 0 0] /A << /S /URI /URI (${esc(annotation.url)}) >> >>`,
  );
  annotationIds[annotation.page].push(id);
}

const pageIds = pageContents.map((_, index) =>
  addObject(
    `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentIds[index]} 0 R /Annots [${annotationIds[index + 1].map((id) => `${id} 0 R`).join(" ")}] >>`,
  ),
);
setObject(
  pagesId,
  `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`,
);
setObject(catalogId, `<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

let pdf = "%PDF-1.4\n%ABCD\n";
const offsets = [0];
for (let index = 0; index < objects.length; index += 1) {
  offsets.push(Buffer.byteLength(pdf, "ascii"));
  pdf += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`;
}
const xrefOffset = Buffer.byteLength(pdf, "ascii");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let index = 1; index <= objects.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R /Info ${infoId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(resolve(OUT)), { recursive: true });
writeFileSync(OUT, Buffer.from(pdf, "ascii"));
console.log(`Generated ${OUT} (${Buffer.byteLength(pdf, "ascii")} bytes)`);
