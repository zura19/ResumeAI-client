import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortString(str: string, length: number) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  } else {
    return str;
  }
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(amount: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount);
}

export function uppercaseFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateProgress(startStr: string, endStr: string): number {
  const start = new Date(startStr).getTime();
  const end = new Date(endStr).getTime();

  // If the end date has passed, set it to now
  const now = Date.now();
  const total = end - start;
  const elapsed = now - start;
  return Math.min(Math.max((elapsed / total) * 100, 0), 100);
}

export function calculateDaysLeft(endStr: string): number {
  const end = new Date(endStr).getTime();
  const now = Date.now();
  const remaining = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
  return Math.max(remaining, 0);
}

export function calculateGrowth(thisMonth: number, lastMonth: number): number {
  if (lastMonth === 0) return thisMonth === 0 ? 0 : 100;
  return ((thisMonth - lastMonth) / lastMonth) * 100;
}
