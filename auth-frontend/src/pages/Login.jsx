import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await authService.login(userId, password);

      // ✅ redirect after successful login
      navigate("/welcome", { state: { userId } });

    } catch (err) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Server not reachable");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <br />

      <button onClick={() => navigate("/register")}>Register</button>
      <br /><br />
      <button onClick={() => navigate("/forgot-password")}>Forgot Password</button>
      <br /><br />
      <button onClick={() => navigate("/change-password")}>Change Password</button>
    </div>
  );
}

export default Login;
