import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from '@mui/material';
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
    const [isServerError, setIsServerError] = useState<boolean>(false);

    const validate = useCallback(
      (restaurantName: string | undefined): boolean => {
        if (!restaurantName) {
          setIsValidationError(true);
          return false;
        }
        return true;
      },
      [setIsValidationError]
    );

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { form, restaurantName } = readForm(event);
        if (!validate(restaurantName)) return;
        setIsValidationError(false);
        try {
          await createRestaurant({ name: restaurantName });
          setIsServerError(false);
          form.reset();
        } catch (error) {
          setIsServerError(true);
        }
      },
      [setIsValidationError, createRestaurant, validate]
    );

    return (
      <form noValidate onSubmit={handleSubmit}>
        {isServerError ? (
          <Alert severity="error" role="alert">
            The restaurant could not be saved. Please try agian later.
          </Alert>
        ) : null}
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
            sx={{ marginTop: '1em' }}
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

function readForm(event: React.FormEvent<HTMLFormElement>) {
  const form = event.currentTarget;
  const formElements = form.elements as typeof form.elements & {
    addRestaurant: { value: string };
  };
  const restaurantName = formElements.addRestaurant.value;
  return { form, restaurantName };
}
