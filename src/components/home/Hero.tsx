import { useEffect, useState } from "react";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative flex items-end justify-center h-[60vh] md:min-h-screen w-full bg-[#F0E6D2] overflow-hidden">
      {/* Background Mountain */}
      <img
        src="/assets/mountain-bg.png"
        className="absolute bottom-0 left-0 w-full z-0 block"
        alt=""
      />

      {/* Logo + Tagline */}
      <div className="relative z-10 flex flex-col items-center justify-end pb-12 md:pb-24 w-full gap-3">
        <img
          src="/assets/Logo Burncup.svg"
          className="w-[50%] md:w-[60%] mx-auto"
          alt="BurnCup Logo"
        />
        <p className="text-[#4A2E1A] text-sm md:text-lg font-bold tracking-[0.3em] uppercase opacity-90">
          Sport · E-Sport · Creative
        </p>

        {/* Scroll indicator — hilang saat scroll */}
        <div
          className={`mt-2 flex flex-col items-center gap-1 animate-bounce transition-opacity duration-500 ${
            scrolled ? "opacity-0 pointer-events-none" : "opacity-60"
          }`}
        >
          <span className="text-[#4A2E1A] text-xs tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A2E1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
