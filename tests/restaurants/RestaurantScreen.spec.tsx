import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { assertType } from '../assert-type';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import userEvent from '@testing-library/user-event';

describe('RestaurantScreen', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = assertType<IRestaurantStore>({
      restaurantsResource: {
        read: vi.fn().mockResolvedValue([]),
        update: vi.fn().mockReturnValue(new Promise(() => {})),
        refresh: vi.fn(),
      },
      getRestaurants: vi.fn().mockResolvedValueOnce([]),
      isLoading: false,
      isLoadingError: false,
      restaurants: [],
      transportLayer: { get: vi.fn().mockResolvedValue([]) },
    });
  });

  describe('when suspending', () => {
    it('should show the skeleton ui', () => {
      // Arrange
      mockStore.restaurantsResource.read = vi.fn(() => {
        throw new Promise<void>(() => {});
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.getByTestId('restaurant-screen-skeleton-ui')).toBeVisible();
    });
  });

  describe('when suspends errors', () => {
    it('should show the error boundary', () => {
      // Arrange
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockStore.restaurantsResource.read = vi.fn().mockImplementation(() => {
        throw new Error('TEST ERRROR');
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(screen.getByRole('alert')).toBeVisible();
      expect(screen.getByText(/there was an error/i)).toBeVisible();
    });

    it('can try again via reset function', async () => {
      // Arrange
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const user = userEvent.setup();
      mockStore.restaurantsResource.read = vi.fn().mockImplementation(() => {
        throw new Error('TEST ERRROR');
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);
      await user.click(screen.getByRole('button', { name: /try again/i }));

      // Assert
      expect(mockStore.getRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('when loading suceeds', () => {
    it('should not show the loading skeleton', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-skeleton-ui')
      ).not.toBeInTheDocument();
    });

    it('should not display the error message', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-loading-error')
      ).not.toBeInTheDocument();
    });
  });

  describe('when saving succeeds', () => {
    it('should not display the error message', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-saving-error')
      ).not.toBeInTheDocument();
    });
  });

  describe('when saving fails', () => {
    it('should display the error message', async () => {
      // Arrange
      mockStore.isSavingError = true;
      mockStore.restaurantsResource = {
        read: vi.fn(() => []),
        update: vi.fn().mockResolvedValueOnce(new Promise(() => {})),
        refresh: vi.fn(),
      };
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      expect(
        screen.getByTestId('restaurant-screen-saving-error')
      ).toBeVisible();
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
