// Define the new shape based on your input
export interface TimelineItem {
  time: string;
  title: string;
}

// Update the component's props to accept "timeline"
interface TimelineProps {
  timeline: TimelineItem[];
}

export default function Timeline({ timeline }: TimelineProps) {
  // Helper function to format the ISO date string to "Day Month Year"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
          {timeline.map((step, index) => (
            // Using index as key since id is no longer provided
            <div key={index} className="flex-1 flex flex-col items-center relative">
              
              {/* Step Circle (Auto-numbered based on array index) */}
              <div className="w-10 h-10 rounded-full bg-[#F4BE29] border-[3px] border-[#2C2C2C] flex justify-center items-center font-black text-[#2C2C2C] z-10 mb-6 shadow-sm">
                {index + 1} 
              </div>

              {/* Content Card */}
              <div 
                className="w-full h-full bg-[#FAF8F1] border border-black/10 p-6 shadow-sm flex flex-col items-center text-center"
              >
                {/* Formatted Date */}
                <p className="text-[11px] md:text-xs font-bold tracking-wider mb-2 text-[#5A5A5A]">
                  {formatDate(step.time)}
                </p>
                
                {/* Title */}
                <h3 className="text-lg font-black text-[#1A1A1A] mb-2 font-serif">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}