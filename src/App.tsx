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
const PLACEHOLDER_ID = "bcf7bbdb-dab9-4e3d-93e7-ced652b2c3cb";

const COMPETITION_IDS: Record<string, string> = {
  // Sport
  futsal:          PLACEHOLDER_ID,
  basketball:      PLACEHOLDER_ID,
  volly:           PLACEHOLDER_ID,
  pingpong:        PLACEHOLDER_ID,
  billiard:        PLACEHOLDER_ID,
  chess:           PLACEHOLDER_ID,
  // E-Sport
  fifa:            PLACEHOLDER_ID,
  "mobile-legend": PLACEHOLDER_ID,
  valorant:        PLACEHOLDER_ID,
  "nba-2k":        PLACEHOLDER_ID,
  "pubg-mobile":   PLACEHOLDER_ID,
  // Creative
  "modern-dance":      PLACEHOLDER_ID,
  "traditional-dance": PLACEHOLDER_ID,
  cosplay:             PLACEHOLDER_ID,
  "cake-decoration":   PLACEHOLDER_ID,
  band:                PLACEHOLDER_ID,
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
        <Route path="/competitions/volly"       element={<CompetitionDetailPage id={COMPETITION_IDS["volly"]} />} />
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
        <Route path="/competitions/traditional-dance" element={<CompetitionDetailPage id={COMPETITION_IDS["traditional-dance"]} />} />
        <Route path="/competitions/cosplay"           element={<CompetitionDetailPage id={COMPETITION_IDS["cosplay"]} />} />
        <Route path="/competitions/cake-decoration"   element={<CompetitionDetailPage id={COMPETITION_IDS["cake-decoration"]} />} />
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
