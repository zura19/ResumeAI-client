import { footerData } from "@/constants/footer/footer";
import Logo from "../../../components/shared/Logo";
import Wrapper from "../../../components/shared/Wrapper";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/20">
      <Wrapper className="container py-12">
        <div className="grid justify-center gap-8 grid-cols-3 md:grid-cols-4">
          <div className="col-start-1 col-end-4  md:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>

            <p className="text-sm text-muted-foreground">
              Build professional resumes with the power of AI technology.
            </p>
          </div>

          {footerData.map((item) => (
            <div key={item.title}>
              <h3 className="mb-4 font-semibold">{item.title}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
        </div>
      </Wrapper>
    </footer>
  );
}
