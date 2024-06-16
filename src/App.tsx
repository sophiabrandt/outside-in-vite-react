/* v8 ignore start */
import { RestaurantStoreProvider } from './restaurants/RestaurantContext';
import { RestaurantScreen } from './restaurants/RestaurantScreen';

export const App = () => {
  return (
    <>
      <RestaurantStoreProvider>
        <RestaurantScreen />
      </RestaurantStoreProvider>
    </>
  );
};

export default App;
