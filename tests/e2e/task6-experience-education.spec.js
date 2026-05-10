const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 6 — Experience Timeline & Education', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Experience section ────────────────────────────────────────

  test('experience section is present', async ({ page }) => {
    await expect(page.getByTestId('experience-section')).toBeVisible();
  });

  test('timeline has 4 items', async ({ page }) => {
    const items = page.getByTestId('experience-section').locator('[data-testid^="tl-item-"]');
    await expect(items).toHaveCount(4);
  });

  test('role names use --t1 (white text)', async ({ page }) => {
    const role = page.getByTestId('tl-item-0').getByTestId('tl-role');
    await expect(role).toBeVisible();
    const color = await role.evaluate(el => getComputedStyle(el).color);
    // --t1 = #f5f5f7 = rgb(245, 245, 247)
    expect(color).toBe('rgb(245, 245, 247)');
  });

  test('company names use --acc (Apple blue)', async ({ page }) => {
    const company = page.getByTestId('tl-item-0').getByTestId('tl-company');
    await expect(company).toBeVisible();
    const color = await company.evaluate(el => getComputedStyle(el).color);
    // --acc = #2997ff = rgb(41, 151, 255)
    expect(color).toBe('rgb(41, 151, 255)');
  });

  test('date metadata uses --t3 (muted)', async ({ page }) => {
    const date = page.getByTestId('tl-item-0').getByTestId('tl-date');
    await expect(date).toBeVisible();
    const color = await date.evaluate(el => getComputedStyle(el).color);
    // --t3 = #6e6e73 = rgb(110, 110, 115)
    expect(color).toBe('rgb(110, 110, 115)');
  });

  test('no old cyan (#06b6d4) colour in experience section', async ({ page }) => {
    const html = await page.getByTestId('experience-section').innerHTML();
    expect(html).not.toContain('#06b6d4');
    expect(html).not.toContain('Space Grotesk');
  });

  test('first timeline item mentions TransUnion', async ({ page }) => {
    await expect(page.getByTestId('tl-item-0')).toContainText('TransUnion');
  });

  // ── Education section ─────────────────────────────────────────

  test('education section is present', async ({ page }) => {
    await expect(page.getByTestId('education-section')).toBeVisible();
  });

  test('education has 2 cards', async ({ page }) => {
    const cards = page.getByTestId('education-section').locator('[data-testid^="edu-card-"]');
    await expect(cards).toHaveCount(2);
  });

  test('education card backgrounds use --surf (#161617)', async ({ page }) => {
    const card = page.getByTestId('edu-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(22, 22, 23)'); // #161617
  });

  test('institution name uses --acc (Apple blue)', async ({ page }) => {
    const inst = page.getByTestId('edu-card-0').getByTestId('edu-institution');
    const color = await inst.evaluate(el => getComputedStyle(el).color);
    // rgb(41, 151, 255) = #2997ff
    expect(color).toBe('rgb(41, 151, 255)');
  });

  test('IISc logo image is present', async ({ page }) => {
    const img = page.getByTestId('edu-card-0').locator('img');
    await expect(img).toBeVisible();
  });

  test('no old cyan (#06b6d4) in education section', async ({ page }) => {
    const html = await page.getByTestId('education-section').innerHTML();
    expect(html).not.toContain('#06b6d4');
    expect(html).not.toContain('#1a2236');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — experience timeline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('experience-section').screenshot({ path: 'tests/screenshots/task6-01-experience.png' });
  });

  test('screenshot — education cards', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('education-section').screenshot({ path: 'tests/screenshots/task6-02-education.png' });
  });
});
