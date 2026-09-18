import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { AnimatePresence } from "framer-motion";
import SaveAlert from "../../components/SaveAlert";
import LinkCard from "./components/LinkCard";
import LinkModal from "./components/LinkModal";
import useLinkActions from "@/pages/resume/hooks/actions/useLinkActions";

interface LinksProps {
  resumeData: AiGeneratedResume;
  id: string;
  generatedResumeId: string;
}

export default function Links({
  resumeData,
  id,
  generatedResumeId,
}: LinksProps) {
  const { isPending, addLink, editLink, deleteLink } = useLinkActions({
    id,
    generatedResumeId,
    resumeData,
  });

  const links = resumeData.links || [];

  return (
    <div className="space-y-4">
      <SaveAlert />

      <LinkModal
        session="create"
        addLink={addLink}
        isPending={isPending}
      />

      {links.length === 0 && (
        <p className="text-center text-muted-foreground">
          No links added yet. Click the button above to add your links.
        </p>
      )}

      <AnimatePresence>
        {links.length > 0 &&
          links.map((link, i) => (
            <LinkCard
              key={link.id || i}
              link={link}
              index={i}
              isPending={isPending}
              deleteLink={deleteLink}
              editLink={editLink}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
