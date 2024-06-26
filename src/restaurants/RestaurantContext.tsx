/* v8 ignore start */
import { createContext, useMemo } from 'react';
import { RestaurantStore } from './store/RestaurantStore';
import { RestaurantTransportLayer } from './store/RestaurantTransportLayer';
import { IRestaurantStore } from './store/IRestaurantStore';
import { viteEnvVar } from '@/utils/vite-env-var';

const VITE_API_KEY = viteEnvVar.get('VITE_API_KEY');
const BASE_URL = `https://api.outsidein.dev/${VITE_API_KEY}`;

export const RestaurantStoreContext = createContext<
  IRestaurantStore | undefined
>(undefined);

RestaurantStoreContext.displayName = 'RestaurantStoreContext';

export const RestaurantStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const store = useMemo(
    () => new RestaurantStore(new RestaurantTransportLayer(BASE_URL)),
    []
  );

  return (
    <RestaurantStoreContext.Provider value={store}>
      {children}
    </RestaurantStoreContext.Provider>
  );
};
