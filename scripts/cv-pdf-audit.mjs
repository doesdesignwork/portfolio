import { readFile } from "node:fs/promises";

const path = "public/gerard-teo-creative-lead-senior-designer-cv.pdf";
const bytes = await readFile(path);
const content = bytes.toString("latin1");
const problems = [];

if (!content.startsWith("%PDF-1.4")) {
  problems.push("missing PDF 1.4 header");
}

if (!content.trimEnd().endsWith("%%EOF")) {
  problems.push("missing PDF end marker");
}

if (bytes.length < 12_000) {
  problems.push(`unexpectedly small PDF: ${bytes.length} bytes`);
}

if (!content.includes("/Count 2")) {
  problems.push("PDF is not declared as two pages");
}

const linkCount = (content.match(/\/Subtype \/Link/g) ?? []).length;
if (linkCount < 9) {
  problems.push(`expected at least 9 clickable links, found ${linkCount}`);
}

const amberFill = "1 0.74902 0 rg";
if (!content.includes(amberFill)) {
  problems.push("#FFBF00 amber colour command is missing");
}

const retiredColourCommands = [
  "0 0.341176 1 rg",
  "0.301961 0.847059 1 rg",
  "0 0.341176 1 RG",
  "0.301961 0.847059 1 RG",
];
for (const command of retiredColourCommands) {
  if (content.includes(command)) {
    problems.push(`retired electric-blue colour remains: ${command}`);
  }
}

const requiredText = [
  "Gerard Teo",
  "Selected experience",
  "GET IN TOUCH",
  "Email Gerard",
];
for (const phrase of requiredText) {
  if (!content.includes(`(${phrase})`)) {
    problems.push(`required CV text is missing: ${phrase}`);
  }
}

if (problems.length) {
  console.error("CV PDF audit failed:");
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(`CV PDF audit passed: 2 pages, ${linkCount} links, ${bytes.length} bytes, #FFBF00 palette.`);
