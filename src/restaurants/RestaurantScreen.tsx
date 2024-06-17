import { useEffect } from 'react';
import { useRestaurantStore } from './hooks/useRestaurantStore';
import { RestaurantList } from './ui/RestaurantList';
import { observer } from 'mobx-react-lite';
import {
  Alert,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from '@mui/material';

export const RestaurantScreen = observer(() => {
  const store = useRestaurantStore();
  useEffect(() => {
    store.getRestaurants();
  }, [store]);

  return (
    <Card sx={{ marginBlockStart: '2em' }}>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        {store.isLoadingError ? (
          <Alert severity="error">Restaurants could not be loaded.</Alert>
        ) : null}
        {store.isLoading ? (
          <CircularProgress />
        ) : (
          <RestaurantList restaurants={store.restaurants} />
        )}
      </CardContent>
    </Card>
  );
});
