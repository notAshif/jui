/**
 * Avatars In Pixels Character Generator
 * Inspired by https://www.avatarsinpixels.com/
 *
 * Generates modular 2D pixel-art chibi character avatars using pure vector SVG.
 * 100% synchronous: Runs identically in Node.js (SSR) and the Browser with ZERO
 * client delay, ZERO hydration mismatch, and ZERO background flash on page reload.
 */

import React from "react";

export interface AvatarGenerationOptions {
  bitDepth?: 8 | 16;
  size?: number;
  seed?: string;
  skinTone?: string;
  hairStyle?: string;
  hairColor?: string;
  eyeColor?: string;
  outfit?: string;
  accessory?: string;
  backgroundColor?: string;
  showBackground?: boolean;
}

// Earthy Color Palettes
const PALETTE = {
  cream: "#FFF8F0",
  creamLight: "#FFFCF9",
  creamDark: "#F5E8D8",
  caramel: "#C08552",
  caramelHover: "#AF7644",
  cinnamon: "#8C5A3C",
  espresso: "#4B2E2B",
  espressoDeep: "#321C1A",
  destructive: "#B84A39",
  success: "#4F6D48",
  warning: "#D48B38",
};

// Skin Tones: Base, Shadow, Highlight
const SKIN_TONES = [
  { name: "fair", base: "#FFE5D0", shadow: "#EDB898", highlight: "#FFF3E8" },
  { name: "peach", base: "#FCD7B8", shadow: "#E5AB85", highlight: "#FFECE0" },
  { name: "honey", base: "#F2BF88", shadow: "#D69756", highlight: "#FCE1BF" },
  { name: "caramel", base: "#C98850", shadow: "#A86532", highlight: "#DCA776" },
  { name: "cinnamon", base: "#995C38", shadow: "#783F20", highlight: "#B57B54" },
  { name: "mocha", base: "#613828", shadow: "#472518", highlight: "#7D4E3A" },
  { name: "lilac-elf", base: "#E0D7ED", shadow: "#B7A8CE", highlight: "#F3EEFA" },
];

// Eye Colors (with catchlight specular reflection)
const EYE_COLORS = [
  { name: "emerald", iris: "#3A8E58", shadow: "#24613A" },
  { name: "sapphire", iris: "#3876B0", shadow: "#214C75" },
  { name: "amber", iris: "#D48B38", shadow: "#96591A" },
  { name: "amethyst", iris: "#874FB5", shadow: "#5C3180" },
  { name: "ruby", iris: "#B83939", shadow: "#7A1F1F" },
  { name: "espresso", iris: "#3D2421", shadow: "#251412" },
  { name: "cyan", iris: "#30A09B", shadow: "#1B6360" },
];

// Hair Color Palettes: Base, Highlight, Shade
const HAIR_COLORS = [
  { name: "espresso", base: "#321C1A", highlight: "#5A3834", shadow: "#1E100E" },
  { name: "cinnamon", base: "#7A4226", highlight: "#A86444", shadow: "#522712" },
  { name: "caramel-blonde", base: "#CCA043", highlight: "#E8C26E", shadow: "#8F6A1E" },
  { name: "crimson", base: "#9E3333", highlight: "#CC5656", shadow: "#661C1C" },
  { name: "silver-mist", base: "#B0BCC7", highlight: "#DEE7EF", shadow: "#7B8A96" },
  { name: "mystic-purple", base: "#714E96", highlight: "#9D74C9", shadow: "#482D66" },
  { name: "forest-sage", base: "#457351", highlight: "#6CA67B", shadow: "#274730" },
  { name: "golden-sun", base: "#D98829", highlight: "#F2B463", shadow: "#9C5911" },
];

// Outfits: Main, Accent, Collar/Trim
const OUTFITS = [
  { name: "adventurer-tunic", main: "#C08552", accent: "#8C5A3C", collar: "#FFF8F0" },
  { name: "knight-armor", main: "#8A9AA6", accent: "#5F6F7C", collar: "#D9E3EA" },
  { name: "mage-robe", main: "#4B3B66", accent: "#D48B38", collar: "#9B83BF" },
  { name: "rogue-vest", main: "#4F6D48", accent: "#324A2D", collar: "#321C1A" },
  { name: "campfire-hoodie", main: "#B84A39", accent: "#80271A", collar: "#FFF8F0" },
  { name: "royal-doublet", main: "#2C3E55", accent: "#E5B842", collar: "#F4D984" },
];

// Background Vignette Themes
const BACKGROUND_THEMES = [
  "#F5E8D8", // Cream Dark
  "#FFF8F0", // Cream
  "#EBD2BA", // Warm Biscuit
  "#D9E3D8", // Sage Mist
  "#D8E2EB", // Sky Mist
  "#E8D8EB", // Dusk Violet
  "#3A231E", // Dungeon Deep (Campfire Dark)
];

/**
 * Fast deterministic string hash (djb2)
 */
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Seeded pseudo-random number generator (xorshift32)
 * Guarantees identical output across Node.js SSR and Browser hydration.
 */
class SeededRandom {
  private state: number;

  constructor(seed: string | number) {
    const raw = typeof seed === "number" ? seed : hashString(seed || "jui-hero");
    this.state = raw === 0 ? 123456789 : raw;
  }

  next(): number {
    let x = this.state;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    this.state = x >>> 0;
    return (this.state >>> 0) / 4294967296;
  }

  pick<T>(arr: T[]): T {
    return arr[Math.floor(this.next() * arr.length)];
  }

  range(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  bool(chance = 0.5): boolean {
    return this.next() < chance;
  }
}

export interface PixelPoint {
  x: number;
  y: number;
  color: string;
}

/**
 * Generates the complete pixel matrix for an AvatarsInPixels chibi character.
 * Uses a 20x20 crisp pixel grid.
 */
export function buildPixelAvatarGrid(seedString: string, options?: AvatarGenerationOptions): {
  pixels: PixelPoint[];
  backgroundColor: string;
} {
  const rng = new SeededRandom(options?.seed || seedString || "jui-adventurer");

  // Pick or resolve traits
  const skin = options?.skinTone
    ? SKIN_TONES.find((s) => s.name === options.skinTone) || SKIN_TONES[0]
    : rng.pick(SKIN_TONES);

  const hair = options?.hairColor
    ? HAIR_COLORS.find((h) => h.name === options.hairColor) || HAIR_COLORS[0]
    : rng.pick(HAIR_COLORS);

  const eyes = options?.eyeColor
    ? EYE_COLORS.find((e) => e.name === options.eyeColor) || EYE_COLORS[0]
    : rng.pick(EYE_COLORS);

  const outfit = options?.outfit
    ? OUTFITS.find((o) => o.name === options.outfit) || OUTFITS[0]
    : rng.pick(OUTFITS);

  const hairStyle = options?.hairStyle
    ? parseInt(options.hairStyle, 10) || 0
    : rng.range(0, 7);

  const expression = rng.range(0, 3); // 0 = smile, 1 = cute smirk, 2 = cat mouth :3, 3 = determined
  const accessory = options?.accessory || (rng.bool(0.4) ? rng.pick(["glasses", "eyepatch", "earring", "bandage"]) : "none");

  const outline = PALETTE.espressoDeep; // "#321C1A"
  const blush = "#E89A88"; // Cute chibi rosy cheeks
  const white = "#FFFFFF";

  const grid: Record<string, string> = {};

  const setPixel = (x: number, y: number, color: string) => {
    if (x >= 0 && x < 20 && y >= 0 && y < 20) {
      grid[`${x},${y}`] = color;
    }
  };

  const fillHLine = (x1: number, x2: number, y: number, color: string) => {
    for (let x = x1; x <= x2; x++) setPixel(x, y, color);
  };

  // --- 1. BACK HAIR (Behind Head) ---
  if (hairStyle === 1 || hairStyle === 2 || hairStyle === 5) {
    // Twin tails, Long flowing, or Big curls
    for (let y = 7; y <= 15; y++) {
      fillHLine(3, 4, y, hair.shadow);
      fillHLine(15, 16, y, hair.shadow);
    }
    if (hairStyle === 1) {
      // Hair ties for pigtails
      setPixel(3, 8, outfit.accent);
      setPixel(16, 8, outfit.accent);
    }
  }

  // --- 2. OUTFIT / BUST (Rows 14 to 19) ---
  // Outer outline of shoulders
  fillHLine(4, 15, 19, outline);
  setPixel(3, 18, outline);
  setPixel(16, 18, outline);
  setPixel(2, 17, outline);
  setPixel(17, 17, outline);
  setPixel(3, 16, outline);
  setPixel(16, 16, outline);
  setPixel(4, 15, outline);
  setPixel(15, 15, outline);

  // Clothing fill
  for (let y = 16; y <= 18; y++) {
    const xStart = y === 16 ? 5 : y === 17 ? 3 : 4;
    const xEnd = y === 16 ? 14 : y === 17 ? 16 : 15;
    fillHLine(xStart, xEnd, y, outfit.main);
  }

  // Clothing shading & trims
  fillHLine(3, 5, 18, outfit.accent);
  fillHLine(14, 16, 18, outfit.accent);
  fillHLine(4, 6, 17, outfit.accent);
  fillHLine(13, 15, 17, outfit.accent);

  // Center collar / trim
  setPixel(9, 16, outfit.collar);
  setPixel(10, 16, outfit.collar);
  setPixel(9, 17, outfit.accent);
  setPixel(10, 17, outfit.accent);
  setPixel(9, 18, outfit.collar);
  setPixel(10, 18, outfit.collar);

  // --- 3. NECK & CHIN SHADOW (Rows 13 to 15) ---
  fillHLine(8, 11, 14, skin.shadow);
  fillHLine(8, 11, 13, skin.shadow);

  // --- 4. HEAD / FACE BASE (Rows 5 to 13) ---
  // Jaw & Chin outline
  fillHLine(7, 12, 13, outline);
  setPixel(6, 12, outline);
  setPixel(13, 12, outline);
  setPixel(5, 11, outline);
  setPixel(14, 11, outline);

  // Head fill
  for (let y = 5; y <= 12; y++) {
    const startX = y >= 11 ? (y === 11 ? 6 : 7) : 5;
    const endX = y >= 11 ? (y === 11 ? 13 : 12) : 14;
    fillHLine(startX, endX, y, skin.base);
  }

  // Ears
  setPixel(4, 9, outline);
  setPixel(4, 10, outline);
  setPixel(15, 9, outline);
  setPixel(15, 10, outline);
  setPixel(5, 9, skin.shadow);
  setPixel(14, 9, skin.shadow);

  // Skin highlights & shading under hair
  fillHLine(6, 13, 5, skin.shadow);
  fillHLine(7, 12, 6, skin.highlight);

  // --- 5. CUTE CHIBI CHEEKS (BLUSH) ---
  setPixel(6, 11, blush);
  setPixel(7, 11, blush);
  setPixel(12, 11, blush);
  setPixel(13, 11, blush);

  // --- 6. EXPRESSIVE CHIBI EYES WITH WHITE SPARKLE CATCHLIGHT ---
  // Left eye
  setPixel(6, 8, outline);
  setPixel(7, 8, outline);
  setPixel(8, 8, outline);
  setPixel(6, 9, white); // White catchlight reflection pixel!
  setPixel(7, 9, eyes.iris);
  setPixel(8, 9, outline);
  setPixel(6, 10, eyes.iris);
  setPixel(7, 10, eyes.shadow);
  setPixel(8, 10, outline);

  // Right eye
  setPixel(11, 8, outline);
  setPixel(12, 8, outline);
  setPixel(13, 8, outline);
  setPixel(11, 9, outline);
  setPixel(12, 9, white); // White catchlight reflection pixel!
  setPixel(13, 9, eyes.iris);
  setPixel(11, 10, outline);
  setPixel(12, 10, eyes.shadow);
  setPixel(13, 10, eyes.iris);

  // Eyebrows
  setPixel(6, 7, hair.shadow);
  setPixel(7, 7, hair.shadow);
  setPixel(12, 7, hair.shadow);
  setPixel(13, 7, hair.shadow);

  // --- 7. CHIBI MOUTH ---
  if (expression === 0) {
    // Cute smile
    setPixel(9, 12, outline);
    setPixel(10, 12, outline);
    setPixel(8, 11, outline);
    setPixel(11, 11, outline);
  } else if (expression === 1) {
    // Playful smirk
    setPixel(9, 12, outline);
    setPixel(10, 12, outline);
    setPixel(11, 11, outline);
  } else if (expression === 2) {
    // Cat mouth :3
    setPixel(8, 12, outline);
    setPixel(9, 11, outline);
    setPixel(10, 12, outline);
    setPixel(11, 11, outline);
  } else {
    // Calm / determined
    setPixel(9, 12, outline);
    setPixel(10, 12, outline);
  }

  // --- 8. HAIRSTYLES (Avatars In Pixels Chibi Modular Hair) ---
  switch (hairStyle) {
    case 0: // Anime Hero Spikes
      fillHLine(6, 13, 1, hair.base);
      fillHLine(4, 15, 2, hair.base);
      fillHLine(3, 16, 3, hair.base);
      fillHLine(3, 16, 4, hair.base);
      // Spikes
      setPixel(5, 0, outline);
      setPixel(9, 0, outline);
      setPixel(13, 0, outline);
      setPixel(5, 1, hair.highlight);
      setPixel(9, 1, hair.highlight);
      setPixel(13, 1, hair.highlight);
      // Bangs
      setPixel(6, 5, hair.base);
      setPixel(7, 6, hair.base);
      setPixel(9, 5, hair.shadow);
      setPixel(10, 6, hair.base);
      setPixel(12, 5, hair.base);
      setPixel(13, 6, hair.base);
      // Highlights
      fillHLine(5, 8, 2, hair.highlight);
      fillHLine(11, 14, 2, hair.highlight);
      break;

    case 1: // Cute Twin Tails / Pigtails
      fillHLine(5, 14, 2, hair.base);
      fillHLine(4, 15, 3, hair.base);
      fillHLine(4, 15, 4, hair.base);
      fillHLine(5, 14, 5, hair.base);
      // Straight bangs
      fillHLine(6, 13, 6, hair.base);
      setPixel(7, 7, hair.shadow);
      setPixel(12, 7, hair.shadow);
      // Pigtails
      fillHLine(2, 3, 4, hair.base);
      fillHLine(16, 17, 4, hair.base);
      fillHLine(1, 2, 5, hair.highlight);
      fillHLine(17, 18, 5, hair.highlight);
      fillHLine(1, 2, 6, hair.base);
      fillHLine(17, 18, 6, hair.base);
      break;

    case 2: // Chibi Bob Cut with Bangs
      fillHLine(5, 14, 2, hair.base);
      fillHLine(4, 15, 3, hair.base);
      fillHLine(4, 15, 4, hair.base);
      fillHLine(4, 15, 5, hair.base);
      // Bangs & Side locks
      fillHLine(5, 14, 6, hair.base);
      setPixel(4, 7, hair.base);
      setPixel(4, 8, hair.base);
      setPixel(4, 9, hair.base);
      setPixel(15, 7, hair.base);
      setPixel(15, 8, hair.base);
      setPixel(15, 9, hair.base);
      fillHLine(6, 13, 3, hair.highlight);
      break;

    case 3: // Pointy Wizard / Sorcerer Hat
      // Hat cone
      setPixel(9, 0, outline);
      setPixel(10, 0, outline);
      fillHLine(9, 10, 1, PALETTE.espresso);
      fillHLine(8, 11, 2, PALETTE.espresso);
      fillHLine(7, 12, 3, PALETTE.espresso);
      // Gold Buckle
      fillHLine(6, 13, 4, PALETTE.caramel);
      setPixel(9, 4, PALETTE.warning);
      setPixel(10, 4, PALETTE.warning);
      // Wide Brim
      fillHLine(2, 17, 5, PALETTE.espressoDeep);
      // Hair peeking from underneath
      setPixel(5, 6, hair.base);
      setPixel(6, 7, hair.base);
      setPixel(13, 7, hair.base);
      setPixel(14, 6, hair.base);
      break;

    case 4: // Side-Part Dapper
      fillHLine(5, 14, 2, hair.base);
      fillHLine(4, 15, 3, hair.base);
      fillHLine(4, 15, 4, hair.base);
      // Sweeping part
      fillHLine(5, 10, 5, hair.highlight);
      fillHLine(11, 14, 5, hair.base);
      fillHLine(5, 9, 6, hair.base);
      setPixel(4, 7, hair.base);
      setPixel(15, 7, hair.shadow);
      break;

    case 5: // Long Wavy Locks
      fillHLine(5, 14, 2, hair.base);
      fillHLine(4, 15, 3, hair.base);
      fillHLine(4, 15, 4, hair.base);
      fillHLine(5, 14, 5, hair.base);
      fillHLine(6, 13, 6, hair.base);
      // Waves running down
      fillHLine(3, 4, 8, hair.highlight);
      fillHLine(15, 16, 8, hair.highlight);
      fillHLine(3, 4, 11, hair.base);
      fillHLine(15, 16, 11, hair.base);
      fillHLine(4, 5, 13, hair.shadow);
      fillHLine(14, 15, 13, hair.shadow);
      break;

    case 6: // Rogue Cowl / Ninja Headband
      fillHLine(5, 14, 2, hair.base);
      fillHLine(4, 15, 3, hair.base);
      // Colored headband
      fillHLine(4, 15, 4, PALETTE.destructive);
      setPixel(9, 4, PALETTE.warning);
      setPixel(10, 4, PALETTE.warning);
      // Hair below
      setPixel(5, 5, hair.shadow);
      setPixel(6, 6, hair.base);
      setPixel(13, 6, hair.base);
      setPixel(14, 5, hair.shadow);
      break;

    case 7: // Fluffy Afro / Curls
    default:
      fillHLine(5, 14, 1, hair.base);
      fillHLine(3, 16, 2, hair.base);
      fillHLine(2, 17, 3, hair.highlight);
      fillHLine(2, 17, 4, hair.base);
      fillHLine(3, 16, 5, hair.shadow);
      setPixel(3, 6, hair.base);
      setPixel(16, 6, hair.base);
      setPixel(6, 6, hair.base);
      setPixel(13, 6, hair.base);
      break;
  }

  // --- 9. ACCESSORIES ---
  if (accessory === "glasses") {
    // Wireframe glasses around eyes
    const glassColor = PALETTE.espressoDeep;
    setPixel(5, 8, glassColor);
    setPixel(5, 9, glassColor);
    setPixel(5, 10, glassColor);
    setPixel(8, 8, glassColor);
    setPixel(8, 10, glassColor);
    setPixel(9, 9, glassColor); // bridge
    setPixel(10, 9, glassColor);
    setPixel(11, 8, glassColor);
    setPixel(11, 10, glassColor);
    setPixel(14, 8, glassColor);
    setPixel(14, 9, glassColor);
    setPixel(14, 10, glassColor);
  } else if (accessory === "eyepatch") {
    // Pirate / rogue eyepatch on right eye
    setPixel(11, 8, outline);
    setPixel(12, 8, outline);
    setPixel(13, 8, outline);
    setPixel(11, 9, outline);
    setPixel(12, 9, outline);
    setPixel(13, 9, outline);
    setPixel(11, 10, outline);
    setPixel(12, 10, outline);
    setPixel(13, 10, outline);
    // Strap
    setPixel(14, 7, outline);
    setPixel(15, 6, outline);
    setPixel(10, 11, outline);
  } else if (accessory === "earring") {
    // Shiny gold drop earring
    setPixel(4, 11, PALETTE.warning);
    setPixel(4, 12, PALETTE.caramel);
  } else if (accessory === "bandage") {
    // Cheek band-aid
    setPixel(7, 11, "#F5E8D8");
    setPixel(8, 11, "#F5E8D8");
    setPixel(7, 12, "#E09F67");
  }

  // Background
  const backgroundColor = options?.backgroundColor || rng.pick(BACKGROUND_THEMES);

  // Convert map to pixel array
  const pixels: PixelPoint[] = Object.entries(grid).map(([key, color]) => {
    const [xStr, yStr] = key.split(",");
    return {
      x: parseInt(xStr, 10),
      y: parseInt(yStr, 10),
      color,
    };
  });

  return { pixels, backgroundColor };
}

/**
 * Generates an SVG string representation of the AvatarsInPixels character.
 * Deterministic and synchronous.
 */
export function generatePixelAvatarSvgString(
  seed: string = "jui-hero",
  options?: AvatarGenerationOptions
): string {
  const size = options?.size ?? 64;
  const { pixels, backgroundColor } = buildPixelAvatarGrid(seed, options);
  const showBg = options?.showBackground ?? true;

  const bgRect = showBg
    ? `<rect width="20" height="20" fill="${backgroundColor}" />`
    : "";

  const rects = pixels
    .map(
      (p) =>
        `<rect x="${p.x}" y="${p.y}" width="1" height="1" fill="${p.color}" />`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="${size}" height="${size}" shape-rendering="crispEdges">${bgRect}${rects}</svg>`;
}

/**
 * Returns a data-URI of the avatar SVG.
 * Safe for use in <img src="..."> or CSS backgrounds.
 */
export function generatePixelAvatarDataUri(
  seed: string = "jui-hero",
  options?: AvatarGenerationOptions
): string {
  const svg = generatePixelAvatarSvgString(seed, options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

/**
 * Renders the avatar as React SVG elements directly in the DOM.
 * ZERO network requests, ZERO hydration flicker, ZERO background flashing on page reload.
 */
export function renderPixelAvatarSvgElement(
  seed: string = "jui-hero",
  options?: AvatarGenerationOptions,
  className?: string
): React.ReactElement {
  const { pixels, backgroundColor } = buildPixelAvatarGrid(seed, options);
  const showBg = options?.showBackground ?? true;

  return React.createElement(
    "svg",
    {
      viewBox: "0 0 20 20",
      width: "100%",
      height: "100%",
      className,
      style: { shapeRendering: "crispEdges" },
      "aria-hidden": "true",
      xmlns: "http://www.w3.org/2000/svg",
    },
    showBg &&
      React.createElement("rect", {
        key: "bg",
        width: 20,
        height: 20,
        fill: backgroundColor,
      }),
    pixels.map((p) =>
      React.createElement("rect", {
        key: `${p.x}-${p.y}`,
        x: p.x,
        y: p.y,
        width: 1,
        height: 1,
        fill: p.color,
      })
    )
  );
}

/**
 * Backward compatibility: generates random avatar data URL synchronously.
 * Does NOT require canvas or browser APIs, preventing SSR or reload flash.
 */
export function generateRandomAvatar(options?: AvatarGenerationOptions): string {
  const randomSeed = options?.seed || Math.random().toString(36).substring(2, 9);
  return generatePixelAvatarDataUri(randomSeed, options);
}

/**
 * Generates an 8-bit style avatar data URL
 */
export function generate8BitAvatar(size: number = 64): string {
  return generateRandomAvatar({ bitDepth: 8, size });
}

/**
 * Generates a 16-bit style avatar data URL
 */
export function generate16BitAvatar(size: number = 64): string {
  return generateRandomAvatar({ bitDepth: 16, size });
}