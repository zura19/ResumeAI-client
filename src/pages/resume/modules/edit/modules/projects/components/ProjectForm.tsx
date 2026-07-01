import FormButton from "@/components/shared/FormButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import FeaturesField from "./FeaturesField";
import TechnologiesField from "./TechnologiesField";
import useProjectForm from "@/pages/resume/hooks/actions/projects/useProjectForm";

interface props {
  session: "edit" | "create";
  handleClose: () => void;
  addProject?: (proj: AiGeneratedResume["projects"][0]) => void;
  editProject?: (proj: AiGeneratedResume["projects"][0]) => void;
  proj?: AiGeneratedResume["projects"][0];
}

export default function ProjectForm({
  session,
  handleClose,
  addProject,
  editProject,
  proj,
}: props) {
  const {
    title,
    setTitle,
    features,
    setFeatures,
    technologies,
    setTechnologies,
    isDisabled,
    handleSubmit,
  } = useProjectForm({
    session,
    handleClose,
    addProject,
    editProject,
    proj,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="font-semibold">
          Title
        </Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          name="title"
          id="title"
          placeholder="Project Title"
        />
      </div>

      <FeaturesField
        title={title}
        technologies={technologies || []}
        features={features}
        setFeatures={setFeatures}
      />

      <TechnologiesField
        technologies={technologies}
        setTechnologies={setTechnologies}
      />

      <FormButton
        onClick={handleSubmit}
        disabled={isDisabled()}
        className="w-full"
      >
        {session === "edit" ? "Save Project" : "Add Project"}
      </FormButton>
    </div>
  );
}
