import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Thrive365-Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import hamburgerMenuLogo from "../../assets/hamburger-menu-svgrepo-com.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../../utils/userContext";

function Header({ isLoggedIn, onLogOut }) {
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [width, setWidth] = useState(() => window.innerWidth);
  const { currentUser } = useContext(CurrentUserContext);



  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHamburger = width < 1200;
  return (
    <div className="header">
      {isLoggedIn ? (
        <div className="header__logo-with-user">
          <img
            src={logo}
            alt="Thrive 365 Logo"
            className="header__logo"
            onClick={() => navigate("/")}
          />
          <div className="header__user_info">
            <p className="header__username">{currentUser?.username}</p>
            {currentUser.avatarUrl ? (
              <img
                className="header__user_avatar"
                src={currentUser.avatarUrl}
                alt="Profile Picture"
              />
            ) : (
              <div className="header__user_avatar_placeholder">
                {currentUser?.username?.[0]}
              </div>
            )}
          </div>
        </div>
      ) : (
        <img
          src={logo}
          alt="Thrive 365 Logo"
          className="header__logo"
          onClick={() => navigate("/")}
        />
      )}
      {!isHamburger ? (
        <div className="header__menu">
          <nav className="header__menu_nav">
            <ul className="header__menu_nav_buttons">
              {!isLoggedIn ? (
                <Link to="/">
                  <li>Home</li>
                </Link>
              ) : null}
              {isLoggedIn ? (
                <Link to="/add-a-goal">
                  <li>Add Goals</li>
                </Link>
              ) : null}
              <Link to="/about-us">
                <li>About</li>
              </Link>
            </ul>
          </nav>
          {!isLoggedIn ? (
            <div className="header__buttons">
              <button
                className="header__login-btn"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="header__signup-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="header__buttons">
              <button
                className="header__edit-profile-btn"
                onClick={() => navigate("/dashboard")}
              >
                DashBoard
              </button>
              <button
                className="header__edit-profile-btn"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
              <button className="header__logout-btn" onClick={onLogOut}>
                Log Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="header__mobile-menu">
          <button
            className="header__hamburger-menu-btn"
            onClick={() => setIsMobileOpen((prev) => !prev)}
          >
            <img
              src={hamburgerMenuLogo}
              alt="Hamburger Menu Icon"
              className="header__hamburger-menu-icon"
            />
          </button>

          <div
            className={`header__mobile-menu_items ${
              isMobileOpen ? "header__mobile-menu_items--open" : ""
            }`}
          >
            <button
              className="header__menu-mobile-close"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              X
            </button>
            <nav className="header__menu_nav-mobile">
              <ul className="header__menu_nav_buttons-mobile">
                {!isLoggedIn ? (
                  <Link to="/" onClick={() => setIsMobileOpen((prev) => !prev)}>
                    <li>Home</li>
                  </Link>
                ) : null}
                {isLoggedIn ? (
                  <Link
                    to="/add-a-goal"
                    onClick={() => setIsMobileOpen((prev) => !prev)}
                  >
                    <li>Add Goals</li>
                  </Link>
                ) : null}
                <Link
                  to="/about-us"
                  onClick={() => setIsMobileOpen((prev) => !prev)}
                >
                  <li>About</li>
                </Link>
              </ul>
            </nav>
            {!isLoggedIn ? (
              <div className="header__buttons-mobile">
                <button
                  className="header__login-btn"
                  onClick={() => {
                    navigate("/login");
                    setIsMobileOpen((prev) => !prev);
                  }}
                >
                  Login
                </button>
                <button
                  className="header__signup-btn"
                  onClick={() => {
                    navigate("/signup");
                    setIsMobileOpen((prev) => !prev);
                  }}
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="header__buttons-mobile">
                <button
                  className="header__edit-profile-btn"
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileOpen((prev) => !prev);
                  }}
                >
                  DashBoard
                </button>
                <button
                  className="header__edit-profile-btn"
                  onClick={() => {
                    navigate("/edit-profile");
                    setIsMobileOpen((prev) => !prev);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="header__logout-btn"
                  onClick={() => {
                    onLogOut();
                    navigate("/");
                    setIsMobileOpen((prev) => !prev);
                  }}
                >
                  Log out
                </button>
                <div className="header__user_info-mobile">
                  <p className="header__username-mobile">
                    {currentUser?.username}
                  </p>
                  {currentUser?.avatarUrl ? (
                    <img
                      className="header__user_avatar-mobile"
                      src={currentUser.avatarUrl}
                      alt="Profile Picture"
                    />
                  ) : (
                    <div className="header__user_avatar_placeholder-mobile">
                      {currentUser?.username?.[0]}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
