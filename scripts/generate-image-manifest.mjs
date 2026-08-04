import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assetsDirectory = path.join(root, "public", "assets");
const outputFile = path.join(root, "app", "data", "image-manifest.generated.ts");
const projectsFile = path.join(root, "app", "data", "projects.ts");
const auditMode = process.argv.includes("--audit");

const readUInt24LE = (buffer, offset) =>
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);

const readPng = (buffer) => {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
};

const readGif = (buffer) => {
  if (buffer.length < 10 || !buffer.toString("ascii", 0, 3).startsWith("GIF")) return null;
  return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
};

const readJpeg = (buffer) => {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;
    const size = buffer.readUInt16BE(offset);
    const isStartOfFrame = [
      0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
      0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf,
    ].includes(marker);
    if (isStartOfFrame && offset + 7 < buffer.length) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }
    if (size < 2) break;
    offset += size;
  }
  return null;
};

const readWebp = (buffer) => {
  if (
    buffer.length < 30 ||
    buffer.toString("ascii", 0, 4) !== "RIFF" ||
    buffer.toString("ascii", 8, 12) !== "WEBP"
  ) {
    return null;
  }

  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkSize = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (chunkType === "VP8X" && dataOffset + 10 <= buffer.length) {
      return {
        width: readUInt24LE(buffer, dataOffset + 4) + 1,
        height: readUInt24LE(buffer, dataOffset + 7) + 1,
      };
    }

    if (chunkType === "VP8L" && dataOffset + 5 <= buffer.length && buffer[dataOffset] === 0x2f) {
      const b1 = buffer[dataOffset + 1];
      const b2 = buffer[dataOffset + 2];
      const b3 = buffer[dataOffset + 3];
      const b4 = buffer[dataOffset + 4];
      return {
        width: 1 + b1 + ((b2 & 0x3f) << 8),
        height: 1 + ((b2 & 0xc0) >> 6) + (b3 << 2) + ((b4 & 0x0f) << 10),
      };
    }

    if (chunkType === "VP8 " && dataOffset + 10 <= buffer.length) {
      for (let index = dataOffset; index < Math.min(dataOffset + 16, buffer.length - 7); index += 1) {
        if (buffer[index] === 0x9d && buffer[index + 1] === 0x01 && buffer[index + 2] === 0x2a) {
          return {
            width: buffer.readUInt16LE(index + 3) & 0x3fff,
            height: buffer.readUInt16LE(index + 5) & 0x3fff,
          };
        }
      }
    }

    offset = dataOffset + chunkSize + (chunkSize % 2);
  }

  return null;
};

const readSvg = (buffer) => {
  const source = buffer.toString("utf8");
  if (!source.includes("<svg")) return null;
  const widthMatch = source.match(/\bwidth=["']([0-9.]+)(?:px)?["']/i);
  const heightMatch = source.match(/\bheight=["']([0-9.]+)(?:px)?["']/i);
  if (widthMatch && heightMatch) {
    return { width: Math.round(Number(widthMatch[1])), height: Math.round(Number(heightMatch[1])) };
  }
  const viewBoxMatch = source.match(/\bviewBox=["'][^"']*?([0-9.]+)\s+([0-9.]+)["']/i);
  return viewBoxMatch
    ? { width: Math.round(Number(viewBoxMatch[1])), height: Math.round(Number(viewBoxMatch[2])) }
    : null;
};

const readDimensions = (buffer, extension) => {
  switch (extension.toLowerCase()) {
    case ".png":
      return readPng(buffer);
    case ".gif":
      return readGif(buffer);
    case ".jpg":
    case ".jpeg":
      return readJpeg(buffer);
    case ".webp":
      return readWebp(buffer);
    case ".svg":
      return readSvg(buffer);
    default:
      return null;
  }
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(absolutePath)));
    else files.push(absolutePath);
  }
  return files;
};

const files = await walk(assetsDirectory);
const manifest = {};
const unreadable = [];

for (const absolutePath of files) {
  const extension = path.extname(absolutePath);
  if (![".png", ".gif", ".jpg", ".jpeg", ".webp", ".svg"].includes(extension.toLowerCase())) continue;
  const buffer = await readFile(absolutePath);
  const dimensions = readDimensions(buffer, extension);
  const relativePath = path.relative(path.join(root, "public"), absolutePath).split(path.sep).join("/");
  const publicPath = `/${relativePath}`;
  if (!dimensions || dimensions.width <= 0 || dimensions.height <= 0) {
    unreadable.push(publicPath);
    continue;
  }
  manifest[publicPath] = dimensions;
}

const sortedManifest = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
const generated = `/* This file is generated by scripts/generate-image-manifest.mjs. */\n\nexport type ImageDimensions = { width: number; height: number };\n\nexport const imageDimensions: Record<string, ImageDimensions> = ${JSON.stringify(sortedManifest, null, 2)};\n`;
await writeFile(outputFile, generated, "utf8");

const projectSource = await readFile(projectsFile, "utf8");
const referencedAssets = [...new Set(projectSource.match(/\/assets\/[A-Za-z0-9._/-]+/g) ?? [])].sort();
const missing = referencedAssets.filter((asset) => !manifest[asset]);
const contentAssets = referencedAssets.filter(
  (asset) => !/(?:logo|icon|favicon|g-image|apple-touch)/i.test(asset),
);
const lowerResolution = contentAssets
  .map((asset) => ({ asset, ...manifest[asset] }))
  .filter((entry) => entry.width < 1200 || entry.height < 700)
  .sort((a, b) => a.width * a.height - b.width * b.height);

console.log(`Image manifest generated: ${Object.keys(manifest).length} assets.`);
console.log(`Portfolio image references checked: ${referencedAssets.length}.`);
if (lowerResolution.length) {
  console.log(`Source-resolution warnings: ${lowerResolution.length}. These files will be capped at their intrinsic width in the UI:`);
  lowerResolution.forEach(({ asset, width, height }) => console.log(`  WARN ${asset} ${width}x${height}`));
}
if (unreadable.length) unreadable.forEach((asset) => console.error(`UNREADABLE ${asset}`));
if (missing.length) missing.forEach((asset) => console.error(`MISSING ${asset}`));

if (auditMode && (unreadable.length || missing.length)) {
  process.exitCode = 1;
}
