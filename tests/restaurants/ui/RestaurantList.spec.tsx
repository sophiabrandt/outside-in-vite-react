import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/restaurants/ui/RestaurantList';
import { Restaurant } from '@/restaurants/types/Restaurant';

describe('RestaurantList', () => {
  describe('when loading succeeds', () => {
    it('should not display a loading indicator', () => {
      // Arrange
      const restaurants: Restaurant[] = [];
      const isLoading = false;

      // Act
      render(
        <RestaurantList restaurants={restaurants} isLoading={isLoading} />
      );

      // Assert
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should display the restaurants', () => {
      // Arrange
      const sushiPlace = 'Sushi Place';
      const pizzaPlace = 'Pizza Place';
      const restaurants = [
        {
          name: sushiPlace,
          id: 1,
        },
        {
          name: pizzaPlace,
          id: 2,
        },
      ];

      // Act
      render(<RestaurantList restaurants={restaurants} />);

      // Assert
      expect(screen.getByText(sushiPlace)).toBeInTheDocument();
      expect(screen.getByText(pizzaPlace)).toBeInTheDocument();
    });
  });

  describe('when loading', () => {
    it('should display a loading indicator', () => {
      // Arrange
      const restaurants: Restaurant[] = [];
      const isLoading = true;
      //
      // Act
      render(
        <RestaurantList restaurants={restaurants} isLoading={isLoading} />
      );

      // Assert
      expect(screen.getByRole('progressbar')).toBeVisible();
    });
  });
});
