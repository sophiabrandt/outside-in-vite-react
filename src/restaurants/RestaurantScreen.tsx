import { Suspense, useCallback, useEffect } from 'react';
import { useRestaurantStore } from './hooks/useRestaurantStore';
import { RestaurantList } from './ui/RestaurantList';
import { observer } from 'mobx-react-lite';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import { NewRestaurantForm } from './ui/NewRestaurantForm';
import { ErrorBoundaryWithReset } from '@/ErrorBoundaryWithReset';

export const RestaurantScreen = observer(() => {
  const store = useRestaurantStore();
  useEffect(() => {
    store.getRestaurants();
  }, [store]);

  const handleReset = useCallback(() => {
    store.getRestaurants();
  }, [store]);

  return (
    <Card sx={{ marginBlockStart: '2em' }}>
      <CardContent>
        <Typography sx={{ marginBlockEnd: '0.5em' }} variant="h5">
          Restaurants
        </Typography>
        <NewRestaurantForm
          createRestaurant={store.createRestaurant}
          isSaving={store.isSaving}
        />
        {store.isSavingError ? (
          <Alert data-testid="restaurant-screen-saving-error" severity="error">
            Restaurant could not be saved. Please try again later.
          </Alert>
        ) : null}
        <ErrorBoundaryWithReset onReset={handleReset}>
          <Suspense
            fallback={
              <Box data-testid="restaurant-screen-skeleton-ui">
                {Array.from({ length: 15 }).map((_, index) => (
                  <Skeleton key={index} animation="wave" height={40} />
                ))}
              </Box>
            }>
            <RestaurantList store={store} />
          </Suspense>
        </ErrorBoundaryWithReset>
      </CardContent>
    </Card>
  );
});
