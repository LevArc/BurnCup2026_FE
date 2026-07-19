// Define the shape of a single rule
export interface Rule {
  id: number;
  content: string;
}

// Define the component's props
interface RulesetProps {
  rules: Rule[];
  competitionName: string;
}

export default function Ruleset({ rules, competitionName }: RulesetProps) {
  return (
    <div className="min-h-screen bg-[#E9DCBB] flex justify-left items-center ">
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-[10%] items-center md:items-start mb-10 md:mb-0">
        
        {/* Left Section: Given a defined width (w-7/12)*/}
        <div className="w-full md:w-4/12 flex flex-col items-start md:items-start shrink-0">
          <img 
            src="/competitionBackground/mascotRuleset.png" 
            alt="Mascot" 
            className="h-100% w-auto object-contain object-left" 
          />
        </div>

        {/* Right Section: Static Rules List (Takes up the remaining 5/12) */}
        <div className="w-full md:w-6/12 flex flex-col gap-[1.5rem]">
          {/* Kept your ml-[20%] exactly as requested! */}
          <h1 className="font-['Alfa_Slab_One'] font-normal text-[clamp(2rem,3.4vw,10rem)] text-[#A0451B] uppercase tracking-wider leading-tight mb-[5%] text-center  drop-shadow-sm">
            Ruleset Umum
            <br />
            {competitionName}
          </h1>
          
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="flex items-center bg-[#F4EFE6] border-[1.5px] border-[#C4B79C] rounded-full p-[2%] pr-[5%] shadow-sm gap-8 mb-0"
            >
              {/* Rule Number Bubble */}
              <div className="flex-shrink-0 w-16 h-16 bg-[#A0451B] text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {rule.id}
              </div>

              {/* Rule Content */}
              <div className="text-[clamp(1rem,1.1vw,10rem)] text-[#5C4D3C] font-['Plus_Jakarta_Sans'] font-normal leading-snug">
                {rule.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}