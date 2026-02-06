import Logo from "@/components/shared/Logo";
import Wrapper from "@/components/shared/Wrapper";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b bg-background/40 backdrop-blur-md py-6">
      <Wrapper className="flex items-center justify-between py-0">
        <Logo />
        <ul className="flex items-center gap-6">
          <Link
            to="/admin"
            className="font-semibold hover:text-foreground cursor-pointer transition-all duration-300"
          >
            Home
          </Link>
        </ul>
      </Wrapper>
    </nav>
  );
}
