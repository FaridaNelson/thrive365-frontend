import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DashBoard from "./components/DashBoard/DashBoard";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutUs from "./components/AboutUs/AboutUs";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
