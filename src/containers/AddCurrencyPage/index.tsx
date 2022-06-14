import { StatusBar } from "expo-status-bar";
import { debounce } from "lodash";
import Toast from "react-native-toast-message";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useCallback, useMemo, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { NavigationProps } from "../../navigation";
import { addCurrency } from "../../store";
import { CurrencyContext } from "../../context";
import { GoBack } from "../../components";

export function AddCurrencyPage() {
  const [text, onChangeText] = useState("");
  const [validateSuccess, setValidateSuccess] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const { state, dispatch } = useContext(CurrencyContext);
  const navigation = useNavigation<NavigationProps>();

  const handleBlur = useCallback(() => {
    setIsFocus(false);
  }, [setIsFocus]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);
  }, [isFocus, setIsFocus]);

  const handleChange = useCallback(
    (e) => {
      onChangeText(e);
      const validateStatus = state.symbolNames.some(
        (item) => item.name === e || item.symbol === e
      );
      setValidateSuccess(validateStatus);
    },
    [onChangeText, state.symbolNames, setValidateSuccess]
  );

  const addFn = useCallback(
    debounce((text) => {
      dispatch(addCurrency(text));
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Added successfully",
      });
      onChangeText("");
      setValidateSuccess(false);
      navigation.goBack();
    }, 200),
    [dispatch, onChangeText, setValidateSuccess, navigation]
  );

  const backString = "< Back to list";
  const btnColor = validateSuccess ? "#385775" : "rgba(56, 87, 117, 0.2)";
  const inputBorderColor = useMemo(() => {
    return isFocus ? "#FBD24D" : "#B7C0C6";
  }, [isFocus, text, validateSuccess]);

  return (
    <View style={container}>
      <StatusBar style="auto" />

      <GoBack text={backString} />
      <View style={addWrapper}>
        <Text style={addText}>Add a Cryptocurrency</Text>
        <TextInput
          style={[input, { borderColor: inputBorderColor }]}
          onChangeText={handleChange}
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
  btnStyle,
  btnTextStyle,
  errorText,
  btnTextWrapperStyle,
} = styles;
