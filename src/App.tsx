import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import CompetitionDetailPage from "./pages/CompetitionDetailPage";
import AuthSuccess from "./pages/AuthSuccess";
import RegistrationForm from "./pages/RegisterCompetition";
import TeamManagement from "./pages/TeamManagement";
import AdminPage from "./pages/admin/AdminPage";
// Competition Category Pages
import SportCompetitionPage from "./pages/competitions/SportCompetitionPage";
import ESportCompetitionPage from "./pages/competitions/ESportCompetitionPage";
import CreativeCompetitionPage from "./pages/competitions/CreativeCompetitionPage";

// Placeholder competition ID — replace each with the real ID from DB
const PLACEHOLDER_ID = "d6a407f1-624e-4a43-8efb-987292f2e89e";

const COMPETITION_IDS: Record<string, string> = {
  // Sport
  futsal:          "d61510fe-df70-4d91-af46-84f1cc058c42",
  basketball:      "9df0db8e-03cb-4d0c-b78d-29ff4e70d237",
  volly:           "bd21d262-4aee-4834-8340-14726b7ef450",
  pingpong:        "3ae28bc7-000b-4226-9c65-5695fa92b624",
  billiard:        "91cf138b-bb23-4ef2-9537-2936349b0238",
  chess:          "0f94c459-1aee-49e8-8016-d50e0c97c7d6",
  // E-Sport
  fifa:            "4ffb0194-e79c-4959-99b4-9b416e261998",
  "mobile-legend": "c576e9b8-881b-4af9-8594-b223c8bef9c2",
  valorant:        "734fdd1f-94e1-48f6-8ed4-52fa03b5aa33",
  "nba-2k":        "d569be43-c315-478b-a736-62a70e84a30a",
  "pubg-mobile":   "c1265c54-6757-4143-8428-11a880b302fb",
  // Creative
  "modern-dance":      "5a34db87-15fd-4da2-9a5d-c8e62b9aefd2",
  "traditional-dance": "f1f4a132-21e7-4647-a2f0-06058a75e55f",
  cosplay:             "9f7fdf20-82fa-428d-92fa-68ed3d0273ab",
  "cookie-decoration":   "39510eb5-03d8-470a-a555-4382ab6a0ed5",
  band:                "592996d6-cbbb-41d2-99f4-b0a3f5c24924",
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/competitions/sport" element={<SportCompetitionPage />} />
        <Route path="/competitions/esport" element={<ESportCompetitionPage />} />
        <Route path="/competitions/creative" element={<CreativeCompetitionPage />} />
        <Route path="/competition" element={<CompetitionDetailPage id={PLACEHOLDER_ID} />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Sport sub-competitions */}
        <Route path="/competitions/futsal"      element={<CompetitionDetailPage id={COMPETITION_IDS["futsal"]} />} />
        <Route path="/competitions/basketball"  element={<CompetitionDetailPage id={COMPETITION_IDS["basketball"]} />} />
        <Route path="/competitions/volleyball"       element={<CompetitionDetailPage id={COMPETITION_IDS["volly"]} />} />
        <Route path="/competitions/pingpong"    element={<CompetitionDetailPage id={COMPETITION_IDS["pingpong"]} />} />
        <Route path="/competitions/billiard"    element={<CompetitionDetailPage id={COMPETITION_IDS["billiard"]} />} />
        <Route path="/competitions/chess"       element={<CompetitionDetailPage id={COMPETITION_IDS["chess"]} />} />

        {/* E-Sport sub-competitions */}
        <Route path="/competitions/fifa"          element={<CompetitionDetailPage id={COMPETITION_IDS["fifa"]} />} />
        <Route path="/competitions/mobile-legend" element={<CompetitionDetailPage id={COMPETITION_IDS["mobile-legend"]} />} />
        <Route path="/competitions/valorant"      element={<CompetitionDetailPage id={COMPETITION_IDS["valorant"]} />} />
        <Route path="/competitions/nba-2k"        element={<CompetitionDetailPage id={COMPETITION_IDS["nba-2k"]} />} />
        <Route path="/competitions/pubg-mobile"   element={<CompetitionDetailPage id={COMPETITION_IDS["pubg-mobile"]} />} />

        {/* Creative sub-competitions */}
        <Route path="/competitions/modern-dance"      element={<CompetitionDetailPage id={COMPETITION_IDS["modern-dance"]} />} />
        <Route path="/competitions/tari-kreasi-daerah" element={<CompetitionDetailPage id={COMPETITION_IDS["traditional-dance"]} />} />
        <Route path="/competitions/cosplay"           element={<CompetitionDetailPage id={COMPETITION_IDS["cosplay"]} />} />
        <Route path="/competitions/cookie-decoration"   element={<CompetitionDetailPage id={COMPETITION_IDS["cookie-decoration"]} />} />
        <Route path="/competitions/band"              element={<CompetitionDetailPage id={COMPETITION_IDS["band"]} />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/register-competition" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
        <Route path="/register/:id" element={<ProtectedRoute><RegistrationForm /></ProtectedRoute>} />
        <Route path="/register-team" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
        <Route path="/register-team/:id" element={<ProtectedRoute><TeamManagement /></ProtectedRoute>} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Catch-all — redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
