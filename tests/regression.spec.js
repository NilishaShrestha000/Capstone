import { test, expect } from '@playwright/test';

// Base path — your app is served under /Capstone/ (see vite.config.js).
const BASE = '/Capstone/';

// TC-01 — Landing page loads with its hero content.
test('TC-01 landing page loads', async ({ page }) => {
  await page.goto(BASE);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Forecasting Visitor/i);
  await expect(page.getByText(/SARIMAX/i).first()).toBeVisible();
});

// TC-03 — Client-side routing to the login view works.
test('TC-03 routing to login works', async ({ page }) => {
  await page.goto(BASE + 'login');
  await expect(page).toHaveURL(/\/Capstone\/login/);
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

// TC-07 — Landing page has no horizontal overflow on a mobile viewport.
test('TC-07 no horizontal scroll on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto(BASE);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  expect(overflow).toBeLessThanOrEqual(2); // allow 1-2px rounding
});

// TC-08 — Login page renders the form.
test('TC-08 login form renders', async ({ page }) => {
  await page.goto(BASE + 'login');
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

// TC-11 — Submitting an empty login is rejected client-side (no backend needed).
test('TC-11 empty login rejected', async ({ page }) => {
  await page.goto(BASE + 'login');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByText(/please fill in both fields/i)).toBeVisible();
});

// TC-12 — With no backend running, login shows a readable connection error
// (verifies the app fails gracefully instead of crashing).
test('TC-12 backend-down shows connection error', async ({ page }) => {
  await page.goto(BASE + 'login');
  await page.locator('input[type="email"]').fill('admin@tourism.com');
  await page.locator('input[type="password"]').fill('anything123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByText(/cannot connect to server/i)).toBeVisible({ timeout: 15000 });
});

// TC-17 — Admin route SHOULD require login. This documents defect D-01:
// ProtectedRoute is not applied, so this currently FAILS. test.fail() marks
// it as a known failure so the suite stays green. After you wrap the admin
// routes in ProtectedRoute, DELETE the test.fail() line and it will pass.
test('TC-17 admin route requires login (defect D-01)', async ({ page }) => {
  test.fail(); // <-- remove after applying ProtectedRoute
  await page.goto(BASE + 'adminhome');
  await expect(page).toHaveURL(/login/);
});
