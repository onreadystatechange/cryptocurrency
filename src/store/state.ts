export type SymbolNames = {
  symbol: string;
  name: string;
};

export type State = {
  favoriteCurrencies: string[];
  symbolNames: SymbolNames[];
};

export const FAVORITE_CURRENCIES = "FAVORITE_CURRENCIES";

export const initFavoriteCurrenciesState: State = {
  favoriteCurrencies: ["BTC", "ETH", "DOGE"],
  symbolNames: [],
};
