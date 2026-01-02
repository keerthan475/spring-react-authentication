import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userId: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      await authService.changePassword({
        userId: form.userId,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      });

      setSuccess("Password changed successfully. Please login.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || err.response.data);
      } else {
        setError("Server not reachable");
      }
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="userId"
          placeholder="User ID"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Change Password</button>
      </form>

      <br />
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  );
}

export default ChangePassword;
