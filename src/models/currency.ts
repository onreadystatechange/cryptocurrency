import { useState, useEffect, useReducer } from "react";

import { useSWRNative, getStorage } from "../utils";
import { BASE_URL } from "./baseUrl";
import {
  initCurrencies,
  FAVORITE_CURRENCIES,
  currencyReducer,
  initFavoriteCurrenciesState,
  setAllCurrencies,
} from "../store";

type Status = {
  elapsed: number;
  timestamp: string;
};

type MarketData = {
  percent_change_usd_last_24_hours: number;
  price_usd: number;
};

//only list used property
export type Currency = {
  id: string;
  name: string;
  serial_id: number;
  slug: string;
  symbol: string;
  _internal_temp_agora_id: string;
  metrics: {
    market_data: MarketData;
  };
};

type Response<T> = {
  data: T;
  status: Status;
};

export function useGetCurrencyList() {
  const [currencyList, setCurrencyList] = useState<Currency[] | undefined>(
    undefined
  );
  const {
    data: payload,
    error,
    mutate,
  } = useSWRNative<Response<Currency[]>>(`${BASE_URL}/assets`);
  const [state, dispatch] = useReducer(
    currencyReducer,
    initFavoriteCurrenciesState
  );

  useEffect(() => {
    getStorage(FAVORITE_CURRENCIES).then((initFavoriteCurrencies) =>
      dispatch(initCurrencies(initFavoriteCurrencies))
    );
  }, []);

  useEffect(() => {
    const symbolNames = payload?.data.map((currency) => ({
      symbol: currency.symbol,
      name: currency.name,
    }));
    dispatch(setAllCurrencies(symbolNames || []));
  }, [payload?.data]);

  useEffect(() => {
    const filteredCurrency = payload?.data.filter((currency) =>
      state.favoriteCurrencies.includes(currency.symbol)
    );
    setCurrencyList(filteredCurrency);
  }, [payload?.data, state.favoriteCurrencies]);
  console.log(payload, state.favoriteCurrencies, error, ">>>>.");
  return {
    currencyList,
    isLoading: !error && !payload,
    isError: error,
    setCurrencyList,
    dispatch,
    state,
    mutate,
  };
}

export function useGetCurrencyInfo(currency: string) {
  const { data: payload, error } = useSWRNative<Response<Currency>>(
    `${BASE_URL}/assets/${currency}/metrics`
  );

  return {
    currencyInfo: payload?.data,
    isLoading: !error && !payload?.data,
    isError: error,
  };
}
