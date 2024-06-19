import { flow, makeAutoObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { IRestaurantStore } from './IRestaurantStore';

export class RestaurantStore implements IRestaurantStore {
  restaurants: Restaurant[] = [];
  readonly transportLayer: ITransportLayer<Restaurant>;
  isLoading = false;
  isLoadingError = false;
  isSaving = false;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeAutoObservable(this);
    this.transportLayer = transportLayer;
    this.createRestaurant = this.createRestaurant.bind(this);
  }

  createRestaurant = flow(function* (
    this: RestaurantStore,
    restaurant: Partial<Restaurant>
  ) {
    this.isSaving = true;
    try {
      const created: Restaurant | undefined =
        yield this.transportLayer.create(restaurant);
      if (created) {
        this.restaurants.push(created);
      }
      this.isSaving = false;
      return created;
    } catch (error) {
      this.isSaving = false;
      /* v8 ignore start */
      console.error(
        `Error saving restaurant ${error instanceof Error && error.message}`
      );
      /* v8 ignore end */
    }
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
