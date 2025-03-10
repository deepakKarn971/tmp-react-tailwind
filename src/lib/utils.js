
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatDateRange(fromDate, toDate) {
  if (!fromDate) return "";
  if (!toDate) return format(fromDate, "dd/MM/yyyy");
  return `${format(fromDate, "dd/MM/yyyy")} - ${format(toDate, "dd/MM/yyyy")}`;
}
