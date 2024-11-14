import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDecimal = (value: number): string => {
 if (isNaN(value) || value === null || value === undefined) {
   return "0.00";
 }
 const fixedValue = Math.abs(value) === 0 ? 0 : value;

 return fixedValue.toFixed(2);
};
