import { StyleSheet, Text, View, Image } from "react-native";

import { Currency } from "../../../models";

type ListItemProps = Partial<Currency>;

const images = {
  BTC: require("../../../../assets/btc.png"),
  ETH: require("../../../../assets/eth.png"),
  USDT: require("../../../../assets/ltc.png"),
  USDC: require("../../../../assets/xrp.png"),
  BNB: require("../../../../assets/xrp.png"),
  BUSD: require("../../../../assets/xrp.png"),
  ADA: require("../../../../assets/xrp.png"),
  XRP: require("../../../../assets/xrp.png"),
  SOL: require("../../../../assets/xrp.png"),
  DOGE: require("../../../../assets/xrp.png"),
  DAI: require("../../../../assets/xrp.png"),
  DOT: require("../../../../assets/xrp.png"),
  WBTC: require("../../../../assets/xrp.png"),
  TRX: require("../../../../assets/xrp.png"),
  LEO: require("../../../../assets/xrp.png"),
  AVAX: require("../../../../assets/xrp.png"),
  SHIB: require("../../../../assets/xrp.png"),
  FTT: require("../../../../assets/xrp.png"),
  MATIC: require("../../../../assets/xrp.png"),
  LTC: require("../../../../assets/xrp.png"),
};

export function ListItem(props: ListItemProps) {
  const { name, symbol, metrics } = props;
  const isUp =
    (metrics?.market_data.percent_change_usd_last_24_hours as number) > 0;
  const iconUrl = isUp
    ? require("../../../../assets/up.png")
    : require("../../../../assets/down.png");
  return (
    <View style={container}>
      <View style={leftWrapper}>
        <Image source={images[symbol as keyof typeof images]} style={image} />
        <View style={nameWrapper}>
          <Text style={nameText}>{name}</Text>
          <Text style={symbolText}>{symbol}</Text>
        </View>
      </View>

      <View style={metricsWrapper}>
        <Text style={priceText}>{"$" + metrics?.market_data.price_usd}</Text>
        <View style={iconWrapper}>
          <Text
            style={[
              percentText,
              {
                color: isUp ? "#0A8150" : "#DE3617",
              },
            ]}
          >
            {metrics?.market_data.percent_change_usd_last_24_hours + "%"}
          </Text>
          <Image source={iconUrl} style={icon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 130,
    paddingTop: 40,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#E4E8EB",
    backgroundColor: "#fff",
  },
  leftWrapper: {
    flexDirection: "row",
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  nameWrapper: {
    flexDirection: "column",
  },
  nameText: {
    alignItems: "center",
    fontWeight: "600",
    fontSize: 16,
    height: 24,
    color: "#212B36",
  },
  symbolText: {
    alignItems: "center",
    height: 20,
    color: "#56626E",
    fontSize: 14,
  },
  metricsWrapper: {
    flexDirection: "column",
  },
  iconWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
    height: 20,
    fontWeight: "400",
  },
  percentText: {
    marginLeft: 4,
    textAlign: "right",
  },
  priceText: {
    height: 24,
    alignItems: "center",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "right",
  },
  icon: {
    width: 12,
    height: 12,
  },
});

const {
  container,
  leftWrapper,
  image,
  nameWrapper,
  nameText,
  symbolText,
  metricsWrapper,
  percentText,
  priceText,
  icon,
  iconWrapper,
} = styles;
