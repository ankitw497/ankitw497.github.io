const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const ROOT = path.join(__dirname, '../../');
const INDEX = 'file://' + path.join(ROOT, 'index.html');

test.describe('v2 Task 6 — Stale HTML Files Deleted', () => {

  test('food.html does not exist on disk', () => {
    expect(fs.existsSync(path.join(ROOT, 'food.html'))).toBe(false);
  });

  test('dsa-viz.html does not exist on disk', () => {
    expect(fs.existsSync(path.join(ROOT, 'dsa-viz.html'))).toBe(false);
  });

  test('ml-viz.html does not exist on disk', () => {
    expect(fs.existsSync(path.join(ROOT, 'ml-viz.html'))).toBe(false);
  });

  test('travel.html does not exist on disk', () => {
    expect(fs.existsSync(path.join(ROOT, 'travel.html'))).toBe(false);
  });

  test('buddhism.html still exists', () => {
    expect(fs.existsSync(path.join(ROOT, 'buddhism.html'))).toBe(true);
  });

  test('no links to deleted pages in index.html', async ({ page }) => {
    await page.goto(INDEX);
    const html = await page.content();
    expect(html).not.toContain('food.html');
    expect(html).not.toContain('dsa-viz.html');
    expect(html).not.toContain('ml-viz.html');
    expect(html).not.toContain('travel.html');
  });

  test('no links to deleted pages in visual_guide/index.html', async ({ page }) => {
    await page.goto('file://' + path.join(ROOT, 'visual_guide/index.html'));
    const html = await page.content();
    expect(html).not.toContain('food.html');
    expect(html).not.toContain('travel.html');
    expect(html).not.toContain('dsa-viz.html');
    expect(html).not.toContain('ml-viz.html');
  });
});
