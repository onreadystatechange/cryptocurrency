import { StyleSheet, Text, View } from "react-native";

import { useGetCurrencyList } from "../../models";

export function CurrencyListPage() {
  const { currencyList, isLoading, isError } = useGetCurrencyList();
  return (
    <View style={styles.container}>
      <Text>CurrencyListPage</Text>
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
