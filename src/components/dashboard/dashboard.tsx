import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  UserSquare2, 
  GraduationCap, 
  Trophy, 
  Edit,
  Building2
} from 'lucide-react';
import CompetitionCard from './competitionCard';

interface Team {
  id: string;
  [key: string]: any; 
}

interface User {
  id: string;
  userType: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  nim?: string;
  major?: string;
  school?: string;
}

export default function DashboardComp() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiZXhwIjoxNzg2NjMxNjc3LCJpYXQiOjE3ODQwMzk2NzcsInN1YiI6Ijk5N2I0MTFiLTZjMDAtNGVmNy04NzczLTlkYWQ2ZmMwYWRhZSJ9.unzPB_F4Hp0bpGwzRQh-ji7-jdb17aEGr8Nwrf3ezsY';
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        // Fetch both user and teams concurrently
        const [userResponse, teamsResponse] = await Promise.all([
          fetch('http://localhost:8080/api/protected/get-current-user', { method: 'GET', headers }),
          fetch('http://localhost:8080/api/protected/get-teams', { method: 'GET', headers })
        ]);
        
        if (!userResponse.ok) throw new Error(`User fetch failed: ${userResponse.status}`);
        if (!teamsResponse.ok) throw new Error(`Teams fetch failed: ${teamsResponse.status}`);
        
        const userData = await userResponse.json();
        const teamsData = await teamsResponse.json();
        
        setUser(userData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f4efe5] p-4 md:p-8 font-sans text-[#3c2f25]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 mt-[5%]">
        
        {/* Left Column: Profile Card */}
        <div className="w-full lg:w-1/3 xl:w-1/4">
          <div className="bg-[#dfcbb2] border-4 border-[#4a3f35] rounded-lg shadow-[6px_6px_0px_#4a3f35] p-6 flex flex-col items-center">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="font-medium text-[#4a3f35]">Loading Profile...</p>
              </div>
            ) : user ? (
              <>
                {/* Avatar (Initials) */}
                <div className="w-20 h-20 bg-[#f97316] text-white flex items-center justify-center text-4xl rounded-md font-medium mb-4 uppercase">
                  {user.fullName.charAt(0)}
                </div>
                
                {/* Name & Conditional Email */}
                <h2 className="text-xl font-bold text-center leading-tight mb-1">
                  {user.fullName}
                </h2>
                
                {(user.userType === 'Binusian' || user.userType === 'SMA/SMK') && (
                  <p className="text-sm text-gray-600 mb-3 text-center">
                    {user.email}
                  </p>
                )}
                
                {/* Badge */}
                <div className="bg-[#2563eb] text-white text-xs font-semibold px-4 py-1 rounded-full mb-8">
                  {user.userType}
                </div>
                
                {/* Details List */}
                <div className="w-full space-y-4 mb-8 text-sm font-medium">
                  {/* Phone is shown for all users */}
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-[#4a3f35]" />
                    <span>{user.phoneNumber}</span>
                  </div>
                  
                  {/* Binusian Specific Details */}
                  {user.userType === 'Binusian' && (
                    <>
                      <div className="flex items-center gap-3">
                        <UserSquare2 size={18} className="text-[#4a3f35]" />
                        <span>NIM: {user.nim}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <GraduationCap size={18} className="text-[#4a3f35]" />
                        <span>{user.major}</span>
                      </div>
                    </>
                  )}

                  {/* SMA/SMK Specific Details */}
                  {user.userType === 'SMA/SMK' && (
                    <div className="flex items-center gap-3">
                      <Building2 size={18} className="text-[#4a3f35]" />
                      <span>{user.school}</span>
                    </div>
                  )}

                  {/* Competitions Count */}
                  <div className="flex items-center gap-3">
                    <Trophy size={18} className="text-[#4a3f35]" />
                    <span>{teams.length} Competitions</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <p className="font-medium text-red-600">Failed to load profile.</p>
              </div>
            )}
            
            <button className="w-full bg-[#2a4332] hover:bg-[#1f3225] text-white py-3 rounded-md flex items-center justify-center gap-2 font-medium transition-colors border-2 border-[#1f3225] mt-auto">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right Column: Competitions or Empty State */}
        <div className="w-full lg:w-2/3 xl:w-3/4">
          {loading ? (
            <p className="text-lg font-medium text-[#5c4a3d]">Loading competitions...</p>
          ) : teams.length === 0 ? (
            /* Empty State Layout */
            <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
              <img 
                src="/fox-empty-state.png" 
                alt="Confused Fox" 
                className="w-48 md:w-64 h-auto object-contain mb-6" 
              />
              <p className="text-lg font-medium text-[#3c2f25]">
                You have no competition yet!{' '}
                <a 
                  href="/competitions" 
                  className="text-[#ea580c] underline hover:text-orange-700 transition-colors font-semibold"
                >
                  Register Now!
                </a>
              </p>
            </div>
          ) : (
            /* Populated Competitions Layout */
            <>
              <h1 className="text-lg font-bold mb-4 text-[#5c4a3d]">
                My Competitions ({teams.length})
              </h1>
              <div className="space-y-8">
                {teams.map((team) => (
                  <CompetitionCard key={team.id} team={team as any} />
                ))}
              </div>
            </>
          )}
        </div>
        
      </div>
    </div>
  );
}