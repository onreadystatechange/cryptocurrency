export type State = {
  favoriteCurrencies: string[];
  allCurrencies: string[];
};

export const FAVORITE_CURRENCIES = "FAVORITE_CURRENCIES";

export const initFavoriteCurrenciesState: State = {
  favoriteCurrencies: ["BTC", "ETH", "DOGE"],
  allCurrencies: [],
};
