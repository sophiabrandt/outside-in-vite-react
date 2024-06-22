import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { Restaurant } from '../types/Restaurant';
import { CancellablePromise } from 'mobx/dist/internal';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

interface NewRestaurantFormProps {
  createRestaurant: (
    restaurant: Partial<Restaurant>
  ) => CancellablePromise<Restaurant | undefined>;
  isSaving: boolean;
}

export const NewRestaurantForm = observer(
  ({ createRestaurant, isSaving }: NewRestaurantFormProps) => {
    const [isValidationError, setIsValidationError] = useState<boolean>(false);

    const handleValidationError = useCallback(
      (restaurantName: string | undefined) => {
        if (!restaurantName) {
          setIsValidationError(true);
        } else {
          setIsValidationError(false);
        }
      },
      [setIsValidationError]
    );

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
          addRestaurant: { value: string };
        };
        const restaurantName = formElements.addRestaurant.value;
        handleValidationError(restaurantName);
        await createRestaurant({ name: restaurantName });
        form.reset();
      },
      [createRestaurant, handleValidationError]
    );

    return (
      <form noValidate onSubmit={handleSubmit}>
        <FormControl fullWidth={true}>
          <TextField
            label="Add Restaurant"
            variant="outlined"
            error={isValidationError}
            helperText={isValidationError ? 'Name is required' : ''}
            name="restaurant"
            id="addRestaurant"
            aria-describedby="add-restaurant-helper-text"
          />
          <FormHelperText id="add-restaurant-helper-text">
            Add a new restaurant to the list.
          </FormHelperText>
          <Button
            sx={{ marginTop: '2em' }}
            disabled={isSaving}
            type="submit"
            variant="contained">
            Add
          </Button>
        </FormControl>
      </form>
    );
  }
);
