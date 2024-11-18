import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractFileNameFromContentDisposition = (contentDisposition: string) => {
  return contentDisposition.split(";")[1].split("=")[1].replace(/"/g, "");
};
