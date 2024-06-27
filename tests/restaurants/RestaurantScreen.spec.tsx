import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { assertType } from '../assert-type';
import { RestaurantScreen } from '@/restaurants/RestaurantScreen';
import { RestaurantStoreContext } from '@/restaurants/RestaurantContext';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { createResource } from '@/utils/create-resource';
import { Restaurant } from '@/restaurants/types/Restaurant';

describe('RestaurantScreen', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = assertType<IRestaurantStore>({
      restaurantsResource: createResource<Restaurant[]>(),
      getRestaurants: vi.fn(),
      isLoading: false,
      isLoadingError: false,
      restaurants: [],
      transportLayer: { get: vi.fn().mockResolvedValue([]) },
    });
  });

  describe('when suspending', () => {
    it('should show the skeleton ui', async () => {
      // Arrange
      mockStore.restaurantsResource.read = vi.fn(() => {
        throw new Promise<void>(() => {});
      });
      const { renderWithContext } = setup(mockStore);

      // Act
      waitFor(() => {
        renderWithContext(<RestaurantScreen />);
      });

      // Assert
      expect(screen.getByTestId('restaurant-screen-skeleton-ui')).toBeVisible();
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

    it('should call the getRestaurants store function', async () => {
      // Arrange
      const { renderWithContext } = setup(mockStore);

      // Act
      renderWithContext(<RestaurantScreen />);

      // Assert
      await waitFor(() => {
        expect(mockStore.getRestaurants).toHaveBeenCalledTimes(1);
      });
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
