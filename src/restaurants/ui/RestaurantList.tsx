import { List, ListItem, ListItemText } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { IRestaurantStore } from '../store/IRestaurantStore';

interface RestaurantListProps {
  store: IRestaurantStore;
}

export const RestaurantList = observer(({ store }: RestaurantListProps) => {
  const restaurants = store.read();
  return (
    <List>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant.id}>
          <ListItemText>{restaurant.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
});
