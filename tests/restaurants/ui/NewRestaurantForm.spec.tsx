import { NewRestaurantForm } from '@/restaurants/ui/NewRestaurantForm';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { faker } from '@faker-js/faker';

describe('NewRestaurantForm', () => {
  it('should submit the form', async () => {
    // Arrange
    const user = userEvent.setup();
    const createRestaurant = vi.fn();
    const newRestaurant = faker.company.name();
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);

    // Act
    const input = screen.getByRole('textbox', { name: 'Add Restaurant' });
    await user.type(input, newRestaurant);
    const button = screen.getByRole('button', { name: 'Add' });
    await user.click(button);

    // Assert
    expect(createRestaurant).toHaveBeenCalledWith({ name: newRestaurant });
  });
});
