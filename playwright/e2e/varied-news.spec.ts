import { expect, test } from '@playwright/test';

test.describe('VariedNewsComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/noticias/tecnologia');
  });

  test('should display the varied news title', async ({ page }) => {
    const variedNewsTitle = page.locator('[data-test="varied-news-title"]');
    await expect(variedNewsTitle).toBeVisible();
    await expect(variedNewsTitle).toHaveText('Notícias sobre Tecnologia');
  });

  test('should display varied news cards', async ({ page }) => {
    const cards = page.locator('[data-test="varied-news-card"]');
    await expect(cards).toHaveCount(4);
  });

  test('should display the card titles', async ({ page }) => {
    const cardTitles = page
      .locator('[data-test="varied-news-card-title"]')
      .all();
    (await cardTitles).filter((item) => expect(item).toBeVisible());
  });

  test('should display the card images', async ({ page }) => {
    const cardImages = page
      .locator('[data-test="varied-news-card-image"]')
      .all();
    (await cardImages).filter((item) =>
      expect(item).toBeVisible({ timeout: 2000 })
    );
  });

  test('should display the card subtitles', async ({ page }) => {
    const cardSubtitles = page
      .locator('[data-test="varied-news-card-subtitle"]')
      .all();
    (await cardSubtitles).filter((item) => expect(item).toBeVisible());
  });

  test('should display the card content', async ({ page }) => {
    const cardContent = page
      .locator('[data-test="varied-news-card-content"]')
      .all();
    (await cardContent).filter((item) => expect(item).toBeVisible());
  });

  test('should display the card authors', async ({ page }) => {
    const cardAuthors = page
      .locator('[data-test="varied-news-card-author"]')
      .all();
    (await cardAuthors).filter((item) => expect(item).toBeVisible());
  });

  test('should display error message when there is an error', async ({
    page,
  }) => {
    await page.route('**/varied-news', (route) => route.abort());

    await page.goto('http://localhost:4200/noticias/tecnologia');
    const errorMessage = page.locator(
      '[data-test="varied-news-error-message"]'
    );
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Não foi possíver carregar as notícias variadas, por favor, tente novamente mais tarde.'
    );
  });
});
