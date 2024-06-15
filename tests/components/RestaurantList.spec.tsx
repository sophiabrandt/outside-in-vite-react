import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/components/RestaurantList';

describe('RestaurantList', () => {
  it('should load restaurants on first render', () => {
    // Arrange
    const loadRestaurants = vi.fn().mockName('loadRestaurants');

    // Act

    render(
      <RestaurantList loadRestaurants={loadRestaurants} restaurants={[]} />
    );

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
    render(<RestaurantList loadRestaurants={noop} restaurants={restaurants} />);

    // Assert
    expect(screen.getByText(sushiPlace)).toBeInTheDocument();
    expect(screen.getByText(pizzaPlace)).toBeInTheDocument();
  });
});
