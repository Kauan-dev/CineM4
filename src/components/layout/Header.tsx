import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { Container } from "./Container";

import {
  Home,
  Compass,
  Clapperboard,
  TvMinimal,
  Bookmark,
  Search,
  CircleUser,
} from "lucide-react";

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (window.innerWidth >= 1024) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex h-full items-center border-b-2 text-[13px] duration-250 ease-in-out tracking-wide  hover:text-neutral-400 ${
      isActive
        ? "border-b-amber-400 !text-amber-400"
        : "border-b-transparent text-neutral-200"
    }`;

  const navIconClass = (isActive: boolean, baseClass = "") =>
    [baseClass, isActive ? "stroke-amber-400 stroke-2" : ""]
      .filter(Boolean)
      .join(" ");

  return (
    <header
      className={`fixed top-0 z-50 h-15 w-full bg-black/75 font-semibold backdrop-blur-md transition-transform duration-400 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container className="flex h-full items-center justify-between">
        <div className="flex h-full items-center gap-10">
          <NavLink to="/" title="Home" draggable="false">
            <div className="text-[27px] font-bold duration-300 ease-in-out hover:scale-105 md:mb-1">
              <span>Cine</span>
              <span className="text-amber-400">M4</span>
            </div>
          </NavLink>

          <div className="hidden h-full gap-8 lg:flex">
            <NavLink className={navLinkClass} to="/" draggable="false">
              <div className="flex items-center gap-2" tabIndex={-1}>
                <Home size={18} />
                <span>ÍNICIO</span>
              </div>
            </NavLink>

            <NavLink className={navLinkClass} to="/search" draggable="false">
              <div className="flex items-center gap-2" tabIndex={-1}>
                <Search size={18} />
                <span>BUSCAR</span>
              </div>
            </NavLink>

            <NavLink className={navLinkClass} to="/discover" draggable="false">
              <div className="flex items-center gap-2">
                <Compass size={18} />
                <span>EXPLORAR</span>
              </div>
            </NavLink>

            <NavLink className={navLinkClass} to="/movies" draggable="false">
              <div className="flex items-center gap-2">
                <Clapperboard size={18} />
                <span>FILMES</span>
              </div>
            </NavLink>

            <NavLink className={navLinkClass} to="/tv-shows" draggable="false">
              <div className="flex items-center gap-2">
                <TvMinimal size={18} />
                <span>SÉRIES</span>
              </div>
            </NavLink>

            <NavLink
              className={navLinkClass}
              to="/watch-list"
              draggable="false"
            >
              <div className="flex items-center gap-2">
                <Bookmark size={18} />
                <span>SALVOS</span>
              </div>
            </NavLink>
          </div>
        </div>

        <div className="ml-4 flex items-center gap-4">
          <NavLink to="/search" title="Search" className="lg:hidden">
            {({ isActive }) => (
              <Search
                className={navIconClass(isActive, "hover:text-neutral-400")}
                size={28}
              />
            )}
          </NavLink>

          <NavLink to="/profile" title="Profile" draggable="false">
            {({ isActive }) => (
              <CircleUser
                className={navIconClass(isActive, "hover:text-neutral-400")}
                size={28}
              />
            )}
          </NavLink>
        </div>
      </Container>
    </header>
  );
}
