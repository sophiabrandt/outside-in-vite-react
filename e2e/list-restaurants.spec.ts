import { test, expect } from '@playwright/test';
import { faker, simpleFaker } from '@faker-js/faker';

test.describe('Listing Restaurants', () => {
  test('shows restaurants from server', async ({ page }) => {
    // Arrange
    const restaurant1 = faker.company.name();
    const restaurant2 = faker.company.name();
    await page.route('**/api.outsidein.dev/*/restaurants', route => {
      const json = [
        {
          name: restaurant1,
          id: simpleFaker.number.int(10),
        },
        {
          name: restaurant2,
          id: simpleFaker.number.int(10),
        },
      ];
      route.fulfill({ json });
    });

    // Act
    await page.goto('/');

    // Assert
    await expect(page.getByText(restaurant1)).toBeVisible();
    await expect(page.getByText(restaurant2)).toBeVisible();
  });
});
