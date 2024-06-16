import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { Restaurant } from '../types/Restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
  isLoading?: boolean;
}

export const RestaurantList = ({
  restaurants,
  isLoading,
}: RestaurantListProps) => {
  return (
    <>
      {isLoading ? <CircularProgress /> : null}
      <List>
        {restaurants.map(restaurant => (
          <ListItem key={restaurant.id}>
            <ListItemText>{restaurant.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};
