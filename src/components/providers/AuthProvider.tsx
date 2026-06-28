import useAuthSession from "@/lib/hooks/useAuthSession";
import Logo from "../shared/Logo";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useAuthSession();

  if (isLoading) {
    return (
      <div className="relative h-dvh overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.45),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.4),_transparent_30%)]" />
        <div className="absolute -left-24 -top-24 h-120 w-120 rounded-full bg-indigo-500/0 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-120 w-120 rounded-full bg-indigo-500/0 blur-3xl" />

        <div className="relative z-10 flex h-full items-center justify-center">
          <Logo className="scale-125 sm:scale-150" />
        </div>
      </div>
    );
  }

  return children;
}
