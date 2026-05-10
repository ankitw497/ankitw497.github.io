const { test, expect } = require('@playwright/test');
const path = require('path');

const FT = 'file://' + path.join(__dirname, '../../visual_guide/combined_guide_finetuning.html');

test.describe('v2 Task 9 — combined_guide_finetuning.html light theme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(FT);
  });

  test('body background is white', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('body text is dark', async ({ page }) => {
    const color = await page.evaluate(() => getComputedStyle(document.body).color);
    // #1d1d1f = rgb(29, 29, 31)
    expect(color).toBe('rgb(29, 29, 31)');
  });

  test('nav background is light (rgba white)', async ({ page }) => {
    const nav = page.locator('nav').first();
    const bg = await nav.evaluate(el => getComputedStyle(el).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g).map(Number);
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  test('page loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(FT);
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  test('screenshot — finetuning guide light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(FT);
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/v2-task9-01-finetuning.png', fullPage: false });
  });
});
