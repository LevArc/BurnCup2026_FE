import { useState, useEffect } from 'react';

// Interfaces for our timer state
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Interface for the component inputs
interface DescriptionProps {
  description: string;
  targetDate: string; // e.g., "2026-08-01T00:00:00"
}

export default function Description({ description, targetDate }: DescriptionProps) {
  // --- Countdown Logic ---
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Parse the target date passed via props
    const targetTime = new Date(targetDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        // Clear timer and ensure it stays at 0 when the date passes
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // --- Sub-component for individual time boxes ---
  const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-[#5D3A20] w-28 h-32 md:w-36 md:h-40 rounded-lg shadow-md">
      <span className="text-[#E7C664] text-[clamp(2rem,3vw,10rem)] font-['Plus_Jakarta_Sans'] font-normal mb-1">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-white text-[clamp(1rem,1vw,10rem)] tracking-widest uppercase font-['Plus_Jakarta_Sans'] font-normal">
        {label}
      </span>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[url('/competitionBackground/descriptionBg.png')] bg-cover bg-center bg-no-repeat px-[10%] py-12">
      <div className=" flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-12 z-10 ">

        {/* Left Column: Description Box */}
        <div className="bg-[#785131] w-full p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-[clamp(2rem,3.7vw,10rem)] font-['Alfa_Slab_One'] font-normal text-[#E7C664] mb-6 tracking-wide drop-shadow-sm">
            Description
          </h2>
          {/* Replaced hardcoded text with the description prop */}
          <p className="text-[#F4EBE1] text-[clamp(1rem,1.1vw,10rem)] leading-relaxed font-['Plus_Jakarta_Sans'] font-normal whitespace-pre-wrap">
            {description}
          </p>
        </div>

        {/* Right Column: Countdown Timer */}
        <div className="w-full flex flex-col items-center justify-center">
          <h2 className="text-[clamp(2rem,3vw,10rem)] font-['Alfa_Slab_One'] font-normal  text-[#785131] mb-8 text-center drop-shadow-sm">
            Registration Close In :
          </h2>

          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            <TimeBox value={timeLeft.days} label="DAY" />
            <TimeBox value={timeLeft.hours} label="HOUR" />
            <TimeBox value={timeLeft.minutes} label="MINUTE" />
            <TimeBox value={timeLeft.seconds} label="SECOND" />
          </div>
        </div>

      </div>
    </div>
  );
}