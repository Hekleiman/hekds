import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create SVG for the OG image
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Subtle gradient background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#09090b;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0f0f12;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#09090b;stop-opacity:1" />
    </linearGradient>
    <!-- Subtle border gradient -->
    <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#27272a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3f3f46;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bgGradient)"/>

  <!-- Subtle border -->
  <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="url(#borderGradient)" stroke-width="2" rx="0"/>

  <!-- HEK text -->
  <text
    x="${width / 2}"
    y="${height / 2 - 20}"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="140"
    font-weight="600"
    fill="#ffffff"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="-4"
  >HEK</text>

  <!-- Design Studio text -->
  <text
    x="${width / 2}"
    y="${height / 2 + 70}"
    font-family="Inter, system-ui, -apple-system, sans-serif"
    font-size="32"
    font-weight="400"
    fill="#9f9fa9"
    text-anchor="middle"
    dominant-baseline="middle"
    letter-spacing="8"
  >DESIGN STUDIO</text>
</svg>
`;

const outputPath = join(__dirname, '..', 'public', 'og-default.png');

sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(() => {
    console.log(`OG image generated successfully at: ${outputPath}`);
    console.log(`Dimensions: ${width}x${height}px`);
  })
  .catch((err) => {
    console.error('Error generating OG image:', err);
    process.exit(1);
  });
