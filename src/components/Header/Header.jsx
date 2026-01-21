import { useState, useEffect } from "react";
import logo from "../../assets/Thrive365-Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";
import hamburgerMenuLogo from "../../assets/hamburger-menu-svgrepo-com.svg";

function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isHamburger = width < 1200;
  return (
    <div className="header">
      <img src={logo} alt="Thrive 365 Logo" className="header__logo" />
      {!isHamburger ? (
        <div className="header__menu">
          <nav className="header__menu_nav">
            <ul className="header__menu_nav_buttons">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/add">
                <li>Add Goals</li>
              </Link>
              <Link to="/about-us">
                <li>About</li>
              </Link>
            </ul>
          </nav>
          <div className="header__buttons">
            <button className="header__login-btn">Login</button>
            <button className="header__signup-btn">Sign Up</button>
          </div>
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
            <button className="header__menu-mobile-close"
            onClick={()=>setIsMobileOpen(prev=>!prev)}
            >X</button>
            <nav className="header__menu_nav-mobile">
              <ul className="header__menu_nav_buttons-mobile">
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/add">
                  <li>Add Goals</li>
                </Link>
                <Link to="/about-us">
                  <li>About</li>
                </Link>
              </ul>
            </nav>
            <div className="header__buttons-mobile">
              <button className="header__login-btn">Login</button>
              <button className="header__signup-btn">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
