import { NewRestaurantForm } from '@/restaurants/ui/NewRestaurantForm';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

describe('NewRestaurantForm', () => {
  it('should submit the form', async () => {
    // Arrange
    const { user, createRestaurant, newRestaurant } = setup();

    // handleUserEvents
    const { button } = await handleUserEvents(user, newRestaurant);
    await user.click(button);

    // Assert
    expect(createRestaurant).toHaveBeenCalledWith({ name: newRestaurant });
  });

  it('should disable the form while saving', async () => {
    // Arrange
    const { user, newRestaurant } = setup({ isSaving: true });

    // handleUserEvents
    const { button } = await handleUserEvents(user, newRestaurant);

    // Assert
    expect(button).toBeDisabled();
  });

  function setup({ isSaving } = { isSaving: false }) {
    const user = userEvent.setup();
    const createRestaurant = vi.fn();
    const newRestaurant = faker.company.name();
    render(
      <NewRestaurantForm
        createRestaurant={createRestaurant}
        isSaving={isSaving}
      />
    );
    return { user, createRestaurant, newRestaurant };
  }

  async function handleUserEvents(user: UserEvent, restaurantName: string) {
    const input = screen.getByRole('textbox', { name: 'Add Restaurant' });
    await user.type(input, restaurantName);
    const button = screen.getByRole('button', { name: 'Add' });
    return { button };
  }
});
