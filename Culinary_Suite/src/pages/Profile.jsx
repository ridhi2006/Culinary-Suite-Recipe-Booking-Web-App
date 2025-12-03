import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const SS_USER = "username";
const LS_LOGGED = "loggedInUser";
const LS_PROFILE_NAME = "profileName";
const LS_AVATAR = "profileAvatar";

export default function Profile() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [avatar, setAvatar] = useState(localStorage.getItem(LS_AVATAR) || "/profile-avatar.jpg");
  const [displayName, setDisplayName] = useState(
    localStorage.getItem(LS_PROFILE_NAME) ||
      sessionStorage.getItem(SS_USER) ||
      localStorage.getItem(LS_LOGGED) ||
      "Chef User"
  );
  const [editing, setEditing] = useState(false);

  const fileRef = useRef(null);

  // load recipes + auto-refresh when updated
  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem("recipes") || "[]");
      setRecipes(stored);
    };
    load();
    const onUpdate = () => load();
    window.addEventListener("recipesUpdated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("recipesUpdated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  // pick avatar
  const pickAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const toBase64 = (f) =>
      new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result);
        r.onerror = rej;
        r.readAsDataURL(f);
      });
    const dataUrl = await toBase64(file);
    setAvatar(String(dataUrl));
    localStorage.setItem(LS_AVATAR, String(dataUrl));
  };

  // save name
  const saveProfile = () => {
    const name = displayName.trim() || "Chef User";
    localStorage.setItem(LS_PROFILE_NAME, name);
    setEditing(false);
    alert("✅ Profile updated successfully!");
  };

  // 🔥 LOGOUT HANDLER
  const handleLogout = () => {
    // clear session + remember-me flags
    sessionStorage.removeItem(SS_USER);
    localStorage.removeItem(LS_LOGGED);
    // optionally keep profile data so avatar/name persist after re-login:
    // localStorage.removeItem(LS_PROFILE_NAME);
    // localStorage.removeItem(LS_AVATAR);

    alert("👋 You’ve been logged out successfully!");
    navigate("/"); // redirect to login page
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div
          className="avatar-wrap"
          onClick={() => fileRef.current?.click()}
          title="Change profile picture"
        >
          <img src={avatar} className="avatar" alt="Profile" />
          <div className="avatar-edit">Change</div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={pickAvatar}
        />

        <div className="profile-meta">
          {!editing ? (
            <>
              <h2 className="profile-name">
                {displayName}{" "}
                <button className="edit-link" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
              </h2>
            </>
          ) : (
            <div className="edit-row">
              <input
                className="name-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
              />
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          )}

          <div className="stats">
            <span><strong>{recipes.length}</strong> recipes</span>
          </div>

          {/* 🚪 Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            🔒 Log Out
          </button>
        </div>
      </div>

      <h3 className="section-title" style={{ textAlign: "left" }}>
        Your Uploaded Recipes
      </h3>

      {recipes.length === 0 ? (
        <p className="no-recipes">
          You haven’t uploaded any recipes yet! Go to <strong>Add Recipe</strong> to create one.
        </p>
      ) : (
        <div className="recipe-grid">
          {recipes.map((r) => (
            <div key={r.id} className="recipe-card">
              {r.image ? (
                <img src={r.image} alt={r.name} className="recipe-img" />
              ) : (
                <div className="no-img">No Image</div>
              )}
              <div className="recipe-info">
                <h3>{r.name || "Untitled"}</h3>
                <div className="pill-row">
                  <span className="pill">{r.vegType === "veg" ? "Pure Veg" : "All Dishes"}</span>
                </div>
                <h4>Ingredients</h4>
                <p className="clamp">{r.ingredients}</p>
                <h4>Instructions</h4>
                <p className="clamp">{r.instructions}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
