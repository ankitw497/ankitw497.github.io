const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v3 Task 6 — Certifications section', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('certifications section is present', async ({ page }) => {
    await expect(page.getByTestId('certifications-section')).toBeVisible();
  });

  test('certifications section has 5 cert cards', async ({ page }) => {
    const cards = page.getByTestId('certifications-section').locator('[data-testid^="cert-card-"]');
    await expect(cards).toHaveCount(5);
  });

  test('cert-card-0 contains Federated Fine-tuning', async ({ page }) => {
    await expect(page.getByTestId('cert-card-0')).toContainText('Federated');
  });

  test('cert-card-1 contains Bedrock', async ({ page }) => {
    await expect(page.getByTestId('cert-card-1')).toContainText('Bedrock');
  });

  test('cert-card-2 contains LangChain', async ({ page }) => {
    await expect(page.getByTestId('cert-card-2')).toContainText('LangChain');
  });

  test('cert-card-3 contains Finetuning', async ({ page }) => {
    await expect(page.getByTestId('cert-card-3')).toContainText('Finetuning');
  });

  test('cert-card-4 contains Fraud Detection', async ({ page }) => {
    await expect(page.getByTestId('cert-card-4')).toContainText('Fraud');
  });

  test('all cert cards show issuer (DeepLearning.AI or Coursera)', async ({ page }) => {
    const cards = page.getByTestId('certifications-section').locator('[data-testid^="cert-card-"]');
    for (const card of await cards.all()) {
      const text = await card.textContent();
      const hasIssuer = text.includes('DeepLearning') || text.includes('Coursera');
      expect(hasIssuer).toBe(true);
    }
  });

  test('screenshot — certifications section desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('certifications-section').screenshot({ path: 'tests/screenshots/v3-task6-01-certs.png' });
  });
});
