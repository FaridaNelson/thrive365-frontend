import "./HeroSection.css";
import dotsLogo from "../../assets/logo-dots.svg"

function HeroSection() {
  return (
    <div className="hero-section">
      <h1 className="hero-section__title">Welcome to Thrive365</h1>
      <p className="hero-section__tagline">
        To get started lets think about your intentions for the coming year.
        What are your biggest hopes, goals, and dreams?
      </p>
      <p className="hero-section__tagline">
        Don’t be afraid to think big - these are goals for the whole year so
        they may take time. Once you have your intentions in mind, think SMART.
      </p>
      <p className="hero-section__tagline">
        How can you define your goal in a way that is Specific, Measurable,
        Achievable, Relevant, and Time-bound? Are you ready to Thrive?
      </p>

      <p className="hero-section__tagline">
      Log in or sign up to start creating your goals
      </p>
      <img src={dotsLogo} alt="Dot logo" className="hero-section__logo" />
      <div className="hero-section__buttons">
        <button className="hero-section__login-button">Login</button>
        <button className="hero-section__signup-button">Sign Up</button>
      </div>
    </div>
  );
}

export default HeroSection;
