import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { mockType } from '../mock-type';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';

vi.mock('@/restaurants/ui/RestaurantDisplay');

describe('RestaurantScreen', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = mockType<IRestaurantStore>({
      read: vi.fn().mockResolvedValue([]),
      getRestaurants: vi.fn().mockResolvedValueOnce([]),
      transportLayer: { get: vi.fn().mockResolvedValue([]), create: vi.fn() },
    });
  });

  it('should render the RestaurantScreen', async () => {
    // Arrange
    const { view } = setup(mockStore);

    // Act
    view(<RestaurantScreen />);

    // Assert
    expect(screen.getByRole('heading', { name: /restaurants/i })).toBeVisible();
  });

  function setup(store: IRestaurantStore) {
    const view = (component: React.ReactNode) => {
      return render(
        <RestaurantStoreContext.Provider value={store}>
          {component}
        </RestaurantStoreContext.Provider>
      );
    };
    return { view };
  }
});
