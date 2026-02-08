"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";
import { formatDate } from "date-fns";
import {
  FileTextIcon,
  DownloadIcon,
  ExternalLinkIcon,
  PlusIcon,
  // EyeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const fakeResumes: {
  id: number;
  title: string;
  createdAt: string;
  type: ResumeType;
}[] = [
  {
    id: 1,
    title: "Software Engineer — 2026",
    createdAt: "Feb 3, 2026",
    type: "modern" as const,
    // views: 142,
    // downloads: 38,
  },
  {
    id: 2,
    title: "Frontend Developer — Startup Focus",
    createdAt: "Jan 21, 2026",
    type: "executive",
    // views: 87,
    // downloads: 15,
  },
  {
    id: 3,
    title: "Full-Stack Lead — Enterprise",
    createdAt: "Dec 14, 2025",
    type: "classic",
    // views: 12,
    // downloads: 3,
  },
  {
    id: 4,
    title: "Product Engineer — AI/ML",
    createdAt: "Nov 30, 2025",
    type: "creative",
    // views: 204,
    // downloads: 61,
  },
];

interface props {
  resumes?: {
    id: string;
    title: string;
    type: ResumeType;
    createdAt: string;
  }[];
}

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

export function ResumeListTab({ resumes }: props) {
  const arr = resumes && resumes?.length > 0 ? resumes : fakeResumes;
  return (
    <Card className="border bg-background/50 backdrop-blur-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/30 ">
              <FileTextIcon className="h-5 w-5 text-indigo-500" />
            </div>
            <div>
              <CardTitle className="text-lg text-foreground">
                My Resumes
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {resumes?.length} resumes created
              </CardDescription>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          asChild
        >
          <Link to="/build">
            <PlusIcon className="h-4 w-4" />
            New Resume
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 max-h-120 overflow-scroll">
        {resumes?.length === 23 && (
          <div className="p-8 bg-background/0 h-full backdrop-blur-md">
            <div className="flex flex-col items-center justify-center py-12">
              <FileTextIcon className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">No resumes found</p>
            </div>
          </div>
          // <p className="text-muted-foreground">No resumes found</p>
        )}
        {arr?.map((resume) => {
          // const status = statusConfig[resume.status];
          return (
            <div
              key={resume.id}
              className="group flex flex-col gap-3 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/60 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileTextIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground text-sm">
                      {resume.title}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        "ml-auto" + " " + typeConfig[resume.type].className
                      }
                    >
                      {/* {status.label} */}
                      {resume.type}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>
                      Last Updated At{" "}
                      {formatDate(resume.createdAt, "MM/dd/yyyy")}
                    </span>
                    {/* <span className="flex items-center gap-1">
                      <EyeIcon className="h-3 w-3" />
                      {resume.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <DownloadIcon className="h-3 w-3" />
                      {resume.downloads}
                    </span> */}
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
                  <Link to={`/resume/${resume.id}`}>
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
        })}
      </CardContent>
    </Card>
  );
}
