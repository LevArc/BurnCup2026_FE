import { Link } from "react-router-dom";

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
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
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-[160px] mr-[4%]">
          <h4 className="text-white mb-4 font-semibold">Contact Us</h4>
          
          <div className="flex flex-col space-y-3">
            <a 
              href="mailto:hello@burncup2026.id" 
              className="flex items-center gap-3 text-sm transition-colors hover:text-white group"
            >
              <span className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white group-hover:bg-[#6b3518] transition-colors">
                <EmailIcon />
              </span>
              burncup@gmail.com
            </a>

            <a 
              href="tel:+6281234567890" 
              className="flex items-center gap-3 text-sm transition-colors hover:text-white group"
            >
              <span className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white group-hover:bg-[#6b3518] transition-colors">
                <PhoneIcon />
              </span>
              +62 812-3456-7890
            </a>

            <a 
              href="https://instagram.com/burncup_placeholder" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-white group"
            >
              <span className="w-8 h-8 rounded-full bg-[#4a2511] flex items-center justify-center text-white group-hover:bg-[#6b3518] transition-colors">
                <InstagramIcon />
              </span>
              @burncup
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