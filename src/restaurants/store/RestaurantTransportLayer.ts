/* v8 ignore start */
import { ITransportLayer } from './ITransportLayer';
import { Restaurant } from '../types/Restaurant';

export class RestaurantTransportLayer implements ITransportLayer<Restaurant> {
  constructor(private readonly baseUrl: string) {}

  async get(): Promise<Restaurant[]> {
    try {
      const response = await fetch(`${this.baseUrl}/restaurants`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch restaurants: ${response.status} ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to fetch restaurants: ${error instanceof Error && error.message}`
      );
    }
  }
}
