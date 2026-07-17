import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative bg-[#F0E6D2] py-16 min-h-screen flex items-center">
      <div className="w-full max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

          {/* Card — animasi dari kiri, z-10 supaya di atas mascot saat mobile */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10 bg-[#6B4423] rounded-2xl p-8 md:p-12 shadow-xl w-full md:w-3/4 flex-shrink-0"
          >
            <h2 className="text-yellow-400 font-extrabold text-3xl md:text-5xl font-['Plus_Jakarta_Sans']">
              What is BurnCup?
            </h2>
            <p className="text-white/90 text-sm leading-relaxed mt-4">
              BurnCup adalah ekspedisi kompetisi tahunan yang mengajak peserta
              menjelajahi empat medan berbeda, yaitu olahraga, kreativitas, teknologi,
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
          </motion.div>

          {/* Fox + Batu — animasi dari kanan */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative w-full md:w-[28rem] flex-shrink-0 mx-auto md:mx-0 md:self-end h-56 md:h-96"
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
              <div className="w-72 h-72 bg-yellow-400/20 blur-3xl rounded-full" />
            </div>
            {/* Batu */}
            <img
              src="/assets/batumascot.png"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-full z-10"
              alt=""
            />
            {/* Fox */}
            <img
              src="/assets/fox-mascot.png"
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-44 md:w-72 z-20"
              alt="BurnCup Mascot"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
