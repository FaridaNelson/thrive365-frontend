import "./LogIn.css";

function LogIn({onClick, setEmail, setPassword}) {
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={(e) => onClick(e)}>
        <h1 className="login-form__title">Log In</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          required
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-form__button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogIn;
