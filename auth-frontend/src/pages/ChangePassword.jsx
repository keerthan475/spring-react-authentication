import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { validatePassword } from "../utils/passwordValidator";
import "../styles/auth.css";

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

    // ✅ Required field validation
    if (
      !form.userId ||
      !form.oldPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    const passwordError = validatePassword(form.newPassword);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // ✅ Confirm password validation
    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await authService.changePassword({
        userId: form.userId,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword   // ✅ SEND THIS
      });

      setSuccess(res.data || "Password changed successfully");
      setTimeout(() => navigate("/"), 1500);

    } catch (err) {
      // ✅ Always convert error to string
      setError(err.response?.data || "Something went wrong");
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Change Password</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          name="userId"
          placeholder="User ID"
          value={form.userId}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={form.newPassword}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Change Password</button>
      </form>

      <br />
      <div><button onClick={() => navigate("/")}>Back to Login</button></div>
    </div>
  </div>
  );
}

export default ChangePassword;
