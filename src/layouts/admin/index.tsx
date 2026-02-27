import { Outlet } from "react-router-dom";
import Header from "./modules/Header";
import LightRays from "@/components/LightRays";

export default function AdminLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#615fff"
          raysSpeed={0.5}
          lightSpread={1.2}
          rayLength={2.5}
          followMouse={true}
          mouseInfluence={0.15}
          saturation={0.8}
        />
      </div>
      <div className="absolute w-full max-h-dvh overflow-scroll scrollbar-hide">
        <Header />
        <main className="mx-auto max-w-360 px-6 py-8 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
