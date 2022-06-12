import AsyncStorage from "@react-native-async-storage/async-storage";

export function clearStorage() {
  return AsyncStorage.clear();
}

export const getStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};

export function setStorage(key: string, value: string[]) {
  return AsyncStorage.setItem(key, JSON.stringify(value));
}

export function removeStorage(key: string) {
  return AsyncStorage.removeItem(key);
}
