const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 3 — Hero & Global Tokens', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    // force reveal so elements are visible
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Background / tokens ───────────────────────────────────────

  test('page background is Apple Light white', async ({ page }) => {
    const bg = await page.evaluate(() =>
      getComputedStyle(document.body).backgroundColor
    );
    // rgb(255, 255, 255) = #ffffff
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('CSS --acc token is Apple light blue #0071e3', async ({ page }) => {
    const acc = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()
    );
    expect(acc).toBe('#0071e3');
  });

  test('CSS --surf token is #f5f5f7', async ({ page }) => {
    const surf = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--surf').trim()
    );
    expect(surf).toBe('#f5f5f7');
  });

  // ── Hero section ──────────────────────────────────────────────

  test('hero headline is visible', async ({ page }) => {
    const hero = page.getByTestId('hero-section');
    await expect(hero).toBeVisible();
    await expect(hero.getByTestId('hero-headline')).toBeVisible();
  });

  test('hero headline contains gradient text span', async ({ page }) => {
    const grad = page.getByTestId('hero-headline').locator('.grad');
    await expect(grad).toBeVisible();
  });

  test('hero CTA buttons are visible', async ({ page }) => {
    await expect(page.getByTestId('hero-cta-work')).toBeVisible();
    await expect(page.getByTestId('hero-cta-resume')).toBeVisible();
  });

  test('hero availability badge is green', async ({ page }) => {
    const badge = page.getByTestId('hero-availability');
    await expect(badge).toBeVisible();
    await expect(badge).toContainText('Open to roles');
  });

  test('hero photo is present with Apple border-radius', async ({ page }) => {
    const img = page.getByTestId('hero-photo');
    await expect(img).toBeVisible();
    const radius = await img.evaluate(el => getComputedStyle(el).borderRadius);
    // should be 20px or 24px Apple-style
    expect(parseInt(radius)).toBeGreaterThanOrEqual(16);
  });

  test('floating badge uses new surface color', async ({ page }) => {
    const badge = page.getByTestId('hero-floating-badge');
    await expect(badge).toBeVisible();
    const bg = await badge.evaluate(el => getComputedStyle(el).backgroundColor);
    // should NOT be old #111827 = rgb(17,24,39)
    expect(bg).not.toBe('rgb(17, 24, 39)');
  });

  // ── Stat pills ────────────────────────────────────────────────

  test('stat pills are visible with Apple Night surface', async ({ page }) => {
    const pills = page.getByTestId('stats-strip').locator('[data-testid^="stat-"]');
    await expect(pills).toHaveCount(4);
    for (const pill of await pills.all()) {
      await expect(pill).toBeVisible();
      const bg = await pill.evaluate(el => getComputedStyle(el).backgroundColor);
      // should NOT be old navy #111827
      expect(bg).not.toBe('rgb(17, 24, 39)');
    }
  });

  test('stat numbers use Apple light blue accent', async ({ page }) => {
    const firstNum = page.getByTestId('stat-0').locator('[data-testid="pill-num"]').first();
    await expect(firstNum).toBeVisible();
    const color = await firstNum.evaluate(el => getComputedStyle(el).color);
    // #0071e3 = rgb(0, 113, 227)
    expect(color).toBe('rgb(0, 113, 227)');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — hero above fold', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/task3-01-hero-desktop.png', clip: { x: 0, y: 0, width: 1280, height: 900 } });
  });

  test('screenshot — stats strip', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    const strip = page.getByTestId('stats-strip');
    await strip.screenshot({ path: 'tests/screenshots/task3-02-stats-strip.png' });
  });

  test('screenshot — mobile hero', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: 'tests/screenshots/task3-03-hero-mobile.png', clip: { x: 0, y: 0, width: 390, height: 844 } });
  });
});
