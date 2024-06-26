import { Button, FormControl, FormHelperText, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';
import { IRestaurantStore } from '../store/IRestaurantStore';

interface NewRestaurantFormProps {
  store: IRestaurantStore;
}

export const NewRestaurantForm = observer(
  ({ store }: NewRestaurantFormProps) => {
    const [isValidationError, setIsValidationError] = useState<boolean>(false);

    const validate = useCallback(
      (restaurantName: string | undefined): boolean => {
        if (!restaurantName) {
          setIsValidationError(true);
          return false;
        }
        setIsValidationError(false);
        return true;
      },
      [setIsValidationError]
    );

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { form, restaurantName } = readForm(event);
        if (!validate(restaurantName)) return;

        try {
          const response = await store.createRestaurant({
            name: restaurantName,
          });
          if (response) {
            form.reset();
          }
        } catch (error) {
          /* v8 ignore start */
          console.error(
            `Error saving restaurant: ${error instanceof Error ? error.message : error} `
          );
          /* v8 ignore stop */
        }
      },
      [store, validate]
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
            sx={{ marginTop: '1em' }}
            disabled={store.isSaving}
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
