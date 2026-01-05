import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/auth.css";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("User ID and Password are required");
      return;
    }

    try {
      await authService.login(userId, password);
      navigate("/welcome", { state: { userId } });
    } catch (err) {
      // 🔒 ALWAYS convert error to string
      const message =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
  <div className="auth-page">  
    <div className="auth-card">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

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

      <br />
      
      <button onClick={() => navigate("/register")}>Register</button>
      <br /><br />
      <button onClick={() => navigate("/forgot-password")}>Forgot Password</button>
      <br /><br />
      <button onClick={() => navigate("/change-password")}>Change Password</button>
    
    </div>
  </div>
  );
}

export default Login;
