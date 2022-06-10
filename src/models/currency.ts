import { useSWRNative } from "../utils";

import { BASE_URL } from "./baseUrl";

type Status = {
  elapsed: number;
  timestamp: string;
};

type Response = {
  data: any;
  status: Status;
};

export function useGetCurrencyList() {
  const { data: payload, error } = useSWRNative<Response>(`${BASE_URL}/assets`);

  return {
    currencyList: payload?.data,
    isLoading: !error && !payload?.data,
    isError: error,
  };
}

export function useGetCurrencyInfo(currency: string) {
  const { data: payload, error } = useSWRNative<Response>(
    `${BASE_URL}/assets/${currency}/metrics`
  );

  return {
    currencyInfo: payload?.data,
    isLoading: !error && !payload?.data,
    isError: error,
  };
}

export function useCreateCurrency(currency: string) {
  const { data: payload, error } = useSWRNative<Response>([
    `${BASE_URL}/assets`,
    JSON.stringify({ "crypto currency": currency }),
  ]);

  return {
    currencyInfo: payload?.data,
    isLoading: !error && !payload?.data,
    isError: error,
  };
}
