const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 7 — Skills & Awards', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Skills ────────────────────────────────────────────────────

  test('skills section is present', async ({ page }) => {
    await expect(page.getByTestId('skills-section')).toBeVisible();
  });

  test('skills section has 6 groups', async ({ page }) => {
    const groups = page.getByTestId('skills-section').locator('[data-testid^="skill-group-"]');
    await expect(groups).toHaveCount(6);
  });

  test('first skill group label uses --acc (Apple light blue)', async ({ page }) => {
    const label = page.getByTestId('skill-group-0').getByTestId('skill-label');
    await expect(label).toBeVisible();
    const color = await label.evaluate(el => getComputedStyle(el).color);
    // --acc = #0071e3 = rgb(0, 113, 227)
    expect(color).toBe('rgb(0, 113, 227)');
  });

  test('third skill group label uses indigo (#6366f1)', async ({ page }) => {
    const label = page.getByTestId('skill-group-2').getByTestId('skill-label');
    const color = await label.evaluate(el => getComputedStyle(el).color);
    // Inference Engineering uses #6366f1 = rgb(99, 102, 241)
    expect(color).toBe('rgb(99, 102, 241)');
  });

  test('skill tags use --surf2 background', async ({ page }) => {
    const tag = page.getByTestId('skill-group-0').locator('.tag').first();
    await expect(tag).toBeVisible();
    const bg = await tag.evaluate(el => getComputedStyle(el).backgroundColor);
    // --surf2 = #e8e8ed = rgb(232, 232, 237)
    expect(bg).toBe('rgb(232, 232, 237)');
  });

  test('no old cyan (#06b6d4) in skills section', async ({ page }) => {
    const html = await page.getByTestId('skills-section').innerHTML();
    expect(html).not.toContain('#06b6d4');
    expect(html).not.toContain('#a855f7');
  });

  // ── Awards ────────────────────────────────────────────────────

  test('awards section is present', async ({ page }) => {
    await expect(page.getByTestId('awards-section')).toBeVisible();
  });

  test('awards section has 6 cards', async ({ page }) => {
    const cards = page.getByTestId('awards-section').locator('[data-testid^="award-card-"]');
    await expect(cards).toHaveCount(6);
  });

  test('award card backgrounds use --surf (#f5f5f7)', async ({ page }) => {
    const card = page.getByTestId('award-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // --surf = #f5f5f7
  });

  test('award titles use --t1 (dark)', async ({ page }) => {
    const title = page.getByTestId('award-card-0').getByTestId('award-title');
    const color = await title.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(29, 29, 31)'); // --t1 = #1d1d1f
  });

  test('award subtitles use --t3 (muted)', async ({ page }) => {
    const sub = page.getByTestId('award-card-0').getByTestId('award-sub');
    const color = await sub.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(174, 174, 178)'); // --t3 = #aeaeb2
  });

  test('no old hardcoded colours in awards section', async ({ page }) => {
    const html = await page.getByTestId('awards-section').innerHTML();
    expect(html).not.toContain('#F1F5F9');
    expect(html).not.toContain('#64748b');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — skills section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('skills-section').screenshot({ path: 'tests/screenshots/task7-01-skills.png' });
  });

  test('screenshot — awards section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('awards-section').screenshot({ path: 'tests/screenshots/task7-02-awards.png' });
  });
});
