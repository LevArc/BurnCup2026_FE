import { useState } from 'react';

// Define a type for the FAQ data
interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Question?",
    answer: "Answer"
  },
  {
    id: 2,
    question: "Question?",
    answer: "Answer"
  },
  {
    id: 3,
        question: "Question?",
    answer: "Answer"
  },
  {
    id: 4,
        question: "Question?",
    answer: "Answer"
  },
  {
    id: 5,
        question: "Question?",
    answer: "Answer"
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
        <div 
      className="relative min-h-screen flex flex-col justify-center items-center py-20 px-4 overflow-hidden font-sans bg-bottom bg-no-repeat bg-cover"
      style={{ 
        /* 👇 PUT YOUR BACKGROUND IMAGE LINK HERE 👇 */
        backgroundImage: "url('/competitionBackground/FaqBg.png')",
        backgroundColor: "#F4EFDF" /* Fallback color just in case the image loads slowly */
      }}
    >
      <div className="max-w-4xl mx-auto">
        
        <h2 
          className="text-[clamp(2rem,3.4vw,10rem)] font-extrabold text-[#9A4921] text-center mb-8 tracking-wide font-['Alfa_Slab_One'] font-normal"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className="bg-[#F5F0E6] border border-[#CBAF98] rounded-xl overflow-hidden cursor-pointer transition-colors duration-200 hover:bg-[#f0eadd]"
              onClick={() => toggleFAQ(index)}
            >
              <div className="px-5 py-4 flex justify-between items-center sm:px-6">
                <p className="text-[#4A3B32] font-['Plus_Jakarta_Sans'] font-normal font-semibold text-sm sm:text-base pr-4 leading-relaxed">
                  {faq.question}
                </p>
                
                <svg
                  className={`w-6 h-6 text-black transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-4 sm:px-6 text-[#4A3B32] text-sm sm:text-base font-['Plus_Jakarta_Sans'] font-normal border-t border-[#CBAF98] mt-2 pt-3">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}