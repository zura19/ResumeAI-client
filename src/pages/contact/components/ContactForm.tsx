import FormButton from "@/components/shared/FormButton";
import FormInput from "@/components/shared/FormInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import useContactAction from "../hooks/actions/useContactAction";

export default function ContactForm() {
  const { form, isAuthenticated, onSubmit } = useContactAction();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 pb-1"
      >
        <FormInput
          control={form.control}
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          className="h-12"
          autoComplete="email"
          readOnly={isAuthenticated}
          disabled={isAuthenticated}
        />

        <FormInput
          control={form.control}
          name="title"
          label="Title"
          placeholder="How can we help?"
          className="h-12"
          autoComplete="off"
          maxLength={120}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us what you need help with."
                  className="min-h-40 max-h-40 overflow-scroll resize-none"
                  maxLength={2000}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormButton
          className="h-12 w-full font-semibold"
          loading={form.formState.isSubmitting}
          loadingText="Sending message..."
          type="submit"
        >
          Send Message
        </FormButton>
      </form>
    </Form>
  );
}
