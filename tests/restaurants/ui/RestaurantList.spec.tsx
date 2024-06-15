import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/restaurants/ui/RestaurantList';

describe('RestaurantList', () => {
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
