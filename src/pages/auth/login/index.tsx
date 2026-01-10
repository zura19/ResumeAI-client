import LoginForm from "./modules/LoginForm";
import AuthTemplate from "@/pages/auth/AuthTemplate";
import GoogleLogin from "./modules/GoogleLogin";

export default function Login() {
  return (
    <div className="space-y-12 flex w-full items-center justify-center h-full">
      <AuthTemplate templateFor="login">
        <LoginForm />
        <div className="grid  grid-cols-[1fr_auto_1fr] gap-3 items-center">
          <div className="bg-border w-full h-0.5" />
          <p className="text-muted-foreground">Or continute with</p>
          <div className="bg-border w-full h-0.5" />
        </div>
        <GoogleLogin />
      </AuthTemplate>
    </div>
  );
}
