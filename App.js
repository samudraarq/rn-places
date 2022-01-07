import { NavigationContainer } from "@react-navigation/native";
import PlacesNavigator from "./navigation/PlacesNavigator";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import placesReducer from "./store/places-reducer";

export default function App() {
  const rootReducer = combineReducers({
    places: placesReducer,
  });
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}
