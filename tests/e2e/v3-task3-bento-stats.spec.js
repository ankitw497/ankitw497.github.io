const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 3 — Bento stats grid', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('stats-strip is present', async ({ page }) => {
    await expect(page.getByTestId('stats-strip')).toBeAttached();
  });

  test('bento-0 cell is visible with years content', async ({ page }) => {
    const cell = page.getByTestId('bento-0');
    await expect(cell).toBeVisible();
    await expect(cell).toContainText('5+');
  });

  test('bento-1 cell shows production models', async ({ page }) => {
    const cell = page.getByTestId('bento-1');
    await expect(cell).toBeVisible();
    await expect(cell).toContainText('6');
  });

  test('bento-2 cell shows IISc', async ({ page }) => {
    const cell = page.getByTestId('bento-2');
    await expect(cell).toBeVisible();
    await expect(cell).toContainText('IISc');
  });

  test('bento-3 cell shows open to work', async ({ page }) => {
    const cell = page.getByTestId('bento-3');
    await expect(cell).toBeVisible();
    await expect(cell).toContainText('Open');
  });

  test('bento-4 cell shows companies', async ({ page }) => {
    const cell = page.getByTestId('bento-4');
    await expect(cell).toBeVisible();
    await expect(cell).toContainText('3');
  });

  test('screenshot — bento stats desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.getByTestId('stats-strip').screenshot({ path: 'tests/screenshots/v3-task3-01-bento-desktop.png' });
  });

  test('screenshot — bento stats mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.getByTestId('stats-strip').screenshot({ path: 'tests/screenshots/v3-task3-02-bento-mobile.png' });
  });
});
