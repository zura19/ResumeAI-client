import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface props {
  title: string | null;
}

export default function ResumeTitle({ title }: props) {
  return (
    <div className="flex items-center gap-1">
      <h1 className="text-xl font-bold">{title || "Untitled Resume"}</h1>
      <Button variant="ghost" size="icon-sm" className="gap-2 rounded-full">
        <Pencil className="text-muted-foreground" />
      </Button>
    </div>
  );
}
