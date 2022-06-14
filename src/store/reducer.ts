import { clone } from "lodash";
import { State, FAVORITE_CURRENCIES } from "./state";
import { Action, CurrencyActions } from "./action";
import { setStorage } from "../utils";

export function currencyReducer(state: State, action: Action<any>): State {
  const { type, payload } = action;

  switch (type) {
    case CurrencyActions.InitCurrencies:
      return {
        ...state,
        favoriteCurrencies: payload ?? clone(state.favoriteCurrencies),
      };

    case CurrencyActions.SetAllCurrencies:
      return {
        ...state,
        symbolNames: payload,
      };

    case CurrencyActions.AddCurrency:
      state.favoriteCurrencies.push(payload);
      setStorage(FAVORITE_CURRENCIES, state.favoriteCurrencies);
      return {
        ...state,
        favoriteCurrencies: clone(state.favoriteCurrencies),
      };

    case CurrencyActions.DeleteCurrency:
      const index = state.favoriteCurrencies.findIndex(
        (currency) => currency === payload
      );

      state.favoriteCurrencies.splice(index, 1);
      setStorage(FAVORITE_CURRENCIES, state.favoriteCurrencies);
      return {
        ...state,
        favoriteCurrencies: clone(state.favoriteCurrencies),
      };

    default:
      return state;
  }
}
