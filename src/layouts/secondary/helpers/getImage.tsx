import Steps from "@/pages/build/components/Steps";
import type { ReactNode } from "react";

interface SecondaryImageConfig {
  src: string;
  alt: string;
  overlay?: ReactNode;
}

export function getImage(pathname: string): SecondaryImageConfig | null {
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
