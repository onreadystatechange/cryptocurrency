import * as React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

type ErrorProps = {
  resetErrorBoundary: () => {};
  errorText: string;
};

export function Error(props: ErrorProps) {
  const { resetErrorBoundary, errorText } = props;
  return (
    <View style={container}>
      <View>
        <Text> {errorText || "Something went wrong:"}</Text>
        <Button title="try Again" onPress={resetErrorBoundary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
});

const { container } = styles;
