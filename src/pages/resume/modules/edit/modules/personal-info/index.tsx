import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormInput from "@/components/shared/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfo,
} from "@/lib/schemas/personalInfoSchema";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { toast } from "sonner";
import FormButton from "@/components/shared/FormButton";
import useEditResume from "@/lib/hooks/useEditResume";
import SaveAlert from "../../components/SaveAlert";

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
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: resumeData.personalInfo.fullName || "",
      email: resumeData.personalInfo.email || "",
      phone: resumeData.personalInfo.phone || "",
      address: resumeData.personalInfo.address || "",
    },
  });

  const { editResume, isPending } = useEditResume(id, generatedResumeId);

  function isChanged(vals: PersonalInfo) {
    return (
      vals.fullName !== resumeData.personalInfo.fullName ||
      vals.email !== resumeData.personalInfo.email ||
      vals.phone !== resumeData.personalInfo.phone ||
      vals.address !== resumeData.personalInfo.address
    );
  }

  async function onSubmit(vals: PersonalInfo) {
    if (!isChanged(vals))
      return toast.error("No changes made to personal info.");

    const datToSent = {
      ...resumeData,
      personalInfo: vals,
    };

    await editResume(datToSent);
  }

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
