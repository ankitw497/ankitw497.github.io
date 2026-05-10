const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  use: {
    headless: true,
    viewport: { width: 1280, height: 900 },
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
