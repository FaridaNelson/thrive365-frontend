import "./HeroSection.css"

function HeroSection(){
    return(
        <div className="hero-section">
            <h1 className="hero-section__title">Welcome to Thrive365</h1>
            <p className="hero-section__tagline">Your yearly goals are just a flew clicks away</p>
           <div className="hero-section__buttons">
           <button className="hero-section__login-button">Login</button>
           <button className="hero-section__signup-button">Sign Up</button>
           </div>
           
        </div>
    )
}

export default HeroSection;