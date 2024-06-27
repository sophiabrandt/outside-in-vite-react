import { ITransportLayer } from '@/restaurants/store/ITransportLayer';
import { RestaurantStore } from '@/restaurants/store/RestaurantStore';
import { Restaurant } from '@/restaurants/types/Restaurant';
import { faker, simpleFaker } from '@faker-js/faker';

describe('RestaurantStore', () => {
  let mockTransportLayer: ITransportLayer<Restaurant>;

  beforeEach(() => {
    mockTransportLayer = {
      get: vi.fn(),
      create: vi.fn(),
    };
  });

  describe('loading restaurants', () => {
    it('should fetch restaurants', async () => {
      // Arrange
      const expected = [
        {
          name: faker.lorem.words(2),
          id: simpleFaker.number.int(10),
        },
        {
          name: faker.lorem.words(2),
          id: simpleFaker.number.int(10),
        },
      ];
      const spy = vi
        .spyOn(mockTransportLayer, 'get')
        .mockResolvedValue(expected);
      const sut = new RestaurantStore(mockTransportLayer);

      // Act
      const actual = await sut.getRestaurants();

      // Assert
      expect(spy).toHaveBeenCalled();
      expect(actual).toEqual(expected);
    });
  });

  describe('creating a restaurant', () => {
    describe('when saving', () => {
      it('should create the restaurant', () => {
        // Arrange
        const expected = {
          name: faker.company.name(),
        };
        const spy = vi.spyOn(mockTransportLayer, 'create');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        sut.createRestaurant(expected);

        // Assert
        expect(spy).toHaveBeenNthCalledWith(1, expected);
      });

      it('should set the "isSaving" flag', async () => {
        // Arrange
        const restaurantName = faker.company.name();
        const expected = true;
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        sut.createRestaurant({ name: restaurantName });
        const actual = sut.isSaving;

        // Assert
        expect(actual).toBe(expected);
      });
    });

    describe('when saving succeeds', () => {
      it('should clear the "isSaving" flag', async () => {
        // Arrange
        const restaurantName = faker.company.name();
        const expected = false;
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.createRestaurant({ name: restaurantName });
        const actual = sut.isSaving;

        // Assert
        expect(actual).toBe(expected);
      });

      it('should store the restaurant in the restaurant list', async () => {
        // Arrange
        const restaurantName = faker.company.name();
        const expected = {
          name: restaurantName,
          id: simpleFaker.number.int(100),
        };
        mockTransportLayer.create = vi.fn().mockResolvedValue(expected);
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.createRestaurant({ name: restaurantName });
        const actual = sut.restaurants;

        // Assert
        expect(actual).toContainEqual(expected);
      });
    });

    describe('when saving fails', () => {
      it('should set the "savingError" flag', async () => {
        const consoleError = console.error;
        console.error = vi.fn();
        // Arrange
        const restaurantName = faker.company.name();
        const expected = true;
        mockTransportLayer.create = vi.fn().mockRejectedValue('TEST ERROR');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.createRestaurant({ name: restaurantName });
        const actual = sut.isSavingError;

        // Assert
        expect(actual).toBe(expected);
        console.error = consoleError;
      });

      it('should clear the "isSaving" flag', async () => {
        const consoleError = console.error;
        console.error = vi.fn();
        // Arrange
        const restaurantName = faker.company.name();
        const expected = false;
        mockTransportLayer.create = vi.fn().mockRejectedValue('TEST ERROR');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.createRestaurant({ name: restaurantName });
        const actual = sut.isSaving;

        // Assert
        expect(actual).toBe(expected);
        console.error = consoleError;
      });

      it('should not store the new restaurant', async () => {
        const consoleError = console.error;
        console.error = vi.fn();
        // Arrange
        const restaurantName = faker.company.name();
        const expected: Restaurant[] = [
          {
            name: 'existing restaurant',
            id: simpleFaker.number.int(100),
          },
        ];
        mockTransportLayer.get = vi.fn().mockResolvedValueOnce(expected);
        mockTransportLayer.create = vi.fn().mockRejectedValue('TEST ERROR');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.getRestaurants();
        await sut.createRestaurant({ name: restaurantName });
        const actual = sut.restaurants;

        // Assert
        expect(actual).toEqual(expected);
        expect(actual.length).toBe(1);
        console.error = consoleError;
      });
    });
  });
});
