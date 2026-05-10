const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 10 — Final Polish', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
  });

  test('rainbow stripe is present with Apple colours', async ({ page }) => {
    const stripe = page.locator('[data-testid="rainbow-stripe"]');
    await expect(stripe).toBeAttached();
    const style = await stripe.getAttribute('style');
    expect(style).toContain('#2997ff');
    expect(style).toContain('#bf5af2');
    expect(style).toContain('#ff375f');
  });

  test('ambient blob is present', async ({ page }) => {
    const ambient = page.locator('.ambient');
    await expect(ambient).toBeAttached();
  });

  test('scroll-reveal uses 0.5s ease', async ({ page }) => {
    const el = page.locator('.reveal').first();
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    const transition = await el.evaluate(el => getComputedStyle(el).transition);
    expect(transition).toContain('0.5s');
  });

  test('OG title meta is present', async ({ page }) => {
    const og = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content'));
    expect(og).toContain('Ankit Wahane');
  });

  test('OG description meta is present', async ({ page }) => {
    const og = await page.$eval('meta[property="og:description"]', el => el.getAttribute('content'));
    expect(og.length).toBeGreaterThan(10);
  });

  test('OG url meta is present', async ({ page }) => {
    const og = await page.$eval('meta[property="og:url"]', el => el.getAttribute('content'));
    expect(og).toContain('ankitw497.github.io');
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(INDEX);
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  test('structured data person type present', async ({ page }) => {
    const ld = await page.$eval('script[type="application/ld+json"]', el => JSON.parse(el.textContent));
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe('Ankit Wahane');
  });

  // ── Screenshot ────────────────────────────────────────────────

  test('screenshot — full page top', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/task10-01-top.png', fullPage: false });
  });
});
