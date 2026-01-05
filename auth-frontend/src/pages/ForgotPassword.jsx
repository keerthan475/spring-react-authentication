import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import "../styles/auth.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState(null);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // STEP 1: Fetch security questions
  const fetchQuestions = async () => {
    setError("");
    setMessage("");

    if (!userId) {
      setError("User ID is required");
      return;
    }

    try {
      const res = await authService.getForgotPasswordQuestions(userId);
      setQuestions(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Invalid User ID");
    }
  };

  // STEP 2: Validate answers
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!answer1 || !answer2) {
      setError("Please answer both security questions");
      return;
    }

    try {
      const res = await authService.forgotPassword({
        userId,
        answer1,
        answer2
      });

      setMessage(`Your password is: ${res.data}`);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Security answers do not match");
    }
  };

  return (
  <div className="auth-page">
    <div className="auth-card">
      <h2>Forgot Password</h2>

      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      {!questions ? (
        <>
          <input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <br /><br />
          <button onClick={fetchQuestions}>Get Questions</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <p>{questions.question1}</p>
          <input
            placeholder="Answer 1"
            value={answer1}
            onChange={(e) => setAnswer1(e.target.value)}
          />
          <br /><br />

          <p>{questions.question2}</p>
          <input
            placeholder="Answer 2"
            value={answer2}
            onChange={(e) => setAnswer2(e.target.value)}
          />
          <br /><br />

          <button type="submit">Submit</button>
        </form>
      )}

      <br />
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  </div>
  );
}

export default ForgotPassword;
