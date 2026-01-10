import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import AnimationProvider from "@/components/shared/AnimationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupSchema } from "@/lib/schemas/signupSchema";
import { registerService } from "@/lib/services/auth/registerService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  async function onSubmit(vals: SignupSchema) {
    const data = await registerService(vals);

    if (data.success) {
      console.log(data.data.user);
      toast.success(data.message);
      navigate("/login");
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <AnimationProvider duration={0.7} initY={40}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 max-w-full mx-auto"
        >
          <FormInput
            placeholder="John Doe"
            name="fullName"
            control={form.control}
            className="h-12"
          />

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
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
            loadingText="Signing Up..."
            type="submit"
          >
            Sign Up
          </FormButton>
        </form>
      </AnimationProvider>
    </Form>
  );
}
