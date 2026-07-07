import AuthTemplate from "@/pages/auth/AuthTemplate";
import SignupForm from "./modules/SignupForm";

export default function Signup() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <AuthTemplate templateFor="register">
        <SignupForm />
      </AuthTemplate>
    </div>
  );
}
