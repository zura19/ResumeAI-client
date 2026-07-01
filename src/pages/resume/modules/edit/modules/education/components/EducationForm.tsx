import { DatePicker } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import useEducationForm from "@/pages/resume/hooks/actions/education/useEducationForm";

interface props {
  session: "edit" | "create";
  handleClose: () => void;
  addEducation?: (edu: AiGeneratedResume["education"][0]) => void;
  editEducation?: (edu: AiGeneratedResume["education"][0]) => void;
  edu?: AiGeneratedResume["education"][0];
}

export default function EducationForm({
  session,
  handleClose,
  addEducation,
  editEducation,
  edu,
}: props) {
  const {
    university,
    setUniversity,
    degree,
    setDegree,
    field,
    setField,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillStudying,
    setStillStudying,
    isDisabled,
    handleSubmit,
  } = useEducationForm({
    session,
    handleClose,
    addEducation,
    editEducation,
    edu,
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="university" className="font-semibold">
          University
        </Label>
        <Input
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          name="university"
          id="university"
          placeholder="University Name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fieldOfStudy" className="font-semibold">
          Field of Study
        </Label>
        <Input
          value={field}
          onChange={(e) => setField(e.target.value)}
          name="fieldOfStudy"
          id="fieldOfStudy"
          placeholder="Computer Science"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="degree" className="font-semibold">
          Degree
        </Label>
        <Input
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          name="degree"
          id="degree"
          placeholder="Bachelor's Degree"
        />
      </div>

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
                Still Studying?
              </label>
              <input
                className="size-3.5"
                type="checkbox"
                id="stillStudying"
                checked={stillStudying}
                onChange={(e) => setStillStudying(e.target.checked)}
              />
            </div>
          </div>
          {stillStudying ? (
            <Button
              disabled={true}
              className="w-full border"
              variant={"secondary"}
            >
              Still Studying
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
        {session === "edit" ? "Save" : "Add Education"}
      </Button>
    </div>
  );
}
