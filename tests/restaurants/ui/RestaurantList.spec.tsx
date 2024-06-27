import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/restaurants/ui/RestaurantList';
import { faker, simpleFaker } from '@faker-js/faker';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { assertType } from '../../assert-type';

describe('RestaurantList', () => {
  it('should display the restaurants', () => {
    // Arrange
    const restaurant1 = faker.company.name();
    const restaurant2 = faker.company.name();
    const restaurants = [
      {
        name: restaurant1,
        id: simpleFaker.number.int(100),
      },
      {
        name: restaurant2,
        id: simpleFaker.number.int(100),
      },
    ];
    const mockResource = {
      read: vi.fn().mockReturnValue(restaurants),
      update: vi.fn(),
      refresh: vi.fn(),
    };
    const mockStore = assertType<IRestaurantStore>({
      restaurantsResource: mockResource,
    });

    // Act
    render(<RestaurantList store={mockStore} />);

    // Assert
    expect(screen.getByText(restaurant1)).toBeInTheDocument();
    expect(screen.getByText(restaurant2)).toBeInTheDocument();
  });
});
