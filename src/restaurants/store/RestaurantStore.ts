import { flow, makeAutoObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { IRestaurantStore } from './IRestaurantStore';
import { Resource, createResource } from '@/utils/create-resource';

export class RestaurantStore implements IRestaurantStore {
  restaurantsResource = createResource() as Resource<Restaurant[]>;
  readonly transportLayer: ITransportLayer<Restaurant>;
  isSaving = false;
  isSavingError = false;

  constructor(transportLayer: ITransportLayer<Restaurant>) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.transportLayer = transportLayer;

    this.getRestaurants();
  }

  createRestaurant = flow(function* (
    this: RestaurantStore,
    restaurant: Partial<Restaurant>
  ) {
    this.isSaving = true;
    this.isSavingError = false;
    try {
      const created: Restaurant | undefined =
        yield this.transportLayer.create(restaurant);
      if (created) {
        this.restaurantsResource.refresh([
          ...this.restaurantsResource.read(),
          created,
        ]);
      }
      this.isSaving = false;
      return created;
    } catch (error) {
      this.isSaving = false;
      this.isSavingError = true;
      /* v8 ignore start */
      console.error(
        `Error saving restaurant: ${error instanceof Error ? error.message : error}`
      );
      /* v8 ignore stop */
    }
  });

  getRestaurants = flow(function* (this: RestaurantStore) {
    const restaurants = yield this.restaurantsResource.update(
      this.transportLayer.get()
    );
    return restaurants;
  });
}
