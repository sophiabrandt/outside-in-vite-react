import { useEffect } from 'react';
import { useRestaurantStore } from './hooks/useRestaurantStore';
import { RestaurantList } from './ui/RestaurantList';
import { observer } from 'mobx-react-lite';
import { flowResult } from 'mobx';

export const RestaurantScreen = observer(() => {
  const store = useRestaurantStore();
  useEffect(() => {
    (async () => {
      await flowResult(store.getRestaurants());
    })();
  }, [store]);

  return (
    <div>
      <h1>Restaurants</h1>
      <RestaurantList restaurants={store.restaurants} />
    </div>
  );
});
