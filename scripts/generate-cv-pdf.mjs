import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const OUT = process.argv[2] ?? "public/gerard-teo-creative-lead-senior-designer-cv.pdf";
const W = 595.2756;
const H = 841.8898;

const C = {
  paper: [0.94902, 0.941176, 0.921569],
  ink: [0.145098, 0.164706, 0.180392],
  bright: [0.980392, 0.976471, 0.964706],
  amber: [1, 0.74902, 0],
  muted: [0.384314, 0.407843, 0.4],
  line: [0.768627, 0.772549, 0.745098],
};

const esc = (value) => String(value)
  .replaceAll("\\", "\\\\")
  .replaceAll("(", "\\(")
  .replaceAll(")", "\\)");

const rgb = (colour, stroke = false) => `${colour.join(" ")} ${stroke ? "RG" : "rg"}`;
const rect = (x, y, width, height, colour) => `${rgb(colour)}\n${x} ${y} ${width} ${height} re f`;
const rule = (x1, y1, x2, y2, colour = C.line, width = 0.6) => `${rgb(colour, true)}\n${width} w\n${x1} ${y1} m ${x2} ${y2} l S`;
const text = (x, y, value, size = 10, bold = false, colour = C.ink) =>
  `${rgb(colour)}\nBT /${bold ? "F2" : "F1"} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${esc(value)}) Tj ET`;
const bullet = (x, y, value, lines = []) => [
  `${rgb(C.amber)}\n${x} ${y + 2} 2.2 2.2 re f`,
  text(x + 11, y, value, 8.8, false, C.ink),
  ...lines.map((item, index) => text(x + 11, y - 11.5 * (index + 1), item, 8.8, false, C.ink)),
].join("\n");

const annotations = [];
const addLink = (page, coordinates, url) => {
  annotations.push({ page, rect: coordinates, url });
};

const pageOne = [];
pageOne.push(rect(0, 0, W, H, C.paper));
pageOne.push(rect(0, H - 184, W, 184, C.ink));
pageOne.push(rect(0, H - 184, 10, 184, C.amber));
pageOne.push(text(36, 776.9, "Gerard Teo", 34, true, C.bright));
pageOne.push(text(36, 749.9, "Art Director / Senior Brand Designer", 16, true, C.bright));
pageOne.push(text(36, 727.9, "Creative lead. Hands-on maker. Clearer work from brief to production.", 10.5, false, C.amber));
pageOne.push(text(36, 695.9, "g@doesdesignwork.com", 8.8, true, C.amber));
pageOne.push(text(155.94, 695.9, "+65 9878 2541", 8.8, true, C.amber));
pageOne.push(text(230.9, 695.9, "doesdesignwork.com", 8.8, true, C.amber));
pageOne.push(text(336.88, 695.9, "LinkedIn", 8.8, true, C.amber));
addLink(1, [36, 693, 140, 707], "mailto:g@doesdesignwork.com");
addLink(1, [155, 693, 215, 707], "tel:+6598782541");
addLink(1, [230, 693, 321, 707], "https://www.doesdesignwork.com/");
addLink(1, [336, 693, 376, 707], "https://www.linkedin.com/in/gerard-teo-0b106429/");

pageOne.push(text(36, 623.9, "PROFILE", 8.6, true, C.amber));
pageOne.push(text(36, 611.9, "I have spent 26+ years making brands, campaigns, packaging and", 11));
pageOne.push(text(36, 596.7, "experiences across agency, independent and in-house teams. I clarify", 11));
pageOne.push(text(36, 581.5, "the brief, set the direction and stay close to the making so the idea", 11));
pageOne.push(text(36, 566.3, "does not get lost.", 11));
pageOne.push(rule(36, 539.1, 382, 539.1, C.ink, 1));

pageOne.push(text(36, 519.1, "CURRENT WORK", 8.6, true, C.amber));
pageOne.push(text(36, 507.1, "JAN 2026 - PRESENT", 8.6, true, C.amber));
pageOne.push(text(36, 495.1, "Graphic Designer", 12, true));
pageOne.push(text(36, 480.6, "C Square Creative Communications / C2 Global Exhibitions, Singapore", 8.9, true, C.muted));
pageOne.push(text(36, 468.4, "I design brand, event and exhibition work from early concept through artwork and", 9.2));
pageOne.push(text(36, 456.1, "production.", 9.2));
pageOne.push(rule(36, 433.8, 382, 433.8));

pageOne.push(text(36, 417.8, "JAN 2014 - PRESENT", 8.6, true, C.amber));
pageOne.push(text(36, 405.8, "Independent Creative Lead / Designer", 12, true));
pageOne.push(text(36, 391.3, "The Fat Oracle (TFO) - Independent practice", 8.9, true, C.muted));
pageOne.push(text(36, 379.1, "I take on selected identity, campaign, packaging and visualisation projects, working", 9.2));
pageOne.push(text(36, 366.8, "directly with clients and production partners.", 9.2));
pageOne.push(rule(36, 344.5, 382, 344.5));

pageOne.push(text(406, 623.9, "CONTACT", 8.6, true, C.amber));
pageOne.push(text(406, 611.9, "EMAIL", 7.8, true, C.muted));
pageOne.push(text(406, 600.9, "g@doesdesignwork.com", 8.8, true, C.amber));
pageOne.push(text(406, 582.9, "PHONE", 7.8, true, C.muted));
pageOne.push(text(406, 571.9, "+65 9878 2541", 8.8, true, C.amber));
pageOne.push(text(406, 553.9, "PORTFOLIO", 7.8, true, C.muted));
pageOne.push(text(406, 542.9, "doesdesignwork.com", 8.8, true, C.amber));
pageOne.push(text(406, 524.9, "ONLINE CV", 7.8, true, C.muted));
pageOne.push(text(406, 513.9, "doesdesignwork.com/cv", 8.8, true, C.amber));
addLink(1, [406, 598, 510, 612], "mailto:g@doesdesignwork.com");
addLink(1, [406, 569, 465, 583], "tel:+6598782541");
addLink(1, [406, 540, 496, 554], "https://www.doesdesignwork.com/");
addLink(1, [406, 511, 509, 525], "https://www.doesdesignwork.com/cv/");
pageOne.push(rule(406, 491.9, 559, 491.9));

pageOne.push(text(406, 473.9, "WHAT I BRING", 8.6, true, C.amber));
pageOne.push(bullet(406, 461.9, "Creative direction and clearer briefs"));
pageOne.push(bullet(406, 446.4, "Brand identities and campaign", ["systems"]));
pageOne.push(bullet(406, 419.4, "Events, exhibitions and spatial", ["communication"]));
pageOne.push(bullet(406, 392.4, "Packaging, print and production"));
pageOne.push(bullet(406, 376.9, "Pitches and stakeholder", ["presentations"]));
pageOne.push(bullet(406, 349.9, "3D visualisation, UX and digital", ["design"]));
pageOne.push(rule(406, 325.4, 559, 325.4));

pageOne.push(text(406, 307.4, "SELECTED BRANDS", 8.6, true, C.amber));
pageOne.push(text(406, 295.4, "Apple, L'Oreal, Unilever, Dow", 8.9));
pageOne.push(text(406, 283.4, "Chemical, Singtel, StarHub,", 8.9));
pageOne.push(text(406, 271.4, "BlackBerry, MTV Asia, EMI Music and", 8.9));
pageOne.push(text(406, 259.4, "UOB Travel.", 8.9));
pageOne.push(rule(406, 237.4, 559, 237.4));

pageOne.push(text(406, 219.4, "TOOLS", 8.6, true, C.amber));
pageOne.push(text(406, 207.4, "Photoshop, Illustrator, InDesign, After", 8.9));
pageOne.push(text(406, 195.4, "Effects and Figma.", 8.9));
pageOne.push(text(406, 179.4, "Blender, Cinema 4D, Spline and", 8.9));
pageOne.push(text(406, 167.4, "Webflow.", 8.9));
pageOne.push(text(406, 151.4, "ChatGPT, Firefly, Midjourney and", 8.9));
pageOne.push(text(406, 139.4, "Runway.", 8.9));
pageOne.push(text(36, 22, "Gerard Teo / CV / Singapore / Updated August 2026", 7.8, false, C.muted));
pageOne.push(text(544, 22, "1 / 2", 7.8, false, C.muted));

const pageTwo = [];
pageTwo.push(rect(0, 0, W, H, C.paper));
pageTwo.push(rect(0, H - 80, W, 80, C.ink));
pageTwo.push(rect(0, H - 80, 10, 80, C.amber));
pageTwo.push(text(36, 793.9, "Selected experience", 22, true, C.bright));
pageTwo.push(text(359, 795.9, "26+ YEARS / DESIGN / DIRECTION / DELIVERY", 9, true, C.amber));

const roles = [
  [729.9, "SEP 2020 - APR 2024", "Freelance Designer", "Northstar Travel Media, Singapore", ["Turned approved concepts and wireframes into responsive email campaigns, final", "templates and production-ready assets."]],
  [640.6, "SEP 2021 - NOV 2022", "Content Designer - Apple Account", "Hogarth Worldwide, Singapore", ["Adapted and checked Apple retail and digital campaign materials against detailed", "global brand and production standards."]],
  [551.3, "SEP 2013 - NOV 2014", "Senior Designer & 3D Visualisation Lead", "Crepuscule Asia, Singapore", ["Combined design direction with hands-on brand, packaging and 3D visualisation", "work for Unilever and L'Oreal."]],
  [462.0, "MAY 2011 - NOV 2011", "Design Director", "Orbital Group Pte Ltd, Singapore", ["Led pitch and campaign design for BlackBerry, Munich Automobiles and Pacific", "Healthcare."]],
  [372.7, "JAN 2004 - JUL 2009", "Co-Founder / Creative Director", "Blacksheep Communications Pte Ltd, Singapore", ["Co-founded the studio, grew the design team from 3 to 15 people and stayed closely", "involved with the work, clients and production."]],
  [283.4, "JAN 2001 - JAN 2009", "Creative Designer to Creative Director", "CP&GD Design Communications Pte Ltd, Singapore", ["Progressed from hands-on designer to creative lead across print, outdoor and digital", "campaigns."]],
];

for (const [y, date, title, company, description] of roles) {
  pageTwo.push(text(36, y, date, 8.6, true, C.amber));
  pageTwo.push(text(36, y - 12, title, 12, true));
  pageTwo.push(text(36, y - 26.5, company, 8.9, true, C.muted));
  pageTwo.push(text(36, y - 38.7, description[0], 9.2));
  pageTwo.push(text(36, y - 51, description[1], 9.2));
  pageTwo.push(rule(36, y - 73.3, 382, y - 73.3));
}

pageTwo.push(text(406, 729.9, "EDUCATION & DEVELOPMENT", 8.6, true, C.amber));
pageTwo.push(text(406, 717.9, "NTU PaCE, 2026", 9.2, true));
pageTwo.push(text(406, 705.9, "Advanced Professional Certificate in UX", 8.6));
pageTwo.push(text(406, 694.7, "Design & Digital Product Management.", 8.6));
pageTwo.push(text(406, 676.5, "Course work included a HealthHub", 8.4, false, C.muted));
pageTwo.push(text(406, 665.7, "caregiver and medical-translation flow,", 8.4, false, C.muted));
pageTwo.push(text(406, 654.9, "plus an OCBC subscription-management", 8.4, false, C.muted));
pageTwo.push(text(406, 644.1, "sprint.", 8.4, false, C.muted));
pageTwo.push(text(406, 623.3, "(SCTP) Associate Data Analyst", 9, true));
pageTwo.push(text(406, 611.3, "NTUC LearningHub / Attained Jan 2024", 8.4, false, C.muted));
pageTwo.push(text(406, 590.5, "Concept Creation-3", 9, true));
pageTwo.push(text(406, 578.5, "MAGES Institute of Excellence / Attained", 8.4, false, C.muted));
pageTwo.push(text(406, 567.7, "Mar 2022", 8.4, false, C.muted));
pageTwo.push(rule(406, 544.5, 559, 544.5));

pageTwo.push(text(406, 526.5, "WORKING STYLE", 8.6, true, C.amber));
pageTwo.push(bullet(406, 514.5, "Find the point before decorating it"));
pageTwo.push(bullet(406, 499.0, "Build systems that survive real", ["formats"]));
pageTwo.push(bullet(406, 472.0, "Keep decisions clear for clients and", ["teams"]));
pageTwo.push(bullet(406, 445.0, "Stay close through artwork and", ["production"]));
pageTwo.push(rule(406, 410.4, 559, 410.4));

pageTwo.push(text(406, 392.4, "PORTFOLIO LINKS", 8.6, true, C.amber));
pageTwo.push(text(406, 380.4, "Selected work", 9, true, C.amber));
pageTwo.push(text(406, 362.4, "Online CV", 9, true, C.amber));
pageTwo.push(text(406, 344.4, "LinkedIn", 9, true, C.amber));
addLink(2, [406, 378, 467, 392], "https://www.doesdesignwork.com/#work");
addLink(2, [406, 360, 451, 374], "https://www.doesdesignwork.com/cv/");
addLink(2, [406, 342, 450, 356], "https://www.linkedin.com/in/gerard-teo-0b106429/");

pageTwo.push(rect(0, 0, W, 116, C.ink));
pageTwo.push(text(36, 82, "GET IN TOUCH", 9, true, C.amber));
pageTwo.push(text(36, 57, "Need a senior creative who still makes the work?", 17, true, C.bright));
pageTwo.push(text(36, 37, "See the projects, then tell me what needs solving.", 9.6, false, C.bright));
pageTwo.push(text(453, 56, "Email Gerard", 10.2, true, C.amber));
addLink(2, [453, 54, 518, 69], "mailto:g@doesdesignwork.com");
pageTwo.push(text(544, 20, "2 / 2", 7.8, false, C.muted));

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
const regularFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
const boldFontId = addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
const infoId = addObject("<< /Author (Gerard Teo) /Title (Gerard Teo - Creative Lead and Senior Brand Designer CV) /Subject (Art Director, Creative Lead and Senior Brand Designer CV) /Keywords (Gerard Teo, Art Director, Creative Lead, Senior Brand Designer, Singapore) >>");

const streamObject = (content) => {
  const bytes = Buffer.byteLength(content, "ascii");
  return `<< /Length ${bytes} >>\nstream\n${content}\nendstream`;
};
const pageOneContentId = addObject(streamObject(pageOne.join("\n")));
const pageTwoContentId = addObject(streamObject(pageTwo.join("\n")));

const annotationIds = { 1: [], 2: [] };
for (const annotation of annotations) {
  const id = addObject(`<< /Type /Annot /Subtype /Link /Rect [${annotation.rect.join(" ")}] /Border [0 0 0] /A << /S /URI /URI (${esc(annotation.url)}) >> >>`);
  annotationIds[annotation.page].push(id);
}

const pageOneId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${pageOneContentId} 0 R /Annots [${annotationIds[1].map((id) => `${id} 0 R`).join(" ")}] >>`);
const pageTwoId = addObject(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${regularFontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${pageTwoContentId} 0 R /Annots [${annotationIds[2].map((id) => `${id} 0 R`).join(" ")}] >>`);
setObject(pagesId, `<< /Type /Pages /Count 2 /Kids [${pageOneId} 0 R ${pageTwoId} 0 R] >>`);
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
