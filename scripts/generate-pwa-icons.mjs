/**
 * Genera favicon.ico y android-chrome PNG a partir de public/logo.svg.
 * Ejecutar: npm run generate-icons
 */
import { readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import toIco from 'to-ico';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const logoPath = join(publicDir, 'logo.svg');

const bg = { r: 249, g: 250, b: 251, alpha: 1 };

async function rasterize(size) {
  return sharp(logoPath)
    .resize(size, size, {
      fit: 'contain',
      background: bg,
    })
    .png()
    .toBuffer();
}

const logoBuf = await readFile(logoPath);
if (!logoBuf.length) {
  console.error('Missing public/logo.svg');
  process.exit(1);
}

await writeFile(join(publicDir, 'android-chrome-512x512.png'), await rasterize(512));
await writeFile(join(publicDir, 'android-chrome-192x192.png'), await rasterize(192));

const [b32, b16] = await Promise.all([rasterize(32), rasterize(16)]);
const ico = await toIco([b32, b16]);
await writeFile(join(publicDir, 'favicon.ico'), ico);

console.log('OK: favicon.ico, android-chrome-192x192.png, android-chrome-512x512.png');
