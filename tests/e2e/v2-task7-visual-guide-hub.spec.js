const { test, expect } = require('@playwright/test');
const path = require('path');

const HUB = 'file://' + path.join(__dirname, '../../visual_guide/index.html');

test.describe('v2 Task 7 — Visual Guide Hub Apple Light Theme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(HUB);
  });

  test('body background is white', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('body text is Apple charcoal (#1d1d1f)', async ({ page }) => {
    const color = await page.evaluate(() => getComputedStyle(document.body).color);
    expect(color).toBe('rgb(29, 29, 31)');
  });

  test('--acc token is Apple light blue (#0071e3)', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()
    );
    expect(val).toBe('#0071e3');
  });

  test('nav background is light (rgba white)', async ({ page }) => {
    const nav = page.locator('nav').first();
    const bg = await nav.evaluate(el => getComputedStyle(el).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g).map(Number);
    expect(r).toBe(255);
    expect(g).toBe(255);
    expect(b).toBe(255);
  });

  test('guide cards use --surf background', async ({ page }) => {
    const card = page.getByTestId('guide-card-hf');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // --surf = #f5f5f7
  });

  test('back link and brand are visible', async ({ page }) => {
    await expect(page.getByTestId('back-link')).toBeVisible();
    await expect(page.getByTestId('nav-brand')).toBeVisible();
  });

  test('guide grid has 3 cards', async ({ page }) => {
    const grid = page.getByTestId('guides-grid');
    const cards = grid.locator('article');
    await expect(cards).toHaveCount(3);
  });

  test('screenshot — visual guide hub light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(HUB);
    await page.waitForTimeout(150);
    await page.screenshot({ path: 'tests/screenshots/v2-task7-01-hub-light.png', fullPage: false });
  });
});
