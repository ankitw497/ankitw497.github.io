const { test, expect } = require('@playwright/test');
const path = require('path');

const HF = 'file://' + path.join(__dirname, '../../visual_guide/hf_stack_apple.html');

test.describe('v2 Task 8 — hf_stack_apple.html light theme + indentation fix', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(HF);
  });

  test('body background is white (light theme)', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  test('body text is dark (light theme)', async ({ page }) => {
    const color = await page.evaluate(() => getComputedStyle(document.body).color);
    // #1d1d1f = rgb(29, 29, 31)
    expect(color).toBe('rgb(29, 29, 31)');
  });

  test('code-pre has white-space:pre (indentation fix)', async ({ page }) => {
    const ws = await page.locator('.code-pre').first().evaluate(el =>
      getComputedStyle(el).whiteSpace
    );
    expect(ws).toBe('pre');
  });

  test('indented Python lines are visible with leading spaces', async ({ page }) => {
    // The GRPO code block (nth 4) has format_reward with indented body
    const content = await page.locator('.code-pre').nth(4).textContent();
    // function body should contain "    rewards" with leading spaces
    expect(content).toContain('    rewards');
  });

  test('nav is visible', async ({ page }) => {
    const nav = page.locator('.nav');
    await expect(nav).toBeVisible();
  });

  test('page loads without console errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.goto(HF);
    await page.waitForTimeout(300);
    expect(errors).toHaveLength(0);
  });

  test('screenshot — HF stack page light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(HF);
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/v2-task8-01-hf-stack.png', fullPage: false });
  });

  test('screenshot — code block with indentation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(HF);
    await page.waitForTimeout(200);
    const codeBlock = page.locator('.code-win').nth(3);
    await codeBlock.screenshot({ path: 'tests/screenshots/v2-task8-02-code-indent.png' });
  });
});
