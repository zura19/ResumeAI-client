import { Outlet } from "react-router-dom";
import Navbar from "./modules/Navbar";
import Wrapper from "@/components/shared/Wrapper";

export default function AdminLayout() {
  return (
    <div className="">
      <Navbar />
      <Wrapper className="">
        <Outlet />
      </Wrapper>
    </div>
  );
}
