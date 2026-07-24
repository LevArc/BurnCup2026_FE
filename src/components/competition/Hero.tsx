interface CompetitionHeroProps {
  bgImageUrl: string;
  competitionName: string;
  registerLink?: string;
  bookletLink?: string;
}

export default function CompetitionHero({
  bgImageUrl,
  competitionName,
  registerLink = "#",
  bookletLink = "#"
}: CompetitionHeroProps) {
  return (
    <div 
      className="w-screen h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat px-[10%]"
      style={{ backgroundImage: `url('${bgImageUrl}')` }}
    >

      <div className="relative mb-[5%] text-center font-['Luckiest_Guy'] text-[clamp(3rem,12vw,10rem)] leading-none">
        <h1 className="absolute inset-0 z-0 text-transparent [-webkit-text-stroke:1.5rem_#653011] md:[-webkit-text-stroke:1.5rem_#653011]">
          {competitionName} <br />Competition
        </h1>

        <h1 className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-[#FCF2BF] to-[#DF7709]">
          {competitionName} <br />Competition
        </h1>
      </div>


      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-[5%] w-full px-4 md:px-0">
        <a 
          href={registerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-[2rem] w-auto justify-center font-['Plus_Jakarta_Sans'] font-semibold px-4 py-3 md:px-6 md:py-4 bg-[#A84607] text-[#E9DCBB] rounded-xl flex items-center gap-3 md:gap-7 hover:bg-white transition-colors duration-300"
        >
          <img src="/competitionBackground/register.png" alt="register icon" className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 object-contain" />
          <p className="text-[clamp(1rem,1.75vw,10rem)]">REGISTER NOW</p>
        </a>

        <a 
          href={bookletLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base md:text-[2rem] w-auto justify-center font-['Plus_Jakarta_Sans'] font-semibold px-4 py-3 md:px-6 md:py-4 bg-[#E9DCBB] text-[#A84607] rounded-xl flex items-center gap-3 md:gap-7 hover:bg-white transition-colors duration-300"
        >
          <img src="/competitionBackground/download.png" alt="download icon" className="w-5 h-6 md:w-7 md:h-8 lg:w-9 lg:h-10 object-contain" />
          <p className="text-[clamp(1rem,1.75vw,10rem)]">DOWNLOAD BOOKLET</p>
        </a>
      </div>
      
    </div>
  );
}