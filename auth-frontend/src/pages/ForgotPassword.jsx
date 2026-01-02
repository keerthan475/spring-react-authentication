import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState(null);
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchQuestions = async () => {
    setError("");
    try {
      const res = await authService.getForgotPasswordQuestions(userId);
      setQuestions(res.data);
    } catch {
      setError("Invalid User ID");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await authService.forgotPassword({
        userId,
        answer1,
        answer2
      });

      setMessage(`Your password is: ${res.data}`);
    } catch (err) {
      setError(err.response?.data || "Error");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

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
  );
}

export default ForgotPassword;
