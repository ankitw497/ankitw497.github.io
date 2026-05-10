const { test, expect } = require('@playwright/test');
const path = require('path');

const INDEX = 'file://' + path.join(__dirname, '../../index.html');

test.describe('v2 Task 5 — Skills Reordered for AI Engineering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
  });

  test('skill-group-0 label says AI Agents', async ({ page }) => {
    const label = page.getByTestId('skill-group-0').getByTestId('skill-label');
    await expect(label).toContainText('Agents');
  });

  test('skill-group-1 label says LLM Finetuning', async ({ page }) => {
    const label = page.getByTestId('skill-group-1').getByTestId('skill-label');
    await expect(label).toContainText('Finetuning');
  });

  test('skill-group-2 label says Inference Engineering', async ({ page }) => {
    const label = page.getByTestId('skill-group-2').getByTestId('skill-label');
    await expect(label).toContainText('Inference');
  });

  test('skill-group-0 contains LangGraph tag', async ({ page }) => {
    const group = page.getByTestId('skill-group-0');
    await expect(group).toContainText('LangGraph');
  });

  test('skill-group-1 contains LoRA/QLoRA tag', async ({ page }) => {
    const group = page.getByTestId('skill-group-1');
    await expect(group).toContainText('LoRA');
  });

  test('skill-group-2 contains vLLM tag', async ({ page }) => {
    const group = page.getByTestId('skill-group-2');
    await expect(group).toContainText('vLLM');
  });

  test('still has 6 skill groups', async ({ page }) => {
    const groups = page.getByTestId('skills-section').locator('[data-testid^="skill-group-"]');
    await expect(groups).toHaveCount(6);
  });

  test('screenshot — skills section AI Engineering', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(INDEX);
    await page.addStyleTag({ content: '.reveal { opacity: 1 !important; transform: none !important; }' });
    await page.waitForTimeout(150);
    await page.getByTestId('skills-section').screenshot({ path: 'tests/screenshots/v2-task5-01-skills-ai-eng.png' });
  });
});
