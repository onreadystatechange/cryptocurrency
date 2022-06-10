import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import type { RootStackParamList } from "./src/navigation";
import {
  AddCurrencyPage,
  CurrencyInfoPage,
  CurrencyListPage,
} from "./src/containers";

const RootStack = createStackNavigator<RootStackParamList>();

export function Routers() {
  return (
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
        <RootStack.Screen name="AddCurrencyPage" component={AddCurrencyPage} />
        <RootStack.Screen
          name="CurrencyInfoPage"
          component={CurrencyInfoPage}
          initialParams={{ name: "" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
