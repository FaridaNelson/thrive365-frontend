import "./LogIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setToken } from "../../utils/api";

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      setToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-form__title">Log In</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          required
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login-form__error">{error}</p>}

        <button className="login-form__button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogIn;
