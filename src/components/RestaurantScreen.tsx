import { useState } from 'react';
import { RestaurantStore } from './store/RestaurantStore';
import { RestaurantTransportLayer } from './store/RestaurantTransportLayer';
import { RestaurantList } from './ui/RestaurantList';
import { observer } from 'mobx-react-lite';

export const RestaurantScreen = observer(() => {
  const [restaurantStore] = useState(
    () => new RestaurantStore(new RestaurantTransportLayer())
  );
  return (
    <div>
      <h1>Restaurants</h1>
      <RestaurantList restaurants={restaurantStore.restaurants} />
    </div>
  );
});
