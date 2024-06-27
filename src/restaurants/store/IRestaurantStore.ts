import { Resource } from '@/utils/create-resource';
import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { CancellablePromise } from 'mobx/dist/internal';

export interface IRestaurantStore {
  restaurantsResource: Resource<Restaurant[]>;
  createRestaurant: (
    restaurant: Partial<Restaurant>
  ) => CancellablePromise<Restaurant | undefined>;
  getRestaurants: () => CancellablePromise<void>;
  transportLayer: ITransportLayer<Restaurant>;
  isSaving: boolean;
  isSavingError: boolean;
}
