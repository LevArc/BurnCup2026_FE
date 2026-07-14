import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className="relative bg-[#F0E6D2] py-16 min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 flex items-end justify-between gap-4 w-full">
        {/* Card */}
        <div className="bg-[#6B4423] rounded-2xl p-10 shadow-xl w-3/4">
          <h2 className="text-yellow-400 font-bold text-5xl">
            What is BurnCup?
          </h2>
          <p className="text-white/90 text-sm leading-relaxed mt-4">
            BurnCup adalah ekspedisi kompetisi tahunan yang mengajak peserta
            menjelajahi empat medan berbeda  olahraga, kreativitas, teknologi,
            dan otomotif. Setiap kategori dirancang layaknya jalur pendakian:
            penuh tantangan, kejutan, dan hadiah di setiap pos pemberhentian.
            Ghani edward Nabhan penguasa bruncup cihuyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
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

        {/* Fox + Batu (di luar card) bagian About di Home */}
        <div className="relative w-96 flex-shrink-0">
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <div className="w-64 h-64 bg-yellow-400/20 blur-3xl rounded-full" />
          </div>
          {/* Batu */}
          <img
            src="/assets/batumascot.png"
            className="relative z-10 w-full"
            alt=""
          />
          {/*Fox diatas batu*/}
          <img
            src="/assets/fox-mascot.png"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 z-20"
            alt="BurnCup Mascot"
          />
        </div>
      </div>
    </section>
  );
}
