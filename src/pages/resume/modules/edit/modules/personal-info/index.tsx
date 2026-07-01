import { Form } from "@/components/ui/form";
import FormInput from "@/components/shared/FormInput";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import FormButton from "@/components/shared/FormButton";
import SaveAlert from "../../components/SaveAlert";
import useEditPersonalDataAction from "@/pages/resume/hooks/actions/useEditPersonalDataAction";

interface props {
  resumeData: AiGeneratedResume;
  generatedResumeId: string;
  id: string;
}

export default function PersonalInfo({
  resumeData,
  id,
  generatedResumeId,
}: props) {
  const { form, onSubmit, isPending } = useEditPersonalDataAction({
    resumeData,
    id,
    generatedResumeId,
  });

  return (
    <Form {...form}>
      <form
        className="space-y-6 flex flex-col h-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <SaveAlert />

        <FormInput
          label="Full Name"
          placeholder="John Doe"
          name="fullName"
          control={form.control}
        />
        <FormInput
          label="Email Address"
          placeholder="example@ex.com"
          name="email"
          control={form.control}
        />

        <FormInput
          label="Phone Number"
          placeholder="123-456-7890"
          name="phone"
          control={form.control}
        />

        <FormInput
          label="Address"
          placeholder="123 Main St"
          name="address"
          control={form.control}
        />

        <div className="mt-auto">
          <FormButton
            loadingText="Saving Personal Info"
            loading={form.formState.isSubmitting || isPending}
            disabled={!form.formState.isValid || isPending}
            type="submit"
          >
            Save Personal Info
          </FormButton>
        </div>
      </form>
    </Form>
  );
}
