import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserCheck, Users, ChevronDown, AlertCircle } from 'lucide-react';
import API_URL from '../lib/api';

interface FormData {
  category: string;
  fullName: string;
  nim: string;
  major: string;
  school: string;
  phoneNumber: string;
}

const RegistrationForm: React.FC = () => {
  const { id: competitionId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    category: '',
    fullName: '',
    nim: '',
    major: '',
    school: '',
    phoneNumber: ''
  });

  // State to hold validation error messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // New state to lock the category if the backend provides it
  const [isCategoryLocked, setIsCategoryLocked] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const headers: HeadersInit = {
          'Content-Type': 'application/json'
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/api/protected/get-current-user`, {
          method: 'GET',
          headers: headers
        });

        if (response.ok) {
          const data = await response.json();

          let mappedCategory = '';
          const userTypeLower = data.userType?.toLowerCase();

          if (userTypeLower === 'binusian') {
            mappedCategory = 'binusian';
          } else if (userTypeLower === 'sma' || userTypeLower === 'sma/smk') {
            mappedCategory = 'sma';
          } else if (userTypeLower === 'public') {
            mappedCategory = 'public';
          }

          // If a mapped category was found from the backend, lock the dropdown
          if (mappedCategory) {
            setIsCategoryLocked(true);
          }

          setFormData({
            category: mappedCategory || '',
            fullName: data.fullName || '',
            nim: data.nim || '',
            major: data.major || '',
            school: data.school || '',
            phoneNumber: data.phoneNumber || ''
          });
        } else {
          console.error('Failed to fetch user data. Status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Optional: Prevent typing letters in NIM field right away
    if (name === 'nim' && value && !/^\d*$/.test(value)) {
      return; 
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear the error message when the user starts typing again
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(''); // Reset errors on new submission attempt

    const currentCategory = formData.category.trim().toLowerCase();
    const phoneTrimmed = formData.phoneNumber.trim();

    // 1. Base Validation Checks
    if (!currentCategory) {
      setErrorMessage('Please select a Category Status.');
      return;
    }
    if (!formData.fullName.trim()) {
      setErrorMessage('Full Name is required.');
      return;
    }
    if (!phoneTrimmed) {
      setErrorMessage('Phone Number is required.');
      return;
    }

    // 2. Phone Number Validation (10 to 15 digits, allows optional '+' at the start)
    // Strip spaces or dashes in case user formatted it like "0812-3456-7890"
    const cleanedPhone = phoneTrimmed.replace(/[\s-]/g, ''); 
    const phoneRegex = /^\+?\d{10,15}$/;
    
    if (!phoneRegex.test(cleanedPhone)) {
      setErrorMessage('Please enter a valid phone number (between 10 and 15 digits).');
      return;
    }

    // 3. Conditional Validation based on category
    if (currentCategory === 'binusian') {
      const nimTrimmed = formData.nim.trim();
      
      if (!nimTrimmed || !formData.major.trim()) {
        setErrorMessage('NIM and Major are required for Binusian.');
        return;
      }
      
      // NIM Validation: Exactly 10 characters and only numbers
      const nimRegex = /^\d{10}$/;
      if (!nimRegex.test(nimTrimmed)) {
        setErrorMessage('NIM must be exactly 10 digits long and contain only numbers.');
        return;
      }

    } else if (currentCategory === 'sma') {
      if (!formData.school.trim()) {
        setErrorMessage('School is required for SMA / SMK.');
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setErrorMessage('No authorization token found. Please log in.');
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
        phoneNumber: cleanedPhone, // Send the cleaned version to backend
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
        const data = await response.json();
        console.log('Profile successfully updated:', data);
        // Navigate to team management with the competition ID
        navigate(`/register-team/${competitionId}`);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to update profile: ${errorData.error || response.statusText}`);
      }

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
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
          <div className="w-12 h-12 bg-[#a14714] rounded-full flex items-center justify-center border-2 border-[#3f271d] shadow-sm relative">
            <UserCheck className="text-white w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-black text-center">Complete Profile</span>
        </div>

        <div className="w-24 h-[2px] bg-gray-300 -mt-6"></div>

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="w-12 h-12 bg-[#a14714] rounded-full flex items-center justify-center shadow-sm">
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
            Personal Information
          </h2>
          <span className="bg-[#d1d5db] text-[#374151] px-3 py-1 rounded-md text-sm font-semibold">
            Step 1 of 2
          </span>
        </div>

        <p className="text-[#3f271d] font-medium mb-4">
          Complete your personal information to continue
        </p>

        <hr className="border-[#8C4A15] mb-6" />

        {/* Error Banner */}
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
                disabled={isCategoryLocked}
                className={`w-full appearance-none border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309] transition-colors ${
                  isCategoryLocked 
                    ? 'bg-gray-200 cursor-not-allowed opacity-80' 
                    : 'bg-[#f4f5f7]'
                }`}
              >
                <option value="" disabled>Select your status</option>
                <option value="binusian">Binusian</option>
                <option value="sma">SMA / SMK</option>
                <option value="public">Public</option>
              </select>
              {!isCategoryLocked && (
                <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-black pointer-events-none" />
              )}
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

            {/* School - ONLY SHOWS FOR SMA / SMK */}
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
                <div className="mt-2 text-xs text-[#a14714] bg-[#fbf7f0] flex items-start gap-1.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Important:</strong> You and your teammates must enter the 
                    <em> exact same school name and spelling</em> (e.g., "SMAN 1 Jakarta") to join the same team.
                  </p>
                </div>
              </div>
            )}

            {/* NIM - ONLY SHOWS FOR BINUSIAN */}
            {formData.category?.trim().toLowerCase() === 'binusian' && (
              <div>
                <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                  NIM
                </label>
                <input
                  type="text" // Kept as text to allow leading zeros without browser weirdness
                  name="nim"
                  maxLength={10} // HTML level cap
                  value={formData.nim}
                  onChange={handleChange}
                  placeholder="Enter your NIM (10 digits)"
                  className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
                />
              </div>
            )}

            {/* Major - ONLY SHOWS FOR BINUSIAN */}
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
                      "Digital Business Innovation",
                      "Minor at Bekasi (Culinary)",
                      "Minor at Bekasi (Korean)",
                      "Minor at Bekasi (Free Elective)"
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
                    <option value="Minor at Bekasi (Culinary)">Minor at Bekasi (Culinary)</option>
                    <option value="Minor at Bekasi (Korean)">Minor at Bekasi (Korean)</option>
                    <option value="Minor at Bekasi (Free Elective)">Minor at Bekasi (Free Elective)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 w-5 h-5 text-black pointer-events-none" />
                </div>
              </div>
            )}

            {/* Phone Number - ALWAYS SHOWS */}
            <div>
              <label className="block text-[#5c3a21] font-bold mb-1.5 text-sm">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                maxLength={20} // Generous limit in HTML just in case they add spaces/dashes
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 0812345678"
                className="w-full bg-[#f4f5f7] border border-gray-300 text-gray-700 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#b45309]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#a14714] hover:bg-[#85390f] text-white font-bold text-lg py-3 rounded-lg mt-4 transition-colors duration-200"
          >
            Proceed
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;