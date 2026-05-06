import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const PAGE_SIZE = 10;

export const normalize = (s: string) => s.trim().toLowerCase();

export const normalizeIndex = (next: number, length: number) => {
  if (length === 0) return 0;
  return (next + length) % length;
};

export const clampIndex = (value: number, length: number) => {
  if (length === 0) return 0;
  return Math.min(Math.max(value, 0), length - 1);
};
