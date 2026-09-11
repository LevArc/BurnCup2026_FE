import { motion } from "framer-motion";

export default function SponsorSection() {
  return (
    <div
      className="relative min-h-[60vh] flex flex-col justify-center items-center py-20 px-4 overflow-hidden font-sans bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/competitionBackground/descriptionBg.png')",
        backgroundColor: "#F4ECD8",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="font-black text-[#1A1A1A] mb-3 font-['Alfa_Slab_One'] text-[clamp(2rem,3.4vw,4rem)] font-normal tracking-wide">
            Our Sponsors
          </h2>
        </motion.div>

        {/* Sponsor Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Medikids */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center bg-white/80 p-6 rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 w-64 h-40"
          >
            <img 
              src="/assets/Sponsor/tier3/Size M - Medikids.png" 
              alt="Medikids" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>

          {/* Pavana */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center bg-white/80 p-6 rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 w-64 h-40"
          >
            <img 
              src="/assets/Sponsor/tier3/Size M - Pavana Music School (Opsi 1).png" 
              alt="Pavana Music School" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>

          {/* Rumah Sakit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center bg-white/80 p-6 rounded-2xl shadow-md backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 w-64 h-40"
          >
            <img 
              src="/assets/Sponsor/tier3/Size M - Rumah Sakit Permata Keluarga Summarecon Bekasi.png" 
              alt="Rumah Sakit Permata Keluarga" 
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

