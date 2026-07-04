import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";
import { shortString } from "@/lib/utils";
import { formatDate } from "date-fns";
import { DownloadIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { resumeGradientConfig } from "@/pages/profile/configs/resumeGradientConfig";
import { resumeTypeConfig } from "@/pages/profile/configs/resumeTypeConfig";

interface props {
  resume?: {
    id: string;
    title: string;
    type: ResumeType;
    createdAt: string;
    updatedAt: string;
  };
}

export default function ResumeCard({ resume }: props) {
  return (
    <div
      key={resume?.id}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg backdrop-blur-lg bg-linear-to-br ",
            resumeGradientConfig[resume?.type as ResumeType],
          )}
        >
          <FileTextIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground text-sm">
              {shortString(resume?.title || "Untitled Resume", 20)}
            </span>
            <Badge
              variant="outline"
              className={
                "ml-auto" +
                " " +
                resumeTypeConfig[resume?.type as ResumeType].className
              }
            >
              {resumeTypeConfig[resume?.type as ResumeType].label}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Last Updated At{" "}
              {resume && formatDate(resume.updatedAt, "MMM dd, yyyy, hh:mm a")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary"
          asChild
        >
          <Link to={`/resume/${resume?.id}`}>
            <ExternalLinkIcon className="h-3.5 w-3.5" />
            Open
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={true}
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          Download
        </Button>
      </div>
    </div>
  );
}
