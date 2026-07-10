import { contactSchema, type ContactSchema } from "@/lib/schemas/contactSchema";
import { contactService } from "@/lib/services/contact/contactService";
import { useUser } from "@/lib/store/userState";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function useContactAction() {
  const { user } = useUser();

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: user?.email || "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    form.setValue("email", user?.email || "", {
      shouldValidate: !!user?.email,
    });
  }, [form, user?.email]);

  async function onSubmit(values: ContactSchema) {
    try {
      const data = await contactService(values);

      if (data.success) {
        toast.success(data.message || "Message sent successfully");
        form.reset({
          email: user?.email || "",
          title: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message",
      );
    }
  }

  return {
    form,
    isAuthenticated: !!user,
    onSubmit,
  };
}
