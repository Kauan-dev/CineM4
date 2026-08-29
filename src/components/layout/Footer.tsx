import { Container } from "./Container";
import { GithubIcon } from "../ui/GithubIcon";
import { NavLink } from "react-router";

export function Footer() {
  return (
    <footer className="mb-15 border-t border-zinc-800 py-4 lg:mb-0">
      <Container className="flex h-full flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex gap-2">
          <NavLink
            to={"https://github.com/Kauan-dev/CineM4"}
            draggable="false"
            target="blank"
          >
            <GithubIcon />
          </NavLink>
        </div>

        <div className="flex flex-col gap-2 text-center text-[12px] lg:text-right">
          <span>Descubra algo incrível para assistir.</span>
          <span>© 2026 CineM4. Todos os direitos reservados.</span>
        </div>
      </Container>
    </footer>
  );
}
