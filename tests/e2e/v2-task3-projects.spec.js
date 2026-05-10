const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v2 Task 3 — Case Studies & Projects (light theme, no GitHub links)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Card backgrounds ──────────────────────────────────────────

  test('case study cards use --surf background (light)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    // --surf = #f5f5f7 = rgb(245, 245, 247)
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('project cards use --surf background (light)', async ({ page }) => {
    const card = page.getByTestId('proj-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('card border is light (rgba black)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const border = await card.evaluate(el => getComputedStyle(el).borderColor);
    // rgba(0,0,0,.08) — should contain rgb(0, 0, 0) or similar
    // borderColor returns the computed RGBA, which for rgba(0,0,0,.08) is rgba(0,0,0,0.08)
    expect(border).toContain('rgba(0, 0, 0');
  });

  // ── No GitHub links ───────────────────────────────────────────

  test('no "View on GitHub" text in case studies section', async ({ page }) => {
    const html = await page.getByTestId('case-studies').innerHTML();
    expect(html).not.toContain('View on GitHub');
    expect(html).not.toContain('github.com/ankitw497');
  });

  test('no "View on GitHub" text in all-projects section', async ({ page }) => {
    const html = await page.getByTestId('all-projects').innerHTML();
    expect(html).not.toContain('View on GitHub');
  });

  // ── Tags ──────────────────────────────────────────────────────

  test('tech tags use --surf2 background', async ({ page }) => {
    const tag = page.getByTestId('cs-card-0').locator('.tag').first();
    const bg = await tag.evaluate(el => getComputedStyle(el).backgroundColor);
    // --surf2 = #e8e8ed = rgb(232, 232, 237)
    expect(bg).toBe('rgb(232, 232, 237)');
  });

  // ── Card count ────────────────────────────────────────────────

  test('case studies has 3 cards', async ({ page }) => {
    const cards = page.getByTestId('case-studies').locator('[data-testid^="cs-card-"]');
    await expect(cards).toHaveCount(3);
  });

  test('all-projects has 6 cards', async ({ page }) => {
    const cards = page.getByTestId('all-projects').locator('[data-testid^="proj-card-"]');
    await expect(cards).toHaveCount(6);
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — case studies light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('case-studies').screenshot({ path: 'tests/screenshots/v2-task3-01-case-studies.png' });
  });

  test('screenshot — all projects light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('all-projects').screenshot({ path: 'tests/screenshots/v2-task3-02-all-projects.png' });
  });
});
