import { useEffect } from 'react';

interface RestaurantListProps {
  loadRestaurants: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restaurants: any[];
}

export const RestaurantList = ({
  loadRestaurants,
  restaurants,
}: RestaurantListProps) => {
  useEffect(() => loadRestaurants(), [loadRestaurants]);

  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>{restaurant.name}</li>
        ))}
      </ul>
    </div>
  );
};
