import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DashBoard from "./components/DashBoard/DashBoard";
import HeroSection from "./components/HeroSection/HeroSection";
import AddGoal from "./components/AddGoal/AddGoal";
import GoalPage from "./components/GoalPage/GoalPage";
import AboutUs from "./components/AboutUs/AboutUs";
import GoalDeleteConfirm from "./components/GoalDeleteConfirm/GoalDeleteConfirm";
import GoalDeleted from "./components/GoalDeleted/GoalDeleted";
import SignUp from "./components/SignUp/SignUp";
import LogIn from "./components/LogIn/Login";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "./utils/userContext";
import { getToken, setToken, removeToken, api } from "./utils/api";
import { useNavigate } from "react-router-dom";
import EditProfile from "./components/EditProfile/EditProfile";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("-");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    api("/me")
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        removeToken();
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    return api("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, username, avatarUrl }),
    })
      .then((data) => {
        setToken(data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
        navigate("/add-a-goal");
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    return api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((data) => {
        setToken(data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);

        navigate("/dashboard");

        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    return api("/me", {
      method: "PATCH",
      body: JSON.stringify({ username, avatarUrl }),
    }).then((updatedUser) => {
      setCurrentUser(updatedUser);
      return updatedUser;
    });
  };

  const handleLogOut = () => {
    removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/add-a-goal" element={<AddGoal />} />
            <Route path="/goals/:goalId" element={<GoalPage />} />
            <Route
              path="/goals/:goalId/delete"
              element={<GoalDeleteConfirm />}
            />
            <Route path="/goals/deleted" element={<GoalDeleted />} />
            <Route
              path="/signup"
              element={
                <SignUp
                  onClick={handleSignUp}
                  setEmail={setEmail}
                  setPassword={setPassword}
                  setUsername={setUsername}
                  setAvatarUrl={setAvatarUrl}
                />
              }
            />
            <Route
              path="/login"
              element={
                <LogIn
                  onClick={handleLogin}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              }
            />

            <Route
              path="/edit-profile"
              element={
                <EditProfile
                  onClick={handleEditProfile}
                  setUsername={setUsername}
                  setAvatarUrl={setAvatarUrl}
                />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
