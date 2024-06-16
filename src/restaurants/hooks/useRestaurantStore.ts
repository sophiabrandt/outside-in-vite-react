/* v8 ignore start */
import { useContext } from 'react';
import { RestaurantStoreContext } from '../RestaurantContext';

export const useRestaurantStore = () => {
  const context = useContext(RestaurantStoreContext);
  if (context === undefined) {
    throw new Error(
      'useRestaurantStore must be used within a RestaurantStoreProvider'
    );
  }
  return context;
};
