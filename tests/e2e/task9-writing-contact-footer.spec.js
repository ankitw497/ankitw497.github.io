const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 9 — Writing, Contact & Footer', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  // ── Writing ───────────────────────────────────────────────────

  test('writing section is present', async ({ page }) => {
    await expect(page.getByTestId('writing-section')).toBeVisible();
  });

  test('writing card uses --surf background', async ({ page }) => {
    const card = page.getByTestId('writing-card-0');
    const bg = await card.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // --surf = #f5f5f7
  });

  test('writing card title uses --t1', async ({ page }) => {
    const title = page.getByTestId('writing-card-0').getByTestId('writing-title');
    const color = await title.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(29, 29, 31)'); // --t1 = #1d1d1f
  });

  test('no old hardcoded colours in writing section', async ({ page }) => {
    const html = await page.getByTestId('writing-section').innerHTML();
    expect(html).not.toContain('#F1F5F9');
    expect(html).not.toContain('#94a3b8');
    expect(html).not.toContain("'Space Grotesk'");
  });

  // ── Contact ───────────────────────────────────────────────────

  test('contact section is present', async ({ page }) => {
    await expect(page.getByTestId('contact-section')).toBeVisible();
  });

  test('contact form inputs use --surf background', async ({ page }) => {
    const input = page.getByTestId('contact-section').locator('input[name="name"]');
    const bg = await input.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(bg).toBe('rgb(245, 245, 247)'); // --surf = #f5f5f7
  });

  test('contact description uses --t2', async ({ page }) => {
    const desc = page.getByTestId('contact-section').getByTestId('contact-desc');
    const color = await desc.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(110, 110, 115)'); // --t2 = #6e6e73
  });

  test('no old hardcoded colours in contact section', async ({ page }) => {
    const html = await page.getByTestId('contact-section').innerHTML();
    expect(html).not.toContain('#94a3b8');
    expect(html).not.toContain('#64748b');
  });

  // ── Footer ────────────────────────────────────────────────────

  test('footer is present', async ({ page }) => {
    await expect(page.getByTestId('footer')).toBeVisible();
  });

  test('footer has buddhism.html link', async ({ page }) => {
    const link = page.getByTestId('footer').getByRole('link', { name: /Buddhism/i });
    await expect(link).toBeVisible();
  });

  test('footer copyright uses --t3', async ({ page }) => {
    const copy = page.getByTestId('footer').getByTestId('footer-copy');
    const color = await copy.evaluate(el => getComputedStyle(el).color);
    expect(color).toBe('rgb(174, 174, 178)'); // --t3 = #aeaeb2
  });

  test('no old hardcoded footer colours', async ({ page }) => {
    const html = await page.getByTestId('footer').innerHTML();
    expect(html).not.toContain('#64748b');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — writing section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('writing-section').screenshot({ path: 'tests/screenshots/task9-01-writing.png' });
  });

  test('screenshot — contact section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('contact-section').screenshot({ path: 'tests/screenshots/task9-02-contact.png' });
  });

  test('screenshot — footer', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('footer').screenshot({ path: 'tests/screenshots/task9-03-footer.png' });
  });
});
