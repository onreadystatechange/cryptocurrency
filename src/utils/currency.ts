import currency from "currency.js";
export function numberToCurrency(number: number): string {
  let precision: number = 0;
  if (number >= 1) {
    precision = 2;
  } else if (number < 1 && number >= 0.1) {
    precision = 3;
  } else {
    precision = 4;
  }
  return currency(number, { decimal: ".", precision }).format();
}
