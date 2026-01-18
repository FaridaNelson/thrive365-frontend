import reactLogo from "../../assets/react.svg"
import "./Header.css"

function Header(){

    return(
        <div className='header'>
        <img src={reactLogo} alt="Thrive 365 Logo" />
        <div className="header__menu">
            <nav className="header__menu_nav">
            <ul className="header__menu_nav_buttons">
                <li>Home</li>
                <li>About us</li>
                <li>How to Use</li>
            </ul>
            </nav>
        </div>
       </div>
    )
}

export default Header;