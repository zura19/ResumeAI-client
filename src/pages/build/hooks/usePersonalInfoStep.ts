import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  personalInfoSchema,
  type PersonalInfo,
} from "@/lib/schemas/personalInfoSchema";
import useBuildResume from "@/lib/store/buildResumeState";
import { useUser } from "@/lib/store/userState";

export default function usePersonalInfoStep() {
  const { user } = useUser();
  const { nextStep, handlePersonalInfo, data } = useBuildResume();

  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName:
        data.personalInfo.fullName ||
        `${user?.firstName} ${user?.lastName}` ||
        "",
      email: data.personalInfo.email || user?.email || "",
      phone: data.personalInfo.phone || "",
      address: data.personalInfo.address || "",
    },
  });

  async function onSubmit(values: PersonalInfo) {
    handlePersonalInfo(values);
    nextStep();
  }

  return {
    form,
    onSubmit,
  };
}
