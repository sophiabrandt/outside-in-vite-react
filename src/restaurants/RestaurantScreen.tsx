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
import { NewRestaurantForm } from './ui/NewRestaurantForm';

export const RestaurantScreen = observer(() => {
  const store = useRestaurantStore();
  useEffect(() => {
    store.getRestaurants();
  }, [store]);

  return (
    <Card sx={{ marginBlockStart: '2em' }}>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <NewRestaurantForm
          createRestaurant={store.createRestaurant}
          isSaving={store.isSaving}
        />
        {store.isLoadingError ? (
          <Alert data-testid="loading-error" severity="error">
            Restaurants could not be loaded.
          </Alert>
        ) : null}
        {store.isSavingError ? (
          <Alert data-testid="saving-error" severity="error">
            Restaurant could not be saved. Please try again later.
          </Alert>
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
