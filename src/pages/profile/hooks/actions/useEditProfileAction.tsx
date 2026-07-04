import {
  editProfileSchema,
  type EditProfile,
} from "@/lib/schemas/editProfileSchema";
import { updateUserService } from "@/lib/services/user/updateUserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UseEditProfileActionProps {
  user: EditProfile;
  onClose: () => void;
}

export default function useEditProfileAction({
  user,
  onClose,
}: UseEditProfileActionProps) {
  const queryClient = useQueryClient();

  const form = useForm<EditProfile>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      profession: user.profession || "",
    },
  });

  async function onSubmit(data: EditProfile) {
    const res = await updateUserService(data);

    if (res.success) {
      toast.success(res.message);
      form.reset();
      onClose();
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } else {
      toast.error(res.message);
    }
  }

  return {
    form,
    onSubmit,
  };
}
