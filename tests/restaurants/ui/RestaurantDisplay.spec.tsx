import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { RestaurantDisplay } from '@/restaurants/ui/RestaurantDisplay';
import { mockType } from '../../mock-type';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('RestaurantDisplay', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = mockType<IRestaurantStore>({
      read: vi.fn().mockResolvedValue([]),
      getRestaurants: vi.fn().mockResolvedValueOnce([]),
      transportLayer: { get: vi.fn().mockResolvedValue([]), create: vi.fn() },
    });
  });

  describe('when suspending', () => {
    it('should show the skeleton ui', () => {
      // Arrange
      mockStore.read = vi.fn(() => {
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
      mockStore.read = vi.fn().mockImplementation(() => {
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
      mockStore.read = vi.fn().mockImplementation(() => {
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
