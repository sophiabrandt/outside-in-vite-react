import { ErrorBoundaryWithReset } from '@/ErrorBoundaryWithReset';
import { Box, Skeleton } from '@mui/material';
import { Suspense, useCallback } from 'react';
import { RestaurantList } from './RestaurantList';
import { IRestaurantStore } from '../store/IRestaurantStore';
import { observer } from 'mobx-react-lite';

interface RestaurantViewProps {
  store: IRestaurantStore;
}

export const RestaurantView = observer(({ store }: RestaurantViewProps) => {
  const handleReset = useCallback(() => {
    store.getRestaurants();
  }, [store]);

  return (
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
  );
});
