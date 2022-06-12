import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { SWRConfig } from "swr";

import { Routers } from "./Routers";
import { fetcher } from "./src/utils";

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher,
        provider: () => new Map(),
      }}
    >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="auto" />
          <Routers />
        </SafeAreaView>
      </SafeAreaProvider>
    </SWRConfig>
  );
}
