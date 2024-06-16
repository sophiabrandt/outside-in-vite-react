import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';

describe('RestaurantScreen', () => {
  it('should render the restaurants received from server', async () => {
    // Arrange
    const mockRestaurants = [{ id: 1, name: 'Mock Restaurant' }];
    const mockStore = {
      getRestaurants: vi.fn(),
      restaurants: mockRestaurants,
      transportLayer: { get: vi.fn() },
    };
    const renderWithContext = (component: React.ReactNode) => {
      return render(
        <RestaurantStoreContext.Provider value={mockStore}>
          {component}
        </RestaurantStoreContext.Provider>
      );
    };

    // Act
    renderWithContext(<RestaurantScreen />);

    // Assert
    expect(
      screen.getByRole('heading', { name: /Restaurants/i })
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(mockStore.getRestaurants).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText(/Mock Restaurant/i)).toBeInTheDocument();
  });
});
