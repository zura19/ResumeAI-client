import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import { Form } from "@/components/ui/form";
// import { motion } from "framer-motion";
import AnimationProvider from "@/components/shared/AnimationProvider";
import useLoginAction from "@/pages/auth/hooks/actions/useLoginAction";

export default function LoginForm() {
  const { form, onSubmit } = useLoginAction();

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
