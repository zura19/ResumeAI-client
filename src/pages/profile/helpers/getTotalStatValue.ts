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
      return (
        totals?.totalTransactions &&
        formatCurrency(totals.totalTransactions / 100)
      );
    case "total-resumes":
      return totals?.totalResumes;
    case "ai-credits-used":
      return totals?.totalAiCredits;
  }
}
