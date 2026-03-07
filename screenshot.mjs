import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, 'temporary screenshots');

const url = process.argv[2];
const label = process.argv[3] || '';

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

// Ensure output directory exists
await mkdir(SCREENSHOTS_DIR, { recursive: true });

// Find next auto-increment number
let nextN = 1;
try {
  const files = await readdir(SCREENSHOTS_DIR);
  const nums = files
    .filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
    .map(f => {
      const match = f.match(/^screenshot-(\d+)/);
      return match ? parseInt(match[1], 10) : 0;
    });
  if (nums.length > 0) nextN = Math.max(...nums) + 1;
} catch { /* dir empty or doesn't exist yet */ }

const filename = label
  ? `screenshot-${nextN}-${label}.png`
  : `screenshot-${nextN}.png`;
const outputPath = join(SCREENSHOTS_DIR, filename);

// Launch browser and take screenshot
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Wait for fonts + Tailwind CDN + animations to settle
await new Promise(r => setTimeout(r, 3000));

// Freeze animations so we capture final states
await page.addStyleTag({
  content: '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }'
});

// Trigger all reveal elements to visible state
await page.evaluate(() => {
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up-lg').forEach(el => {
    el.classList.add('visible');
  });
});

// Brief pause for style application
await new Promise(r => setTimeout(r, 200));

// Full-page screenshot
await page.screenshot({ path: outputPath, fullPage: true });

await browser.close();

console.log(`Screenshot saved: ${outputPath}`);
