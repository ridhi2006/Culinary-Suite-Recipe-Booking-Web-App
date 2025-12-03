import React, { useState, useEffect } from "react";
import "../styles/Bookmark.css";

const STORAGE_KEY = "culinary_bookmarks";

function readLocalBookmarks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeLocalBookmarks(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function BookmarkFeature({ recipe }) {
  const [bookmarked, setBookmarked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const bookmarks = readLocalBookmarks();
    const found = bookmarks.find((b) => b.id === recipe.id);
    if (found) {
      setBookmarked(true);
      setNote(found.note || "");
    }
  }, [recipe.id]);

  const saveBookmark = () => {
    const bookmarks = readLocalBookmarks();
    const exists = bookmarks.find((b) => b.id === recipe.id);
    if (!exists) {
      bookmarks.unshift({ ...recipe, note });
      writeLocalBookmarks(bookmarks);
      setBookmarked(true);
      setToast("Saved to My Recipe Book 📖");
    } else {
      setToast("Already saved 🔖");
    }
    setShowModal(false);
  };

  const removeBookmark = () => {
    const bookmarks = readLocalBookmarks().filter((b) => b.id !== recipe.id);
    writeLocalBookmarks(bookmarks);
    setBookmarked(false);
    setToast("Removed from My Recipe Book ❌");
  };

  return (
    <div className="bookmark-wrapper">
      <button
        className={`bookmark-btn ${bookmarked ? "bookmarked" : ""}`}
        onClick={() => (bookmarked ? removeBookmark() : setShowModal(true))}
      >
        <svg
          className={`bookmark-icon ${bookmarked ? "active" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M6 2h10a1 1 0 011 1v18l-6-3-6 3V3a1 1 0 011-1z" />
        </svg>
        {bookmarked ? "Saved" : "Save"}
      </button>

      {showModal && (
        <div className="bookmark-modal">
          <div className="bookmark-overlay" onClick={() => setShowModal(false)}></div>
          <div className="bookmark-content">
            <h3>Save to My Recipe Book 📖</h3>
            <textarea
              placeholder="Add a quick note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="bookmark-actions">
              <button className="save-btn" onClick={saveBookmark}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="bookmark-toast" onAnimationEnd={() => setToast("")}>
          {toast}
        </div>
      )}
    </div>
  );
}
