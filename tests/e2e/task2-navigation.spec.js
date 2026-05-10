const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('Task 2 — Navigation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
  });

  // ── Desktop nav ───────────────────────────────────────────────

  test('desktop nav has all required links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const nav = page.getByTestId('desktop-nav');
    await expect(nav.getByTestId('nav-work')).toBeVisible();
    await expect(nav.getByTestId('nav-experience')).toBeVisible();
    await expect(nav.getByTestId('nav-skills')).toBeVisible();
    await expect(nav.getByTestId('nav-visual-guides')).toBeVisible();
    await expect(nav.getByTestId('nav-contact')).toBeVisible();
  });

  test('Visual Guides link points to visual_guide/index.html', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const link = page.getByTestId('nav-visual-guides');
    await expect(link).toHaveAttribute('href', /visual_guide\/index\.html/);
  });

  test('desktop nav has no links to deprecated pages', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const nav = page.getByTestId('desktop-nav');
    const html = await nav.innerHTML();
    expect(html).not.toContain('food.html');
    expect(html).not.toContain('dsa-viz.html');
    expect(html).not.toContain('ml-viz.html');
    expect(html).not.toContain('travel.html');
  });

  test('desktop nav has no More dropdown', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    const nav = page.getByTestId('desktop-nav');
    const html = await nav.innerHTML();
    expect(html).not.toContain('dropdown');
    await expect(nav.getByText('More')).toHaveCount(0);
  });

  test('Open to work badge is visible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.getByTestId('otw-badge')).toBeVisible();
  });

  test('LinkedIn, GitHub, Resume CTA visible on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await expect(page.getByTestId('nav-linkedin')).toBeVisible();
    await expect(page.getByTestId('nav-github')).toBeVisible();
    await expect(page.getByTestId('nav-resume')).toBeVisible();
  });

  // ── Mobile nav ────────────────────────────────────────────────

  test('mobile menu contains all required links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);

    // open hamburger
    await page.getByTestId('hamburger').click();
    const mob = page.getByTestId('mob-menu');
    await expect(mob).toBeVisible();

    await expect(mob.getByTestId('mob-work')).toBeVisible();
    await expect(mob.getByTestId('mob-experience')).toBeVisible();
    await expect(mob.getByTestId('mob-skills')).toBeVisible();
    await expect(mob.getByTestId('mob-visual-guides')).toBeVisible();
    await expect(mob.getByTestId('mob-contact')).toBeVisible();
  });

  test('mobile menu has no deprecated page links', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);
    await page.getByTestId('hamburger').click();
    const html = await page.getByTestId('mob-menu').innerHTML();
    expect(html).not.toContain('food.html');
    expect(html).not.toContain('dsa-viz.html');
    expect(html).not.toContain('ml-viz.html');
    expect(html).not.toContain('travel.html');
  });

  // ── Screenshots ───────────────────────────────────────────────

  test('screenshot — desktop nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.screenshot({ path: 'tests/screenshots/task2-01-desktop-nav.png', clip: { x: 0, y: 0, width: 1280, height: 70 } });
  });

  test('screenshot — mobile menu open', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(INDEX);
    await page.getByTestId('hamburger').click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: 'tests/screenshots/task2-02-mobile-menu-open.png' });
  });
});
