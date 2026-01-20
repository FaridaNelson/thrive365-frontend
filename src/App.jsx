import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DashBoard from "./components/DashBoard/DashBoard";
import HeroSection from "./components/HeroSection/HeroSection";
import AboutUs from "./components/AboutUs/AboutUs";
import GoalPage from "./components/GoalPage/GoalPage";

function App() {
  return (
    <>
      <Header />
    <AboutUs />
      <Routes>
        <Route exact path="/" element={<HeroSection />} />

        <Route exact path="/dashboard" element={<DashBoard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
