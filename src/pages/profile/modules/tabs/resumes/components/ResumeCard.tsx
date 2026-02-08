import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";
import { formatDate } from "date-fns";
import { DownloadIcon, ExternalLinkIcon, FileTextIcon } from "lucide-react";
import { Link } from "react-router-dom";

const typeConfig: Record<ResumeType, { label: string; className: string }> = {
  classic: {
    label: "Classic",
    className: "bg-gray-400/10 text-gray-400 border-gray-400/25",
  },
  modern: {
    label: "Modern",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/25",
  },
  executive: {
    label: "Executive",
    className: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
  },
  creative: {
    label: "Creative",
    className: "bg-pink-500/15 text-pink-400 border-pink-500/25",
  },
};

interface props {
  resume?: {
    id: string;
    title: string;
    type: ResumeType;
    createdAt: string;
  };
}

export default function ResumeCard({ resume }: props) {
  return (
    <div
      key={resume?.id}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <FileTextIcon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground text-sm">
              {resume?.title}
            </span>
            <Badge
              variant="outline"
              className={
                "ml-auto" +
                " " +
                typeConfig[resume?.type as ResumeType].className
              }
            >
              {resume?.type}
            </Badge>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>
              Last Updated At{" "}
              {resume && formatDate(resume.createdAt, "MM/dd/yyyy")}
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
          className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary"
        >
          <DownloadIcon className="h-3.5 w-3.5" />
          Download
        </Button>
      </div>
    </div>
  );
}
