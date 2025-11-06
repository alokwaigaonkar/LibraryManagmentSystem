import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";
import { getCurrentUser } from "../utils/auth";
import { getBooks, getCountdown } from "../utils/libraryService";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [notes, setNotes] = useState("");
  const [borrowed, setBorrowed] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [message, setMessage] = useState("");

  const user = getCurrentUser();
  const navigate = useNavigate();

  // ✅ Load user's borrowed/reserved books and notes
  useEffect(() => {
    if (user) {
      const savedNotes = localStorage.getItem(`${user.email}_notes`);
      if (savedNotes) setNotes(savedNotes);

      const books = getBooks();
      setBorrowed(books.filter((b) => b.issuedTo === user.firstName));
      setReserved(books.filter((b) => b.reservedBy === user.firstName));
    }
  }, []);

  const handleSaveNotes = () => {
    localStorage.setItem(`${user.email}_notes`, notes);
    setMessage("✅ Notes saved successfully!");
    setTimeout(() => setMessage(""), 2000);
  };


  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Welcome, {user?.firstName} 👋</h1>
          <p className="subtitle">
            Department of Computer Science • COMPSA Library
          </p>
          <div className="header-buttons">
            <button className="header-btn" onClick={() => navigate("/books")}>
              📚 Browse Books
            </button>
            
          </div>
        </div>

        {/* Main Borrowed Books Card */}
        <div className="section-card">
          <h2>📖 My Borrowed Books</h2>
          {borrowed.length ? (
            <div className="book-grid">
              {borrowed.map((b) => (
                <div key={b.id} className="book-inner-card">
                  <img
                    src={`https://images.unsplash.com/photo-1512820790803-83ca734da794`}
                    alt="Book Cover"
                    className="book-cover"
                  />
                  <div className="book-info">
                    <h3>{b.title}</h3>
                    <p><strong>Author:</strong> {b.author}</p>
                    <p><strong>Borrowed On:</strong> {new Date(b.issueDate).toLocaleDateString()}</p>
                    <p><strong>Due Date:</strong> {new Date(b.dueDate).toLocaleDateString()}</p>
                    <p className="countdown">⏳ {getCountdown(b.dueDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-msg">You haven’t borrowed any books yet.</p>
          )}
        </div>

        {/* Main Reserved Books Card */}
        <div className="section-card">
          <h2>📕 My Reserved Books</h2>
          {reserved.length ? (
            <div className="book-grid">
              {reserved.map((b) => (
                <div key={b.id} className="book-inner-card reserved">
                  <img
                    src={`https://images.unsplash.com/photo-1512820790803-83ca734da794`}
                    alt="Book Cover"
                    className="book-cover"
                  />
                  <div className="book-info">
                    <h3>{b.title}</h3>
                    <p><strong>Author:</strong> {b.author}</p>
                    <p><strong>Status:</strong> {b.status}</p>
                    <p><strong>Reserved For:</strong> {user.firstName}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-msg">No reserved books yet.</p>
          )}
        </div>

        {/* My Notes Section */}
        <div className="section-card notes-card">
          <h2>📝 My Notes</h2>
          {message && <p className="success-msg">{message}</p>}
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your study notes here..."
          />
          <button className="save-btn" onClick={handleSaveNotes}>
            💾 Save Notes
          </button>
        </div>
      </div>
    </>
  );
}
