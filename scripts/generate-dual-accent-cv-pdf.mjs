import { readFile, writeFile } from "node:fs/promises";

const OUT =
  process.argv[2] ??
  "public/gerard-teo-creative-lead-senior-designer-cv.pdf";

const AMBER_FILL = "1 0.74902 0 rg";
const AMBER_STROKE = "1 0.74902 0 RG";
const VIOLET_FILL = "0.352941 0.309804 0.811765 rg";
const VIOLET_STROKE = "0.352941 0.309804 0.811765 RG";
const LIME_FILL = "0.768627 0.811765 0.309804 rg";
const LIME_STROKE = "0.768627 0.811765 0.309804 RG";

await import("./generate-cv-pdf.mjs");

let pdf = await readFile(OUT, "latin1");

const recolourStream = (stream, pageNumber) => {
  const lines = stream.split("\n");

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line !== AMBER_FILL && line !== AMBER_STROKE) continue;

    const next = lines[index + 1] ?? "";
    const textMatch = next.match(
      /BT \/(?:F1|F2) [\d.]+ Tf 1 0 0 1 [\d.]+ ([\d.]+) Tm/,
    );
    const rectMatch = next.match(
      /^[-\d.]+ ([-\d.]+) [-\d.]+ [-\d.]+ re f$/,
    );

    const y = Number(textMatch?.[1] ?? rectMatch?.[1] ?? Number.NaN);
    const isGunmetal =
      pageNumber === 1
        ? Number.isFinite(y) && y >= 657
        : Number.isFinite(y) && (y >= 761 || y <= 116);

    const stroke = line.endsWith("RG");
    lines[index] = isGunmetal
      ? stroke
        ? LIME_STROKE
        : LIME_FILL
      : stroke
        ? VIOLET_STROKE
        : VIOLET_FILL;
  }

  return lines.join("\n");
};

const replaceStreamObject = (source, objectNumber, pageNumber) => {
  const pattern = new RegExp(
    `(${objectNumber} 0 obj\\n<< \\/Length )(\\d+)( >>\\nstream\\n)([\\s\\S]*?)(\\nendstream\\nendobj)`,
  );

  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Could not find PDF stream object ${objectNumber}.`);
  }

  const stream = recolourStream(match[4], pageNumber);
  const length = Buffer.byteLength(stream, "latin1");

  return source.replace(
    pattern,
    `${match[1]}${length}${match[3]}${stream}${match[5]}`,
  );
};

pdf = replaceStreamObject(pdf, 6, 1);
pdf = replaceStreamObject(pdf, 7, 2);

if (pdf.includes(AMBER_FILL) || pdf.includes(AMBER_STROKE)) {
  throw new Error("Retired #FFBF00 colour commands remain in the generated CV.");
}

const xrefIndex = pdf.indexOf("xref\n");
if (xrefIndex < 0) {
  throw new Error("Could not locate the PDF cross-reference table.");
}

const body = pdf.slice(0, xrefIndex);
const offsets = new Map();
for (const match of body.matchAll(/^(\d+) 0 obj$/gm)) {
  offsets.set(Number(match[1]), match.index);
}

const size = Math.max(...offsets.keys()) + 1;
const xref = ["xref", `0 ${size}`, "0000000000 65535 f "];

for (let objectNumber = 1; objectNumber < size; objectNumber += 1) {
  const offset = offsets.get(objectNumber);
  if (!Number.isInteger(offset)) {
    throw new Error(`Missing PDF object ${objectNumber} while rebuilding xref.`);
  }
  xref.push(`${String(offset).padStart(10, "0")} 00000 n `);
}

const trailer = [
  "trailer",
  `<< /Size ${size} /Root 1 0 R /Info 5 0 R >>`,
  "startxref",
  String(Buffer.byteLength(body, "latin1")),
  "%%EOF",
  "",
].join("\n");

pdf = `${body}${xref.join("\n")}\n${trailer}`;
await writeFile(OUT, pdf, "latin1");

console.log(
  `Generated dual-accent CV PDF: ${OUT} (#5A4FCF on paper, #C4CF4F on gunmetal).`,
);
