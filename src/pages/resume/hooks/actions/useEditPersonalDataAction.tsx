import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfo,
} from "@/lib/schemas/personalInfoSchema";
import useEditResume from "@/lib/hooks/useEditResume";
import type { AiGeneratedResume } from "@/lib/types/AiGeneratedResume";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface UseEditPersonalDataActionProps {
  resumeData: AiGeneratedResume;
  generatedResumeId: string;
  id: string;
}

export default function useEditPersonalDataAction({
  resumeData,
  generatedResumeId,
  id,
}: UseEditPersonalDataActionProps) {
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

  function isChanged(values: PersonalInfo) {
    return (
      values.fullName !== resumeData.personalInfo.fullName ||
      values.email !== resumeData.personalInfo.email ||
      values.phone !== resumeData.personalInfo.phone ||
      values.address !== resumeData.personalInfo.address
    );
  }

  async function onSubmit(values: PersonalInfo) {
    if (!isChanged(values)) {
      return toast.error("No changes made to personal info.");
    }

    await editResume({
      ...resumeData,
      personalInfo: values,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
}
