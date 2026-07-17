import { motion } from "framer-motion";

const timelineItems = [
  {
    time: "2026-08-01T00:00:00",
    title: "Registration Opens",
    description: "Pendaftaran tim dibuka untuk seluruh kategori kompetisi.",
  },
  {
    time: "2026-09-01T00:00:00",
    title: "Verification Phase",
    description: "Verifikasi data peserta dan konfirmasi pembayaran pendaftaran.",
  },
  {
    time: "2026-09-20T00:00:00",
    title: "Technical Meeting",
    description: "Pertemuan teknis seluruh tim peserta sebelum kompetisi dimulai.",
  },
  {
    time: "2026-10-01T00:00:00",
    title: "Competition Day",
    description: "Hari pelaksanaan kompetisi untuk seluruh kategori.",
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default function TimelineSection() {
  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden font-sans bg-bottom bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('/assets/gunung-ijo-timeline.png')",
        backgroundColor: "#F0E6D2",
      }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-row justify-center items-center gap-[5%] mb-16 text-center"
        >
          <div className="block w-20 h-20 opacity-0" />
          <div className="max-w-xl">
            <h2 className="font-black text-[#1A1A1A] mb-3 font-['Alfa_Slab_One'] text-[clamp(2rem,3.4vw,4rem)] font-normal tracking-wide text-center">
              Event Timeline
            </h2>
            <p className="text-gray-600 text-sm max-w-md mx-auto">
              Ikuti jejak jalur ekspedisi BurnCup 2026 dari titik awal
              pendaftaran hingga garis akhir final.
            </p>
          </div>
          <div className="block w-20 h-20 opacity-0" />
        </motion.div>

        {/* Timeline cards */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-4">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
              className="flex-1 flex flex-col items-center relative"
            >
              {/* Circle */}
              <div className="w-10 h-10 rounded-full bg-[#F4BE29] border-[3px] border-[#2C2C2C] flex justify-center items-center font-black text-[#2C2C2C] z-10 mb-6 shadow-sm">
                {index + 1}
              </div>

              {/* Card */}
              <div className="w-full h-full bg-[#FAF8F1] border border-black/10 p-6 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300">
                <p className="text-[11px] md:text-xs font-bold tracking-wider mb-2 text-[#5A5A5A]">
                  {formatDate(item.time)}
                </p>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2 font-serif">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
