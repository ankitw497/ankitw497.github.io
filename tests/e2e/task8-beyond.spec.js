const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 8 — Beyond Work Photos', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('beyond section is present', async ({ page }) => {
    await expect(page.getByTestId('beyond-section')).toBeVisible();
  });

  test('section label uses --acc colour', async ({ page }) => {
    const label = page.getByTestId('beyond-section').getByTestId('beyond-label');
    const color = await label.evaluate(el => getComputedStyle(el).color);
    // --acc = #2997ff = rgb(41, 151, 255)
    expect(color).toBe('rgb(41, 151, 255)');
  });

  test('photo grid has 8 items', async ({ page }) => {
    const items = page.getByTestId('beyond-section').locator('[data-testid^="photo-"]');
    await expect(items).toHaveCount(8);
  });

  test('photo grid items use --surf background', async ({ page }) => {
    const item = page.getByTestId('photo-0');
    const bg = await item.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(22, 22, 23)'); // --surf = #161617
  });

  test('photo grid items have 14px border-radius', async ({ page }) => {
    const item = page.getByTestId('photo-0');
    const radius = await item.evaluate(el => getComputedStyle(el).borderRadius);
    expect(radius).toBe('14px');
  });

  test('no links to travel.html or food.html in beyond section', async ({ page }) => {
    const html = await page.getByTestId('beyond-section').innerHTML();
    expect(html).not.toContain('travel.html');
    expect(html).not.toContain('food.html');
  });

  test('caption says "Travel · Photography · Buddhism"', async ({ page }) => {
    const caption = page.getByTestId('beyond-section').getByTestId('beyond-caption');
    await expect(caption).toContainText('Travel · Photography · Buddhism');
  });

  test('caption uses --t3 (muted) colour', async ({ page }) => {
    const caption = page.getByTestId('beyond-caption');
    const color = await caption.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(110, 110, 115)'); // --t3 = #6e6e73
  });

  test('no hardcoded old colours in beyond section', async ({ page }) => {
    const html = await page.getByTestId('beyond-section').innerHTML();
    expect(html).not.toContain('#475569');
    expect(html).not.toContain('#64748b');
  });

  test('buddhism.html link is present', async ({ page }) => {
    const link = page.getByTestId('beyond-section').getByRole('link', { name: /Buddhism/i });
    await expect(link).toBeVisible();
  });

  // ── Screenshot ────────────────────────────────────────────────

  test('screenshot — beyond section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('beyond-section').screenshot({ path: 'tests/screenshots/task8-01-beyond.png' });
  });
});
