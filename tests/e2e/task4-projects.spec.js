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

  // ── Apple Night token colours ────────────────────────────────

  test('case study card backgrounds use --surf (#161617)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    await expect(card).toBeVisible();
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(22, 22, 23)'); // #161617
  });

  test('card border-radius is 18px (Apple lg)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const radius = await card.evaluate(el => getComputedStyle(el).borderRadius);
    expect(parseInt(radius)).toBeGreaterThanOrEqual(16);
  });

  // ── Top-border accent colours ─────────────────────────────────

  test('first card has blue top border (#2997ff)', async ({ page }) => {
    const card = page.getByTestId('cs-card-0');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #2997ff = rgb(41, 151, 255)
    expect(borderTop).toBe('rgb(41, 151, 255)');
  });

  test('second card has indigo top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-1');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #818cf8 = rgb(129, 140, 248)
    expect(borderTop).toBe('rgb(129, 140, 248)');
  });

  test('third card has purple top border', async ({ page }) => {
    const card = page.getByTestId('cs-card-2');
    const borderTop = await card.evaluate(el => getComputedStyle(el).borderTopColor);
    // #bf5af2 = rgb(191, 90, 242)
    expect(borderTop).toBe('rgb(191, 90, 242)');
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

  test('GitHub link present on case study cards', async ({ page }) => {
    const link = page.getByTestId('cs-card-0').locator('a.link');
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', /github\.com/);
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
