import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createResumeService } from "@/lib/services/resume/createResumeService";
import useBuildResume from "@/lib/store/buildResumeState";

export default function useChooseResumeTypeStep() {
  const { data, handleChangeType, reset } = useBuildResume();
  const navigate = useNavigate();

  const { mutate: createResume, isPending } = useMutation({
    mutationFn: async () => {
      return await createResumeService(data);
    },
    onSuccess: (response) => {
      toast.success("Resume created successfully");
      reset();
      navigate(`/resume/${response.data.resumeId}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create resume");
    },
  });

  return {
    type: data.type,
    handleChangeType,
    createResume,
    isPending,
  };
}
