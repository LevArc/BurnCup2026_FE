const timelineItems = [
  {
    number: 1,
    date: "1 - 30 AGUSTUS 2026",
    title: "Registration Opens",
    description: "Pendaftaran tim dibuka untuk seluruh kategori kompetisi.",
    borderColor: "border-orange-500",
    dateColor: "text-orange-500",
  },
  {
    number: 2,
    date: "1 - 15 SEPTEMBER 2026",
    title: "Verification Phase",
    description: "Verifikasi data peserta dan konfirmasi pembayaran pendaftaran.",
    borderColor: "border-green-800",
    dateColor: "text-green-800",
  },
  {
    number: 3,
    date: "20 SEPTEMBER 2026",
    title: "Technical Meeting",
    description: "Pertemuan teknis seluruh tim peserta sebelum kompetisi dimulai.",
    borderColor: "border-yellow-600",
    dateColor: "text-yellow-600",
  },
  {
    number: 4,
    date: "1 - 30 OKTOBER 2026",
    title: "Competition Day",
    description: "Hari pelaksanaan kompetisi untuk seluruh kategori.",
    borderColor: "border-blue-400",
    dateColor: "text-blue-400",
  },
];

export default function TimelineSection() {
  return (
    <section className="relative bg-[#F0E6D2] py-20 md:py-24 overflow-hidden">
      {/* Background gunung hijau */}
      <img
        src="/assets/gunung-ijo-timeline.png"
        className="absolute bottom-0 left-0 w-full z-0"
        alt=""
      />

      {/* Heading */}
      <div className="relative z-10 text-center px-6">
        <div className="absolute left-[15%] top-4 w-16 md:w-20 h-16 rounded-full bg-green-200/40" />
        <div className="absolute right-[15%] top-4 w-16 md:w-20 h-16 rounded-full bg-green-200/40" />
        <h2 className="text-4xl md:text-5xl font-bold font-serif text-black relative z-10">
          Event Timeline
        </h2>
        <p className="text-gray-600 text-sm mt-3 max-w-md mx-auto relative z-10">
          Ikuti jejak jalur ekspedisi BurnCup 2026 dari titik awal pendaftaran
          hingga garis akhir final.
        </p>
      </div>

      {/* Timeline -> lingkaran + garis + card per kolom */}
      <div className="relative z-10 max-w-5xl mx-auto mt-16 px-4">
        {/* Row lingkaran + garis connector */}
        <div className="grid grid-cols-4 mb-6">
          {timelineItems.map((item, index) => (
            <div key={item.number} className="flex items-center">
              {/* Lingkaran Kuning tai center di kolom */}
              <div className="flex-1 flex justify-center">
                <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-yellow-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {item.number}
                </div>
              </div>
              {/* Connector */}
              {index < timelineItems.length - 1 && (
                <div className="flex-1 h-[3px] bg-yellow-700/40" />
              )}
            </div>
          ))}
        </div>

        {/* Row card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {timelineItems.map((item) => (
            <div
              key={item.number}
              className={`bg-[#FDF8ED] rounded-lg shadow-sm border-t-4 p-5 text-left ${item.borderColor}`}
            >
              <p className={`text-xs font-semibold uppercase tracking-wide ${item.dateColor}`}>
                {item.date}
              </p>
              <h3 className="text-base md:text-lg font-bold mt-1 text-black">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
