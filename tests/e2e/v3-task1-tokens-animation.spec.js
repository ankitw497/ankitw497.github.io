const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 1 — Shadow tokens, nav blur, fadeUp animation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
  });

  test('--shadow-sm token is defined', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--shadow-sm').trim()
    );
    expect(val.length).toBeGreaterThan(0);
  });

  test('--shadow token is defined', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--shadow').trim()
    );
    expect(val.length).toBeGreaterThan(0);
  });

  test('--shadow-lg token is defined', async ({ page }) => {
    const val = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--shadow-lg').trim()
    );
    expect(val.length).toBeGreaterThan(0);
  });

  test('nav uses saturate(180%) in backdrop-filter', async ({ page }) => {
    const nav = page.locator('header').first();
    const bf = await nav.evaluate(el => getComputedStyle(el).backdropFilter);
    expect(bf).toContain('saturate');
  });

  test('@keyframes fadeUp is defined in stylesheets', async ({ page }) => {
    const hasFadeUp = await page.evaluate(() => {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.type === CSSRule.KEYFRAMES_RULE && rule.name === 'fadeUp') return true;
          }
        } catch (e) {}
      }
      return false;
    });
    expect(hasFadeUp).toBe(true);
  });

  test('screenshot — hero with new tokens', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'tests/screenshots/v3-task1-01-tokens.png', fullPage: false });
  });
});
