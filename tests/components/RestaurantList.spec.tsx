import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/components/ui/RestaurantList';
import { Restaurant } from '@/components/types/Restaurant';

describe('RestaurantList', () => {
  it('should load restaurants on first render', () => {
    // Arrange
    const loadRestaurants = vi.fn().mockName('loadRestaurants');

    // Act
    renderComponent(loadRestaurants, []);

    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    // Arrange
    const noop = () => {};
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
    renderComponent(noop, restaurants);

    // Assert
    expect(screen.getByText(sushiPlace)).toBeInTheDocument();
    expect(screen.getByText(pizzaPlace)).toBeInTheDocument();
  });

  function renderComponent(
    loadRestaurants: () => void,
    restaurants: Restaurant[]
  ) {
    render(
      <RestaurantList
        loadRestaurants={loadRestaurants}
        restaurants={restaurants}
      />
    );
  }
});
