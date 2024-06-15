import { flow, observable, makeAutoObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';

export class RestaurantStore {
  restaurants: Restaurant[] = [];
  transportLayer: ITransportLayer<Restaurant>;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeAutoObservable(this, {
      restaurants: observable,
      getRestaurants: flow,
    });
    this.transportLayer = transportLayer;
    this.restaurants = [];
  }

  *getRestaurants() {
    const restaurants: Restaurant[] = yield this.transportLayer.get();
    this.restaurants = restaurants;
    return restaurants;
  }
}
