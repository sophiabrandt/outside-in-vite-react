import { flow, makeAutoObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { IRestaurantStore } from './IRestaurantStore';

export class RestaurantStore implements IRestaurantStore {
  restaurants: Restaurant[];
  transportLayer: ITransportLayer<Restaurant>;
  isLoading: boolean;
  isLoadingError: boolean;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeAutoObservable(this);
    this.transportLayer = transportLayer;
    this.isLoading = false;
    this.isLoadingError = false;
    this.restaurants = [];
    this.createRestaurant = this.createRestaurant.bind(this);
  }

  createRestaurant = flow(function* (
    this: RestaurantStore,
    restaurant: Partial<Restaurant>
  ) {
    const created: Restaurant | undefined =
      yield this.transportLayer.create(restaurant);
    if (created) {
      this.restaurants.push(created);
    }
    return created;
  });

  getRestaurants = flow(function* (this: RestaurantStore) {
    this.isLoading = true;
    this.isLoadingError = false;
    try {
      const restaurants: Restaurant[] = yield this.transportLayer.get();
      this.restaurants = restaurants;
      this.isLoading = false;
      return restaurants;
    } catch (error) {
      this.isLoading = false;
      this.isLoadingError = true;
      /* v8 ignore start */
      console.error(
        `Error loading restaurants ${error instanceof Error && error.message}`
      );
      /* v8 ignore end */
    }
  });
}
