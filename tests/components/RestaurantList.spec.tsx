import { render } from '@testing-library/react';
import { RestaurantList } from '@/components/RestaurantList';

describe('RestaurantList', () => {
  it('should load restaurants on first render', () => {
    // Arrange
    const loadRestaurants = vi.fn().mockName('loadRestaurants');
    // Act
    render(<RestaurantList loadRestaurants={loadRestaurants} />);
    // Assert
    expect(loadRestaurants).toHaveBeenCalled();
  });
});
