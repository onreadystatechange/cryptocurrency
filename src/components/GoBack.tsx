import * as React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

type GoBackProps = {
  text: string;
};

export function GoBack(props: GoBackProps) {
  const { text } = props;
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity style={backBtn} onPress={() => navigation.goBack()}>
        <Text style={backText}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  backBtn: {
    top: 60,
    position: "absolute",
    left: 24,
  },
  backText: {
    height: 24,
    alignItems: "center",
    color: "#385775",
    fontSize: 16,
  },
});

const { backBtn, backText } = styles;
