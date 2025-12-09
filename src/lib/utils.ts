import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format amount to Kenyan Shillings (KSh)
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "KSh 1,299")
 */
export function formatCurrency(amount: number): string {
  return `KSh ${Math.round(amount).toLocaleString('en-KE')}`;
}
