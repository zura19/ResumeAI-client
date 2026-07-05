import { signupSchema, type SignupSchema } from "@/lib/schemas/signupSchema";
import { registerService } from "@/lib/services/auth/registerService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useSignupAction() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values: SignupSchema) {
    try {
      const data = await registerService(values);

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
        form.reset();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to register"
      );
    }
  }

  return {
    form,
    onSubmit,
  };
}
