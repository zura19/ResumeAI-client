import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
import AnimationProvider from "@/components/shared/AnimationProvider";
import { loginSchema, type LoginSchema } from "@/lib/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginService } from "@/lib/services/auth/loginService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/lib/store/userState";

export default function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setUser } = useUser();
  const navigate = useNavigate();

  async function onSubmit(vals: LoginSchema) {
    const data = await loginService(vals);

    if (data.success) {
      toast.success(data.message);
      setUser(data.data.user);
      navigate("/profile");
    }
  }

  return (
    <Form {...form}>
      <AnimationProvider duration={0.5} initY={40}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-full mx-auto"
        >
          <FormInput
            placeholder="example@ex.com"
            name="email"
            control={form.control}
            className="h-12"
          />
          <FormInput
            placeholder="Password"
            name="password"
            control={form.control}
            type="password"
            className="h-12"
          />

          <FormButton
            className="w-full h-12 font-semibold text-lg bg-[#5B21B6] text-white hover:bg-[#5B21B6]/90"
            loadingText="Logging in..."
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            Log in
          </FormButton>
        </form>
      </AnimationProvider>
    </Form>
  );
}
