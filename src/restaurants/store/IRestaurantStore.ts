import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { CancellablePromise } from 'mobx/dist/internal';

export interface IRestaurantStore {
  createRestaurant: (
    restaurant: Partial<Restaurant>
  ) => CancellablePromise<Restaurant | undefined>;
  read: () => Restaurant[];
  getRestaurants: () => CancellablePromise<void>;
  transportLayer: ITransportLayer<Restaurant>;
  isSaving: boolean;
  isSavingError: boolean;
}
