const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 5 — Tata Elxsi experience entry', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('experience timeline has 5 items', async ({ page }) => {
    const items = page.getByTestId('experience-section').locator('[data-testid^="tl-item-"]');
    await expect(items).toHaveCount(5);
  });

  test('tl-item-4 is present and visible', async ({ page }) => {
    await expect(page.getByTestId('tl-item-4')).toBeVisible();
  });

  test('tl-item-4 contains Tata Elxsi', async ({ page }) => {
    await expect(page.getByTestId('tl-item-4')).toContainText('Tata Elxsi');
  });

  test('tl-item-4 date shows 2016', async ({ page }) => {
    await expect(page.getByTestId('tl-item-4')).toContainText('2016');
  });

  test('screenshot — experience with Tata Elxsi', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('experience-section').screenshot({ path: 'tests/screenshots/v3-task5-01-experience.png' });
  });
});
