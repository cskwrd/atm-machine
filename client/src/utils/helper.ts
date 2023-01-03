import { assertUnreachable } from "./assertions";

export function convertToCurrency(number: number) {
  number = Math.abs(Math.round((number + Number.EPSILON) * 100) / 100);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export enum CurrencyType {
  INR = "INR",
  USD = "USD",
  EUR = "EUR",
}

export function currencyFind(currencyType: CurrencyType) {
  switch (currencyType) {
    case CurrencyType.INR:
      return "₹";
    case CurrencyType.USD:
      return "$";
    case CurrencyType.EUR:
      return "€";
    default:
      return assertUnreachable(currencyType);
  }
}

export type GroupCategories = "Home" | "Trip" | "Office" | "Sports" | "Others";

export function categoryIcon(
  groupCategory: GroupCategories
) {
  switch (groupCategory) {
    case "Home":
      return "ant-design:home-filled";
    case "Trip":
      return "ic:outline-flight";
    case "Office":
      return "mdi:office-building-marker";
    case "Sports":
      return "material-symbols:sports-cricket";
    case "Others":
      return "foundation:page-edit";
    default:
      return "ic:baseline-insert-page-break";
  }
}

export const monthNamesMMM = [
  "JAN",
  "FRB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function getMonthMMM(date: Date) {
  return monthNamesMMM[date.getMonth()];
}

export function zeroPad(num: number): string {
  return ("0" + num).slice(-2);
}
