import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    id: "sport",
    title: "Sport",
    description: "Basket, badminton, futsal & cabang olahraga lapangan lainnya.",
    bg: "/assets/foto-about-sport.JPG",
    path: "/competitions/sport",
  },
  {
    id: "esport",
    title: "E - Sport",
    description: "Mobile legends, valorant & berbagai cabang esport kompetitif.",
    bg: "/assets/e-sport-bg.JPG",
    path: "/competitions/esport",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Desain, fotografi, musik & berbagai cabang seni kreatif.",
    bg: "/assets/creative-bg.jpg",
    path: "/competitions/creative",
  },
];

export default function CategorySection() {
  return (
    <section className="relative bg-[#E9DCBB] min-h-screen flex flex-col justify-center overflow-hidden py-12">
      {/* Dekorasi */}
      <img src="/assets/pohon-kiri-atas-home.png" className="absolute left-0 top-0 w-20 md:w-40 z-0" alt="" />
      <img src="/assets/pohon-kiri-bawah-home.png" className="absolute left-0 bottom-0 w-40 z-0" alt="" />
      <img src="/assets/pohon-kanan-home.png" className="absolute right-0 bottom-0 w-56 z-0" alt="" />

      <div className="relative z-10 px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-normal text-center text-[#3B2A1A] font-['Alfa_Slab_One']">
            Competition Categories
          </h2>
          <p className="mt-3 max-w-md mx-auto text-gray-600 text-sm text-center font-['Plus_Jakarta_Sans']">
            Tiga medan, tiga tantangan berbeda. Pilih jalur yang paling sesuai
            dengan keahlian timmu.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10 md:mt-14">
          {categories.map(({ id, title, description, bg, path }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
            >
              <Link
                to={path}
                className="relative rounded-xl overflow-hidden h-80 md:h-[28rem] group cursor-pointer block"
              >
                {/* Background image */}
                <img
                  src={bg}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={title}
                />

                {/* Overlay — gradient dari bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 group-hover:to-transparent transition-all duration-300" />

                {/* Content — slide up saat hover */}
                <div className="relative z-10 flex flex-col items-center justify-end h-full text-center px-4 pb-6 gap-2 translate-y-2 group-hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-white font-normal text-xl drop-shadow font-['Alfa_Slab_One']">{title}</h3>
                  {/* Description muncul saat hover */}
                  <p className="text-white/80 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[180px] font-['Plus_Jakarta_Sans']">
                    {description}
                  </p>
                  {/* Explore button */}
                  <div className="flex items-center gap-1 mt-1 border border-white/40 rounded-full px-3 py-1 bg-white/10 group-hover:bg-white/25 group-hover:border-white/70 transition-all duration-300">
                    <span className="text-white text-xs font-normal tracking-wide font-['Alfa_Slab_One']">Explore</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
