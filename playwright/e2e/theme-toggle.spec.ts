import { test, expect } from '@playwright/test';

test.describe('ThemeToggleComponent', () => {
  test.beforeEach(async ({ page }) => {

    await page.goto('http://localhost:4200/noticias');
  });

  test('should display the theme toggle button', async ({ page }) => {
    const toggleButton = page.locator('[data-test="theme-toggle-button"]');
    await expect(toggleButton).toBeVisible();
  });

  test('should toggle dark mode on button click', async ({ page }) => {
    const toggleButton = page.locator('[data-test="theme-toggle-button"]');
    const toggleIcon = page.locator('[data-test="theme-toggle-icon"]');

    await expect(toggleIcon).toHaveClass(/bi-moon-stars/);
    await expect(page.locator('body')).toHaveAttribute('data-bs-theme', 'light');

    await toggleButton.click();
    await expect(toggleIcon).toHaveClass(/bi-brightness-high/);
    await expect(page.locator('body')).toHaveAttribute('data-bs-theme', 'dark');

    await toggleButton.click();
    await expect(toggleIcon).toHaveClass(/bi-moon-stars/);
    await expect(page.locator('body')).toHaveAttribute('data-bs-theme', 'light');
  });
});