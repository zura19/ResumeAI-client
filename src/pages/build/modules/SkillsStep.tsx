import StepHeading from "../components/StepHeading";
import StepFooter from "./StepFooter";
import SkillField from "../components/SkillField";
import useSkillsStep from "../hooks/useSkillsStep";

export default function SkillsStep() {
  const {
    data,
    nextStep,
    handleAdd,
    handleRemoveSkill,
    handleUpdateSkill,
    allowNext,
  } = useSkillsStep();

  return (
    <StepHeading
      heading="Skills"
      description="Please provide your soft, language and technical skills. You can add multiple skills."
    >
      <div className=" flex flex-col  gap-10">
        <div className="h-103 overflow-y-scroll px-1 space-y-10">
          <SkillField
            type="soft"
            data={data.skills.soft}
            handleAdd={handleAdd}
            handleRemove={handleRemoveSkill}
            handleUpdate={handleUpdateSkill}
            label="Soft Skills"
            placeholder="Comunication, leadership, teamwork, etc..."
            description="Min 3 required. You can add up to 6 soft skills."
          />

          <SkillField
            type="languages"
            data={data.skills.languages}
            handleAdd={handleAdd}
            handleRemove={handleRemoveSkill}
            handleUpdate={handleUpdateSkill}
            label="Languages"
            placeholder="English, French, etc..."
            description="Min 1 required. You can add up to 6 languages."
          />
          <SkillField
            type="technical"
            data={data.skills.technical}
            handleAdd={handleAdd}
            handleRemove={handleRemoveSkill}
            handleUpdate={handleUpdateSkill}
            label="Technical Skills"
            placeholder="React, Node.js, etc..."
            description="Min 3 required. You can add up to 6 technical skills."
          />
        </div>
      </div>
      <div className="mt-auto pt-10">
        <StepFooter disabledNext={!allowNext()} handleNext={nextStep} />
      </div>
    </StepHeading>
  );
}
