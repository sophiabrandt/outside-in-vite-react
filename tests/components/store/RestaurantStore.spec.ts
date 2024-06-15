import { ITransportLayer } from '@/components/store/ITransportLayer';
import { RestaurantStore } from '@/components/store/RestaurantStore';
import { Restaurant } from '@/components/types/Restaurant';
import { flowResult } from 'mobx';

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
    const actual = await flowResult(sut.getRestaurants());

    // Assert
    expect(spy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
  });
});

class MockTransportLayer implements ITransportLayer<Restaurant> {
  private restaurants: Restaurant[] = [];

  get() {
    return Promise.resolve(this.restaurants);
  }
}
