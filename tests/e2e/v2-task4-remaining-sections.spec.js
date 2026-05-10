const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v2 Task 4 — All Remaining Sections Light Theme', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Experience ────────────────────────────────────────────────

  test('experience section: role uses --t1 charcoal', async ({ page }) => {
    const role = page.getByTestId('tl-item-0').getByTestId('tl-role');
    const color = await role.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(29, 29, 31)'); // --t1 = #1d1d1f
  });

  test('experience section: company uses --acc light blue', async ({ page }) => {
    const company = page.getByTestId('tl-item-0').getByTestId('tl-company');
    const color = await company.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(0, 113, 227)'); // --acc = #0071e3
  });

  test('experience section: no dark surfaces in innerHTML', async ({ page }) => {
    const html = await page.getByTestId('experience-section').innerHTML();
    expect(html).not.toContain('#161617');
    expect(html).not.toContain('rgba(255,255,255');
  });

  // ── Education ─────────────────────────────────────────────────

  test('education cards use --surf (light) background', async ({ page }) => {
    const card = page.getByTestId('edu-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // --surf = #f5f5f7
  });

  test('edu institution uses --acc light blue', async ({ page }) => {
    const inst = page.getByTestId('edu-card-0').getByTestId('edu-institution');
    const color = await inst.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(0, 113, 227)');
  });

  // ── Skills ────────────────────────────────────────────────────

  test('skill tags use --surf2 background', async ({ page }) => {
    const tag = page.getByTestId('skill-group-0').locator('.tag').first();
    const bg = await tag.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(232, 232, 237)'); // --surf2 = #e8e8ed
  });

  test('no dark tag colours remaining', async ({ page }) => {
    const html = await page.getByTestId('skills-section').innerHTML();
    expect(html).not.toContain('#1c1c1e');
  });

  // ── Awards ────────────────────────────────────────────────────

  test('award cards use --surf (light) background', async ({ page }) => {
    const card = page.getByTestId('award-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('award titles use --t1 charcoal', async ({ page }) => {
    const title = page.getByTestId('award-card-0').getByTestId('award-title');
    const color = await title.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(29, 29, 31)');
  });

  // ── Beyond ────────────────────────────────────────────────────

  test('photo grid items use --surf (light) background', async ({ page }) => {
    const item = page.getByTestId('photo-0');
    const bg = await item.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  test('beyond caption uses --t3 muted', async ({ page }) => {
    const caption = page.getByTestId('beyond-caption');
    const color = await caption.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(174, 174, 178)'); // --t3 = #aeaeb2
  });

  // ── Contact ───────────────────────────────────────────────────

  test('contact form inputs use --surf background', async ({ page }) => {
    const input = page.getByTestId('contact-section').locator('input[name="name"]');
    const bg = await input.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)');
  });

  // ── Footer ────────────────────────────────────────────────────

  test('footer copyright uses --t3 muted', async ({ page }) => {
    const copy = page.getByTestId('footer-copy');
    const color = await copy.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(174, 174, 178)');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — experience light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('experience-section').screenshot({ path: 'tests/screenshots/v2-task4-01-experience.png' });
  });

  test('screenshot — skills light', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('skills-section').screenshot({ path: 'tests/screenshots/v2-task4-02-skills.png' });
  });
});
