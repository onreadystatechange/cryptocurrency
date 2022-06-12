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

type marketData = {
  percent_change_usd_last_24_hours: number;
  price_usd: number;
};

//only list used property
type Currency = {
  id: string;
  name: string;
  serial_id: number;
  slug: string;
  symbol: string;
  _internal_temp_agora_id: string;
  metrics: marketData;
};

type Response<T> = {
  data: T;
  status: Status;
};

export function useGetCurrencyList() {
  const [currencyList, setCurrencyList] = useState<Currency[] | undefined>([]);
  const { data: payload, error } = useSWRNative<Response<Currency[]>>(
    `${BASE_URL}/assets`
  );
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
    const allCurrencies = payload?.data.map((currency) => currency.symbol);
    dispatch(setAllCurrencies(allCurrencies || []));
  }, [payload?.data]);

  useEffect(() => {
    const filteredCurrency = payload?.data.filter((currency) =>
      state.favoriteCurrencies.includes(currency.symbol)
    );
    setCurrencyList(filteredCurrency);
  }, [payload?.data, state.favoriteCurrencies]);

  return {
    currencyList,
    isLoading: !error && !currencyList?.length,
    isError: error,
    setCurrencyList,
    dispatch,
    state,
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
