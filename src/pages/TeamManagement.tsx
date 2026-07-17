import React, { useState, useEffect } from 'react';
import { Search, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TeamManagementProps {
  competitionId: string;
}

interface CompetitionDetails {
  name: string;
  minMembers: number;
  maxMembers: number;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ competitionId }) => {
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
        backgroundImage: `url('/path/to/your/image_3939b2.png')`,
        backgroundColor: '#f3ece1'
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col items-center justify-center pt-8 pb-6 px-6 border-b border-gray-200">
          <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-xs font-semibold mb-4">
            Step 3 of 3
          </span>
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">
            Join or Create Team
          </h1>
          <p className="text-gray-500">
            Set up your team for the competition
          </p>
        </div>

        {/* --- Tabs Section --- */}
        <div className="flex w-full border-b border-gray-200">
          <button
            onClick={() => handleTabSwitch('join')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'join' 
                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <Search className="w-4 h-4" />
            Join a Team
          </button>
          
          <button
            onClick={() => handleTabSwitch('create')}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === 'create' 
                ? 'text-blue-600 bg-blue-50/50 border-b-2 border-blue-500' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <Plus className="w-4 h-4" />
            Create Team
          </button>
        </div>

        {/* --- Content Area --- */}
        <div className="p-8">
          
          {/* Status Messages */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center gap-3 max-w-2xl mx-auto">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          )}

          {/* JOIN TEAM VIEW */}
          {activeTab === 'join' && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Join an Existing Team</h2>
              <p className="text-gray-500 mb-8 text-center">
                Have a team code? Enter it below to join a team directly.
              </p>

              <div className="w-full bg-[#f4f8fc] border border-[#d6e4f5] rounded-xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-[#1e3a8a] font-semibold mb-2">
                  <Search className="w-5 h-5" />
                  <h3>Join with Team Code</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Have a team code? Enter it below to join directly.
                </p>

                <form onSubmit={handleJoinTeam} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={teamCode}
                    onChange={(e) => {
                      setTeamCode(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Enter team code (e.g., TB2025, CK2025)"
                    className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700 uppercase" // Added uppercase styling just as a nice touch
                  />
                  <button 
                    type="submit"
                    className="bg-[#759df1] hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Join Team
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* CREATE TEAM VIEW */}
          {activeTab === 'create' && (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Create Your Own Team</h2>
              <p className="text-gray-500 mb-8 text-center">
                Start your own team and invite other players to join
              </p>

              <div className="w-full border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-gray-900 font-bold mb-1">
                  <Plus className="w-5 h-5" />
                  <h3>Team Details</h3>
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  Provide information about your new team
                </p>

                <form onSubmit={handleCreateTeam} className="space-y-5">
                  {/* Team Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
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
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800"
                    />
                  </div>

                  {/* Competition Name (Read-Only Dynamic) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Competition Name
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={compDetails ? compDetails.name : 'Loading...'}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>

                  {/* Maximum Team Size (Read-Only Dynamic) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Maximum Team Size
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={compDetails ? compDetails.maxMembers : '...'}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-gray-500 text-xs mt-2">
                      Competition rules require {compDetails ? `${compDetails.minMembers}-${compDetails.maxMembers}` : '...'} players per team
                    </p>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-[#759df1] hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors mt-6"
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