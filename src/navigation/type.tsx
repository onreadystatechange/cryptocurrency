import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  AddCurrencyPage: undefined;
  CurrencyInfoPage: { name: string };
  CurrencyListPage: undefined;
};

export type NavigationProps = StackNavigationProp<RootStackParamList>;
