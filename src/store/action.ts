import { SymbolNames } from "./state";
export const enum CurrencyActions {
  AddCurrency = "ADD_CURRENCY",
  DeleteCurrency = "DELETE_CURRENCY",
  InitCurrencies = "INIT_CURRENCIES",
  SetAllCurrencies = "SET_ALL_CURRENCIES",
}

export type Action<T> = {
  type: CurrencyActions;
  payload: T;
};

export const addCurrency = (payload: string): Action<string> => ({
  type: CurrencyActions.AddCurrency,
  payload,
});

export const deleteCurrency = (payload: string): Action<string> => ({
  type: CurrencyActions.DeleteCurrency,
  payload,
});

export const initCurrencies = (payload: string[]): Action<string[]> => ({
  type: CurrencyActions.InitCurrencies,
  payload,
});

export const setAllCurrencies = (
  payload: SymbolNames[]
): Action<SymbolNames[]> => ({
  type: CurrencyActions.SetAllCurrencies,
  payload,
});
