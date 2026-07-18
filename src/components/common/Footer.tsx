import { Link } from "react-router-dom";

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.87v-6.98H7.9V12h2.6V9.8c0-2.57 1.53-4 3.87-4 1.12 0 2.3.2 2.3.2v2.5h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.89h-2.4v6.98A10 10 0 0 0 22 12" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.9 2H22l-7.6 8.7L23 22h-6.9l-5.4-6.7L4.5 22H1.4l8.1-9.3L1 2h7.1l4.9 6.1L18.9 2Zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53C6.09.28 6.82.11 7.88.06 8.94.01 9.3 0 12 0Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM18.4 4.6a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative bg-[#2b180d] text-[#d1bfae] px-6 md:px-16 pt-8 md:pt-12 pb-6 overflow-hidden">
      {/* Main content */}
      <div className="flex flex-col md:flex-row flex-wrap justify-between gap-8 border-b border-[#4a2511] pb-8 mb-6">

        {/* Brand */}
        <div className="flex-[2] min-w-[200px] max-w-xs">
          <img
            src="/assets/Logo Burncup.svg"
            alt="Burncup Logo"
            className="h-20 md:h-24 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Ekspedisi kompetisi tahunan yang menjelajahi tiga medan:
            olahraga, e-sports, dan kreativitas.
          </p>
        </div>

        {/* Quick Links */}
        <div className="min-w-[140px]">
          <h4 className="text-white mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="transition-colors hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/competitions" className="transition-colors hover:text-white">Competitions</Link>
            </li>
            <li>
              <Link to="/sponsors" className="transition-colors hover:text-white">Sponsors</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-[160px]">
          <h4 className="text-white mb-4 font-semibold">Contact Us</h4>
          <p className="text-sm mb-4">hello@burncup2026.id</p>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white transition-colors hover:bg-[#6b3518]"
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white transition-colors hover:bg-[#6b3518]"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white transition-colors hover:bg-[#6b3518]"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-xs opacity-70">
        <p>&copy; 2026 Burncup Expedition. All rights reserved.</p>
      </div>
    </footer>
  );
}
