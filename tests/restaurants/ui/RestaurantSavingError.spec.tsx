import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { mockType } from '../../mock-type';
import { render, screen } from '@testing-library/react';
import { RestaurantSavingError } from '@/restaurants/ui/RestaurantSavingError';

describe('RestaurantSavingError', () => {
  let mockStore: IRestaurantStore;

  beforeEach(() => {
    mockStore = mockType<IRestaurantStore>({
      isSavingError: false,
    });
  });

  describe('when saving succeeds', () => {
    it('should not display the error message', async () => {
      // Act
      render(<RestaurantSavingError store={mockStore} />);

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
      mockStore.read = vi.fn(() => []);

      // Act
      render(<RestaurantSavingError store={mockStore} />);

      // Assert
      expect(
        screen.getByTestId('restaurant-screen-saving-error')
      ).toBeVisible();
    });
  });

  describe('when saving succeeds', () => {
    it('should not display the error message', async () => {
      // Act
      render(<RestaurantSavingError store={mockStore} />);

      // Assert
      expect(
        screen.queryByTestId('restaurant-screen-saving-error')
      ).not.toBeInTheDocument();
    });
  });
});
