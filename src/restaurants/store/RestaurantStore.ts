import { flow, observable, makeObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';

export class RestaurantStore {
  restaurants: Restaurant[];
  transportLayer: ITransportLayer<Restaurant>;
  isLoading: boolean;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeObservable(this, {
      restaurants: observable,
      getRestaurants: flow,
      isLoading: observable,
    });
    this.transportLayer = transportLayer;
    this.isLoading = false;
    this.restaurants = [];
  }

  getRestaurants = flow(function* (this: RestaurantStore) {
    this.isLoading = true;
    const restaurants: Restaurant[] = yield this.transportLayer.get();
    this.restaurants = restaurants;
    this.isLoading = false;
    return restaurants;
  });
}
