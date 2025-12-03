import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const signup = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      setMessageColor("red");
      setMessage("⚠ Please fill all fields!");
      return;
    }

    // ✅ Save user data in localStorage
    const user = { username, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userEmail", email);

    // ✅ Success message
    setMessageColor("green");
    setMessage(`🎉 Sign Up successful! Welcome, ${username}! Redirecting...`);

    // ✅ Redirect to main page after 1.5 seconds
    setTimeout(() => {
      navigate("/Login");
    }, 2000);
  };

  return (
    <div className="signup-box">
      <h2>✨ Culinary Suite ✨</h2>

      <input
        type="text"
        placeholder="Choose Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={signup}>Sign Up</button>

      {message && (
        <p className="message" style={{ color: messageColor }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignUp;
