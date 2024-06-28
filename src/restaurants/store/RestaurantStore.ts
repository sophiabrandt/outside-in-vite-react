import { flow, makeAutoObservable } from 'mobx';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { IRestaurantStore } from './IRestaurantStore';
import { Resource, createResource } from '@/utils/create-resource';

export class RestaurantStore implements IRestaurantStore {
  private readonly restaurantsResource = createResource() as Resource<
    Restaurant[]
  >;
  private _isSaving = false;
  private _isSavingError = false;

  constructor(readonly transportLayer: ITransportLayer<Restaurant>) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.getRestaurants();
  }

  createRestaurant = flow(function* (
    this: RestaurantStore,
    restaurant: Partial<Restaurant>
  ) {
    this.setIsSaving(true);
    this.setIsSavingError(false);
    try {
      const created: Restaurant | undefined =
        yield this.transportLayer.create(restaurant);
      if (created) {
        this.restaurantsResource.refresh([
          ...this.restaurantsResource.read(),
          created,
        ]);
      }
      this.setIsSaving(false);
      return created;
    } catch (error) {
      this.setIsSaving(false);
      this.setIsSavingError(true);
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

  read = () => {
    return this.restaurantsResource.read();
  };

  get isSaving() {
    return this._isSaving;
  }

  get isSavingError() {
    return this._isSavingError;
  }

  private setIsSaving(value: boolean) {
    this._isSaving = value;
  }

  private setIsSavingError(value: boolean) {
    this._isSavingError = value;
  }
}
