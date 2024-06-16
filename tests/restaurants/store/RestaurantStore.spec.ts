import { RestaurantStore } from '@/restaurants/store/RestaurantStore';
import { MockTransportLayer } from '../MockTransportLayer';

describe('RestaurantStore', () => {
  it('should fetch restaurants', async () => {
    // Arrange
    const sushiPlace = 'Sushi Place';
    const pizzaPlace = 'Pizza Place';
    const expected = [
      {
        name: sushiPlace,
        id: 1,
      },
      {
        name: pizzaPlace,
        id: 2,
      },
    ];
    const transportLayer = new MockTransportLayer();
    const spy = vi.spyOn(transportLayer, 'get').mockResolvedValue(expected);
    const sut = new RestaurantStore(transportLayer);

    // Act
    const actual = await sut.getRestaurants();

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
  });
});
