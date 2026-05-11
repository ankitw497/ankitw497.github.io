const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 4 — Card visual lift: shadows + hover glow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('card at rest has box-shadow', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const shadow = await card.evaluate(el => getComputedStyle(el).boxShadow);
    // should have some shadow (not 'none')
    expect(shadow).not.toBe('none');
  });

  test('cs-card-0 has blue top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const borderColor = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    expect(borderColor).toBe('rgb(0, 113, 227)'); // --acc
  });

  test('cs-card-1 has indigo top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-1');
    const borderColor = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    expect(borderColor).toBe('rgb(99, 102, 241)'); // #6366f1
  });

  test('cs-card-2 has purple top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-2');
    const borderColor = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    expect(borderColor).toBe('rgb(137, 68, 171)'); // --purple
  });

  test('screenshot — case study cards with lift', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.getByTestId('case-studies').screenshot({ path: 'tests/screenshots/v3-task4-01-cards.png' });
  });
});
