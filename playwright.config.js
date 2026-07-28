import { defineConfig, devices } from '@playwright/test';

// Frontend-only regression suite for NepalFlow.
// These tests DO NOT need the backend running — they test your React app
// (landing, routing, login validation, offline handling, responsive).
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Auto-starts your Vite dev server before the tests, and reuses it if
  // you already have `npm run dev` running.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/Capstone/',
    reuseExistingServer: true,
    timeout: 120000,
  },
});
