import { List, ListItem, ListItemText } from '@mui/material';
import { Restaurant } from '../types/Restaurant';
import { observer } from 'mobx-react-lite';

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export const RestaurantList = observer(
  ({ restaurants }: RestaurantListProps) => {
    return (
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    );
  }
);
