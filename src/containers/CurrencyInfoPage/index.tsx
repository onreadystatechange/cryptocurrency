import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../navigation";
import { useGetCurrencyInfo } from "../../models";
import { GoBack, Loading, Error } from "../../components";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "CurrencyInfoPage",
  "name"
>;

export function CurrencyInfoPage({ route }: Props) {
  const {
    params: { name },
  } = route;
  const { currencyInfo, isLoading, isError, mutate } = useGetCurrencyInfo(name);

  if (isLoading) {
    return <Loading size="large" color="#385775" />;
  }

  if (isError) {
    return (
      <Error
        errorText={isError.toString()}
        resetErrorBoundary={() => mutate()}
      />
    );
  }
  return (
    <View style={container}>
      <StatusBar style="auto" />
      <GoBack text="< Back" />
      <Text>id:{currencyInfo?.id}</Text>
      <Text>symbol:{currencyInfo?.symbol}</Text>
      <Text>name:{currencyInfo?.name}</Text>
      <Text>slug:{currencyInfo?.slug}</Text>
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

const { container } = styles;
