import { expect, test } from '@playwright/test';

test.describe('MainNewComponent', () => {
  test.beforeEach(async ({ page }) => {
    // Navegue para a página que contém o componente MainNewComponent
    await page.goto('http://localhost:4200/noticia-principal/1');
  });

  test('should display the main news title', async ({ page }) => {
    const mainTitle = page.locator('[data-test="main-title"]');
    await expect(mainTitle).toBeVisible();
  });

  test('should display the first subtitle', async ({ page }) => {
    const subtitle0 = page.locator('[data-test="subtitle-0"]');
    await expect(subtitle0).toBeVisible();
  });

  test('should display the second subtitle', async ({ page }) => {
    const subtitle1 = page.locator('[data-test="subtitle-1"]');
    await expect(subtitle1).toBeVisible();
  });

  test('should display the date and author', async ({ page }) => {
    const dateAuthor = page.locator('[data-test="date-author"]');
    await expect(dateAuthor).toBeVisible();
  });

  test('should display the main images', async ({ page }) => {
    const mainImage0 = page.locator('[data-test="main-image-0"]');
    const mainImage1 = page.locator('[data-test="main-image-1"]');
    await expect(mainImage0).toBeVisible();
    await expect(mainImage1).toBeVisible();
  });

  test('should display the first part of the content', async ({ page }) => {
    const firstPart = page.locator('[data-test="first-part"]');
    await expect(firstPart).toBeVisible();
  });

  test('should display the second part of the content', async ({ page }) => {
    const secondPart = page.locator('[data-test="second-part"]');
    await expect(secondPart).toBeVisible();
  });

  test('should display error message when there is an error', async ({
    page,
  }) => {
    await page.route('**/main-news/1', (route) => route.abort());

    await page.goto('http://localhost:4200/noticia-principal/1');
    const errorMessage = page.locator('[data-test="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Não foi possíver carregar a notícia principal, por favor, tente novamente mais tarde.'
    );
  });
});
