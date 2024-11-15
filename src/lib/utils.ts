import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// this helper converts the numbers to any currency format for further use in project :)
export function formatToCurrency(input:number, currencyType:string): string {
 return Intl.NumberFormat('en-US', { style: 'currency', currency: currencyType }).format(input,);
 
}
