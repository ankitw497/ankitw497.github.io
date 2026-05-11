const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 2 — Hero redesign: larger type + animated entrance', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
  });

  test('hero h1 font-size is at least 48px', async ({ page }) => {
    const size = await page.evaluate(() => {
      const h1 = document.querySelector('[data-testid="hero-headline"]');
      return parseFloat(getComputedStyle(h1).fontSize);
    });
    expect(size).toBeGreaterThanOrEqual(48);
  });

  test('hero h1 has tight letter-spacing (negative)', async ({ page }) => {
    const ls = await page.evaluate(() => {
      const h1 = document.querySelector('[data-testid="hero-headline"]');
      return getComputedStyle(h1).letterSpacing;
    });
    // letter-spacing should be negative (e.g. -2px or similar)
    expect(parseFloat(ls)).toBeLessThan(0);
  });

  test('hero eyebrow label is visible', async ({ page }) => {
    const eyebrow = page.getByTestId('hero-section').locator('.section-label').first();
    await expect(eyebrow).toBeVisible();
  });

  test('hero CTA buttons still visible', async ({ page }) => {
    await expect(page.getByTestId('hero-cta-work')).toBeVisible();
    await expect(page.getByTestId('hero-cta-resume')).toBeVisible();
  });

  test('hero photo still visible', async ({ page }) => {
    await expect(page.getByTestId('hero-photo')).toBeVisible();
  });

  test('hero availability badge still visible', async ({ page }) => {
    await expect(page.getByTestId('hero-availability')).toBeVisible();
  });

  test('floating badge still visible', async ({ page }) => {
    await expect(page.getByTestId('hero-floating-badge')).toBeVisible();
  });

  test('screenshot — hero redesign desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/screenshots/v3-task2-01-hero-desktop.png', fullPage: false });
  });

  test('screenshot — hero redesign mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'tests/screenshots/v3-task2-02-hero-mobile.png', fullPage: false });
  });
});
