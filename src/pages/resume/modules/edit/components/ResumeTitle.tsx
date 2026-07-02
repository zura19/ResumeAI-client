import { Check, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useChangeResumeTitleAction from "@/pages/resume/hooks/actions/useChangeResumeTitleAction";
import { Skeleton } from "@/components/ui/skeleton";
import { shortString } from "@/lib/utils";

interface props {
  id: string;
  title: string | null;
  isLoading?: boolean;
}

export default function ResumeTitle({ id, title, isLoading }: props) {
  const {
    inputRef,
    isEditing,
    draftTitle,
    setDraftTitle,
    canSave,
    isPending,
    startEditing,
    cancelEditing,
    handleSaveTitle,
    handleKeyDown,
  } = useChangeResumeTitleAction({
    id,
    title,
  });

  if (isLoading) {
    return <Skeleton className="h-4 w-[50%] rounded-full" />;
  }

  return (
    <div className="flex items-center gap-1">
      {isEditing ? (
        <div className="relative mb-2">
          <Input
            ref={inputRef}
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-9  sm:w-75  pr-7"
            placeholder="Untitled Resume"
          />
          <Button
            type="button"
            size="icon-sm"
            className="absolute top-1/2  right-1 -translate-y-1/2 rounded-full  size-5"
            disabled={!canSave() || isPending}
            onClick={() => handleSaveTitle()}
          >
            <Check className="" />
          </Button>
        </div>
      ) : (
        <h1 className="text-xl font-bold">
          {shortString(title || "Untitled Resume", 20)}
        </h1>
      )}
      {isEditing ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="gap-2 rounded-full mb-2"
          disabled={isPending}
          onClick={cancelEditing}
        >
          <X className="text-muted-foreground" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="gap-2 rounded-full"
          onClick={startEditing}
        >
          <Pencil className="text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
