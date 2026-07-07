import Logo from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import Steps from "@/pages/build/components/Steps";
import type { ReactNode } from "react";
import { Outlet, useLocation } from "react-router-dom";

interface SecondaryImageConfig {
  src: string;
  alt: string;
  overlay?: ReactNode;
}

function getImageConfig(pathname: string): SecondaryImageConfig | null {
  switch (pathname) {
    case "/build":
      return {
        src: "/build-resume-background.jpg",
        alt: "Resume builder preview",
        overlay: <Steps />,
      };
    case "/login":
    case "/signup":
      return {
        src: "/auth-template.jpg",
        alt: "Resume workspace",
      };
    default:
      return null;
  }
}

export default function SecondaryLayout() {
  const { pathname } = useLocation();
  const imageConfig = getImageConfig(pathname);

  return (
    <main
      className={cn(
        "min-h-dvh w-full overflow-hidden bg-muted/40",
        imageConfig && "md:grid md:grid-cols-[6fr_10fr]",
      )}
    >
      {imageConfig && (
        <aside className="relative hidden h-dvh overflow-hidden md:block">
          <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-950/20 to-slate-950/70" />
          <img
            className="h-full w-full object-cover"
            alt={imageConfig.alt}
            src={imageConfig.src}
          />
          {imageConfig.overlay && (
            <div className="absolute inset-0 z-20">{imageConfig.overlay}</div>
          )}
        </aside>
      )}

      <section className="relative isolate h-dvh min-h-0 w-full overflow-hidden bg-black text-white">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_left,rgb(99_102_241_/_0.20),transparent_55%),radial-gradient(circle_at_top_right,rgb(20_184_166_/_0.20),transparent_55%)]" />

        <Logo className="absolute left-5 top-5 z-20" />
        <div className="relative z-10 h-full overflow-y-auto">
          <Outlet />
        </div>
      </section>
    </main>
  );
}
