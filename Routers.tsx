import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useReducer } from "react";

import type { RootStackParamList } from "./src/navigation";
import {
  AddCurrencyPage,
  CurrencyInfoPage,
  CurrencyListPage,
} from "./src/containers";
import { currencyReducer, initFavoriteCurrenciesState } from "./src/store";
import { CurrencyContext } from "./src/context";

const RootStack = createStackNavigator<RootStackParamList>();

export function Routers() {
  const [state, dispatch] = useReducer(
    currencyReducer,
    initFavoriteCurrenciesState
  );
  return (
    <CurrencyContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="CurrencyListPage"
        >
          <RootStack.Screen
            name="CurrencyListPage"
            component={CurrencyListPage}
          />
          <RootStack.Screen
            name="AddCurrencyPage"
            component={AddCurrencyPage}
          />
          <RootStack.Screen
            name="CurrencyInfoPage"
            component={CurrencyInfoPage}
            initialParams={{ name: "" }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </CurrencyContext.Provider>
  );
}
