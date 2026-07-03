import StepHeading from "../components/StepHeading";
import StepFooter from "./StepFooter";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/shared/DatePicker";
import StepModal from "../components/StepModal";
import UniversityField from "../components/UniversityField";
import useEducationStep from "../hooks/useEducationStep";

export default function EducationStep() {
  const {
    data,
    nextStep,
    university,
    setUniversity,
    degree,
    setDegree,
    fieldOfStudy,
    setFieldOfStudy,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stillStudying,
    setStillStudying,
    addEducation,
    disabledAdd,
    disabledNext,
  } = useEducationStep();

  return (
    <StepHeading
      heading="Education"
      description="Please provide your educational background. You can add multiple educations."
    >
      <div className="flex flex-col  gap-7">
        <div className="h-112.5 overflow-scroll space-y-7 px-1">
          <div className="flex items-center justify-between">
            <StepModal step="education" data={data.education} />

            <Button
              size={"icon-lg"}
              className="bg-indigo-600 rounded-full text-gray-100 font-bold hover:bg-indigo-500"
              disabled={disabledAdd}
              onClick={addEducation}
            >
              <Plus className="size-5.5" strokeWidth={2.5} />
            </Button>
          </div>

          <UniversityField
            university={university}
            setUniversity={setUniversity}
          />

          <div className="space-y-2">
            <Label htmlFor="fieldOfStudy" className="font-semibold">
              Field of Study
            </Label>
            <Input
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
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
        </div>
      </div>
      <div className="mt-auto">
        <StepFooter disabledNext={disabledNext()} handleNext={nextStep} />
      </div>
    </StepHeading>
  );
}
