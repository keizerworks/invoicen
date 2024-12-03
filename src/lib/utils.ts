import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "../providers/CurrencyProvider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// this helper converts the numbers to any currency format for further use in project :)
export function formatToCurrency(input: number, currencyType: Currency): string {
  switch (currencyType) {
    case Currency.USD:
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(input);
    case Currency.Euro:
      return Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(input);
    case Currency.INR:
      return Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(input);
    default:
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(input);
  }
}

export const extractFileNameFromContentDisposition = (contentDisposition: string) => {
  return contentDisposition.split(";")[1].split("=")[1].replace(/"/g, "");
};
