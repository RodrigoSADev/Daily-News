import { expect, test } from '@playwright/test';

test.describe('RecentNewsComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/noticias');
  });

  test('should display the recent news title', async ({ page }) => {
    const recentNewsTitle = page.locator('[data-test="recent-news-title"]');
    await expect(recentNewsTitle).toBeVisible();
  });

  test('should display recent news cards', async ({ page }) => {
    const cards = page.locator('[data-test="recent-news-card"]');
    await expect(cards).toHaveCount(2);
  });

  test('should display the card titles', async ({ page }) => {
    const cardTitles = page.locator('[data-test="recent-news-card-title"]');
    await expect(cardTitles.nth(0)).toBeVisible();
    await expect(cardTitles.nth(1)).toBeVisible();
  });

  test('should display the card images', async ({ page }) => {
    const cardImages = page.locator('[data-test="recent-news-card-image"]');
    await expect(cardImages.nth(0)).toBeVisible();
    await expect(cardImages.nth(1)).toBeVisible();
  });

  test('should display the card subtitles', async ({ page }) => {
    const cardSubtitles = page.locator(
      '[data-test="recent-news-card-subtitle"]'
    );
    await expect(cardSubtitles.nth(0)).toBeVisible();
    await expect(cardSubtitles.nth(1)).toBeVisible();
  });

  test('should display the card content', async ({ page }) => {
    const cardContent = page.locator('[data-test="recent-news-card-content"]');
    await expect(cardContent.nth(0)).toBeVisible();
    await expect(cardContent.nth(1)).toBeVisible();
  });

  test('should display the card authors', async ({ page }) => {
    const cardAuthors = page.locator('[data-test="recent-news-card-author"]');
    await expect(cardAuthors.nth(0)).toBeVisible();
    await expect(cardAuthors.nth(1)).toBeVisible();
  });

  test('should display the weather component', async ({ page }) => {
    const weatherComponent = page.locator('app-weather');
    await expect(weatherComponent).toBeVisible();
  });

  test('should display error message when there is an error', async ({
    page,
  }) => {
    await page.route('**/recent-news', (route) => route.abort());

    await page.goto('http://localhost:4200/');
    const errorMessage = page.locator('[data-test="error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Não foi possíver carregar as notícias recentes, por favor, tente novamente mais tarde.'
    );
  });
});
