import { StatusBar } from "expo-status-bar";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback, useMemo, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../navigation";
import { addCurrency } from "../../store";
import { CurrencyContext } from "../../context";

type NavigationProps = StackNavigationProp<RootStackParamList>;

export function AddCurrencyPage() {
  const [text, onChangeText] = useState("");
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const { state, dispatch } = useContext(CurrencyContext);

  const handleBlur = useCallback(() => {
    const validateStatus = state.symbolNames.some(
      (item) => item.name === text || item.symbol === text
    );
    setValidateSuccess(validateStatus);
    setIsFocus(false);
  }, [text, setValidateSuccess, state.symbolNames, isFocus, setIsFocus]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, [isFocus, setIsFocus]);

  const navigation = useNavigation<NavigationProps>();
  const backString = "< Back to list";

  const addFn = useCallback(
    (text) => {
      dispatch(addCurrency(text));
    },
    [dispatch]
  );

  const btnColor = validateSuccess ? "#385775" : "rgba(56, 87, 117, 0.2)";
  const inputBorderColor = useMemo(() => {
    if (!validateSuccess && text) {
      return "red";
    }
    if (isFocus) {
      return "#FBD24D";
    } else {
      return "#B7C0C6";
    }
  }, [isFocus, text, validateSuccess]);

  return (
    <View style={container}>
      <StatusBar style="auto" />
      <TouchableOpacity style={backBtn} onPress={() => navigation.goBack()}>
        <Text style={backText}>{backString}</Text>
      </TouchableOpacity>
      <View style={addWrapper}>
        <Text style={addText}>Add a Cryptocurrency</Text>
        <TextInput
          style={[input, { borderColor: inputBorderColor }]}
          onChangeText={onChangeText}
          onBlur={handleBlur}
          onFocus={handleFocus}
          value={text}
          placeholder="Use a name or ticker symbol..."
          placeholderTextColor="#B7C0C6"
          autoFocus
        />

        <Text style={errorText}>
          {!validateSuccess && text
            ? "Please input correct name or ticker symbol"
            : ""}
        </Text>
        <View style={btnStyle}>
          <TouchableOpacity
            onPress={() => addFn(text)}
            disabled={!validateSuccess}
            style={btnTextWrapperStyle}
          >
            <Text style={[btnTextStyle, { color: btnColor }]}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  addWrapper: {
    width: "100%",
  },
  addText: {
    color: "#212B36",
    fontSize: 24,
    height: 36,
    alignItems: "center",
    fontWeight: "700",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#FAFBFC",
    height: 56,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    fontSize: 16,
    paddingLeft: 8,
  },
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
  btnStyle: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row-reverse",
  },
  btnTextWrapperStyle: {
    width: 155,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FBD24D",
    borderRadius: 4,
  },
  btnTextStyle: {
    fontWeight: "600",
    fontSize: 18,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

const {
  container,
  addWrapper,
  addText,
  input,
  backBtn,
  backText,
  btnStyle,
  btnTextStyle,
  errorText,
  btnTextWrapperStyle,
} = styles;
