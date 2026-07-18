import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Banknote,
  Check,
  Users,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  RefreshCw
} from 'lucide-react';

// --- TypeScript Interfaces ---
interface TimelineEvent {
  time?: string;
  date?: string;
  title?: string;
  activity?: string;
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
  binusianRegistrationFee: number;
  nonBinusianRegistrationFee: number;
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
  remainingSlot: number;
  createdAt: string;
  updatedAt: string;
}

interface CompetitionCardProps {
  team: Team;
}

interface QrResponse {
  expiryTime: string;
  qrLink: string;
}

interface NotificationState {
  type: 'success' | 'error';
  message: string;
}

// --- Helper function to decode JWT ---
const getEmailFromToken = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decoded = JSON.parse(jsonPayload);
    return decoded.email || null;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// --- Component ---
const CompetitionCard: React.FC<CompetitionCardProps> = ({ team }) => {
  const { competition, teamLeader, members, isPaid, teamName, teamCode, remainingSlot } = team;
  const allMembers = [teamLeader, ...members];

  // State to hold the logged-in user's email
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Extract email from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = getEmailFromToken(token);
    setCurrentUserEmail(email);
  }, []);

  // Determine if the current logged-in user is the team leader by comparing emails
  const isCurrentUserLeader = currentUserEmail === teamLeader.email;

  // Determine the correct fee based on the Team Leader's userType
  const displayFee = teamLeader.userType === 'Binusian'
    ? competition.binusianRegistrationFee
    : competition.nonBinusianRegistrationFee;

  // State for QR Fetching
  const [qrData, setQrData] = useState<QrResponse | null>(null);
  const [isQrLoading, setIsQrLoading] = useState<boolean>(false);
  const [qrError, setQrError] = useState<string | null>(null);

  // State for deleting member
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // State for result popup
  const [notification, setNotification] = useState<NotificationState | null>(null);

  // Fetch QR Code Data
  useEffect(() => {
    if (isPaid) return;

    const fetchQrCode = async () => {
      setIsQrLoading(true);
      setQrError(null);

      try {
        const token = localStorage.getItem('token');

        const response = await fetch(`http://localhost:8080/api/protected/get-qr-link/${teamCode}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to load QR code. Please try again later.');
        }

        const data: QrResponse = await response.json();
        setQrData(data);
      } catch (error: any) {
        setQrError(error.message || 'An unexpected error occurred.');
      } finally {
        setIsQrLoading(false);
      }
    };

    fetchQrCode();
  }, [competition.id, isPaid, teamCode]);

  // Handle member deletion
  const handleDeleteConfirm = async () => {
    if (!memberToDelete) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/protected/delete-team-member', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        // Update the body to match the Go struct expectations
        body: JSON.stringify({
          teamId: team.id,
          memberEmail: memberToDelete.email
        })
      });

      // Try to parse the response body, default to a generic message if it fails
      let responseData;
      try {
        responseData = await response.json();
      } catch (e) {
        responseData = { message: 'An unknown error occurred.' };
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to delete team member');
      }

      // Show success popup
      setNotification({
        type: 'success',
        message: responseData.message || `${memberToDelete.fullName} has been successfully kicked from the team.`
      });
    } catch (error: any) {
      console.error(error);
      // Show error popup
      setNotification({
        type: 'error',
        message: error.message || 'An error occurred while trying to kick this member.'
      });
    } finally {
      setIsDeleting(false);
      setMemberToDelete(null);
    }
  };

  // Close the notification. If it was successful, reload the page to refresh data.
  const handleCloseNotification = () => {
    const wasSuccess = notification?.type === 'success';
    setNotification(null);
    if (wasSuccess) {
      window.location.reload();
    }
  };

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
    <div className="font-sans text-[#3c2f25] max-w-6xl relative">
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

              <span className="flex items-center gap-1"><Banknote size={12} /> {displayFee.toLocaleString()}</span>

            </div>

            {isPaid ? (

              <span className="text-[#4ade80] font-bold">PAID</span>

            ) : (

              <span className="text-[#fca5a5] font-bold">UNPAID</span>

            )}

          </div>

        </div>

        {/* Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10 border-b-2 border-[#c2ae95]">

          {/* Timers Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold text-center mb-3 text-[#4a3f35]">REGISTRATION ENDS IN</h3>
              <div className="flex justify-center gap-3">
                <TimerBox value={regTimeLeft.days} label="Days" />
                <TimerBox value={regTimeLeft.hours} label="Hours" />
                <TimerBox value={regTimeLeft.minutes} label="Minutes" />
                <TimerBox value={regTimeLeft.seconds} label="Seconds" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-center mb-3 text-[#4a3f35]">COMPETITION STARTS IN</h3>
              <div className="flex justify-center gap-3">
                <TimerBox value={compTimeLeft.days} label="Days" />
                <TimerBox value={compTimeLeft.hours} label="Hours" />
                <TimerBox value={compTimeLeft.minutes} label="Minutes" />
                <TimerBox value={compTimeLeft.seconds} label="Seconds" />
              </div>
            </div>
          </div>

          {/* Payment Info Section */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-base font-bold mb-1 text-[#4a3f35]">PAYMENT STATUS</h3>
            <p className="text-sm mb-4">Registration fee: {displayFee.toLocaleString()}</p>

            <div className="border-2 border-dashed border-gray-400 bg-opacity-50 p-6 rounded-md mb-5 w-full max-w-[280px] min-h-[200px] flex flex-col items-center justify-center">
              {isPaid ? (
                <>
                  <Check size={56} className="text-black mb-3" />
                  <span className="text-lg font-bold">Payment Completed</span>
                  <span className="text-xs text-gray-600 mt-1">{competition.paidMessage}</span>
                </>
              ) : (
                <>
                  {isQrLoading ? (
                    <div className="flex flex-col items-center text-gray-600">
                      <Loader2 size={40} className="animate-spin mb-3" />
                      <span className="text-sm font-semibold">Generating QR...</span>
                    </div>
                  ) : qrError ? (
                    <div className="flex flex-col items-center text-red-800">
                      <AlertCircle size={40} className="mb-3 text-red-600" />
                      <span className="text-sm font-semibold">Error Loading QR</span>
                      <span className="text-xs mt-2 leading-tight">{qrError}</span>
                    </div>
                  ) : qrData?.qrLink ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={qrData.qrLink}
                        alt="Payment QR Code"
                        className="w-48 h-48 object-contain mb-3 rounded"
                      />
                      <span className="text-base font-bold">Scan to Pay</span>
                      {qrData.expiryTime && (
                        <span className="text-xs text-gray-600 mt-1">
                          Expires: {new Date(qrData.expiryTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Banknote size={56} className="text-gray-600 mb-3" />
                      <span className="text-lg font-bold">Pending Payment</span>
                      <span className="text-xs text-gray-600 mt-1">Please complete payment</span>
                    </div>
                  )}

                  {/* Refresh Button */}
                  {!isQrLoading && (
                    <button
                      onClick={() => window.location.reload()}
                      className="mt-5 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-100 text-[#4a3f35] border border-gray-300 rounded-md text-sm font-bold transition-colors shadow-sm"
                    >
                      <RefreshCw size={16} />
                      Refresh Status
                    </button>
                  )}
                </>
              )}
            </div>

            <div className="w-full max-w-[280px] space-y-3">
              <div className="bg-[#fca5a5] border border-red-400 text-red-900 text-sm font-semibold py-2 px-3 rounded text-center">
                {Math.max(0, remainingSlot)} slot(s) left
              </div>
              {!isPaid && (
                <div className="bg-[#bfdbfe] border border-blue-300 text-blue-800 text-xs py-2 px-3 rounded leading-tight text-center">
                  If there is a problem transfer to BLU ...<br />Send proof of transfer to ...
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm mb-2">Team Code for Reference:</p>
              <div className="bg-[#658b5b] text-white text-lg font-bold py-2 px-5 rounded shadow-sm">
                {teamCode}
              </div>
            </div>
          </div>

          {/* Team Information Section */}
          <div>
            <div className="bg-[#eae0d2] border border-[#c2ae95] rounded-md p-6 h-full">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#c2ae95]">
                <Users size={20} className="text-[#4a3f35]" />
                <h3 className="text-lg font-bold text-[#4a3f35]">Team Information</h3>
              </div>
              <div className="space-y-5 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Team Name:</p>
                  <p className="font-semibold text-base text-[#4a3f35]">{teamName}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Team Code:</p>
                  <p className="font-semibold text-base text-[#4a3f35]">{teamCode}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Total Members:</p>
                  <p className="font-semibold text-base text-[#4a3f35]">{allMembers.length} Player(s)</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Team Members List */}
        <div className="p-6 bg-[#d8c3a5]">
          <div className="flex items-center gap-3 mb-4">
            <Users size={20} className="text-[#4a3f35]" />
            <h3 className="text-lg font-bold text-[#4a3f35]">Team Members</h3>
          </div>

          <div className="flex flex-wrap gap-5">
            {allMembers.map((member) => {
              // Ensure we check against the email property when determining if this card is the leader
              const isLeaderCard = member.email === teamLeader.email;
              return (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  isLeaderCard={isLeaderCard}
                  canDelete={isCurrentUserLeader && !isLeaderCard}
                  onDelete={() => setMemberToDelete(member)}
                />
              )
            })}
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {memberToDelete && !notification && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#eae0d2] border-2 border-[#4a3f35] rounded-lg shadow-[4px_4px_0px_#4a3f35] max-w-sm w-full p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-4 text-[#4a3f35]">
              <AlertCircle size={28} className="text-red-600" />
              <h3 className="text-xl font-bold">Kick Member?</h3>
            </div>

            <p className="text-base mb-6 text-[#4a3f35]">
              Are you sure you want to kick <strong>{memberToDelete.fullName}</strong> from the team? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-auto">
              <button
                onClick={() => setMemberToDelete(null)}
                disabled={isDeleting}
                className="px-5 py-2.5 text-sm font-bold text-[#4a3f35] bg-[#dfcbb2] border-2 border-[#4a3f35] rounded hover:bg-[#d8c3a5] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 border-2 border-red-800 rounded hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                {isDeleting ? 'Kicking...' : 'Kick Member'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Notification Modal (Success / Error) */}
      {notification && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className={`bg-[#eae0d2] border-2 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.25)] max-w-sm w-full p-6 flex flex-col ${notification.type === 'success' ? 'border-green-600' : 'border-red-600'
            }`}>
            <div className={`flex items-center gap-3 mb-4 ${notification.type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
              {notification.type === 'success' ? (
                <CheckCircle2 size={28} />
              ) : (
                <AlertCircle size={28} />
              )}
              <h3 className="text-xl font-bold">
                {notification.type === 'success' ? 'Success' : 'Action Failed'}
              </h3>
            </div>

            <p className="text-base mb-6 text-[#4a3f35]">
              {notification.message}
            </p>

            <div className="flex justify-end mt-auto">
              <button
                onClick={handleCloseNotification}
                className={`px-5 py-2.5 text-sm font-bold text-white border-2 rounded transition-colors ${notification.type === 'success'
                  ? 'bg-green-600 border-green-800 hover:bg-green-700'
                  : 'bg-red-600 border-red-800 hover:bg-red-700'
                  }`}
              >
                {notification.type === 'success' ? 'Okay' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Reusable Sub-components */
interface TimerBoxProps {
  value: number;
  label: string;
}

const TimerBox: React.FC<TimerBoxProps> = ({ value, label }) => (
  <div className="bg-[#2a3040] text-white rounded w-16 h-20 flex flex-col items-center justify-center shadow-md">
    <span className="text-xl font-bold">{value.toString().padStart(2, '0')}</span>
    <span className="text-xs mt-1">{label}</span>
  </div>
);

interface TeamMemberCardProps {
  member: TeamMember;
  isLeaderCard: boolean;
  canDelete: boolean;
  onDelete: () => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, isLeaderCard, canDelete, onDelete }) => (
  <div className="bg-[#ede4d5] border border-[#c2ae95] rounded-md p-3 flex items-center justify-between min-w-[260px] shadow-sm flex-1 md:flex-none relative group">
    <div className="flex items-center gap-4 overflow-hidden">
      <div className="w-10 h-10 bg-[#2a4332] text-white rounded flex items-center justify-center text-base font-bold shrink-0">
        {member.fullName.charAt(0).toUpperCase()}
      </div>
      <div className="flex flex-col truncate pr-2">
        <span className="text-sm font-bold text-[#4a3f35] truncate">{member.fullName}</span>
        {isLeaderCard && (
          <span className="text-[11px] text-[#658b5b] font-bold uppercase mt-0.5">Team Leader</span>
        )}
      </div>
    </div>

    {canDelete && (
      <button
        onClick={onDelete}
        title="Kick Member"
        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-full transition-colors shrink-0"
      >
        <X size={20} strokeWidth={3} />
      </button>
    )}
  </div>
);

export default CompetitionCard;