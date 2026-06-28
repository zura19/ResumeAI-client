import { useEffect, useState } from "react";
import useAuthSession from "@/lib/hooks/useAuthSession";
import { motion } from "framer-motion";
import Logo from "../shared/Logo";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { isLoading } = useAuthSession();
  const [showServerMessage, setShowServerMessage] = useState(false);

  useEffect(() => {
    const setter = () => setShowServerMessage(true);
    if (!isLoading) {
      setter();
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowServerMessage(true);
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="relative h-dvh overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.45),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.4),_transparent_30%)]" />
        <div className="absolute -left-24 -top-24 h-120 w-120 rounded-full bg-indigo-500/0 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-120 w-120 rounded-full bg-indigo-500/0 blur-3xl" />

        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="flex max-w-md flex-col items-center gap-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Logo className="scale-150 transition-all duration-300" />
            </motion.div>

            {showServerMessage && (
              <motion.div
                className="space-y-3 flex flex-col items-center"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <p className="text-sm leading-6 text-white/65 sm:text-base">
                  If the website does not open within 5 seconds, it means the
                  server was shut down. It usually starts in 30 to 40 seconds,
                  so please wait a moment.
                </p>

                <div className="flex items-center gap-2 mt-4">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="h-2.5 w-2.5 rounded-full bg-indigo-400"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        y: [0, -2, 0],
                        scale: [0.9, 1.1, 0.9],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: dot * 0.18,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return children;
}
