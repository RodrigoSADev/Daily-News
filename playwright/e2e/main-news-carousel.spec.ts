import { expect, test } from '@playwright/test';

test.describe('MainNewsCarouselComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/noticias');
  });

  test('should display the carousel title', async ({ page }) => {
    const carouselTitle = page.locator('[data-test="carousel-title"]');
    await expect(carouselTitle).toBeVisible();
    await expect(carouselTitle).toHaveText('Notícias Principais');
  });

  test('should display carousel slides', async ({ page }) => {
    const slides = page.locator('[data-test="carousel-slide"]');
    await expect(slides).toHaveCount(3);
  });

  test('should display the slide titles', async ({ page }) => {
    const slideTitles = page.locator('[data-test="carousel-slide-title"]');
    await expect(slideTitles.nth(0)).toBeVisible();
  });

  test('should display the slide images', async ({ page }) => {
    const slideImages = page.locator('[data-test="carousel-image"]');
    await expect(slideImages.nth(0)).toBeVisible();
  });
});
