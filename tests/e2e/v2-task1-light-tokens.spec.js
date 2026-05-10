const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v2 Task 1 — Apple Light Design Tokens', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('body background is white (#ffffff)', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('body text colour is Apple charcoal (#1d1d1f)', async ({ page }) => {
    const color = await page.evaluate(() => getComputedStyle(document.body).color);
    expect(color).toBe('rgb(29, 29, 31)');
  });

  test('--acc token resolves to Apple light blue (#0071e3)', async ({ page }) => {
    const color = await page.evaluate(() => {
      const el = document.querySelector('[data-testid="nav-work"]');
      // section-label uses var(--acc) directly — check it via a known --acc element
      return getComputedStyle(document.documentElement).getPropertyValue('--acc').trim();
    });
    expect(color).toBe('#0071e3');
  });

  test('--surf token resolves to Apple off-white (#f5f5f7)', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--surf').trim()
    );
    expect(val).toBe('#f5f5f7');
  });

  test('--t1 token resolves to Apple charcoal (#1d1d1f)', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--t1').trim()
    );
    expect(val).toBe('#1d1d1f');
  });

  test('section label (uses --acc) is Apple light blue', async ({ page }) => {
    // section-label class uses color: var(--acc)
    const label = page.getByTestId('hero-section').locator('.section-label').first();
    const color = await label.evaluate(el => getComputedStyle(el).color);
    // #0071e3 = rgb(0, 113, 227)
    expect(color).toBe('rgb(0, 113, 227)');
  });

  test('rainbow stripe has Apple blue start colour', async ({ page }) => {
    const style = await page.getByTestId('rainbow-stripe').getAttribute('style');
    expect(style).toContain('#2997ff');
  });

  test('nav background is light (rgba white)', async ({ page }) => {
    const header = page.locator('header').first();
    const bg = await header.evaluate(el => getComputedStyle(el).backgroundColor);
    // rgba(255,255,255,.88) — the alpha makes it not pure white, but all channels must be 255
    const [r, g, b] = bg.match(/\d+/g).map(Number);
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  test('no dark background tokens remain — --bg is white', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    );
    expect(val).toBe('#ffffff');
  });

  // ── Screenshot ────────────────────────────────────────────────

  test('screenshot — light theme homepage top', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/v2-task1-01-light-theme.png', fullPage: false });
  });
});
