export function getPaymentStatusClasses(status: string) {
  switch (status) {
    case "SUCCEEDED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
    case "FAILED":
      return "border-red-500/30 bg-red-500/10 text-red-400";
    case "PROCESSING":
      return "border-sky-500/30 bg-sky-500/10 text-sky-400";
    case "REQUIRES_PAYMENT_METHOD":
      return "border-amber-500/30 bg-amber-500/10 text-amber-400";
    default:
      return "border-border bg-secondary text-muted-foreground";
  }
}
