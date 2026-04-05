import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, 'review-screenshots');

const BASE_URL = 'http://localhost:3000';

// All pages to test
const pages = [
  { path: '', name: 'home' },
  { path: '/ueber-mich', name: 'ueber-mich' },
  { path: '/datenschutz', name: 'datenschutz' },
  { path: '/impressum', name: 'impressum' },
  { path: '/anwendungsfaelle/dokumentenmanagement', name: 'use-case-dokumentenmanagement' },
  { path: '/anwendungsfaelle/lead-qualifizierung', name: 'use-case-lead-qualifizierung' },
  { path: '/anwendungsfaelle/mieterservice', name: 'use-case-mieterservice' },
  { path: '/anwendungsfaelle/anwendungsfall-04', name: 'use-case-04' },
];

// Viewport sizes: desktop, tablet, mobile
const viewports = [
  { width: 1440, height: 900, label: 'desktop' },
  { width: 375, height: 812, label: 'mobile' },
];

// Ensure output directory exists
await mkdir(SCREENSHOTS_DIR, { recursive: true });

// Launch browser
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

console.log(`\n📸 Taking screenshots for ${pages.length} pages × ${viewports.length} viewports...`);

let count = 0;
for (const page of pages) {
  const url = BASE_URL + page.path;

  for (const viewport of viewports) {
    try {
      const browserPage = await browser.newPage();
      await browserPage.setViewport({ width: viewport.width, height: viewport.height });
      await browserPage.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for fonts and animations to settle
      await new Promise(r => setTimeout(r, 2000));

      // Freeze animations
      await browserPage.addStyleTag({
        content: '*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; transition-delay: 0s !important; }'
      });

      // Trigger reveal animations to complete state
      await browserPage.evaluate(() => {
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-up-lg, .reveal-card').forEach(el => {
          el.classList.add('visible');
        });
      });

      await new Promise(r => setTimeout(r, 200));

      // Take full-page screenshot
      const filename = `${page.name}-${viewport.label}.png`;
      const outputPath = join(SCREENSHOTS_DIR, filename);
      await browserPage.screenshot({ path: outputPath, fullPage: true });

      console.log(`✓ ${filename}`);
      count++;

      await browserPage.close();
    } catch (error) {
      console.error(`✗ Failed: ${page.name}-${viewport.label}`, error.message);
    }
  }
}

await browser.close();

console.log(`\n✅ Complete! ${count}/${pages.length * viewports.length} screenshots saved to ${SCREENSHOTS_DIR}`);
