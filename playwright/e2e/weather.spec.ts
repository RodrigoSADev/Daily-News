import { expect, test } from '@playwright/test';

test.describe('WeatherComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/noticias');
  });

  test('should display the weather form', async ({ page }) => {
    const form = page.locator('form[role="search"]');
    await expect(form).toBeVisible();
  });

  test('should display validation errors', async ({ page }) => {
    const input = page.locator('[data-test="weather-search-input"]');
    const button = page.locator('[data-test="weather-search-button"]');

    await input.fill('');
    await button.click();
    const errorRequired = page.locator('[data-test="weather-error-required"]');
    await expect(errorRequired).toBeVisible();
    await expect(errorRequired).toHaveText('Por favor, digite uma palavra.');

    await input.fill('ab');
    await button.click();
    const errorMinLength = page.locator(
      '[data-test="weather-error-minlength"]'
    );
    await expect(errorMinLength).toBeVisible();
    await expect(errorMinLength).toHaveText(
      'Digite uma palavra com no mínimo três letras.'
    );
  });

  test('should search for weather data', async ({ page }) => {
    const input = page.locator('[data-test="weather-search-input"]');
    const button = page.locator('[data-test="weather-search-button"]');

    await input.fill('Rio de Janeiro');
    await button.click();

    const weatherData = page.locator('[data-test="weather-data"]');
    await expect(weatherData).toBeVisible();
    await expect(weatherData).toContainText('Rio de Janeiro');
  });

  test('should display error message when there is an error', async ({
    page,
  }) => {
    await page.route('**/weather', (route) => route.abort());

    const input = page.locator('[data-test="weather-search-input"]');
    const button = page.locator('[data-test="weather-search-button"]');

    await input.fill('Test City');
    await button.click();

    const errorMessage = page.locator('[data-test="weather-error-message"]');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(
      'Erro ao carregar a previsão do tempo.'
    );
  });
});
