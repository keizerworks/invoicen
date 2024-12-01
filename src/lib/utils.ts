import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// this helper converts the numbers to any currency format for further use in project :)
export function formatToCurrency(input: number, currencyType: "USD" | "Euro" | "Rupee"): string {
  switch (currencyType) {
    case "USD":
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(input);
    case "Euro":
      return Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(input);
    case "Rupee":
      return Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(input);
    default:
      return Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(input);
  }
}
