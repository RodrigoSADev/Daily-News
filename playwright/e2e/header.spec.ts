import { expect, test } from '@playwright/test';

test.describe('HeaderComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/noticias');
  });

  test('should display the brand name', async ({ page }) => {
    const brandName = page.locator('[data-test="navbar-brand"]');
    await expect(brandName).toBeVisible();
    await expect(brandName).toHaveText('Daily News');
  });

  test('should display the menu button', async ({ page }) => {
    const menuButton = page.locator('[data-test="menu-button"]');
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveText('Menu');
  });

  test('should open and close the offcanvas menu', async ({ page }) => {
    const menuButton = page.locator('[data-test="menu-button"]');
    await menuButton.click();

    const offcanvas = page.locator('#offcanvasRight');
    await expect(offcanvas).toBeVisible();

    const closeButton = page.locator('.btn-close');
    await closeButton.click();
    await expect(offcanvas).not.toBeVisible();
  });

  test('should display the theme toggle component', async ({ page }) => {
    const themeToggle = page.locator('app-theme-toggle');
    await expect(themeToggle).toBeVisible();
  });
});
