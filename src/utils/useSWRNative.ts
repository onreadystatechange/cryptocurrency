import useSWR, { SWRResponse, SWRConfiguration, Key } from "swr";
import { useRef, useEffect } from "react";
import { AppState, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type NetInfo from "@react-native-community/netinfo";
import type { NetInfoState } from "@react-native-community/netinfo";

type Props<Data, Error> = {
  mutate: SWRResponse<Data, Error>["mutate"];
} & Pick<
  SWRConfiguration,
  "revalidateOnFocus" | "revalidateOnReconnect" | "focusThrottleInterval"
>;

interface AppStateAddEventListenerReturn {
  remove: () => void;
}

export function useSWRNativeRevalidate<Data = any, Error = any>(
  props: Props<Data, Error>
) {
  const {
    mutate,
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    focusThrottleInterval = 5000,
  } = props;

  const { addListener } = useNavigation();

  const lastFocusedAt = useRef<number | null>(null);
  const fetchRef = useRef(mutate);
  useEffect(() => {
    fetchRef.current = mutate;
  });
  const focusCount = useRef(
    Platform.select({
      web: 1,
      default: 0,
    })
  );

  const previousAppState = useRef(AppState.currentState);
  const previousNetworkState = useRef<NetInfoState | null>(null);

  useEffect(() => {
    let unsubscribeReconnect: ReturnType<
      typeof NetInfo.addEventListener
    > | null = null;
    if (revalidateOnReconnect && Platform.OS !== "web") {
      const Network: typeof NetInfo =
        require("@react-native-community/netinfo").default;

      unsubscribeReconnect = Network.addEventListener((state) => {
        if (
          previousNetworkState.current?.isInternetReachable === false &&
          state.isConnected &&
          state.isInternetReachable
        ) {
          fetchRef.current();
        }
        previousNetworkState.current = state;
      });
    }

    const onFocus = () => {
      if (focusCount.current < 1) {
        focusCount.current++;
        return;
      }
      const isThrottled =
        focusThrottleInterval &&
        lastFocusedAt.current &&
        Date.now() - lastFocusedAt.current <= focusThrottleInterval;

      if (!isThrottled) {
        lastFocusedAt.current = Date.now();
        fetchRef.current();
      }
    };

    const onAppStateChange = (nextAppState: AppState["currentState"]) => {
      if (
        previousAppState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        Platform.OS !== "web"
      ) {
        onFocus();
      }

      previousAppState.current = nextAppState;
    };

    let unsubscribeFocus: ReturnType<typeof addListener> | null = null;
    let unsubscribeAppStateChange: AppStateAddEventListenerReturn | null | void =
      null;

    if (revalidateOnFocus) {
      unsubscribeFocus = addListener("focus", onFocus);
      unsubscribeAppStateChange = AppState.addEventListener(
        "change",
        onAppStateChange
      );
    }

    return () => {
      if (revalidateOnFocus) {
        unsubscribeFocus?.();

        if (unsubscribeAppStateChange && unsubscribeAppStateChange?.remove) {
          unsubscribeAppStateChange.remove?.();
        } else {
          AppState.removeEventListener("change", onAppStateChange);
        }
      }
      if (revalidateOnReconnect) {
        unsubscribeReconnect?.();
      }
    };
  }, [
    addListener,
    focusThrottleInterval,
    revalidateOnFocus,
    revalidateOnReconnect,
  ]);
}

type Fetcher<Data> = ((...args: any) => Data | Promise<Data>) | null;

export const useSWRNative = <Data = any, Error = any>(
  key: Key,
  fn: Fetcher<Data> = null,
  config?: SWRConfiguration<Data, Error>
) => {
  const swr = useSWR<Data, Error>(key, fn, config);

  useSWRNativeRevalidate({
    mutate: swr.mutate,
    revalidateOnFocus: config?.revalidateOnFocus,
    revalidateOnReconnect: config?.revalidateOnReconnect,
    focusThrottleInterval: config?.focusThrottleInterval,
  });

  return swr;
};
