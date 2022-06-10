import { StatusBar } from "expo-status-bar";
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
      <StatusBar style="auto" />
      <Routers />
    </SWRConfig>
  );
}
