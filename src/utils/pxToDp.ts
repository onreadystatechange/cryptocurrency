import { Dimensions } from "react-native";

const deviceWidthDp = Dimensions.get("window").width;

const uiWidthPx = 750;

export function pxToDp(uiElementPx: number): number {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
}
