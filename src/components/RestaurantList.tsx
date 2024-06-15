import { useEffect } from 'react';

interface RestaurantListProps {
  loadRestaurants: () => void;
}

export const RestaurantList = ({ loadRestaurants }: RestaurantListProps) => {
  useEffect(() => loadRestaurants(), [loadRestaurants]);

  return (
    <div>
      <h2>Restaurant List</h2>
      <ul>
        <li>Restaurant 1</li>
        <li>Restaurant 2</li>
        <li>Restaurant 3</li>
      </ul>
    </div>
  );
};
