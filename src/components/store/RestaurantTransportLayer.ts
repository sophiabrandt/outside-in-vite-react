import { ITransportLayer } from './ITransportLayer';
import { Restaurant } from '../types/Restaurant';

export class RestaurantTransportLayer implements ITransportLayer<Restaurant> {
  get(): Promise<Restaurant[]> {
    throw new Error('Method not implemented.');
  }
}
