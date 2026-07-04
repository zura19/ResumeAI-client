import { loginSchema, type LoginSchema } from "@/lib/schemas/loginSchema";
import { loginService } from "@/lib/services/auth/loginService";
import { useUser } from "@/lib/store/userState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function useLoginAction() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  async function onSubmit(values: LoginSchema) {
    const data = await loginService(values);

    if (data.success) {
      toast.success(data.message);
      setUser(data.data.user);
      navigate("/profile");
    }
  }

  return {
    form,
    onSubmit,
  };
}
