import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Banknote, 
  Check, 
  Users 
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface TimelineEvent {
  time?: string;
  date?: string;
  title: string;
  description?: string;
}

interface Competition {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  bookletUrl: string;
  paidMessage: string;
  registrationStartDate: string;
  registrationEndDate: string;
  competitionStartDate: string;
  competitionEndDate: string;
  competitionType: string;
  venue: string;
  registrationfee: number;
  maxMembers: number;
  minMembers: number;
  teamSlot: number;
  faq: Record<string, string>;
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  prizes: any | null;
  requirements: any | null;
  rules: any | null;
}

interface TeamMember {
  id: string;
  userType: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  nim: string;
  major: string;
}

interface Team {
  id: string;
  teamName: string;
  teamCode: string;
  isPaid: boolean;
  competition: Competition;
  members: TeamMember[];
  teamLeader: TeamMember;
  createdAt: string;
  updatedAt: string;
}

interface CompetitionCardProps {
  team: Team;
}

// --- Component ---
const CompetitionCard: React.FC<CompetitionCardProps> = ({ team }) => {
  const { competition, teamLeader, members, isPaid, teamName, teamCode } = team;
  const allMembers = [teamLeader, ...members];

  // Helper to calculate countdowns
  const calculateTimeLeft = (targetDate: string) => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [regTimeLeft, setRegTimeLeft] = useState(calculateTimeLeft(competition.registrationEndDate));
  const [compTimeLeft, setCompTimeLeft] = useState(calculateTimeLeft(competition.competitionStartDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setRegTimeLeft(calculateTimeLeft(competition.registrationEndDate));
      setCompTimeLeft(calculateTimeLeft(competition.competitionStartDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [competition]);

  return (
    <div className="font-sans text-[#3c2f25] max-w-5xl">
      <div className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[6px_6px_0px_#4a3f35] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#6b442b] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">{competition.name}</h2>
            <span className="bg-[#2d3748] text-[10px] px-2 py-0.5 rounded text-gray-200">{competition.competitionType}</span>
            <span className="bg-[#2d3748] text-[10px] px-2 py-0.5 rounded text-gray-200">{competition.category}</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex flex-col items-end">
              <span className="flex items-center gap-1"><MapPin size={12} /> {competition.venue}</span>
              <span className="flex items-center gap-1"><Banknote size={12} /> {competition.registrationfee.toLocaleString()}</span>
            </div>
            {isPaid ? (
              <span className="text-[#4ade80] font-bold">PAID</span>
            ) : (
              <span className="text-[#fca5a5] font-bold">UNPAID</span>
            )}
          </div>
        </div>
        
        {/* Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 border-b-2 border-[#c2ae95]">
          
          {/* Timers Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold text-center mb-2 text-[#4a3f35]">REGISTRATION ENDS IN</h3>
              <div className="flex justify-center gap-2">
                <TimerBox value={regTimeLeft.days} label="Days" />
                <TimerBox value={regTimeLeft.hours} label="Hours" />
                <TimerBox value={regTimeLeft.minutes} label="Minutes" />
                <TimerBox value={regTimeLeft.seconds} label="Seconds" />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-center mb-2 text-[#4a3f35]">COMPETITION STARTS IN</h3>
              <div className="flex justify-center gap-2">
                <TimerBox value={compTimeLeft.days} label="Days" />
                <TimerBox value={compTimeLeft.hours} label="Hours" />
                <TimerBox value={compTimeLeft.minutes} label="Minutes" />
                <TimerBox value={compTimeLeft.seconds} label="Seconds" />
              </div>
            </div>
          </div>
          
          {/* Payment Info Section */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-xs font-bold mb-1 text-[#4a3f35]">PAYMENT STATUS</h3>
            <p className="text-[10px] mb-3">Registration fee: {competition.registrationfee.toLocaleString()}</p>
            
            <div className="border-2 border-dashed border-gray-400 bg-opacity-50 p-6 rounded-md mb-4 w-full max-w-[200px] flex flex-col items-center justify-center">
              {isPaid ? (
                <>
                  <Check size={40} className="text-black mb-2" />
                  <span className="text-sm font-bold">Payment Completed</span>
                  <span className="text-[10px] text-gray-600">{competition.paidMessage}</span>
                </>
              ) : (
                <>
                  <Banknote size={40} className="text-gray-600 mb-2" />
                  <span className="text-sm font-bold">Pending Payment</span>
                  <span className="text-[10px] text-gray-600">Please complete payment</span>
                </>
              )}
            </div>
            
            <div className="w-full max-w-[200px] space-y-2">
              <div className="bg-[#fca5a5] border border-red-400 text-red-900 text-xs font-semibold py-1 rounded">
                {competition.teamSlot} slot(s) left
              </div>
              {!isPaid && (
                <div className="bg-[#bfdbfe] border border-blue-300 text-blue-800 text-[9px] py-1 px-2 rounded leading-tight">
                  If there is a problem transfer to BLU ...<br/>Send proof of transfer to ...
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-[10px] mb-1">Team Code for Reference:</p>
              <div className="bg-[#658b5b] text-white text-xs font-bold py-1 px-3 rounded shadow-sm">
                {teamCode}
              </div>
            </div>
          </div>
          
          {/* Team Information Section */}
          <div>
            <div className="bg-[#eae0d2] border border-[#c2ae95] rounded-md p-4 h-full">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#c2ae95]">
                <Users size={16} className="text-[#4a3f35]" />
                <h3 className="text-sm font-bold text-[#4a3f35]">Team Information</h3>
              </div>
              <div className="space-y-4 text-xs">
                <div>
                  <p className="text-gray-500 mb-0.5">Team Name:</p>
                  <p className="font-semibold text-sm text-[#4a3f35]">{teamName}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Team Code:</p>
                  <p className="font-semibold text-sm text-[#4a3f35]">{teamCode}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">Total Members:</p>
                  <p className="font-semibold text-sm text-[#4a3f35]">{allMembers.length} Player(s)</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Team Members List */}
        <div className="p-4 bg-[#d8c3a5]">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} className="text-[#4a3f35]" />
            <h3 className="text-sm font-bold text-[#4a3f35]">Team Members</h3>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {allMembers.map((member) => (
              <TeamMemberCard key={member.id} name={member.fullName} />
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

/* Reusable Sub-components */
interface TimerBoxProps {
  value: number;
  label: string;
}

const TimerBox: React.FC<TimerBoxProps> = ({ value, label }) => (
  <div className="bg-[#2a3040] text-white rounded w-12 h-14 flex flex-col items-center justify-center shadow-md">
    <span className="text-sm font-bold">{value.toString().padStart(2, '0')}</span>
    <span className="text-[8px] mt-0.5">{label}</span>
  </div>
);

interface TeamMemberCardProps {
  name: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name }) => (
  <div className="bg-[#ede4d5] border border-[#c2ae95] rounded-md p-2 flex items-center gap-3 min-w-[240px] shadow-sm flex-1 md:flex-none">
    <div className="w-8 h-8 bg-[#2a4332] text-white rounded flex items-center justify-center text-sm font-bold">
      {name.charAt(0)}
    </div>
    <span className="text-xs font-medium text-[#4a3f35] truncate">{name}</span>
  </div>
);

export default CompetitionCard;