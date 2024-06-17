import { RestaurantStore } from '@/restaurants/store/RestaurantStore';

describe('RestaurantStore', () => {
  const mockTransportLayer = {
    get: vi.fn(),
  };

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
    const spy = vi.spyOn(mockTransportLayer, 'get').mockResolvedValue(expected);
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

    it.todo('should store the restaurants');
  });

  describe('when loading fails', () => {
    it('should set a loading error flag', async () => {
      // Arrange
      const mockTransportLayer = {
        get: vi.fn().mockRejectedValue('TEST ERROR'),
      };
      const sut = new RestaurantStore(mockTransportLayer);
      expect(sut.isLoadingError).toBe(false);

      // Act
      await sut.getRestaurants();

      // Assert
      expect(sut.isLoadingError).toBe(true);
    });
  });
});
