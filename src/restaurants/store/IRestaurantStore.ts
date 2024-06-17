import { Restaurant } from '../types/Restaurant';
import { ITransportLayer } from './ITransportLayer';
import { CancellablePromise } from 'mobx/dist/internal';

export interface IRestaurantStore {
  restaurants: Restaurant[];
  getRestaurants: () => CancellablePromise<Restaurant[] | undefined>;
  isLoading: boolean;
  isLoadingError: boolean;
  transportLayer: ITransportLayer<Restaurant>;
}
