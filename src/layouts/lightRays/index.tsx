import LightRays from "@/components/LightRays";
import Wrapper from "@/components/shared/Wrapper";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../main/components/Navbar";
import { cn } from "@/lib/utils";
import { sharedLayoutLightRaysProps } from "@/lib/configs/lightRays";

// interface props {
// //   children: React.ReactNode;
// }

const showNavbarExactRoutes = ["/plans"];
const showNavbarPrefixRoutes = ["/profile"];

export default function LightRaysLayout() {
  const location = useLocation();
  const showNavbar =
    showNavbarExactRoutes.includes(location.pathname) ||
    showNavbarPrefixRoutes.some(
      (route) =>
        location.pathname === route || location.pathname.startsWith(`${route}/`)
    );

  return (
    <div className="relative w-full min-h-dvh bg-black overflow-hidden">
      {/* Background rays */}
      <div className="absolute inset-0">
        <LightRays {...sharedLayoutLightRaysProps} />
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
