import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import ResponsebilitiesField from "./ResponsebilitiesField";
import useExperienceForm from "@/pages/resume/hooks/actions/experience/useExperienceForm";

interface props {
  session: "edit" | "create";
  handleClose: () => void;
  addExperience?: (edu: AiGeneratedResume["experience"][0]) => void;
  editExperience?: (edu: AiGeneratedResume["experience"][0]) => void;
  exp?: AiGeneratedResume["experience"][0];
}

export default function ExperienceForm({
  exp,
  session,
  handleClose,
  addExperience,
  editExperience,
}: props) {
  const {
    company,
    setCompany,
    position,
    setPosition,
    responsibilities,
    addResponsibility,
    removeResponsibility,
    updateResponsibility,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillWorking,
    setStillWorking,
    generateResponsibilitie,
    isGenerating,
    isDisabled,
    handleSubmit,
  } = useExperienceForm({
    exp,
    session,
    handleClose,
    addExperience,
    editExperience,
  });

  return (
    <div className="overflow-scroll h-[490px]  flex flex-col  gap-7 px-1">
      <div className="space-y-2">
        <Label htmlFor="company" className="font-semibold">
          Company
        </Label>
        <Input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="company"
          id="company"
          placeholder="company Name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="position" className="font-semibold">
          Position
        </Label>
        <Input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
          placeholder="Front-end Developer"
        />
      </div>

      <ResponsebilitiesField
        company={company as string}
        position={position as string}
        responsibilities={responsibilities}
        addResponsibility={addResponsibility}
        removeResponsibility={removeResponsibility}
        updateResponsibility={updateResponsibility}
        generateResponsibilitie={generateResponsibilitie}
        isGenerating={isGenerating}
      />

      <div className="flex w-full gap-4">
        <div className="space-y-2 w-full">
          <Label htmlFor="startDate" className="font-semibold">
            Start Date
          </Label>

          <DatePicker
            disabled={(d) => d > new Date() || d < new Date("1900-01-01")}
            date={startDate}
            setDate={setStartDate}
          />
        </div>

        <div className="space-y-1.5 w-full">
          <div className="flex justify-between items-center">
            <Label htmlFor="endDate" className="font-semibold">
              End Date
            </Label>
            <div className="flex text-sm items-center gap-1">
              <label htmlFor="stillStudying" className="text-xs">
                Still Working?
              </label>
              <input
                className="size-3.5"
                type="checkbox"
                id="stillWorking"
                checked={stillWorking}
                onChange={(e) => setStillWorking(e.target.checked)}
              />
            </div>
          </div>
          {stillWorking ? (
            <Button
              disabled={true}
              className="w-full border"
              variant={"secondary"}
            >
              Still Working
            </Button>
          ) : (
            <DatePicker
              date={endDate}
              disabled={(d) => d < startDate}
              setDate={setEndDate}
            />
          )}
        </div>
      </div>
      <Button onClick={handleSubmit} disabled={isDisabled()} className="w-full">
        {session === "edit" ? "Save" : "Add Experience"}
      </Button>
    </div>
  );
}
