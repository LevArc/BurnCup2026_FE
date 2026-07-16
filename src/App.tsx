import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/HomePage";
import Competition from "./pages/competitions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<Competition id="ee15b41f-9090-40fb-9b56-1a49558e4c17" />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
