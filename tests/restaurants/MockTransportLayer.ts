import { ITransportLayer } from '@/restaurants/store/ITransportLayer';
import { Restaurant } from '@/restaurants/types/Restaurant';

export class MockTransportLayer implements ITransportLayer<Restaurant> {
  private restaurants: Restaurant[] = [];

  get() {
    return Promise.resolve(this.restaurants);
  }
}
