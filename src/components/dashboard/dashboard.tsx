import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Phone,
  UserSquare2,
  GraduationCap,
  Trophy,
  Edit,
  Building2,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import CompetitionCard from './competitionCard';
import API_URL from '../../lib/api';

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

// --- EDIT PROFILE MODAL COMPONENT ---
interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
  onStatus: (type: 'success' | 'error', message: string) => void;
}

const EditProfileModal = ({ user, onClose, onSuccess, onStatus }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    category: '',
    fullName: '',
    nim: '',
    major: '',
    school: '',
    phoneNumber: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    // Map existing user data to form data format
    let mappedCategory = '';
    const userTypeLower = user.userType?.toLowerCase() || '';

    if (userTypeLower === 'binusian') {
      mappedCategory = 'binusian';
    } else if (userTypeLower === 'sma' || userTypeLower === 'sma / smk' || userTypeLower === 'sma/smk') {
      mappedCategory = 'sma';
    } else if (userTypeLower === 'public') {
      mappedCategory = 'public';
    }

    setFormData({
      category: mappedCategory,
      fullName: user.fullName || '',
      nim: user.nim || '',
      major: user.major || '',
      school: user.school || '',
      phoneNumber: user.phoneNumber || ''
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    const currentCategory = formData.category.trim().toLowerCase();

    // 1. Validation Checks
    if (!currentCategory) {
      setErrorMessage('Please select a Category Status.');
      return;
    }
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setErrorMessage('Phone Number is required.');
      return;
    }

    // Conditional Validation based on category
    if (currentCategory === 'binusian') {
      if (!formData.nim.trim() || !formData.major.trim()) {
        setErrorMessage('NIM and Major are required for Binusian.');
        return;
      }
    } else if (currentCategory === 'sma') {
      if (!formData.school.trim()) {
        setErrorMessage('School is required for SMA / SMK.');
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('No authorization token found. Please log in.');
        setIsSubmitting(false);
        return;
      }

      let formattedUserType = '';
      if (currentCategory === 'binusian') {
        formattedUserType = 'Binusian';
      } else if (currentCategory === 'sma') {
        formattedUserType = 'SMA/SMK';
      } else if (currentCategory === 'public') {
        formattedUserType = 'Public';
      }

      const payload = {
        userType: formattedUserType,
        fullName: formData.fullName.trim() ? formData.fullName.trim() : null,
        phoneNumber: formData.phoneNumber.trim() ? formData.phoneNumber.trim() : null,
        nim: (currentCategory === 'binusian' && formData.nim.trim()) ? formData.nim.trim() : null,
        major: (currentCategory === 'binusian' && formData.major.trim()) ? formData.major.trim() : null,
        school: (currentCategory === 'sma' && formData.school.trim()) ? formData.school.trim() : null
      };

      const response = await fetch(`${API_URL}/api/protected/create-update-user-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        onStatus('success', 'Profile updated successfully!');
        onSuccess();
      } else {
        const errorData = await response.json();
        const errorText = `Failed to update profile: ${errorData.error || response.statusText}`;
        setErrorMessage(errorText);
        onStatus('error', errorText);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      const catchError = 'An unexpected error occurred. Please try again.';
      setErrorMessage(catchError);
      onStatus('error', catchError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      {/* Form Container */}
      <div className="bg-[#fbf7f0] border border-[#b45309] rounded-xl p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Form Header */}
        <div className="mb-2 mt-2">
          <h2 className="text-2xl md:text-3xl font-black text-[#3f271d] tracking-wide">
            Edit Profile
          </h2>
        </div>

        <p className="text-[#3f271d] font-medium mb-4">
          Update your personal information below
        </p>

        <hr className="border-[#8C4A15] mb-6" />

        {/* Inline Error Banner (Validation) */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-semibold">{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5 relative">

          {/* Category Dropdown */}
          <div className="relative">
            <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
              Category Status
            </label>
            <div className="relative">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full appearance-none bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
              >
                <option value="" disabled>Select your status</option>
                <option value="binusian">Binusian</option>
                <option value="sma">SMA / SMK</option>
                <option value="public">Public</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-black pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div>
              <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
              />
            </div>

            {/* School */}
            {formData.category?.trim().toLowerCase() === 'sma' && (
              <div>
                <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                  School
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Enter your school name"
                  className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
                />
              </div>
            )}

            {/* NIM */}
            {formData.category?.trim().toLowerCase() === 'binusian' && (
              <div>
                <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                  NIM
                </label>
                <input
                  type="text"
                  name="nim"
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="Enter your NIM"
                  className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
                />
              </div>
            )}

            {/* Major */}
            {formData.category?.trim().toLowerCase() === 'binusian' && (
              <div>
                <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                  Major (Binusian)
                </label>
                <div className="relative">
                  <select
                    name="major"
                    value={[
                      "Creative Communication",
                      "Computer Science - Software Engineering",
                      "Management",
                      "Business Management",
                      "Psychology",
                      "Business Hotel Management",
                      "Accounting",
                      "Business Information Technology",
                      "Digital Business Innovation"
                    ].includes(formData.major) ? formData.major : ""}
                    onChange={handleChange}
                    className="w-full appearance-none bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
                  >
                    <option value="" disabled>Select your major</option>
                    <option value="Creative Communication">Creative Communication</option>
                    <option value="Computer Science - Software Engineering">Computer Science - Software Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Business Management">Business Management</option>
                    <option value="Psychology">Psychology</option>
                    <option value="Business Hotel Management">Business Hotel Management</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Business Information Technology">Business Information Technology</option>
                    <option value="Digital Business Innovation">Digital Business Innovation</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-black pointer-events-none" />
                </div>
              </div>
            )}

            {/* Phone Number */}
            <div>
              <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full text-white font-bold text-lg py-3 rounded-lg mt-4 transition-colors duration-200 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#a14714] hover:bg-[#85390f]'
              }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>

        </form>
      </div>
    </div>
  );
};


// --- DASHBOARD COMPONENT ---
export default function DashboardComp() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Notification State
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Helper to trigger notification popup
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    // Automatically hide after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      const [userResponse, teamsResponse] = await Promise.all([
        fetch(`${API_URL}/api/protected/get-current-user`, { method: 'GET', headers }),
        fetch(`${API_URL}/api/protected/get-teams`, { method: 'GET', headers })
      ]);

      if (userResponse.status === 401 || teamsResponse.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
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
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleEditSuccess = () => {
    setIsEditModalOpen(false);
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen bg-[#f4efe5] p-4 md:p-8 font-sans text-[#3c2f25] relative">

      {/* Toast Notification Popup (Centered) */}
      {notification && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-4 rounded-lg shadow-xl text-white font-medium transition-all duration-300 opacity-100 ${notification.type === 'success' ? 'bg-[#16a34a] border border-[#14532d]' : 'bg-[#dc2626] border border-[#7f1d1d]'
            }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-white" />
          ) : (
            <AlertCircle className="w-6 h-6 text-white" />
          )}
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Modal Popup overlay */}
      {isEditModalOpen && user && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={handleEditSuccess}
          onStatus={showNotification}
        />
      )}

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
                <div className="w-20 h-20 bg-[#f97316] text-white flex items-center justify-center text-4xl rounded-md font-medium mb-4 uppercase">
                  {user.fullName ? user.fullName.charAt(0) : user.email.charAt(0)}
                </div>

                {user.fullName && (
                  <h2 className="text-xl font-bold text-center leading-tight mb-1">
                    {user.fullName}
                  </h2>
                )}

                <p className="text-sm text-gray-600 mb-3 text-center">
                  {user.email}
                </p>

                {user.userType && (
                  <div className="bg-[#2563eb] text-white text-xs font-semibold px-4 py-1 rounded-full mb-8">
                    {user.userType}
                  </div>
                )}

                <div className="w-full space-y-4 mb-8 text-sm font-medium">
                  {user.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-[#4a3f35]" />
                      <span>{user.phoneNumber}</span>
                    </div>
                  )}

                  {user.userType === 'Binusian' && (
                    <>
                      {user.nim && (
                        <div className="flex items-center gap-3">
                          <UserSquare2 size={18} className="text-[#4a3f35]" />
                          <span>NIM: {user.nim}</span>
                        </div>
                      )}
                      {user.major && (
                        <div className="flex items-center gap-3">
                          <GraduationCap size={18} className="text-[#4a3f35]" />
                          <span>{user.major}</span>
                        </div>
                      )}
                    </>
                  )}

                  {user.userType === 'SMA/SMK' && user.school && (
                    <div className="flex items-center gap-3">
                      <Building2 size={18} className="text-[#4a3f35]" />
                      <span>{user.school}</span>
                    </div>
                  )}

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

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-full bg-[#2a4332] hover:bg-[#1f3225] text-white py-3 rounded-md flex items-center justify-center gap-2 font-medium transition-colors border-2 border-[#1f3225] mt-auto"
            >
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
            <div className="flex flex-col items-center justify-center h-full min-h-[500px]">
              <img
                src="/assets/mascot-register.png"
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