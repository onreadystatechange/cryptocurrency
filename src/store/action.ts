export const enum CurrencyActions {
  AddCurrency = "ADD_CURRENCY",
  DeleteCurrency = "DELETE_CURRENCY",
  InitCurrencies = "INIT_CURRENCIES",
  SetAllCurrencies = "SET_ALL_CURRENCIES",
}

export type Action = {
  type: CurrencyActions;
  payload: string | string[];
};

export const addCurrency = (payload: string): Action => ({
  type: CurrencyActions.AddCurrency,
  payload,
});

export const deleteCurrency = (payload: string): Action => ({
  type: CurrencyActions.DeleteCurrency,
  payload,
});

export const initCurrencies = (payload: string[]): Action => ({
  type: CurrencyActions.InitCurrencies,
  payload,
});

export const setAllCurrencies = (payload: string[]): Action => ({
  type: CurrencyActions.SetAllCurrencies,
  payload,
});
