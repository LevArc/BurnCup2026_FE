import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Plus, AlertCircle, CheckCircle2, UserCheck, Users } from 'lucide-react';

interface TeamManagementProps {
  competitionId?: string;
}

interface CompetitionDetails {
  name: string;
  minMembers: number;
  maxMembers: number;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ competitionId: propId }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const competitionId = propId ?? paramId ?? '';
  const [activeTab, setActiveTab] = useState<'join' | 'create'>('join');
  const [teamCode, setTeamCode] = useState('');
  const [teamName, setTeamName] = useState('');
  
  const [compDetails, setCompDetails] = useState<CompetitionDetails | null>(null);

  // States for handling feedback messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch competition details on mount
  useEffect(() => {
    const fetchCompetitionDetails = async () => {
      if (!competitionId) return;

      try {
        const response = await fetch(`http://localhost:8080/api/competitions/${competitionId}`);
        if (response.ok) {
          const data = await response.json();
          setCompDetails({
            name: data.name,
            minMembers: data.minMembers,
            maxMembers: data.maxMembers,
          });
        } else {
          console.error('Failed to fetch competition details. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching competition details:', error);
      }
    };

    fetchCompetitionDetails();
  }, [competitionId]);

  // Updated handleJoinTeam to hit the backend
  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!teamCode.trim()) {
      setErrorMessage('Please enter a team code.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('No authorization token found. Please log in.');
        return;
      }

      // Format payload based on your Go struct
      const payload = {
        teamCode: teamCode.trim(),
        competitionId: competitionId
      };

      const response = await fetch('http://localhost:8080/api/protected/join-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message || 'Successfully joined the team!');
        console.log('Joined team:', data);
        setTeamCode(''); // Clear input on success
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to join team: ${errorData.error || response.statusText}`);
      }
      
    } catch (error) {
      console.error('Error joining team:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!teamName.trim()) {
      setErrorMessage('Please enter a team name.');
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setErrorMessage('No authorization token found. Please log in.');
        return;
      }

      const payload = {
        competitionId: competitionId,
        teamName: teamName.trim()
      };

      const response = await fetch('http://localhost:8080/api/protected/create-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Team created successfully!');
        console.log('Team created:', data);
        
        setTeamName('');
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to create team: ${errorData.error || response.statusText}`);
      }
      
    } catch (error) {
      console.error('Error creating team:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  };

  const handleTabSwitch = (tab: 'join' | 'create') => {
    setActiveTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div 
      className="min-h-screen w-full flex flex-col items-center justify-center py-10 px-4 bg-cover bg-bottom font-sans"
      style={{ 
        backgroundImage: `url('/assets/register-competition-bg.png')`,
        backgroundColor: '#f3ece1'
      }}
    >
      {/* --- Progress Indicator --- */}
      <div className="flex items-center gap-4 mb-8 z-10">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-[#a14714] rounded-full flex items-center justify-center shadow-sm relative">
            <UserCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-black text-center">Complete Profile</span>
        </div>

        <div className="w-24 h-[2px] bg-[#a14714] -mt-6"></div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-[#a14714] rounded-full flex items-center justify-center border-2 border-[#3f271d] shadow-sm relative">
            <Users className="text-white w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-black text-center">Join or Create Team</span>
        </div>
      </div>

      {/* --- Form Container --- */}
      <div className="bg-[#fbf7f0] border border-[#b45309] rounded-xl p-8 max-w-2xl w-full shadow-2xl z-10 relative">
        
        {/* Form Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl md:text-3xl font-black text-[#3f271d] tracking-wide">
            Join or Create Team
          </h2>
          <span className="bg-[#d1d5db] text-[#374151] px-3 py-1 rounded-md text-sm font-semibold">
            Step 2 of 2
          </span>
        </div>
        
        <p className="text-[#3f271d] font-medium mb-4">
          Set up your team for the competition
        </p>
        
        <hr className="border-[#8C4A15] mb-6" />

        {/* --- Tabs Section --- */}
        <div className="flex w-full border-b border-[#8C4A15]/30 mb-8">
          <button
            onClick={() => handleTabSwitch('join')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors duration-200 ${
              activeTab === 'join' 
                ? 'text-[#b45309] border-b-2 border-[#b45309] bg-[#f4f5f7]/50' 
                : 'text-[#5c3a21] hover:bg-[#f4f5f7] hover:text-[#3f271d]'
            }`}
          >
            <Search className="w-4 h-4" />
            Join a Team
          </button>
          
          <button
            onClick={() => handleTabSwitch('create')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold transition-colors duration-200 ${
              activeTab === 'create' 
                ? 'text-[#b45309] border-b-2 border-[#b45309] bg-[#f4f5f7]/50' 
                : 'text-[#5c3a21] hover:bg-[#f4f5f7] hover:text-[#3f271d]'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create Team
          </button>
        </div>

        {/* --- Content Area --- */}
        <div>
          {/* Status Messages */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-semibold">{successMessage}</span>
            </div>
          )}

          {/* JOIN TEAM VIEW */}
          {activeTab === 'join' && (
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-[#5c3a21] mb-2">Join an Existing Team</h2>
              <p className="text-[#3f271d] font-medium mb-6">
                Have a team code? Enter it below to join a team directly.
              </p>

              <div className="w-full bg-[#f4f5f7] border border-gray-300 rounded-xl p-6">
                <div className="flex items-center gap-2 text-[#5c3a21] font-bold mb-2 text-sm">
                  <Search className="w-5 h-5" />
                  <h3>Join with Team Code</h3>
                </div>

                <form onSubmit={handleJoinTeam} className="flex flex-col sm:flex-row gap-3 mt-4">
                  <input
                    type="text"
                    value={teamCode}
                    onChange={(e) => {
                      setTeamCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter team code (e.g., TB2025)"
                    className="flex-1 bg-white border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309] uppercase"
                  />
                  <button 
                    type="submit"
                    className="bg-[#a14714] hover:bg-[#85390f] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap"
                  >
                    Join Team
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CREATE TEAM VIEW */}
          {activeTab === 'create' && (
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-[#5c3a21] mb-2">Create Your Own Team</h2>
              <p className="text-[#3f271d] font-medium mb-6">
                Start your own team and invite other players to join
              </p>

              <div className="w-full bg-[#f4f5f7] border border-gray-300 rounded-xl p-6">
                <div className="flex items-center gap-2 text-[#5c3a21] font-bold mb-4 text-sm">
                  <Plus className="w-5 h-5" />
                  <h3>Team Details</h3>
                </div>

                <form onSubmit={handleCreateTeam} className="space-y-5">
                  {/* Team Name Input */}
                  <div>
                    <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => {
                        setTeamName(e.target.value);
                        setErrorMessage('');
                      }}
                      placeholder="Enter your team name"
                      className="w-full bg-white border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
                    />
                  </div>

                  {/* Competition Name (Read-Only Dynamic) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                        Competition Name
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={compDetails ? compDetails.name : 'Loading...'}
                        className="w-full bg-[#e5e7eb] border border-gray-300 text-[#374151] rounded-lg py-2.5 px-4 cursor-not-allowed"
                      />
                    </div>

                    {/* Maximum Team Size (Read-Only Dynamic) */}
                    <div>
                      <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                        Maximum Team Size
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={compDetails ? compDetails.maxMembers : '...'}
                        className="w-full bg-[#e5e7eb] border border-gray-300 text-[#374151] rounded-lg py-2.5 px-4 cursor-not-allowed"
                      />
                      <p className="text-[#5c3a21] text-xs font-semibold mt-2">
                        Rules require {compDetails ? `${compDetails.minMembers}-${compDetails.maxMembers}` : '...'} players
                      </p>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#a14714] hover:bg-[#85390f] text-white font-bold text-lg py-3 rounded-lg mt-4 transition-colors duration-200"
                    disabled={!compDetails}
                  >
                    Create Team
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default TeamManagement;