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
import FutsalCompetitionPage from "./pages/FutsalCompetitionPage";

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/competition" element={<Competition id="ee15b41f-9090-40fb-9b56-1a49558e4c17" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
