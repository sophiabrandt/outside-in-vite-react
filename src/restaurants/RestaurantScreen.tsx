import { useRestaurantStore } from './hooks/useRestaurantStore';
import { observer } from 'mobx-react-lite';
import { Card, CardContent, Typography } from '@mui/material';
import { NewRestaurantForm } from './ui/NewRestaurantForm';
import { RestaurantDisplay } from './ui/RestaurantDisplay';
import { RestaurantSavingError } from './ui/RestaurantSavingError';

export const RestaurantScreen = observer(() => {
  const store = useRestaurantStore();

  return (
    <Card sx={{ marginBlockStart: '2em' }}>
      <CardContent>
        <Typography sx={{ marginBlockEnd: '0.5em' }} variant="h5">
          Restaurants
        </Typography>
        <RestaurantSavingError store={store} />
        <NewRestaurantForm store={store} />
        <RestaurantDisplay store={store} />
      </CardContent>
    </Card>
  );
});
