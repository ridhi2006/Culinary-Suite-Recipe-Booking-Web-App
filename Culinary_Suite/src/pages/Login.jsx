import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const LS_USER = "user";            // { username, password } from signup
const LS_LOGGED = "loggedInUser";  // persistent login
const SS_USER = "username";        // session login
const LS_PROFILE_NAME = "profileName"; // 👈 display name for Profile

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const activeUser = sessionStorage.getItem(SS_USER) || localStorage.getItem(LS_LOGGED);
    if (activeUser) {
      setMsgColor("blue");
      setMsg(`You're already logged in as ${activeUser}.`);
    }
  }, []);

  const validate = () => {
    if (!username.trim() || !password.trim()) {
      setMsgColor("red");
      setMsg("⚠ Please fill all fields!");
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    setMsg("");
    setMsgColor("");

    if (!validate()) return;

    let storedUser;
    try {
      storedUser = JSON.parse(localStorage.getItem(LS_USER) || "null");
    } catch {
      storedUser = null;
    }

    if (!storedUser) {
      setMsgColor("red");
      setMsg("⚠ No user found! Please Sign Up first.");
      return;
    }

    const ok =
      username.trim() === (storedUser.username || "").trim() &&
      password.trim() === (storedUser.password || "").trim();

    if (!ok) {
      setMsgColor("red");
      setMsg("❌ Invalid username or password!");
      return;
    }

    setLoading(true);

    // persist session
    const uname = username.trim();
    sessionStorage.setItem(SS_USER, uname);
    if (remember) {
      localStorage.setItem(LS_LOGGED, uname);
    } else {
      localStorage.removeItem(LS_LOGGED);
    }

    // 👇 also initialize profile display name if not set
    if (!localStorage.getItem(LS_PROFILE_NAME)) {
      localStorage.setItem(LS_PROFILE_NAME, uname);
    }

    setMsgColor("green");
    setMsg(`✅ Login successful! Welcome, ${uname}!`);
    setTimeout(() => {
      navigate("/mainpage");
    }, 600);
  };

  const onKeyDownPassword = (e) => {
    setCapsOn(e.getModifierState && e.getModifierState("CapsLock"));
    if (e.key === "Enter") handleLogin();
  };

  const isDisabled = loading || !username.trim() || !password.trim();

  return (
    <div className="login-box">
      <h2>✨ Culinary Suite ✨</h2>

      <form onSubmit={handleLogin} autoComplete="off">
        {/* 👇 Username input already present (kept) */}
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="password-row">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={onKeyDownPassword}
          />
          <button
            type="button"
            className="toggle-pwd"
            onClick={() => setShowPwd((s) => !s)}
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? "🙈" : "👁️"}
          </button>
        </div>

        {capsOn && <p className="caps-hint">⇪ Caps Lock is ON</p>}

        <label className="remember-row">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>

        <button type="submit" disabled={isDisabled}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      {msg && (
        <p className="message" style={{ color: msgColor, marginTop: 10 }}>
          {msg}
        </p>
      )}
    </div>
  );
}
