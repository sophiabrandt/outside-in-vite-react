import { render, screen } from '@testing-library/react';
import { RestaurantList } from '@/restaurants/ui/RestaurantList';
import { faker, simpleFaker } from '@faker-js/faker';
import { IRestaurantStore } from '@/restaurants/store/IRestaurantStore';
import { mockType } from '../../mock-type';

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
    const mockStore = mockType<IRestaurantStore>({
      read: vi.fn().mockReturnValue(restaurants),
    });

    // Act
    render(<RestaurantList store={mockStore} />);

    // Assert
    expect(screen.getByText(restaurant1)).toBeInTheDocument();
    expect(screen.getByText(restaurant2)).toBeInTheDocument();
  });
});
