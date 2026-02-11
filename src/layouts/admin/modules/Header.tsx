import Logo from "@/components/shared/Logo";
// import { LayoutDashboardIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const pathname = useLocation();
  // const activeClass = "bg-primary/10";

  function isActive(path: string) {
    if (pathname.pathname === path)
      return "bg-primary/10 text-foreground/90 hover:text-muted-foreground";
    return "bg-primary/0 text-muted-foreground hover:text-foreground hover:bg-primary/10";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/50 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-360 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Logo />
          {/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"> */}
          {/* <LayoutDashboardIcon classsName="h-4 w-4 text-primary-foreground" /> */}
          {/* </div> */}
          {/* <div>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              Admin Dashboard
            </h1>
          </div> */}
        </div>
        <nav className="flex items-center gap-1">
          <Link
            to="/admin"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${isActive("/admin")} transition-all duration-300`}
          >
            Overview
          </Link>
          <Link
            to="/admin/users"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${isActive("/admin/users")} transition-all duration-300`}
          >
            Users
          </Link>
          <Link
            to="/admin/plans"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${isActive("/admin/plans")} transition-all duration-300`}
          >
            Plans
          </Link>
          <Link
            to="/admin/settings"
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${isActive("/settings")} transition-all duration-300`}
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
