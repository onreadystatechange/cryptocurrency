import { StyleSheet, Text, View, Button } from "react-native";

import { useGetCurrencyList } from "../../models";
import {
  initFavoriteCurrenciesState,
  currencyReducer,
  deleteCurrency,
} from "../../store";
import { getStorage } from "../../utils";

export function CurrencyListPage() {
  const { currencyList, isLoading, isError, setCurrencyList, dispatch, state } =
    useGetCurrencyList();
  console.log(isLoading, currencyList, state);

  const testStorage = () => {
    dispatch(deleteCurrency("test"));
  };

  return (
    <View style={styles.container}>
      <Text>CurrencyListPage</Text>
      <Button title="Press me" onPress={() => testStorage()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
