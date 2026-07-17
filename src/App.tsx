import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

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

// Competition Category Pages
import SportCompetitionPage from "./pages/competitions/SportCompetitionPage";
import ESportCompetitionPage from "./pages/competitions/ESportCompetitionPage";
import CreativeCompetitionPage from "./pages/competitions/CreativeCompetitionPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/competitions/sport" element={<SportCompetitionPage />} />
        <Route path="/competitions/esport" element={<ESportCompetitionPage />} />
        <Route path="/competitions/creative" element={<CreativeCompetitionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/competition" element={<CompetitionDetailPage id="2c8cadd2-edec-4fb6-a17b-148e185a48ed" />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/register-competition" element={<RegistrationForm />} />
        <Route path="/register-team" element={<TeamManagement competitionId="2c8cadd2-edec-4fb6-a17b-148e185a48ed" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
