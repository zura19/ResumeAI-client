import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface props {
  className?: string;
  onlyLogo?: boolean;
}

export default function Logo({ className, onlyLogo = false }: props) {
  const location = useLocation();

  function handleScroll() {
    if (location.pathname !== "/") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Link
      to="/"
      onClick={handleScroll}
      className={cn("flex items-center gap-2", className)}
    >
      {onlyLogo && (
        <>
          <div className="relative size-8 overflow-hidden">
            <div className="relative z-10 size-8 overflow-hidden">
              <img src="/logo.png" className="object-contain" alt="logo" />
            </div>
          </div>
        </>
      )}

      {!onlyLogo && (
        <>
          <div className="relative size-8 overflow-hidden">
            <div className="relative rounded-lg z-10 size-8 overflow-hidden">
              <motion.span
                className="pointer-events-none absolute  -left-1/2 top-[-20%] h-[140%] w-1/3 rotate-12 bg-white/35 blur-[6px]"
                animate={{ x: ["-100%", "520%"] }}
                transition={{
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 4,
                  ease: "easeInOut",
                }}
              />
              <img src="/logo-bg.png" className="object-contain" alt="logo" />
            </div>
          </div>

          <div className="relative overflow-hidden">
            <p className="relative flex items-center gap-0.5 text-lg font-bold tracking-wide sm:text-xl md:text-2xl">
              <span className="bg-linear-to-b from-slate-50 to-slate-400 bg-clip-text text-transparent">
                Resume
              </span>
              <span className="text-indigo-500">AI</span>
            </p>
          </div>
        </>
      )}
    </Link>
  );
}
