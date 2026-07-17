import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "COMPETITIONS", path: "/competitions" },
  { label: "SPONSORS", path: "/sponsors" },
];

const competitionLinks = [
  { label: "Creative", path: "/competitions/creative" },
  { label: "Sport", path: "/competitions/sport" },
  { label: "E-Sport", path: "/competitions/esport" },
];

const HERO_PAGES = [
  "/",
  "/competitions",
  "/competitions/creative",
  "/competitions/sport",
  "/competitions/esport",
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const competitionsRef = useRef<HTMLDivElement | null>(null);

  const hasHero = HERO_PAGES.includes(location.pathname);
  const isCollapsed = hasHero && !isScrolled;
  const isCompetitionsRoute = [
    "/competitions",
    "/competitions/creative",
    "/competitions/sport",
    "/competitions/esport",
  ].includes(location.pathname);

  useEffect(() => {
    setIsScrolled(false);
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-3 sm:mx-4 md:mx-6 mt-3 sm:mt-4">
      {/* Navbar — collapse saat di hero */}
      <nav
        className={`rounded-full px-3 sm:px-5 md:px-8 flex justify-between items-center gap-2 transition-all duration-500 ease-in-out ${
          isCollapsed
            ? "bg-transparent shadow-none py-0 opacity-0 pointer-events-none -translate-y-full"
            : "bg-linear-to-b from-[#4A2E1A] to-[#6B4423] shadow-lg py-2 opacity-100 pointer-events-auto translate-y-0"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src="/assets/Navbar/Logo Burncup.png"
            className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto"
            alt="BurnCup Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            if (link.label === "COMPETITIONS") {
              return (
                <div
                  key={link.path}
                  className="relative group"
                  ref={competitionsRef}
                >
                  <button
                    type="button"
                    className={`text-white uppercase text-sm tracking-wide transition-all duration-200 ${
                      isCompetitionsRoute
                        ? "border-b-2 border-orange-400 pb-0.5"
                        : "hover:text-orange-300"
                    }`}
                  >
                    {link.label}
                  </button>

                  {/* Dropdown — muncul saat hover */}
                  <div className="absolute left-0 top-full mt-3 w-44 rounded-2xl border border-[#7c4720] bg-[#4A2E1A]/95 p-3 shadow-xl backdrop-blur opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
                    <Link
                      to="/competitions"
                      className="block rounded-xl px-3 py-2 text-sm text-white transition hover:bg-[#6B4423]"
                    >
                      All Competitions
                    </Link>
                    {competitionLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="mt-1 block rounded-xl px-3 py-2 text-sm text-[#f7e2c3] transition hover:bg-[#6B4423] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-white uppercase text-sm tracking-wide transition-all duration-200 ${
                  isActive
                    ? "border-b-2 border-orange-400 pb-0.5"
                    : "hover:text-orange-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/register"
            className="bg-linear-to-b from-orange-400 to-orange-600 text-white font-semibold rounded-full px-4 lg:px-5 py-2 text-sm hover:opacity-90 transition-opacity duration-200"
          >
            REGISTER NOW
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {menuOpen && !isCollapsed && (
        <div className="md:hidden mt-2 bg-linear-to-b from-[#4A2E1A] to-[#6B4423] rounded-2xl shadow-lg px-5 py-4 flex flex-col gap-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            if (link.label === "COMPETITIONS") {
              return (
                <div key={link.path}>
                  <div className="flex items-center justify-between text-white uppercase text-sm tracking-wide">
                    <Link
                      to="/competitions"
                      onClick={() => setMenuOpen(false)}
                      className={isCompetitionsRoute ? "text-orange-400" : "hover:text-orange-300"}
                    >
                      {link.label}
                    </Link>
                    <span className="text-xs text-[#f7e2c3]">▾</span>
                  </div>
                  <div className="mt-2 flex flex-col gap-2 rounded-xl bg-[#6B4423]/70 p-2">
                    <Link
                      to="/competitions"
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-2 py-1 text-sm text-white hover:bg-[#4A2E1A]"
                    >
                      All Competitions
                    </Link>
                    {competitionLinks.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className="rounded-lg px-2 py-1 text-sm text-[#f7e2c3] hover:bg-[#4A2E1A] hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`text-white uppercase text-sm tracking-wide transition-all duration-200 ${
                  isActive ? "text-orange-400" : "hover:text-orange-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="bg-linear-to-b from-orange-400 to-orange-600 text-white font-semibold rounded-full px-5 py-2 text-sm text-center hover:opacity-90 transition-opacity duration-200"
          >
            REGISTER NOW
          </Link>
        </div>
      )}
    </div>
  );
}
