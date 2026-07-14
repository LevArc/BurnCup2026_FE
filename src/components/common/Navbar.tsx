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

  return (
    <div className="fixed top-0 left-0 right-0 z-50 mx-6 mt-4">
      <nav className="bg-gradient-to-b from-[#4A2E1A] to-[#6B4423] rounded-full shadow-lg px-8 py-0 flex justify-between items-center overflow-hidden">
        {/* Logo — kiri */}
        <Link to="/">
          <img src="/assets/Logo Burncup.svg" className="h-20" alt="BurnCup Logo" />
        </Link>

        {/* Nav Links + Button */}
        <div className="flex items-center gap-6">
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
      </nav>
    </div>
  );
}
