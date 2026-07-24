import { motion } from "framer-motion";

const timelineItems = [
  {
    time: "2026-08-01T00:00:00",
    title: "Registration Opens",
    description: "Pendaftaran tim dibuka untuk seluruh kategori kompetisi.",
    accent: "#F97316",
  },
  {
    time: "2026-09-01T00:00:00",
    title: "Verification Phase",
    description: "Verifikasi data peserta dan konfirmasi pembayaran pendaftaran.",
    accent: "#16A34A",
  },
  {
    time: "2026-09-20T00:00:00",
    title: "Technical Meeting",
    description: "Pertemuan teknis seluruh tim peserta sebelum kompetisi dimulai.",
    accent: "#CA8A04",
  },
  {
    time: "2026-10-01T00:00:00",
    title: "Competition Day",
    description: "Hari pelaksanaan kompetisi untuk seluruh kategori.",
    accent: "#2563EB",
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
        backgroundColor: "#F4ECD8",
      }}
    >
      <div className="relative z-10 w-full max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h2 className="font-black text-[#1A1A1A] mb-3 font-['Alfa_Slab_One'] text-[clamp(2rem,3.4vw,4rem)] font-normal tracking-wide">
            Event Timeline
          </h2>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            Ikuti jejak jalur ekspedisi BURNCUP 2026 dari titik awal
            pendaftaran hingga garis akhir final.
          </p>
        </motion.div>

        {/* ===================== DESKTOP ===================== */}
        <div className="hidden md:flex items-start justify-between gap-0">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex items-start flex-1">
              {/* Column: circle + card */}
              <div className="flex flex-col items-center flex-1">
                {/* Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
                  className="w-10 h-10 rounded-full border-[3px] border-[#2C2C2C] flex items-center justify-center font-black text-[#2C2C2C] text-sm shadow-sm z-10 mb-4"
                  style={{ backgroundColor: item.accent }}
                >
                  {index + 1}
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + index * 0.15 }}
                  className="w-full bg-[#FAF8F1] border border-black/10 p-5 shadow-sm hover:shadow-md transition-shadow duration-300 mx-2 min-h-[160px]"
                  style={{ borderTop: `4px solid ${item.accent}` }}
                >
                  <p className="text-[10px] font-bold tracking-wider mb-2 text-[#5A5A5A]">
                    {formatDate(item.time)}
                  </p>
                  <h3 className="text-sm font-black text-[#1A1A1A] mb-2 font-serif leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Connector line — antara circle, tidak melebihi card */}
              {index < timelineItems.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.15 }}
                  className="h-[3px] bg-[#4A2E1A]/20 origin-left mt-[1.2rem] w-full max-w-[2rem]"
                />
              )}
            </div>
          ))}
        </div>

        {/* ===================== MOBILE ===================== */}
        <div className="flex md:hidden flex-col gap-0">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 + index * 0.15 }}
              className="flex items-stretch gap-4"
            >
              {/* Left: circle + vertical connector */}
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-full border-[3px] border-[#2C2C2C] flex items-center justify-center font-black text-[#2C2C2C] text-sm shrink-0"
                  style={{ backgroundColor: item.accent }}
                >
                  {index + 1}
                </div>
                {index < timelineItems.length - 1 && (
                  <div className="w-[3px] flex-1 min-h-[1.5rem] my-1" style={{ backgroundColor: `${item.accent}40` }} />
                )}
              </div>

              {/* Right: card */}
              <div
                className="flex-1 bg-[#FAF8F1] border border-black/10 p-4 shadow-sm mb-4"
                style={{ borderLeft: `4px solid ${item.accent}` }}
              >
                <p className="text-[10px] font-bold tracking-wider mb-1 text-[#5A5A5A]">
                  {formatDate(item.time)}
                </p>
                <h3 className="text-sm font-black text-[#1A1A1A] mb-1 font-serif">
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
