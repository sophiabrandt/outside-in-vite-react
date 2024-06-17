import { flow, observable, makeObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { IRestaurantStore } from './IRestaurantStore';

export class RestaurantStore implements IRestaurantStore {
  restaurants: Restaurant[];
  transportLayer: ITransportLayer<Restaurant>;
  isLoading: boolean;
  isLoadingError: boolean;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeObservable(this, {
      restaurants: observable,
      getRestaurants: flow,
      isLoading: observable,
      isLoadingError: observable,
    });
    this.transportLayer = transportLayer;
    this.isLoading = false;
    this.isLoadingError = false;
    this.restaurants = [];
  }

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
