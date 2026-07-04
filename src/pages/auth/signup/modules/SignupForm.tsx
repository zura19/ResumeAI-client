import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
import AnimationProvider from "@/components/shared/AnimationProvider";
import useSignupAction from "@/pages/auth/hooks/actions/useSignupAction";

export default function SignupForm() {
  const { form, onSubmit } = useSignupAction();

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
