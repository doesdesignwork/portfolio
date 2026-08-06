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

const requiredColours = [
  ["#5A4FCF violet", "0.352941 0.309804 0.811765 rg"],
  ["#C4CF4F lime", "0.768627 0.811765 0.309804 rg"],
];

for (const [name, command] of requiredColours) {
  if (!content.includes(command)) {
    problems.push(`${name} colour command is missing`);
  }
}

const retiredColourCommands = [
  "1 0.74902 0 rg",
  "1 0.74902 0 RG",
  "0 0.341176 1 rg",
  "0.301961 0.847059 1 rg",
  "0 0.341176 1 RG",
  "0.301961 0.847059 1 RG",
];

for (const command of retiredColourCommands) {
  if (content.includes(command)) {
    problems.push(`retired colour remains: ${command}`);
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

const xrefOffset = Number(content.match(/startxref\n(\d+)/)?.[1]);
if (!Number.isInteger(xrefOffset) || content.slice(xrefOffset, xrefOffset + 5) !== "xref\n") {
  problems.push("cross-reference offset is invalid");
}

if (problems.length) {
  console.error("CV PDF audit failed:");
  problems.forEach((problem) => console.error(`- ${problem}`));
  process.exit(1);
}

console.log(
  `CV PDF audit passed: 2 pages, ${linkCount} links, ${bytes.length} bytes, #5A4FCF + #C4CF4F palette.`,
);
