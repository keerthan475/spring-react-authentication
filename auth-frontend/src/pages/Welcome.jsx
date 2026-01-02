import { useLocation, useNavigate } from "react-router-dom";

function Welcome() {
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  const handleLogout = () => {
    navigate("/");
  };

  // 🔒 Safety: direct URL access protection
  if (!userId) {
    return <h3>Unauthorized Access</h3>;
  }

  return (
    <div>
      <h2>Welcome {userId} 👋</h2>

      <p>You have successfully logged in.</p>

      <br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Welcome;
