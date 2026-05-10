const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v2 Task 2 — Hero, Stats & AI Engineer Positioning', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Title / meta ──────────────────────────────────────────────

  test('page title says AI Engineer, not Data Scientist', async ({ page }) => {
    const title = await page.title();
    expect(title).toContain('AI Engineer');
    expect(title).not.toContain('Data Scientist');
  });

  test('meta description mentions AI Engineer', async ({ page }) => {
    const desc = await page.$eval('meta[name="description"]', el => el.getAttribute('content'));
    expect(desc).toMatch(/AI Engineer/i);
  });

  // ── Hero section ──────────────────────────────────────────────

  test('hero eyebrow label says AI Engineer', async ({ page }) => {
    const label = page.getByTestId('hero-section').locator('.section-label').first();
    await expect(label).toContainText('AI Engineer');
  });

  test('hero headline is visible', async ({ page }) => {
    await expect(page.getByTestId('hero-headline')).toBeVisible();
  });

  test('hero subheadline mentions production or GenAI focus', async ({ page }) => {
    const sub = page.getByTestId('hero-section').locator('p').first();
    const text = await sub.textContent();
    const lower = text.toLowerCase();
    expect(lower.includes('agent') || lower.includes('production') || lower.includes('inference') || lower.includes('finetuning')).toBe(true);
  });

  test('hero photo is visible', async ({ page }) => {
    await expect(page.getByTestId('hero-photo')).toBeVisible();
  });

  test('hero floating badge uses --surf (light surface)', async ({ page }) => {
    const badge = page.getByTestId('hero-floating-badge');
    const bg = await badge.evaluate(el => getComputedStyle(el).backgroundColor);
    // --surf = #f5f5f7 = rgb(245, 245, 247)
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('hero CTA primary button is visible', async ({ page }) => {
    await expect(page.getByTestId('hero-cta-work')).toBeVisible();
  });

  test('availability text uses --green (dark green on light)', async ({ page }) => {
    const avail = page.getByTestId('hero-availability');
    const color = await avail.evaluate(el => getComputedStyle(el).color);
    // --green = #1c8c3c = rgb(28, 140, 60)
    expect(color).toBe('rgb(28, 140, 60)');
  });

  // ── Nav brand colour ──────────────────────────────────────────

  test('nav brand text is Apple charcoal (#1d1d1f)', async ({ page }) => {
    const brand = page.getByTestId('nav-brand');
    const color = await brand.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(29, 29, 31)');
  });

  // ── Stats strip ───────────────────────────────────────────────

  test('stats strip is visible', async ({ page }) => {
    await expect(page.getByTestId('stats-strip')).toBeVisible();
  });

  test('stat pills use --surf (light) background', async ({ page }) => {
    const pill = page.getByTestId('stat-0');
    const bg = await pill.evaluate(el => getComputedStyle(el).backgroundColor);
    // --surf = #f5f5f7 = rgb(245, 245, 247)
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('stat numbers use --acc (Apple light blue)', async ({ page }) => {
    const num = page.getByTestId('stat-0').getByTestId('pill-num');
    const color = await num.evaluate(el => getComputedStyle(el).color);
    // --acc = #0071e3 = rgb(0, 113, 227)
    expect(color).toBe('rgb(0, 113, 227)');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — hero section light theme', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('hero-section').screenshot({ path: 'tests/screenshots/v2-task2-01-hero.png' });
  });

  test('screenshot — stats strip', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('stats-strip').screenshot({ path: 'tests/screenshots/v2-task2-02-stats.png' });
  });
});
