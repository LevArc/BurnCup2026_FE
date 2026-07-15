import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Competition from "./pages/competitions";
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitions" element={<Competition />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
