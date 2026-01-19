import logo from "../../assets/Thrive365-Logo.svg";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <img src={logo} alt="Thrive 365 Logo" className="header__logo" />
      <div className="header__menu">
        <nav className="header__menu_nav">
          <ul className="header__menu_nav_buttons">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about-us">
              <li>About us</li>
            </Link>
            <Link to="/add-a-goal">
              <li>Add A Goal</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="header__buttons">
        <button className="header__login-btn">Login</button>
        <button className="header__signup-btn">Sign Up</button>
      </div>
    </div>
  );

}

export default Header;
