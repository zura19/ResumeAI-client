import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import {
  navbarDataLandingPage,
  navbarData as navbarDataOtherPage,
} from "@/constants/navbar/navbar";
import ResponsiveNav from "./ResponsiveNav";
import { useMemo } from "react";
import { useUser } from "@/lib/store/userState";
import UserAvatar from "@/components/shared/UserAvatar";

// export function calcDate(a: Date, dayDifference: number) {
//   const now = new Date();

//   const nowYear = now.getUTCFullYear();
//   const nowMonth = now.getUTCMonth();
//   const nowDate = now.getUTCDate();

//   const year = a.getUTCFullYear();
//   const month = a.getUTCMonth();
//   const date = a.getUTCDate();

//   if (nowYear > year || nowMonth > month) return true;
//   if (nowDate - date >= dayDifference) return true;

//   return false;
// }

export default function Navbar() {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  function scrollIntoView(elementId: string) {
    const element = document.getElementById(elementId);
    const currentPath = location.pathname;
    if (currentPath !== "/") {
      navigate("/");
    }

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const navbarData = useMemo(() => {
    const data =
      location.pathname === "/" ? navbarDataLandingPage : navbarDataOtherPage;

    if (user) {
      return data.filter((item) => item.label !== "Login");
    }

    return data;
  }, [user, location.pathname]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: [-50, 5, 0] }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="sticky flex items-center justify-between backdrop-blur-sm bg-background/20 sm:bg-muted/10  border-border py-6 px-6 border-b sm:border  md:px-12 top-0 sm:top-4  sm:rounded-full"
    >
      <Logo />

      <ul className="hidden lg:flex lg:items-center lg:gap-6">
        {navbarData.map((item) =>
          item.type === "link" ? (
            <li
              key={item.label}
              className="font-semibold hover:text-muted-foreground cursor-pointer transition-all duration-300"
            >
              <Link to={item.to}>{item.label}</Link>
            </li>
          ) : (
            <li
              key={item.label}
              className="font-semibold hover:text-muted-foreground cursor-pointer transition-all duration-300"
              onClick={() => scrollIntoView(item.to)}
            >
              {item.label}
            </li>
          )
        )}

        {user && <UserAvatar goto="/profile" />}
      </ul>

      <ResponsiveNav
        isUser={!!user}
        navbarData={navbarData}
        scrollIntoView={scrollIntoView}
      />
    </motion.nav>
  );
}
