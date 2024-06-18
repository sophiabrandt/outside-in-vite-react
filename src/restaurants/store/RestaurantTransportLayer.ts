/* v8 ignore start */
import { ITransportLayer } from './ITransportLayer';
import { Restaurant } from '../types/Restaurant';

export class RestaurantTransportLayer implements ITransportLayer<Restaurant> {
  constructor(private readonly baseUrl: string) {}

  async create(data: Restaurant): Promise<Restaurant> {
    try {
      const response = await fetch(`${this.baseUrl}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      throw new Error(
        `Failed to create restaurant: ${error instanceof Error && error.message}`
      );
    }
  }

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
