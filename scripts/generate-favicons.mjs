import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();

// Authentic JUI 32x32 Pixel Art SVG Favicon
const svg32 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" shape-rendering="crispEdges">
  <!-- Outer Espresso Border -->
  <rect x="0" y="0" width="32" height="32" fill="#4B2E2B" />
  
  <!-- Inner Warm Cream Background -->
  <rect x="2" y="2" width="28" height="28" fill="#FFF8F0" />
  
  <!-- Subtle Retro Bevel Highlight (Top/Left) -->
  <rect x="2" y="2" width="28" height="2" fill="#FFFFFF" opacity="0.7" />
  <rect x="2" y="2" width="2" height="28" fill="#FFFFFF" opacity="0.7" />
  
  <!-- Subtle Retro Bevel Shadow (Bottom/Right) -->
  <rect x="2" y="28" width="28" height="2" fill="#E8D5C2" />
  <rect x="28" y="2" width="2" height="28" fill="#E8D5C2" />

  <!-- Pixel "J" Top Crossbar (Espresso) -->
  <rect x="8" y="6" width="16" height="4" fill="#4B2E2B" />
  <!-- Pixel Top Glint (Gold/Cream) -->
  <rect x="20" y="6" width="4" height="2" fill="#FFFCF9" />

  <!-- Vertical Stem - Cinnamon Shadow + Caramel Body -->
  <rect x="16" y="10" width="2" height="10" fill="#8C5A3C" />
  <rect x="18" y="10" width="4" height="10" fill="#C08552" />
  <rect x="22" y="10" width="2" height="10" fill="#4B2E2B" />

  <!-- Bottom Hook (Leftwards curve) -->
  <rect x="8" y="16" width="4" height="4" fill="#4B2E2B" />
  <rect x="8" y="14" width="4" height="2" fill="#C08552" />
  <rect x="12" y="18" width="6" height="4" fill="#C08552" />
  <rect x="12" y="16" width="6" height="2" fill="#8C5A3C" />
  
  <!-- Bottom Baseline Outline -->
  <rect x="8" y="20" width="16" height="4" fill="#4B2E2B" />

  <!-- Golden 8-Bit Sparkle in corner -->
  <rect x="24" y="3" width="2" height="2" fill="#D48B38" />
  <rect x="23" y="4" width="4" height="1" fill="#D48B38" />
  <rect x="25" y="4" width="1" height="1" fill="#FFF8F0" />
</svg>`;

// Scalable Vector for app/icon.svg and public/favicon.svg
const scalableSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%" shape-rendering="crispEdges">
  <!-- Outer Espresso Border -->
  <rect x="0" y="0" width="32" height="32" fill="#4B2E2B" />
  
  <!-- Inner Warm Cream Background -->
  <rect x="2" y="2" width="28" height="28" fill="#FFF8F0" />
  
  <!-- Retro Bevel Highlight (Top/Left) -->
  <rect x="2" y="2" width="28" height="2" fill="#FFFFFF" opacity="0.8" />
  <rect x="2" y="2" width="2" height="28" fill="#FFFFFF" opacity="0.8" />
  
  <!-- Retro Bevel Shadow (Bottom/Right) -->
  <rect x="2" y="28" width="28" height="2" fill="#E8D5C2" />
  <rect x="28" y="2" width="2" height="28" fill="#E8D5C2" />

  <!-- Pixel "J" Top Crossbar (Espresso) -->
  <rect x="8" y="6" width="16" height="4" fill="#4B2E2B" />
  <!-- Pixel Top Glint (Cream) -->
  <rect x="20" y="6" width="4" height="2" fill="#FFFCF9" />

  <!-- Vertical Stem - Cinnamon Shadow + Caramel Body -->
  <rect x="16" y="10" width="2" height="10" fill="#8C5A3C" />
  <rect x="18" y="10" width="4" height="10" fill="#C08552" />
  <rect x="22" y="10" width="2" height="10" fill="#4B2E2B" />

  <!-- Bottom Hook -->
  <rect x="8" y="16" width="4" height="4" fill="#4B2E2B" />
  <rect x="8" y="14" width="4" height="2" fill="#C08552" />
  <rect x="12" y="18" width="6" height="4" fill="#C08552" />
  <rect x="12" y="16" width="6" height="2" fill="#8C5A3C" />
  
  <!-- Bottom Baseline Outline -->
  <rect x="8" y="20" width="16" height="4" fill="#4B2E2B" />

  <!-- Golden 8-Bit Sparkle in corner -->
  <rect x="24" y="3" width="2" height="2" fill="#D48B38" />
  <rect x="23" y="4" width="4" height="1" fill="#D48B38" />
  <rect x="25" y="4" width="1" height="1" fill="#FFF8F0" />
</svg>`;

async function generate() {
  console.log("Generating JUI Pixel Icons...");

  // 1. Write SVG icons
  fs.writeFileSync(path.join(rootDir, "app", "icon.svg"), scalableSvg, "utf8");
  fs.writeFileSync(path.join(rootDir, "public", "icon.svg"), scalableSvg, "utf8");
  fs.writeFileSync(path.join(rootDir, "public", "favicon.svg"), scalableSvg, "utf8");

  // 2. Generate PNG sizes
  const svgBuffer = Buffer.from(svg32);

  // 32x32 PNG
  const png32 = await sharp(svgBuffer, { density: 300 })
    .resize(32, 32, { kernel: "nearest" })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "public", "favicon-32x32.png"), png32);

  // 16x16 PNG
  const png16 = await sharp(svgBuffer, { density: 300 })
    .resize(16, 16, { kernel: "nearest" })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "public", "favicon-16x16.png"), png16);

  // 180x180 Apple Touch Icon
  const png180 = await sharp(svgBuffer, { density: 300 })
    .resize(180, 180, { kernel: "nearest" })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "app", "apple-icon.png"), png180);
  fs.writeFileSync(path.join(rootDir, "public", "apple-touch-icon.png"), png180);

  // 192x192 Web App Icon
  const png192 = await sharp(svgBuffer, { density: 300 })
    .resize(192, 192, { kernel: "nearest" })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "public", "icon-192.png"), png192);

  // 512x512 Web App Icon
  const png512 = await sharp(svgBuffer, { density: 300 })
    .resize(512, 512, { kernel: "nearest" })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "public", "icon-512.png"), png512);

  // 3. Generate genuine multi-layer ICO file (containing 16x16 and 32x32 PNG frames)
  // An ICO header has:
  // - 2 bytes: 0 (reserved)
  // - 2 bytes: 1 (icon type)
  // - 2 bytes: count of images (2)
  // Directory entries (16 bytes each):
  //   width (1B), height (1B), colorCount (1B), reserved (1B), planes (2B), bitCount (2B), bytesInRes (4B), imageOffset (4B)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(2, 4);

  const dir16 = Buffer.alloc(16);
  dir16.writeUInt8(16, 0); // width
  dir16.writeUInt8(16, 1); // height
  dir16.writeUInt8(0, 2); // colors
  dir16.writeUInt8(0, 3); // reserved
  dir16.writeUInt16LE(1, 4); // color planes
  dir16.writeUInt16LE(32, 6); // bpp
  dir16.writeUInt32LE(png16.length, 8); // size
  dir16.writeUInt32LE(6 + 16 * 2, 12); // offset

  const offset32 = 6 + 16 * 2 + png16.length;
  const dir32 = Buffer.alloc(16);
  dir32.writeUInt8(32, 0);
  dir32.writeUInt8(32, 1);
  dir32.writeUInt8(0, 2);
  dir32.writeUInt8(0, 3);
  dir32.writeUInt16LE(1, 4);
  dir32.writeUInt16LE(32, 6);
  dir32.writeUInt32LE(png32.length, 8);
  dir32.writeUInt32LE(offset32, 12);

  const icoBuffer = Buffer.concat([header, dir16, dir32, png16, png32]);
  fs.writeFileSync(path.join(rootDir, "app", "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(rootDir, "public", "favicon.ico"), icoBuffer);

  console.log("Successfully generated all JUI favicon and icon assets!");
}

generate().catch(console.error);
