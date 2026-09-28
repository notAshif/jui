/**
 * Generates a random pixel art avatar using Canvas API
 * Supports both 8-bit and 16-bit styles
 * Uses adaptive colors from the project's palette
 */

export interface AvatarGenerationOptions {
  bitDepth?: 8 | 16;
  size?: number;
}

// Color palette from the project's CSS variables
const PALETTE = {
  cream: '#FFF8F0',
  creamLight: '#FFFCF9',
  creamDark: '#F5E8D8',
  caramel: '#C08552',
  caramelHover: '#AF7644',
  cinnamon: '#8C5A3C',
  espresso: '#4B2E2B',
  espressoDeep: '#321C1A',
  destructive: '#B84A39',
  success: '#4F6D48',
  warning: '#D48B38',
};

const SKIN_TONES = [PALETTE.cream, PALETTE.creamDark, PALETTE.caramel, PALETTE.cinnamon];
const ACCENT_COLORS = [PALETTE.caramel, PALETTE.cinnamon, PALETTE.espresso, PALETTE.success, PALETTE.warning];
const EYE_COLORS = [PALETTE.espresso, PALETTE.espressoDeep, PALETTE.caramel, PALETTE.success];

/**
 * Helper function to get a random item from an array
 */
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Helper function to get a random number in range
 */
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper function to check if a color is dark (for adaptive backgrounds)
 */
function isDarkColor(hexColor: string): boolean {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * Checks if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Generates a random pixel art avatar using the Canvas API.
 * Takes no parameters by default and randomly selects between 8-bit and 16-bit styles.
 * Uses adaptive contrast background based on the project's earthy color palette.
 * 
 * @param options - Optional overrides for bitDepth (8 | 16) and canvas size in pixels (default 64)
 * @returns Base64 PNG data URL string
 */
export function generateRandomAvatar(options?: AvatarGenerationOptions): string {
  if (!isBrowser()) {
    return "";
  }

  // When called without parameters, randomly generate an 8-bit or 16-bit avatar
  const bitDepth = options?.bitDepth ?? (Math.random() > 0.5 ? 16 : 8);
  const size = options?.size ?? 64;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.error("[generateRandomAvatar] Unable to get 2D rendering context from canvas.");
    return "";
  }

  // Ensure sharp pixelated scaling
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, size, size);

  const pixelSize = bitDepth === 8 ? size / 8 : size / 16;
  const gridSize = bitDepth === 8 ? 8 : 16;

  // Pick colors from the project's earthy palette
  const skinTone = getRandomItem(SKIN_TONES);
  const accentColor = getRandomItem(ACCENT_COLORS);
  const eyeColor = getRandomItem(EYE_COLORS);

  // Adaptive background based on skin tone and theme contrast
  const backgroundColor = isDarkColor(skinTone) ? PALETTE.creamLight : PALETTE.espressoDeep;

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  // Draw character layers
  drawFace(ctx, size, pixelSize, gridSize, skinTone, bitDepth);
  drawEyes(ctx, size, pixelSize, gridSize, eyeColor, bitDepth);
  drawMouth(ctx, size, pixelSize, gridSize, accentColor, bitDepth);
  drawHair(ctx, size, pixelSize, gridSize, accentColor, bitDepth);

  return canvas.toDataURL("image/png");
}

/**
 * Draws the face shape
 */
function drawFace(
  ctx: CanvasRenderingContext2D,
  size: number,
  pixelSize: number,
  gridSize: number,
  skinTone: string,
  bitDepth: number
): void {
  ctx.fillStyle = skinTone;
  
  if (bitDepth === 8) {
    // Simple 8-bit face (center 6x6 pixels)
    const startX = pixelSize;
    const startY = pixelSize;
    const faceWidth = pixelSize * 6;
    const faceHeight = pixelSize * 6;
    ctx.fillRect(startX, startY, faceWidth, faceHeight);
  } else {
    // More detailed 16-bit face
    const centerX = Math.floor(gridSize / 2);
    const centerY = Math.floor(gridSize / 2);
    
    // Draw main face shape
    for (let y = 3; y < 13; y++) {
      for (let x = 3; x < 13; x++) {
        // Create oval shape
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }
  }
}

/**
 * Draws the eyes
 */
function drawEyes(
  ctx: CanvasRenderingContext2D,
  size: number,
  pixelSize: number,
  gridSize: number,
  eyeColor: string,
  bitDepth: number
): void {
  ctx.fillStyle = eyeColor;
  
  if (bitDepth === 8) {
    // Simple 8-bit eyes (2x1 pixels each)
    ctx.fillRect(pixelSize * 2, pixelSize * 3, pixelSize * 2, pixelSize);
    ctx.fillRect(pixelSize * 4, pixelSize * 3, pixelSize * 2, pixelSize);
  } else {
    // More detailed 16-bit eyes
    const eyeY = 5;
    const leftEyeX = 5;
    const rightEyeX = 10;
    
    // Left eye
    ctx.fillRect(leftEyeX * pixelSize, eyeY * pixelSize, pixelSize * 2, pixelSize * 2);
    ctx.fillRect((leftEyeX + 1) * pixelSize, (eyeY + 1) * pixelSize, pixelSize, pixelSize);
    
    // Right eye
    ctx.fillRect(rightEyeX * pixelSize, eyeY * pixelSize, pixelSize * 2, pixelSize * 2);
    ctx.fillRect((rightEyeX + 1) * pixelSize, (eyeY + 1) * pixelSize, pixelSize, pixelSize);
  }
}

/**
 * Draws the mouth
 */
function drawMouth(
  ctx: CanvasRenderingContext2D,
  size: number,
  pixelSize: number,
  gridSize: number,
  accentColor: string,
  bitDepth: number
): void {
  ctx.fillStyle = accentColor;
  
  if (bitDepth === 8) {
    // Simple 8-bit mouth (2x1 pixels)
    ctx.fillRect(pixelSize * 3, pixelSize * 5, pixelSize * 2, pixelSize);
  } else {
    // More detailed 16-bit mouth with random expression
    const mouthY = 10;
    const mouthX = 6;
    const mouthWidth = getRandomInt(2, 4);
    
    ctx.fillRect(mouthX * pixelSize, mouthY * pixelSize, mouthWidth * pixelSize, pixelSize);
    
    // Sometimes add a smile
    if (Math.random() > 0.5) {
      ctx.fillRect((mouthX - 1) * pixelSize, (mouthY - 1) * pixelSize, pixelSize, pixelSize);
      ctx.fillRect((mouthX + mouthWidth) * pixelSize, (mouthY - 1) * pixelSize, pixelSize, pixelSize);
    }
  }
}

/**
 * Draws hair or accessories
 */
function drawHair(
  ctx: CanvasRenderingContext2D,
  size: number,
  pixelSize: number,
  gridSize: number,
  accentColor: string,
  bitDepth: number
): void {
  ctx.fillStyle = accentColor;
  
  if (bitDepth === 8) {
    // Simple 8-bit hair (top row)
    const hairPattern = getRandomInt(0, 3);
    if (hairPattern === 0) {
      // Flat top
      ctx.fillRect(pixelSize, 0, pixelSize * 6, pixelSize);
    } else if (hairPattern === 1) {
      // Spiky
      ctx.fillRect(pixelSize * 2, 0, pixelSize * 4, pixelSize);
      ctx.fillRect(pixelSize, pixelSize, pixelSize, pixelSize);
      ctx.fillRect(pixelSize * 6, pixelSize, pixelSize, pixelSize);
    } else {
      // Bald
      // No hair
    }
  } else {
    // More detailed 16-bit hair
    const hairStyle = getRandomInt(0, 4);
    
    if (hairStyle === 0) {
      // Full hair
      for (let x = 2; x < 14; x++) {
        ctx.fillRect(x * pixelSize, 0, pixelSize, pixelSize);
        if (x >= 3 && x <= 12) {
          ctx.fillRect(x * pixelSize, pixelSize, pixelSize, pixelSize);
        }
      }
    } else if (hairStyle === 1) {
      // Spiky/mohawk
      for (let x = 4; x < 12; x++) {
        ctx.fillRect(x * pixelSize, 0, pixelSize, pixelSize);
        if (x >= 5 && x <= 10) {
          ctx.fillRect(x * pixelSize, pixelSize, pixelSize, pixelSize);
        }
      }
    } else if (hairStyle === 2) {
      // Side part
      for (let x = 2; x < 8; x++) {
        ctx.fillRect(x * pixelSize, 0, pixelSize, pixelSize * 2);
      }
      for (let x = 9; x < 14; x++) {
        ctx.fillRect(x * pixelSize, pixelSize, pixelSize, pixelSize);
      }
    } else {
      // Bald
      // No hair
    }
  }
}

/**
 * Generates an 8-bit avatar
 */
export function generate8BitAvatar(size: number = 64): string {
  return generateRandomAvatar({ bitDepth: 8, size });
}

/**
 * Generates a 16-bit avatar
 */
export function generate16BitAvatar(size: number = 64): string {
  return generateRandomAvatar({ bitDepth: 16, size });
}