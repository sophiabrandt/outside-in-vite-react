import { useEffect } from 'react';
import { Restaurant } from '../types/Restaurant';

interface RestaurantListProps {
  loadRestaurants: () => void;
  restaurants: Restaurant[];
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
