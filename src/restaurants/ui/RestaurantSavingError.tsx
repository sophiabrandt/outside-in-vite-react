import { observer } from 'mobx-react-lite';
import { IRestaurantStore } from '../store/IRestaurantStore';
import { Alert } from '@mui/material';

interface RestaurantSavingErrorProps {
  store: IRestaurantStore;
}

export const RestaurantSavingError = observer(
  ({ store }: RestaurantSavingErrorProps) => {
    if (!store.isSavingError) return null;

    return (
      <Alert data-testid="restaurant-screen-saving-error" severity="error">
        Restaurant could not be saved. Please try again later.
      </Alert>
    );
  }
);
