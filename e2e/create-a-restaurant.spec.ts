import { test, expect } from '@playwright/test';
import { faker, simpleFaker } from '@faker-js/faker';

test.describe('Creating a Restaurant', () => {
  test('can create a restaurant', async ({ page }) => {
    // Arrange
    const restaurantName = faker.lorem.words(2);
    const restaurantId = simpleFaker.number.int(10);
    await page.route('**/api.outsidein.dev/*/restaurants', route => {
      if (route.request().method() === 'POST') {
        const json = {
          name: restaurantName,
          id: restaurantId,
        };
        route.fulfill({ json });
      } else {
        route.fulfill({ json: [] });
      }
    });

    // Act
    await page.goto('/');
    await page
      .getByRole('textbox', { name: 'Add Restaurant' })
      .fill(restaurantName);
    await page.getByRole('button', { name: 'Add' }).click();

    // Assert
    await expect(page.getByText(restaurantName)).toBeVisible();
  });
});
