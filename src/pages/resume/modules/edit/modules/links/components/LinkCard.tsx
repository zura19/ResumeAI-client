import { Button } from "@/components/ui/button";
import type { Link } from "@/lib/types/AiGeneratedResume";
import type { LinkBody } from "@/lib/services/resume/edit/createLinkService";
import { Loader2Icon, Trash2Icon, ExternalLink, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import LinkModal from "./LinkModal";

interface LinkCardProps {
  link: Link;
  isPending: boolean;
  deleteLink: (linkId: string) => Promise<unknown>;
  editLink: (payload: {
    linkId: string;
    link: LinkBody;
  }) => Promise<unknown>;
  index: number;
}

function getLinkTypeLabel(type: string): string {
  switch (type.toLowerCase()) {
    case "github":
      return "GitHub";
    case "linkedin":
      return "LinkedIn";
    case "portfolio":
      return "Portfolio";
    case "website":
      return "Website";
    case "twitter":
      return "Twitter / X";
    case "instagram":
      return "Instagram";
    case "facebook":
      return "Facebook";
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

export default function LinkCard({
  link,
  isPending,
  deleteLink,
  editLink,
  index,
}: LinkCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!link.id) return;
    setIsDeleting(true);
    try {
      await deleteLink(link.id);
    } finally {
      setIsDeleting(false);
    }
  }

  const href =
    link.url.startsWith("http://") || link.url.startsWith("https://")
      ? link.url
      : `https://${link.url}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -400 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-muted rounded-lg py-2.5 px-4 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-base">{getLinkTypeLabel(link.type)}</h3>
        </div>
        <div className="flex items-center gap-2">
          <LinkModal
            link={link}
            session="edit"
            editLink={editLink}
            isPending={isPending}
          />
          <Button
            onClick={handleDelete}
            size={"icon-sm"}
            variant="destructive"
            className="size-6 rounded-sm"
            disabled={isPending || isDeleting}
          >
            {isDeleting ? (
              <Loader2Icon className="size-3 animate-spin" />
            ) : (
              <Trash2Icon className="size-3" />
            )}
          </Button>
        </div>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors truncate"
      >
        <span className="truncate">{link.url}</span>
        <ExternalLink className="size-3 shrink-0" />
      </a>
    </motion.div>
  );
}
