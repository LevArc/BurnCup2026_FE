const categories = [
  {
    id: "sport",
    title: "Sport",
    description: "Basket, badminton, futsal & cabang olahraga lapangan lainnya.",
    bg: "/assets/foto-about-sport.JPG",
  },
  {
    id: "esport",
    title: "E - Sport",
    description: "Mobile legends, valorant & berbagai cabang esport kompetitif.",
    bg: "/assets/e-sport-bg.JPG",
  },
  {
    id: "creative",
    title: "Creative",
    description: "Desain, fotografi, musik & berbagai cabang seni kreatif.",
    bg: "/assets/creative-bg.jpg",
  },
];

export default function CategorySection() {
  return (
    <section className="relative bg-[#F0E6D2] py-24 overflow-hidden">
      {/* Dekorasi */}
      <img
        src="/assets/pohon-kiri-atas-home.png"
        className="absolute left-0 top-0 w-40 z-0"
        alt=""
      />
      <img
        src="/assets/pohon-kiri-bawah-home.png"
        className="absolute left-0 bottom-0 w-40 z-0"
        alt=""
      />
      <img
        src="/assets/pohon-kanan-home.png"
        className="absolute right-0 bottom-0 w-56 z-0"
        alt=""
      />

      {/* Konten */}
      <div className="relative z-10 px-6">
        <h2 className="text-4xl font-bold text-center text-[#3B2A1A]">
          Competition Categories
        </h2>
        <p className="mt-3 max-w-md mx-auto text-gray-600 text-sm text-center">
          Tiga medan, tiga tantangan berbeda. Pilih jalur yang paling sesuai
          dengan keahlian timmu.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-14">
          {categories.map(({ id, title, description, bg }) => (
            <div
              key={id}
              className="relative rounded-xl overflow-hidden h-64 group cursor-pointer"
            >
              {/* Background image */}
              <img
                src={bg}
                className="absolute inset-0 w-full h-full object-cover"
                alt={title}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Konten */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h3 className="text-white font-bold text-xl">{title}</h3>
                <p className="text-white/80 text-xs mt-1">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
