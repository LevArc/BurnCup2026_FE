import { motion } from "framer-motion";

const sponsors = [
  {
    name: "Medikids",
    src: "/assets/Sponsor/tier3/Size M - Medikids.png",
  },
  {
    name: "Pavana Music School",
    src: "/assets/Sponsor/tier3/Size M - Pavana Music School (Opsi 1).png",
  },
  {
    name: "Rumah Sakit Permata Keluarga Summarecon Bekasi",
    src: "/assets/Sponsor/tier3/Size M - Rumah Sakit Permata Keluarga Summarecon Bekasi.png",
  },
  {
    name: "Wings",
    src: "/assets/Sponsor/tier3/Size M Wings.png",
  },
  {
    name: "WINGSTOP",
    src: "/assets/Sponsor/tier3/Size M WINGSTOP.jpeg",
  },
  {
    name: "Mastermind",
    src: "/assets/Sponsor/tier3/Size M mastermind.png",
  },
  {
    name: "Ramen Yes",
    src: "/assets/Sponsor/tier3/Size S logo ramen yes.png",
  },
  {
    name: "Mie Sedaap",
    src: "/assets/Sponsor/tier3/Size S Mie Sedaap.png",
  },
  {
    name: "Top Kopi",
    src: "/assets/Sponsor/tier3/Size S Top Kopi.png",
  },
];

export default function SponsorSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-36 md:pt-36 md:pb-48 lg:pt-44 lg:pb-60 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans bg-top bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/competitionBackground/SponsorBronze.png')",
        backgroundColor: "#F4ECD8",
      }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-black text-[#1A1A1A] mb-3 font-['Alfa_Slab_One'] text-[clamp(2.2rem,4vw,4.5rem)] font-normal tracking-wide drop-shadow-sm">
            Our Sponsors
          </h2>
        </motion.div>

        {/* Unified Sponsor Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-5xl lg:max-w-6xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex items-center justify-center bg-white p-6 sm:p-7 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border border-black/5 hover:-translate-y-1 w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] h-40 sm:h-44 md:h-48"
            >
              <img
                src={sponsor.src}
                alt={sponsor.name}
                className="max-w-[85%] max-h-[75%] object-contain"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
