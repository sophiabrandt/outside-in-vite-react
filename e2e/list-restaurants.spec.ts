import { test, expect } from '@playwright/test';

test.describe('Listing Restaurants', () => {
  test('shows restaurants from server', async ({ page }) => {
    // Arrange
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';
    await page.route('https://api.outsidein.dev/*/restaurants', async route => {
      const json = [
        {
          name: sushiPlace,
          id: 1,
        },
        {
          name: pizzaPlace,
          type: 2,
        },
      ];
      await route.fulfill({ json });
    });

    // Act
    await page.goto('/');

    // Assert
    await expect(page.getByText(sushiPlace)).toBeVisible();
    await expect(page.getByText(pizzaPlace)).toBeVisible();
  });
});
