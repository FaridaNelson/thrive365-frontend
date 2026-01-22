import "./SignUp.css";
function SignUp({ onClick, setEmail, setPassword, setUsername, setAvatarUrl }) {
  return (
    <div className="signup-page">
      <form className="signup-form">
        <h1 className="signup-form__title">Sign Up</h1>
        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passowrd">Password</label>
        <input
          required
          type="password"
          name="password"
          minLength={6}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="username">Username</label>
        <input
          required
          type="text"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="avatar">Avatar</label>
        <input
          type="url"
          placeholder="Enter an image URL"
          onChange={(e) => setAvatarUrl(e.target.value)}
        />
        <button
          className="signup-form__button"
          type="submit"
          onClick={(e) => onClick(e)}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
