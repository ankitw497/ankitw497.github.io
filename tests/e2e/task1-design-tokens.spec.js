const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const TOKENS_PATH = path.join(__dirname, '../../sprints/v1/design-tokens.css');

const REQUIRED_TOKENS = [
  '--bg', '--surf', '--surf2', '--border',
  '--t1', '--t2', '--t3',
  '--acc', '--acc-l', '--acc-bg', '--acc-bd',
];

const REQUIRED_CLASSES = [
  '.card', '.btn-primary', '.btn-outline', '.btn-ghost',
  '.tag', '.nav-link', '.section-label', '.section-title',
];

test.describe('Task 1 — Design Tokens', () => {
  test('design-tokens.css exists', () => {
    expect(fs.existsSync(TOKENS_PATH)).toBe(true);
  });

  test('all required CSS variables are defined', () => {
    const css = fs.readFileSync(TOKENS_PATH, 'utf8');
    for (const token of REQUIRED_TOKENS) {
      expect(css, `Missing token: ${token}`).toContain(token + ':');
    }
  });

  test('all required component classes are defined', () => {
    const css = fs.readFileSync(TOKENS_PATH, 'utf8');
    for (const cls of REQUIRED_CLASSES) {
      expect(css, `Missing class: ${cls}`).toContain(cls);
    }
  });

  test('token values match Apple Night palette', () => {
    const css = fs.readFileSync(TOKENS_PATH, 'utf8');
    expect(css).toContain('#000000');    // --bg
    expect(css).toContain('#161617');    // --surf
    expect(css).toContain('#1c1c1e');    // --surf2
    expect(css).toContain('#f5f5f7');    // --t1
    expect(css).toContain('#a1a1a6');    // --t2
    expect(css).toContain('#6e6e73');    // --t3
    expect(css).toContain('#2997ff');    // --acc
    expect(css).toContain('#5abaff');    // --acc-l
  });

  test('visual preview — screenshot token showcase page', async ({ page }) => {
    const css = fs.readFileSync(TOKENS_PATH, 'utf8');
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>${css}</style>
</head>
<body style="padding:32px;background:#000">
  <p class="section-label" data-testid="label">Design Tokens</p>
  <h2 class="section-title" data-testid="title">Apple Night System</h2>
  <div class="card" style="padding:20px;margin:20px 0;max-width:400px">
    <span class="tag" data-testid="tag">PyTorch</span>
    <span class="tag">LangGraph</span>
  </div>
  <div style="display:flex;gap:12px;margin-top:16px">
    <a href="#" class="btn-primary" data-testid="btn-primary">Primary</a>
    <a href="#" class="btn-outline" data-testid="btn-outline">Outline</a>
    <a href="#" class="btn-ghost" data-testid="btn-ghost">Ghost</a>
  </div>
</body></html>`;

    await page.setContent(html);
    await page.screenshot({ path: 'tests/screenshots/task1-01-token-showcase.png', fullPage: true });

    await expect(page.getByTestId('label')).toBeVisible();
    await expect(page.getByTestId('title')).toBeVisible();
    await expect(page.getByTestId('tag')).toBeVisible();
    await expect(page.getByTestId('btn-primary')).toBeVisible();
    await expect(page.getByTestId('btn-outline')).toBeVisible();
  });
});
