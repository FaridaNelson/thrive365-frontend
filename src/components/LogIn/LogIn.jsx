import "./LogIn.css";

function LogIn({ onClick, setEmail, setPassword }) {
  return (
    <div className="login-page">
      <form className="login-form">
        <h1 className="login-form__title">Log In</h1>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="passowrd">Password</label>
        <input
          required
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-form__button"
          type="submit"
          onClick={(e) => onClick(e)}
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogIn;
