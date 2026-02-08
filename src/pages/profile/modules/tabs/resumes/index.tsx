import { Card, CardContent } from "@/components/ui/card";
import type { ResumeType } from "@/lib/types/AiGeneratedResume";
import { FileTextIcon } from "lucide-react";
import Header from "./components/Header";
import ResumeCard from "./components/ResumeCard";

interface props {
  resumes?: {
    id: string;
    title: string;
    type: ResumeType;
    createdAt: string;
  }[];
}

export function ResumeListTab({ resumes }: props) {
  const arr = resumes;
  return (
    <Card className="border bg-background/50 backdrop-blur-lg min-h-100">
      <Header totalResume={resumes?.length || 0} />

      <CardContent className="flex flex-col gap-3">
        {resumes?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <FileTextIcon className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-muted-foreground">No resumes found</p>
          </div>
        )}
        {arr?.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </CardContent>
    </Card>
  );
}
