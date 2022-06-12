import { Action, State, CurrencyActions, FAVORITE_CURRENCIES } from "../store";
import { setStorage } from "../utils";

export function currencyReducer(state: State, action: Action): State {
  const { type, payload } = action;

  switch (type) {
    case CurrencyActions.InitCurrencies:
      return {
        ...state,
        favoriteCurrencies: (payload as string[]) ?? state.favoriteCurrencies,
      };

    case CurrencyActions.SetAllCurrencies:
      return {
        ...state,
        allCurrencies: payload as string[],
      };

    case CurrencyActions.AddCurrency:
      state.favoriteCurrencies.push(payload as string);
      setStorage(FAVORITE_CURRENCIES, state.favoriteCurrencies);
      return {
        ...state,
        favoriteCurrencies: state.favoriteCurrencies,
      };

    case CurrencyActions.DeleteCurrency:
      const index = state.favoriteCurrencies.findIndex(
        (currency) => currency === payload
      );
      const favoriteCurrenciesDel = state.favoriteCurrencies.splice(index, 0);

      setStorage(FAVORITE_CURRENCIES, favoriteCurrenciesDel);
      return {
        ...state,
        favoriteCurrencies: favoriteCurrenciesDel,
      };

    default:
      return state;
  }
}
