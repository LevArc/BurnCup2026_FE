const timelineData = [
  {
    id: 1,
    date: '1 - 30 AGUSTUS 2026',
    title: 'Registration Opens',
    description: 'Pendaftaran tim dibuka untuk seluruh kategori kompetisi.',
    borderColor: 'border-[#E27A3F]',
    textColor: 'text-[#E27A3F]',
  },
  {
    id: 2,
    date: '1 - 30 AGUSTUS 2026',
    title: 'Registration Opens',
    description: 'Pendaftaran tim dibuka untuk seluruh kategori kompetisi.',
    borderColor: 'border-[#304B32]',
    textColor: 'text-[#304B32]',
  },
  {
    id: 3,
    date: '1 - 30 AGUSTUS 2026',
    title: 'Registration Opens',
    description: 'Pendaftaran tim dibuka untuk seluruh kategori kompetisi.',
    borderColor: 'border-[#C19A2D]',
    textColor: 'text-[#C19A2D]',
  },
  {
    id: 4,
    date: '1 - 30 AGUSTUS 2026',
    title: 'Registration Opens',
    description: 'Pendaftaran tim dibuka untuk seluruh kategori kompetisi.',
    borderColor: 'border-[#51829B]',
    textColor: 'text-[#51829B]',
  }
];

export default function Timeline() {
  return (
    <div 
      className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden font-sans bg-bottom bg-no-repeat bg-cover"
      style={{ 
        /* 👇 PUT YOUR BACKGROUND IMAGE LINK HERE 👇 */
        backgroundImage: "url('/competitionBackground/timelineBg.png')",
        backgroundColor: "#F4EFDF" /* Fallback color just in case the image loads slowly */
      }}
    >
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-row justify-center items-center gap-[5%] mb-16 text-center">
          
          {/* Left Leaf Asset Placeholder */}
          <div className="block w-25 h-25">
            <img 
              src="/competitionBackground/leftLeaf.png" 
              alt="Decorative left leaf" 
              className="w-full h-full object-contain"
            />
          </div>

          <div className="max-w-xl">
            <h1 className="font-black text-[#1A1A1A] mb-4 font-['Alfa_Slab_One'] text-[clamp(2rem,3.4vw,10rem)] font-normal tracking-wide text-center">
              Event Timeline
            </h1>
          </div>

          {/* Right Leaf Asset Placeholder */}
          <div className="block w-25 h-25">
            <img 
              src="/competitionBackground/rightLeaf.png" 
              alt="Decorative right leaf" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Timeline Section */}
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 md:gap-4">
          {timelineData.map((step) => (
            <div key={step.id} className="flex-1 flex flex-col items-center relative">
              
              {/* Step Circle */}
              <div className="w-10 h-10 rounded-full bg-[#F4BE29] border-[3px] border-[#2C2C2C] flex justify-center items-center font-black text-[#2C2C2C] z-10 mb-6 shadow-sm">
                {step.id}
              </div>

              {/* Content Card */}
              <div 
                className={`w-full h-full bg-[#FAF8F1] border ${step.borderColor} p-6 shadow-sm flex flex-col items-center text-center`}
              >
                <p className={`text-[11px] md:text-xs font-bold tracking-wider mb-2 ${step.textColor}`}>
                  {step.date}
                </p>
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2 font-serif">
                  {step.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
