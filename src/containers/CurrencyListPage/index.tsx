import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SwipeListView } from "react-native-swipe-list-view";
import { floor } from "lodash";

import { useGetCurrencyList } from "../../models";
import { deleteCurrency } from "../../store";
import { Header, ListItem, Error } from "./components";
import { images } from "../../utils";
import { RootStackParamList } from "../../navigation";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function CurrencyListPage() {
  const { currencyList, isLoading, isError, dispatch, mutate } =
    useGetCurrencyList();
  const navigation = useNavigation<NavigationProps>();

  if (isLoading) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" color="#385775" />
      </View>
    );
  }

  if (isError) {
    return (
      <Error
        errorText={isError.toString()}
        resetErrorBoundary={() => mutate()}
      />
    );
  }
  const deleteRow = (symbol: string) => {
    dispatch(deleteCurrency(symbol));
  };

  return (
    <View style={wrapper}>
      <Header
        title="CryptoTracker Pro"
        avatar={require("../../../assets/avatar.png")}
      />
      <View style={list}>
        <SwipeListView
          useFlatList
          data={currencyList}
          swipeToOpenPercent={4}
          renderItem={({ item: currency }) => {
            const props = {
              name: currency.name,
              symbol: currency.symbol,
              metrics: {
                market_data: {
                  percent_change_usd_last_24_hours: floor(
                    currency?.metrics?.market_data
                      ?.percent_change_usd_last_24_hours,
                    2
                  ),
                  price_usd: currency?.metrics?.market_data?.price_usd,
                },
              },
              avatar: images[currency.symbol as keyof typeof images],
            };
            return <ListItem {...props} key={currency.id} />;
          }}
          renderHiddenItem={(data) => (
            <TouchableOpacity
              style={backRightBtn}
              onPress={() => deleteRow(data.item.symbol)}
            >
              <Text style={deleteText}>Delete</Text>
            </TouchableOpacity>
          )}
          disableRightSwipe
          rightOpenValue={-100}
          closeOnRowPress={true}
          closeOnScroll={true}
          closeOnRowBeginSwipe={true}
          onRefresh={() => mutate()}
          refreshing={isLoading}
          ListFooterComponent={
            <TouchableOpacity
              style={addBtn}
              onPress={() => navigation.navigate("AddCurrencyPage")}
            >
              <Text style={addText}>+ Add a Cryptocurrency</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  wrapper: {
    backgroundColor: "#fff",
    flex: 1,
  },
  backRightBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    color: "#FFF",
    backgroundColor: "#E4E8EB",
    position: "absolute",
    right: 2,
    top: 0,
    bottom: 0,
    height: "100%",
  },
  deleteText: {
    color: "#FFF",
  },
  addBtn: {
    marginTop: 48,
  },
  addText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#385775",
    textAlign: "center",
  },
});

const { list, container, wrapper, backRightBtn, deleteText, addBtn, addText } =
  styles;
