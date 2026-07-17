import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/HomePage";
import CompetitionsPage from "./components/Competitions/Competitions";
import CreativeCompetitionPage from "./pages/CreativeCompetition";
import SportCompetitionPage from "./pages/SportCompetition";
import ESportCompetitionPage from "./pages/ESportCompetition";
import LoginPage from "./components/Login/Login";
import RegisterPage from "./components/Register/Register";
import Competition from "./pages/competitions";
import Dashboard from "./pages/dashboard";
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/competitions/creative" element={<CreativeCompetitionPage />} />
        <Route path="/competitions/sport" element={<SportCompetitionPage />} />
        <Route path="/competitions/esport" element={<ESportCompetitionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/competition" element={<Competition id="ee15b41f-9090-40fb-9b56-1a49558e4c17" />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
