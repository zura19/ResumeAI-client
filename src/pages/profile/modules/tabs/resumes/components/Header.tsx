import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileTextIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface props {
  totalResume: number;
}

export default function Header({ totalResume }: props) {
  return (
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
              {totalResume} resumes created
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
  );
}
