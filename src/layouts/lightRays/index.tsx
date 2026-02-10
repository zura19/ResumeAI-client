import LightRays from "@/components/LightRays";
import Wrapper from "@/components/shared/Wrapper";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../main/components/Navbar";
import { cn } from "@/lib/utils";

// interface props {
// //   children: React.ReactNode;
// }

const showNavbarRoutes = ["/profile", "/plans"];

export default function LightRaysLayout() {
  const location = useLocation();
  const showNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <div className="relative w-full min-h-dvh bg-black overflow-hidden">
      {/* Background rays */}
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          //   raysColor="#4a90e2"
          raysColor="#615fff"
          raysSpeed={0.5}
          lightSpread={1.2}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.15}
          saturation={0.8}
        />
      </div>
      {showNavbar && (
        <Wrapper className="fixed  inset-x-0 z-40 px-0 sm:px-8 py-0 sm:top-4 rounded-full">
          <Navbar />
        </Wrapper>
      )}
      {/* Content */}
      <main className={cn("relative z-10 pt-0 h-full", showNavbar && "pt-30")}>
        <Outlet />
      </main>
    </div>
  );
}
