import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';
import { Restaurant } from '../types/Restaurant';
import { CancellablePromise } from 'mobx/dist/internal';
import { observer } from 'mobx-react-lite';

interface NewRestaurantFormProps {
  createRestaurant: (
    restaurant: Partial<Restaurant>
  ) => CancellablePromise<Restaurant | undefined>;
  isSaving: boolean;
}

export const NewRestaurantForm = observer(
  ({ createRestaurant, isSaving }: NewRestaurantFormProps) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formElements = form.elements as typeof form.elements & {
        addRestaurant: { value: string };
      };
      createRestaurant({ name: formElements.addRestaurant.value });
    };

    return (
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <InputLabel htmlFor="addRestaurant">Add Restaurant</InputLabel>
          <Input
            name="restaurant"
            id="addRestaurant"
            aria-describedby="add-restaurant-helper-text"
          />
          <FormHelperText id="add-restaurant-helper-text">
            Add a new restaurant to the list.
          </FormHelperText>
          <Button disabled={isSaving} type="submit" variant="contained">
            Add
          </Button>
        </FormControl>
      </form>
    );
  }
);
