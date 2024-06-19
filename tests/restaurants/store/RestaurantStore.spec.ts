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
          name: 'Sushi Place',
          id: 1,
        },
        {
          name: 'Pizza Place',
          id: 2,
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

    it('should set a loading flag', async () => {
      // Arrange
      const sut = new RestaurantStore(mockTransportLayer);
      expect(sut.isLoading).toBe(false);

      // Act
      sut.getRestaurants();

      // Assert
      expect(sut.isLoading).toBe(true);
    });

    it('should initially flag "isLoading" as false', async () => {
      const sut = new RestaurantStore(mockTransportLayer);

      expect(sut.isLoading).toBe(false);
    });

    describe('when loading', () => {
      it('should set the loading flag', async () => {
        // Arrange
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        sut.getRestaurants();

        // Assert
        expect(sut.isLoading).toBe(true);
      });
    });

    describe('when loading suceeeds', () => {
      it('should clear the loading flag', async () => {
        // Arrange
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.getRestaurants();

        // Assert
        expect(sut.isLoading).toBe(false);
      });

      it('should store the restaurants', async () => {
        // Arrange
        const expected = [
          {
            id: simpleFaker.number.int(100),
            name: faker.company.name(),
          },
          {
            id: simpleFaker.number.int(100),
            name: faker.company.name(),
          },
        ];
        mockTransportLayer.get = vi.fn().mockResolvedValueOnce(expected);
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.getRestaurants();

        // Assert
        const actual = sut.restaurants;
        expect(actual).toStrictEqual(expected);
      });
    });

    describe('when loading fails', () => {
      it('should clear the loading flag', async () => {
        // Arrange
        const consoleError = console.error;
        console.error = vi.fn();
        mockTransportLayer.get = vi.fn().mockRejectedValue('TEST ERROR');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.getRestaurants();

        // Assert
        expect(sut.isLoading).toBe(false);
        console.error = consoleError;
      });

      it('should set a loading error flag', async () => {
        // Arrange
        const consoleError = console.error;
        console.error = vi.fn();
        mockTransportLayer.get = vi.fn().mockRejectedValue('TEST ERROR');
        const sut = new RestaurantStore(mockTransportLayer);

        // Act
        await sut.getRestaurants();

        // Assert
        expect(sut.isLoadingError).toBe(true);
        console.error = consoleError;
      });
    });
  });

  describe('creating a restaurant', () => {
    it('creates the restaurant', () => {
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

    it('stores the restaurant in the restaurant list', async () => {
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

    it('sets the "isSaving" flag while saving', async () => {
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

    it('clears the "isSaving" flag when saving is finished', async () => {
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
  });
});
