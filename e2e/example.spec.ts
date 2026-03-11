import { expect, test } from '@playwright/test';

test('shows the boilerplate positioning', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Astro Supernova/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Astro boilerplate for Cloudflare',
  );
  await expect(page.getByRole('link', { name: 'Read the guide' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View edge endpoint' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open starter app' })).toBeVisible();
});

test('serves the sample endpoint', async ({ request }) => {
  const response = await request.get('/api/health.json');
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type']).toContain('application/json');
  await expect(response.json()).resolves.toEqual({
    status: 'ok',
    runtime: 'cloudflare-ready',
    stack: ['astro', 'cloudflare', 'tailwindcss', 'biome', 'vitest', 'playwright'],
  });
});

test('shows the D1 starter app state', async ({ page }) => {
  await page.goto('/starter/d1');
  await expect(page.getByRole('heading', { name: 'Tiny D1 guestbook' })).toBeVisible();
  await expect(page.locator('#d1-demo-status')).toContainText(
    /D1 is (connected|not configured yet)/,
  );
  await expect(page.getByRole('button', { name: 'Send to D1' })).toBeVisible();
});
