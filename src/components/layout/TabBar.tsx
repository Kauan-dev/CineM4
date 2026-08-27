import { Home, Compass, Clapperboard, TvMinimal, Bookmark } from "lucide-react";
import { NavLink } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-col items-center gap-0.75 border-t-3 pt-[8px] pb-[6px] text-[11px] ${
    isActive
      ? "border-amber-400 text-amber-400"
      : "border-t-transparent text-gray-400"
  }`;

const navIconClass = (isActive: boolean) =>
  `${isActive ? "stroke-amber-400 stroke-2" : ""}`;

export function TabBar() {
  return (
    //md:hidden
    <nav className="fixed bottom-0 w-full bg-[#000000] text-white lg:hidden">
      <div className="flex flex-row justify-around">
        <NavLink to="/" end className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Home size={24} className={navIconClass(isActive)} />
              <span>Início</span>
            </>
          )}
        </NavLink>
        <NavLink to="/movies" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Clapperboard size={24} className={navIconClass(isActive)} />
              <span>Filmes</span>
            </>
          )}
        </NavLink>
        <NavLink to="/tv-shows" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <TvMinimal size={24} className={navIconClass(isActive)} />
              <span>Séries</span>
            </>
          )}
        </NavLink>
        <NavLink to="/discover" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Compass size={24} className={navIconClass(isActive)} />
              <span>Descobrir</span>
            </>
          )}
        </NavLink>
        <NavLink to="/watch-list" className={navLinkClass}>
          {({ isActive }) => (
            <>
              <Bookmark size={24} className={navIconClass(isActive)} />
              <span>Salvos</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
