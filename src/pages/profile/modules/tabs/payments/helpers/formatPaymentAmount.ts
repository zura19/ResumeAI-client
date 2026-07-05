import { formatCurrency } from "@/lib/utils";

export function formatPaymentAmount(amount: number) {
  return formatCurrency(amount / 100);
}
