import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { assertType } from '../assertType';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';

describe('RestaurantScreen', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = assertType<IRestaurantStore>({
      getRestaurants: vi.fn(),
      isLoading: false,
      isLoadingError: false,
      restaurants: [],
      transportLayer: { get: vi.fn().mockResolvedValue([]) },
    });
  });

  describe('when loading', () => {
    it('should show the loading spinner', () => {
      // Arrange
      mockStore.isLoading = true;
      const { renderWithContext } = setup(mockStore);

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
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('should not display the error message', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.queryByTestId('loading-error')).not.toBeInTheDocument();
    });

    it('should render the restaurants received from server', async () => {
      // Arrange
      mockStore.restaurants = [{ id: 1, name: 'Mock Restaurant' }];
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
      mockStore.isLoadingError = true;
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.getByTestId('loading-error')).toBeInTheDocument();
    });
  });

  describe('when saving succeeds', () => {
    it('should not display the error message', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.queryByTestId('saving-error')).not.toBeInTheDocument();
    });
  });

  describe('when saving fails', () => {
    it('should display the error message', async () => {
      // Arrange
      mockStore.isSavingError = true;
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.getByTestId('saving-error')).toBeVisible();
    });
  });

  function setup(store: IRestaurantStore) {
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
