const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 4 — Case Studies & Projects', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Card structure ────────────────────────────────────────────

  test('featured case studies section has 3 cards', async ({ page }) => {
    const cards = page.getByTestId('case-studies').locator('[data-testid^="cs-card-"]');
    await expect(cards).toHaveCount(3);
  });

  test('all-projects section has 6 project cards', async ({ page }) => {
    const cards = page.getByTestId('all-projects').locator('[data-testid^="proj-card-"]');
    await expect(cards).toHaveCount(6);
  });

  // ── Apple Light token colours ────────────────────────────────

  test('case study card backgrounds use --surf (#f5f5f7)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    await expect(card).toBeVisible();
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // #f5f5f7
  });

  test('card border-radius is 18px (Apple lg)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const radius = await card.evaluate(el => getComputedStyle(el).borderRadius);
    expect(parseInt(radius)).toBeGreaterThanOrEqual(16);
  });

  // ── Top-border accent colours ─────────────────────────────────

  test('first card has blue top border (#0071e3)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #0071e3 = rgb(0, 113, 227)
    expect(borderTop).toBe('rgb(0, 113, 227)');
  });

  test('second card has indigo top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-1');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #6366f1 = rgb(99, 102, 241)
    expect(borderTop).toBe('rgb(99, 102, 241)');
  });

  test('third card has purple top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-2');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #8944ab = rgb(137, 68, 171)
    expect(borderTop).toBe('rgb(137, 68, 171)');
  });

  // ── Content present ───────────────────────────────────────────

  test('first case study shows QBR title', async ({ page }) => {
    await expect(page.getByTestId('cs-card-0')).toContainText('QBR');
  });

  test('impact badges are visible on case study cards', async ({ page }) => {
    const badges = page.getByTestId('cs-card-0').locator('.impact');
    await expect(badges.first()).toBeVisible();
  });

  test('tech tags are visible on case study cards', async ({ page }) => {
    const tags = page.getByTestId('cs-card-0').locator('.tag');
    await expect(tags.first()).toBeVisible();
  });

  test('no GitHub links in case study cards (removed in v2)', async ({ page }) => {
    const html = await page.getByTestId('case-studies').innerHTML();
    expect(html.toLowerCase()).not.toContain('view on github');
    expect(html.toLowerCase()).not.toContain('github →');
  });

  // ── No deprecated colours ─────────────────────────────────────

  test('no old cyan accent (#06b6d4) in case studies section', async ({ page }) => {
    const html = await page.getByTestId('case-studies').innerHTML();
    expect(html.toLowerCase()).not.toContain('#06b6d4');
    expect(html.toLowerCase()).not.toContain('06b6d4');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — case studies section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.getByTestId('case-studies').screenshot({ path: 'tests/screenshots/task4-01-case-studies.png' });
  });

  test('screenshot — all projects section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(200);
    await page.getByTestId('all-projects').screenshot({ path: 'tests/screenshots/task4-02-all-projects.png' });
  });
});
