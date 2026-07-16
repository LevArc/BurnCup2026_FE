import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/HomePage";
import CompetitionsPage from "./pages/competitions";
import CreativeCompetitionPage from "./pages/CreativeCompetition";
import SportCompetitionPage from "./pages/SportCompetition";
import ESportCompetitionPage from "./pages/ESportCompetition";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import TraditionalDanceCompetitionPage from "./pages/TraditionalDanceCompetition";

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
        <Route path="/competitions/traditional-dance" element={<TraditionalDanceCompetitionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
