import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { RestaurantDisplay } from '@/restaurants/ui/RestaurantDisplay';
import { assertType } from '../../assert-type';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('RestaurantDisplay', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = assertType<IRestaurantStore>({
      restaurantsResource: {
        read: vi.fn().mockResolvedValue([]),
        update: vi.fn().mockReturnValue(new Promise(() => {})),
        refresh: vi.fn(),
      },
      getRestaurants: vi.fn().mockResolvedValueOnce([]),
      transportLayer: { get: vi.fn().mockResolvedValue([]), create: vi.fn() },
    });
  });

  describe('when suspending', () => {
    it('should show the skeleton ui', () => {
      // Arrange
      mockStore.restaurantsResource.read = vi.fn(() => {
        throw new Promise<void>(() => {});
      });

      // Act
      render(<RestaurantDisplay store={mockStore} />);

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

      // Act
      render(<RestaurantDisplay store={mockStore} />);

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
      render(<RestaurantDisplay store={mockStore} />);

      // Act
      await user.click(screen.getByRole('button', { name: /try again/i }));

      // Assert
      expect(mockStore.getRestaurants).toHaveBeenCalledTimes(1);
    });
  });

  describe('when loading suceeds', () => {
    it('should not show the loading skeleton', async () => {
      // Arrange

      // Act
      render(<RestaurantDisplay store={mockStore} />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-skeleton-ui')
      ).not.toBeInTheDocument();
    });

    it('should not display the error message', async () => {
      // Arrange

      // Act
      render(<RestaurantDisplay store={mockStore} />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-loading-error')
      ).not.toBeInTheDocument();
    });
  });
});
