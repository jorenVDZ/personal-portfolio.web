import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  use: { channel: 'msedge', baseURL: 'http://localhost:4300', viewport: { width: 1440, height: 900 } },
  webServer: { command: 'npx ng serve --port 4300', url: 'http://localhost:4300', reuseExistingServer: false, timeout: 120_000 },
});
