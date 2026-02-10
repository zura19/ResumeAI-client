export const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  SUCCEEDED: {
    label: "Paid",
    className: "bg-chart-2/10 text-chart-2 border-chart-2/25",
  },
  PROCESSING: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
  FAILED: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/25",
  },
  REQUIRES_CONFIRMATION: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
  REQUIRES_PAYMENT_METHOD: {
    label: "Pending",
    className: "bg-chart-3/15 text-chart-3 border-chart-3/25",
  },
};
