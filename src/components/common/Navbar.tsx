import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "ABOUT US", path: "/about" },
  { label: "COMPETITIONS", path: "/competitions" },
  { label: "CONTACT US", path: "/contact" },
  { label: "SPONSORS", path: "/sponsors" },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-4 md:mx-6 mt-4">
      <nav className="bg-gradient-to-b from-[#4A2E1A] to-[#6B4423] rounded-full shadow-lg px-6 md:px-8 py-0 flex justify-between items-center">
        {/* Logo — kiri */}
        <Link to="/">
          <img src="/assets/Logo Burncup.svg" className="h-16 md:h-20" alt="BurnCup Logo" />
        </Link>

        {/* Desktop Nav Links + Button */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
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
            className="bg-gradient-to-b from-orange-400 to-orange-600 text-white font-semibold rounded-full px-5 py-2 text-sm hover:opacity-90 transition-opacity duration-200"
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
      {menuOpen && (
        <div className="md:hidden mt-2 bg-gradient-to-b from-[#4A2E1A] to-[#6B4423] rounded-2xl shadow-lg px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
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
            className="bg-gradient-to-b from-orange-400 to-orange-600 text-white font-semibold rounded-full px-5 py-2 text-sm text-center hover:opacity-90 transition-opacity duration-200"
          >
            REGISTER NOW
          </Link>
        </div>
      )}
    </div>
  );
}
