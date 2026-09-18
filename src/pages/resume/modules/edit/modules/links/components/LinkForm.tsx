import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Link, LinkType } from "@/lib/types/AiGeneratedResume";
import type { LinkBody } from "@/lib/services/resume/edit/createLinkService";
import { LoaderIcon } from "lucide-react";

interface LinkFormProps {
  session: "create" | "edit";
  handleClose: () => void;
  addLink?: (link: LinkBody) => Promise<unknown>;
  editLink?: (payload: { linkId: string; link: LinkBody }) => Promise<unknown>;
  link?: Link;
}

const LINK_OPTIONS: { label: string; value: LinkType }[] = [
  { label: "GitHub", value: "github" },
  { label: "LinkedIn", value: "linkedin" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Website", value: "website" },
  { label: "Twitter / X", value: "twitter" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Other", value: "other" },
];

export default function LinkForm({
  session,
  handleClose,
  addLink,
  editLink,
  link,
}: LinkFormProps) {
  const [url, setUrl] = useState(link?.url || "");
  const [type, setType] = useState<LinkType>(link?.type || "github");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDisabled = !url.trim();

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (isDisabled) return;

    setIsSubmitting(true);
    try {
      if (session === "create" && addLink) {
        await addLink({ url: url.trim(), type });
      } else if (session === "edit" && editLink && link?.id) {
        await editLink({
          linkId: link.id,
          link: { url: url.trim(), type },
        });
      }
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="linkType" className="font-semibold">
          Platform / Type
        </Label>
        <Select value={type} onValueChange={(val) => setType(val as LinkType)}>
          <SelectTrigger id="linkType" className="w-full">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {LINK_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url" className="font-semibold">
          URL
        </Label>
        <Input
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://github.com/your-profile"
        />
      </div>

      <Button
        type="submit"
        disabled={isDisabled || isSubmitting}
        className="w-full flex items-center justify-center gap-2"
      >
        {isSubmitting && <LoaderIcon className="size-4 animate-spin" />}
        {session === "edit"
          ? isSubmitting
            ? "Saving..."
            : "Save Link"
          : isSubmitting
            ? "Adding..."
            : "Add Link"}
      </Button>
    </form>
  );
}
