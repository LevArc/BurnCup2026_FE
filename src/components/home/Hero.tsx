export default function Hero() {
  return (
    <section className="relative flex items-end justify-center h-[60vh] md:min-h-screen w-full bg-[#F0E6D2] overflow-hidden -mt-20 md:-mt-24">
      {/* Background Mountain — natural size, bottom */}
      <img
        src="/assets/mountain-bg.png"
        className="absolute bottom-0 left-0 w-full z-0"
        alt=""
      />

      {/* Logo — di atas gunung */}
      <div className="relative z-10 flex flex-col items-center justify-end pb-16 md:pb-24 w-full">
        <img
          src="/assets/Logo Burncup.svg"
          className="w-[300px] md:w-[500px] max-w-[80%] mx-auto"
          alt="BurnCup Logo"
        />
      </div>
    </section>
  );
}
