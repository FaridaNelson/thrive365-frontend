import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DashBoard from "./components/DashBoard/DashBoard";
import HeroSection from "./components/HeroSection/HeroSection";
import GoalPage from "./components/GoalPage/GoalPage";
import AboutUs from "./components/AboutUs/AboutUs";
import GoalDeleteConfirm from "./components/GoalDeleteConfirm/GoalDeleteConfirm";
import GoalDeleted from "./components/GoalDeleted/GoalDeleted";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="app__main">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/goals/:goalId" element={<GoalPage />} />
          <Route path="/goals/:goalId/delete" element={<GoalDeleteConfirm />} />
          <Route path="/goals/deleted" element={<GoalDeleted />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
