import { Link } from "react-router-dom";
import AnimatedText from "../../components/shared/AnimatedText";
import AnimationProvider from "../../components/shared/AnimationProvider";

interface props {
  templateFor: "login" | "register";
  children: React.ReactNode;
}

export default function AuthTemplate(props: props) {
  const { children, templateFor } = props;
  const heading =
    templateFor === "login" ? "Log in to your account" : "Create an account";

  return (
    <div className="grid sm:grid-cols-[8fr_10fr] w-full bg-muted/40 border backdrop:backdrop-blur-2xl rounded-lg">
      <div className="relative overflow-hidden hidden sm:block">
        <img
          src="https://cdn.enhancv.com/Resume_photo_do_s_and_don_ts_7509c2143c.jpg"
          alt="login"
          className="w-full h-full object-cover rounded-lg rounded-r-none"
        />
      </div>

      <div className="p-4 sm:px-6 md:px-12 sm:py-24 space-y-8">
        <div>
          <AnimatedText
            text={heading}
            textClassName="py-1.5 bg-gradient-to-t  from-slate-100 to-slate-400 bg-clip-text text-transparent"
            className="text-4xl sm:text-5xl font-bold capitalize text-center"
          />

          <AnimationProvider duration={0.7} initY={20}>
            {templateFor === "login" ? (
              <p className="text-center text-muted-foreground">
                Don't an account?{" "}
                <Link className="font-bold hover:underline" to="/signup">
                  Sign Up
                </Link>
              </p>
            ) : (
              <p className="text-center text-muted-foreground">
                Alredy an account?{" "}
                <Link className="font-bold hover:underline" to="/login">
                  Log In
                </Link>
              </p>
            )}
          </AnimationProvider>
        </div>

        {children}
      </div>
    </div>
  );
}
