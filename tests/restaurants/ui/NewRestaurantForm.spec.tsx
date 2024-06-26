import { NewRestaurantForm } from '@/restaurants/ui/NewRestaurantForm';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

describe('NewRestaurantForm', () => {
  describe('initially', () => {
    it('should not display a validation error', () => {
      setup();

      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  describe('when filled', () => {
    it('should submit the form', async () => {
      // Arrange
      const { user, createRestaurant, newRestaurant } = setup();

      // Act
      await typeIntoForm(user, newRestaurant);
      await submitForm(user);

      // Assert
      expect(createRestaurant).toHaveBeenCalledWith({ name: newRestaurant });
    });

    it('should disable the form while saving', async () => {
      // Arrange
      setup({ isSaving: true });
      const button = screen.getByRole('button', { name: 'Add' });

      // Assert
      expect(button).toBeDisabled();
    });

    it('should not display a validation error', async () => {
      // Arrange
      const { user, newRestaurant } = setup();

      // Act
      await typeIntoForm(user, newRestaurant);
      await submitForm(user);

      // Assert
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });

    it('should clear the text field after submitting successfully', async () => {
      // Arrange
      const { user, newRestaurant } = setup();

      // Act
      const { input } = await typeIntoForm(user, newRestaurant);
      await submitForm(user);

      // Assert
      expect(input).toHaveValue('');
    });
  });

  describe('when empty', () => {
    it('should display a validation error', async () => {
      // Arrange
      const { user } = setup();

      // Act
      const button = screen.getByRole('button', { name: 'Add' });
      await user.click(button);

      // Assert
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });

    it('should not send a request to the API', async () => {
      // Arrange
      const { user, createRestaurant } = setup();

      // Act
      const button = screen.getByRole('button', { name: 'Add' });
      await user.click(button);

      // Assert
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error', () => {
    it('clears the validation error', async () => {
      // Arrange
      const { user, newRestaurant } = setup();

      // Act
      await submitForm(user);
      await typeIntoForm(user, newRestaurant);
      await submitForm(user);

      // Assert
      expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument();
    });
  });

  describe('when store rejects', () => {
    it('should not clear the form', async () => {
      // Arrange
      vi.spyOn(console, 'error').mockImplementation(() => {});
      const { user, newRestaurant } = setup({
        createRestaurant: vi.fn().mockRejectedValueOnce('SERVER ERROR'),
      });

      // Act
      const { input } = await typeIntoForm(user, newRestaurant);
      await submitForm(user);

      // Assert
      expect(input).toHaveValue(newRestaurant);
    });
  });

  function setup({
    isSaving = false,
    createRestaurant = vi.fn().mockResolvedValueOnce({}),
  } = {}) {
    const user = userEvent.setup();
    const newRestaurant = faker.company.name();
    render(
      <NewRestaurantForm
        createRestaurant={createRestaurant}
        isSaving={isSaving}
      />
    );
    return { user, createRestaurant, newRestaurant };
  }

  async function typeIntoForm(user: UserEvent, restaurantName: string) {
    const input = screen.getByRole('textbox', { name: 'Add Restaurant' });
    await user.type(input, restaurantName);
    return { input };
  }

  async function submitForm(user: UserEvent) {
    const button = screen.getByRole('button', { name: 'Add' });
    await user.click(button);
    return { button };
  }
});
