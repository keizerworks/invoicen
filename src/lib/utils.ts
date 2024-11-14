import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// this helper converts the numbers to USD currency format for further use in project :)
export function FormatToUSD(input:any) {
 return Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(input,);
}
