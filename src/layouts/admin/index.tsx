import { Outlet } from "react-router-dom";
import Header from "./modules/Header";
import LightRays from "@/components/LightRays";
import { sharedLayoutLightRaysProps } from "@/lib/configs/lightRays";

export default function AdminLayout() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0">
        <LightRays {...sharedLayoutLightRaysProps} />
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
