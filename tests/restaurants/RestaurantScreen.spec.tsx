import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { assertType } from '../assertType';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { RestaurantStore } from '@/restaurants/store/RestaurantStore';

describe('RestaurantScreen', () => {
  describe('when loading', () => {
    it('should show the loading spinner', () => {
      // Arrange
      const mockTransportLayer = { get: vi.fn().mockResolvedValue([]) };
      const store = new RestaurantStore(mockTransportLayer);

      const { renderWithContext } = setup(store);

      // Act
      waitFor(() => {
        renderWithContext(<RestaurantScreen />);
      });

      // Assert
      expect(screen.getByRole('progressbar')).toBeVisible();
    });
  });

  describe('when loading suceeds', () => {
    it('should not show the loading spinner', async () => {
      // Arrange
      const mockStore = assertType<RestaurantStore>({
        getRestaurants: vi.fn(),
        isLoading: false,
        restaurants: [{ id: 1, name: 'Mock Restaurant' }],
        transportLayer: { get: vi.fn() },
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should not display the error message', async () => {
      // Arrange
      const mockStore = assertType<RestaurantStore>({
        getRestaurants: vi.fn(),
        isLoading: false,
        restaurants: [],
        transportLayer: { get: vi.fn() },
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should render the restaurants received from server', async () => {
      // Arrange
      const mockStore = assertType<RestaurantStore>({
        getRestaurants: vi.fn(),
        isLoading: false,
        restaurants: [{ id: 1, name: 'Mock Restaurant' }],
        transportLayer: { get: vi.fn() },
      });
      const { renderWithContext } = setup(mockStore);

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

  describe('when loading fails', () => {
    it('should display the error message', async () => {
      // Arrange
      const mockStore = assertType<RestaurantStore>({
        getRestaurants: vi.fn(),
        isLoading: false,
        isLoadingError: true,
        restaurants: [],
        transportLayer: { get: vi.fn() },
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  function setup(store: RestaurantStore) {
    const renderWithContext = (component: React.ReactNode) => {
      return render(
        <RestaurantStoreContext.Provider value={store}>
          {component}
        </RestaurantStoreContext.Provider>
      );
    };
    return { renderWithContext };
  }
});
