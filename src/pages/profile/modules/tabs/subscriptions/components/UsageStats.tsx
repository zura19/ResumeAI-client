import { Progress } from "@/components/ui/progress";

interface props {
  userActions?: {
    generatedResumesThisMonth: number;
    aiCreditsThisMonth: number;
  };
  plan?: {
    totalResumes: number;
    aiCreditsPerMonth: number;
  };
}

export default function UsageStats({ userActions, plan }: props) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Resumes</span>
          <span className="font-mono text-xs text-foreground">
            {userActions?.generatedResumesThisMonth}/{plan?.totalResumes}
          </span>
        </div>
        <Progress
          value={
            (Number(userActions?.generatedResumesThisMonth) /
              Number(plan?.totalResumes)) *
            100
          }
          className="h-1.5"
        />
      </div>
      <div className="flex flex-col gap-2 rounded-lg border border-border bg-secondary/30 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">AI Credits</span>
          <span className="font-mono text-xs text-foreground">
            {userActions?.aiCreditsThisMonth}/{plan?.aiCreditsPerMonth}
          </span>
        </div>
        <Progress
          value={
            (Number(userActions?.aiCreditsThisMonth) /
              Number(plan?.aiCreditsPerMonth)) *
            100
          }
          className="h-1.5"
        />
      </div>
    </div>
  );
}
