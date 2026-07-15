import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="relative bg-[#F0E6D2] py-16 min-h-screen flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        {/* Desktop: row | Mobile: column */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          
          {/* Card — full width mobile, 3/4 desktop */}
          <div className="bg-[#6B4423] rounded-2xl p-8 md:p-10 shadow-xl w-full md:w-3/4 flex-shrink-0">
            <h2 className="text-yellow-400 font-bold text-3xl md:text-5xl">
              What is BurnCup?
            </h2>
            <p className="text-white/90 text-sm leading-relaxed mt-4">
              BurnCup adalah ekspedisi kompetisi tahunan yang mengajak peserta
              menjelajahi empat medan berbeda olahraga, kreativitas, teknologi,
              dan otomotif. Setiap kategori dirancang layaknya jalur pendakian:
              penuh tantangan, kejutan, dan hadiah di setiap pos pemberhentian.
            </p>
            <div className="flex gap-3 mt-6 flex-wrap">
              <Link
                to="/competitions"
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-colors duration-200"
              >
                EXPLORE CATEGORIES
              </Link>
              <Link
                to="/register"
                className="border border-white/40 text-white rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wide hover:bg-white/10 transition-colors duration-200"
              >
                REGISTER NOW
              </Link>
            </div>
          </div>

          {/* Fox + Batu */}
          <div className="relative w-full md:w-96 flex-shrink-0 mx-auto md:mx-0 md:self-end h-64 md:h-80">
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
            </div>
            {/* Batu */}
            <img
              src="/assets/batumascot.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 md:w-full z-10"
              alt=""
            />
            {/* Fox di atas batu */}
            <img
              src="/assets/fox-mascot.png"
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-50 md:w-56 z-20"
              alt="BurnCup Mascot"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
