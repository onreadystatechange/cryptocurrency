import { createContext, Dispatch } from "react";

import { State, Action } from "../store";

interface CurrencyContextType {
  state: State;
  dispatch: Dispatch<Action<any>>;
}

export const CurrencyContext = createContext({} as CurrencyContextType);
