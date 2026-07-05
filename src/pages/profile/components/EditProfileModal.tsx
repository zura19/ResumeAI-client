import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import type { EditProfile } from "@/lib/schemas/editProfileSchema";
import { useState } from "react";

interface props {
  user: EditProfile;
}

export default function EditProfileModal({ user }: props) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-full  gap-2 border-border text-muted-foreground hover:text-foreground hover:bg-secondary self-start bg-transparent"
        >
          <SettingsIcon className="h-4 w-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background/50 backdrop-blur-lg border border-border/20 sm:max-w-180">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal details and keep your profile information
            current.
          </DialogDescription>
        </DialogHeader>
        <EditProfileForm user={user} onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
