import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const SECURITY_QUESTIONS = [
  "What is your favorite color?",
  "What is your pet's name?",
  "What is your mother's maiden name?",
  "What city were you born in?",
  "What is your favorite food?"
];

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    userId: "",
    username: "",
    dob: "",
    password: "",
    question1: "",
    answer1: "",
    question2: "",
    answer2: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await authService.register(form);
      setSuccess("Registration successful. Please login.");
      setTimeout(() => navigate("/"), 1500);
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
      <h2>User Registration</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleRegister}>
        <input name="userId" placeholder="User ID" onChange={handleChange} />
        <br /><br />

        <input name="username" placeholder="Username" onChange={handleChange} />
        <br /><br />

        <input type="date" name="dob" onChange={handleChange} />
        <br /><br />

        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <br /><br />

        <select name="question1" onChange={handleChange}>
          <option value="">Select Question 1</option>
          {SECURITY_QUESTIONS.map(q => <option key={q}>{q}</option>)}
        </select>
        <br /><br />

        <input name="answer1" placeholder="Answer 1" onChange={handleChange} />
        <br /><br />

        <select name="question2" onChange={handleChange}>
          <option value="">Select Question 2</option>
          {SECURITY_QUESTIONS.filter(q => q !== form.question1)
            .map(q => <option key={q}>{q}</option>)}
        </select>
        <br /><br />

        <input name="answer2" placeholder="Answer 2" onChange={handleChange} />
        <br /><br />

        <button type="submit">Save</button>
      </form>

      <br />
      <button onClick={() => navigate("/")}>Back to Login</button>
    </div>
  );
}

export default Register;
