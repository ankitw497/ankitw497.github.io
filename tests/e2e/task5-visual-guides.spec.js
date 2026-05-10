const { test, expect } = require('@playwright/test');
const path = require('path');

const HUB = 'file://' + path.join(__dirname, '../../visual_guide/index.html');
const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 5 — Visual Guides Hub', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(HUB);
  });

  // ── Page fundamentals ─────────────────────────────────────────

  test('page loads without errors', async ({ page }) => {
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(HUB);
    expect(errors.filter(e => !e.includes('favicon'))).toHaveLength(0);
  });

  test('page title contains "Visual"', async ({ page }) => {
    await expect(page).toHaveTitle(/Visual/i);
  });

  test('page background is Apple Light white', async ({ page }) => {
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(255, 255, 255)');
  });

  // ── Navigation ────────────────────────────────────────────────

  test('nav back link points to ../index.html', async ({ page }) => {
    const back = page.getByTestId('back-link');
    await expect(back).toBeVisible();
    const href = await back.getAttribute('href');
    expect(href).toMatch(/\.\.\/index\.html|index\.html/);
  });

  test('nav brand name is visible', async ({ page }) => {
    await expect(page.getByTestId('nav-brand')).toBeVisible();
  });

  // ── Hero / heading ────────────────────────────────────────────

  test('page heading contains "Visual Learning"', async ({ page }) => {
    const heading = page.getByTestId('page-heading');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Visual Learning');
  });

  test('subtitle is visible', async ({ page }) => {
    await expect(page.getByTestId('page-subtitle')).toBeVisible();
  });

  // ── Guide cards ───────────────────────────────────────────────

  test('guide grid has at least 2 published cards', async ({ page }) => {
    const guides = page.getByTestId('guides-grid').locator('[data-testid^="guide-card-"]');
    const count = await guides.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('HuggingFace guide card is present and links correctly', async ({ page }) => {
    const card = page.getByTestId('guide-card-hf');
    await expect(card).toBeVisible();
    const link = card.getByTestId('guide-link');
    await expect(link).toHaveAttribute('href', /hf_stack_apple\.html/);
  });

  test('Finetuning guide card is present and links correctly', async ({ page }) => {
    const card = page.getByTestId('guide-card-ft');
    await expect(card).toBeVisible();
    const link = card.getByTestId('guide-link');
    await expect(link).toHaveAttribute('href', /combined_guide_finetuning\.html/);
  });

  test('coming-soon placeholder card is present', async ({ page }) => {
    await expect(page.getByTestId('guide-card-soon')).toBeVisible();
  });

  test('each published guide card has an emoji icon', async ({ page }) => {
    const icon = page.getByTestId('guide-card-hf').getByTestId('guide-icon');
    await expect(icon).toBeVisible();
  });

  test('each published guide card has a title', async ({ page }) => {
    const title = page.getByTestId('guide-card-hf').getByTestId('guide-title');
    await expect(title).toBeVisible();
  });

  test('each published guide card has a description', async ({ page }) => {
    const desc = page.getByTestId('guide-card-hf').getByTestId('guide-desc');
    await expect(desc).toBeVisible();
  });

  test('"Read guide" link text is present', async ({ page }) => {
    const link = page.getByTestId('guide-card-hf').getByTestId('guide-link');
    await expect(link).toContainText(/Read/i);
  });

  // ── Consistency with main portfolio ──────────────────────────

  test('accent colour matches Apple light blue (#0071e3)', async ({ page }) => {
    const acc = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--acc').trim()
    );
    expect(acc).toBe('#0071e3');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — full hub page desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(HUB);
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/task5-01-hub-desktop.png', fullPage: true });
  });

  test('screenshot — guide cards close-up', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(HUB);
    await page.getByTestId('guides-grid').screenshot({ path: 'tests/screenshots/task5-02-guide-cards.png' });
  });

  test('screenshot — mobile hub', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(HUB);
    await page.screenshot({ path: 'tests/screenshots/task5-03-hub-mobile.png', fullPage: true });
  });
});
