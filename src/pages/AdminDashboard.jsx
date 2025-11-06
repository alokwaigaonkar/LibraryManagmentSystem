import React, { useEffect, useState } from "react";
import {
  getBooks,
  saveBooks,
  getStudents,
} from "../utils/Storage";
import {
  getPendingRequests,
  approveRequest,
  denyRequest,
} from "../utils/libraryService";
import { logout } from "../utils/auth";
import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [pending, setPending] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setBooks(getBooks());
    setStudents(getStudents());
    setPending(getPendingRequests());
  };

  // ✅ Add new book
  const handleAddBook = () => {
    if (!newBook.title || !newBook.author) return;
    const updated = [
      ...books,
      {
        id: books.length + 1,
        title: newBook.title,
        author: newBook.author,
        status: "Available",
      },
    ];
    saveBooks(updated);
    setNewBook({ title: "", author: "" });
    refreshData();
  };

  // ✅ Delete a book
  const handleRemoveBook = (id) => {
    const updated = books.filter((b) => b.id !== id);
    saveBooks(updated);
    refreshData();
  };

  // ✅ Approve pending request
  const handleApprove = (id) => {
    approveRequest(id);
    refreshData();
  };

  // ✅ Deny pending request
  const handleDeny = (id) => {
    denyRequest(id);
    refreshData();
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>📚 COMPSA Library Admin Panel</h1>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* Book Management */}
      <section className="section">
        <h2>📘 Manage Books</h2>
        <div className="add-book">
          <input
            type="text"
            placeholder="Book Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <button onClick={handleAddBook}>Add Book</button>
        </div>

        <div className="book-list">
          {books.map((b) => (
            <div key={b.id} className="book-row">
              <span>
                <b>{b.title}</b> — {b.author} ({b.status})
              </span>
              <button className="delete-btn" onClick={() => handleRemoveBook(b.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Requests */}
      <section className="section">
        <h2>📩 Pending Book Requests</h2>
        {pending.length > 0 ? (
          pending.map((b) => (
            <div key={b.id} className="request-row">
              <div>
                <b>{b.title}</b> — {b.requestType} request by{" "}
                <strong>{b.requestedBy}</strong>
              </div>
              <div className="request-buttons">
                <button className="approve-btn" onClick={() => handleApprove(b.id)}>
                  Approve
                </button>
                <button className="deny-btn" onClick={() => handleDeny(b.id)}>
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-msg">No pending requests at the moment.</p>
        )}
      </section>

      {/* User Activity */}
      <section className="section">
        <h2>👥 User Activity</h2>
        {students.length ? (
          students.map((s) => (
            <div key={s.email} className="user-row">
              <b>
                {s.firstName} {s.lastName}
              </b>{" "}
              — {s.email}
            </div>
          ))
        ) : (
          <p>No students found.</p>
        )}
      </section>
    </div>
  );
}
