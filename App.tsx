import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
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
          <Routers />
          <Toast />
        </SafeAreaView>
      </SafeAreaProvider>
    </SWRConfig>
  );
}
