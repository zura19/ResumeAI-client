import LoginForm from "./modules/LoginForm";
import AuthTemplate from "@/pages/auth/AuthTemplate";
import GoogleLogin from "./modules/GoogleLogin";
import AnimationProvider from "@/components/shared/AnimationProvider";

export default function Login() {
  return (
    <div className="space-y-12 flex w-full items-center justify-center h-full">
      <AuthTemplate templateFor="login">
        <LoginForm />

        <AnimationProvider duration={0.7} initY={40} className="space-y-7">
          <div className="grid  grid-cols-[1fr_auto_1fr] gap-3 items-center">
            <div className="bg-border w-full h-0.5" />
            <p className="text-muted-foreground">Or continute with</p>
            <div className="bg-border w-full h-0.5" />
          </div>
          <GoogleLogin />
        </AnimationProvider>
      </AuthTemplate>
    </div>
  );
}
