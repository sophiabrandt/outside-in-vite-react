import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { mockType } from '../mock-type';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';

vi.mock('@/restaurants/ui/RestaurantList');

describe('RestaurantScreen', () => {
  it('should render the RestaurantScreen', async () => {
    // Arrange
    const { view } = setup();

    // Act
    view(<RestaurantScreen />);

    // Assert
    expect(screen.getByRole('heading', { name: /restaurants/i })).toBeVisible();
  });

  function setup() {
    const view = (component: React.ReactNode) => {
      const mockStore = mockType<IRestaurantStore>({
        read: vi.fn().mockResolvedValue([]),
      });
      return waitFor(() =>
        render(
          <RestaurantStoreContext.Provider value={mockStore}>
            {component}
          </RestaurantStoreContext.Provider>
        )
      );
    };
    return { view };
  }
});
