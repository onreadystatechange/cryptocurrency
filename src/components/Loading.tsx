import * as React from "react";
import { StyleSheet, View, ActivityIndicator, ColorValue } from "react-native";

type LoadingProps = {
  size: number | "small" | "large" | undefined;
  color: ColorValue | undefined;
};

export function Loading(props: LoadingProps) {
  const { size, color } = props;
  return (
    <View style={container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});

const { container } = styles;
