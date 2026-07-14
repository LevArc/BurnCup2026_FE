export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-screen w-full bg-[#F0E6D2] overflow-hidden">
      {/* Background Mountain */}
      <img
        src="/assets/mountain-bg.png"
        className="absolute bottom-0 left-0 w-full object-cover"
        alt=""
      />

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <img
          src="/assets/Logo Burncup.svg"
          className="w-[1000px] max-w-[100%] mx-auto"
          alt="BurnCup Logo"
        />
      </div>
    </section>
  );
}
