import { formatCurrency } from "@/lib/utils";

export interface ProfileTotals {
  totalTransactions: number;
  totalResumes: number;
  totalAiCredits: number;
}

// export type TotalStatId = "transactions" | "total-resumes" | "ai-credits-used";

interface GetTotalStatValueParams {
  statId: string;
  totals?: ProfileTotals;
}

export function getTotalStatValue({ statId, totals }: GetTotalStatValueParams) {
  switch (statId) {
    case "transactions":
      return totals?.totalTransactions != null
        ? formatCurrency(totals.totalTransactions / 100)
        : undefined;
    case "total-resumes":
      return totals?.totalResumes ?? undefined;
    case "ai-credits-used":
      return totals?.totalAiCredits ?? undefined;
  }
}
