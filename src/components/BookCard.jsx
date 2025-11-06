// src/components/BookCard.jsx
import React from "react";
import "../styles/Books.css";
import { getCountdown } from "../utils/libraryService";


export default function BookCard({ book, currentUser, onAction, showActions = true }) {
  const isOwner = book.issuedTo === currentUser?.firstName;

  const renderActionButton = () => {
    if (!showActions) return null;
  
    if (book.status === "Available")
      return (
        <button
          className="action-btn issue"
          onClick={(e) => {
            e.stopPropagation();
            onAction("issue", book.id);
          }}
        >
          Request Issue
        </button>
      );
  
    if (book.status === "Issued" && isOwner)
      return (
        <button
          className="action-btn renew"
          onClick={(e) => {
            e.stopPropagation();
            onAction("renew", book.id);
          }}
        >
          Request Renewal
        </button>
      );
  
    if (book.status === "Issued" && !isOwner)
      return (
        <button
          className="action-btn reserve"
          onClick={(e) => {
            e.stopPropagation();
            onAction("reserve", book.id);
          }}
        >
          Request Reserve
        </button>
      );
  
    return null;
  };
  

  // safe date formatting
  const fmt = (iso) => iso ? new Date(iso).toLocaleDateString() : "-";

  return (
    <div className="book-inner-card" role="button" onClick={() => {/* optional detail view */}}>
      <img src={`https://images.unsplash.com/photo-1512820790803-83ca734da794`} alt={book.title} className="book-cover" />

      <div className="book-info">
        <div>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
        </div>

        {/* STATUS BADGE */}
        <div className="status-row">
          <span className={`status-badge ${book.status.toLowerCase()}`}>
            {book.status}
          </span>

          {/* Pending Request Info */}
          {book.status === "Pending" && (
            <p className="pending-note">
              Requested by {book.requestedBy} ({book.requestType})
            </p>
          )}

          {/* If issued, show issuedTo */}
          {book.status === "Issued" && book.issuedTo && (
            <span className="issued-to"> — Issued to: {book.issuedTo}</span>
          )}
        </div>

        {/* If issued, show dates + countdown */}
        {book.status === "Issued" && (
          <>
            <p><strong>Borrowed:</strong> {fmt(book.issueDate)}</p>
            <p><strong>Due:</strong> {fmt(book.dueDate)}</p>
            <p className="countdown">⏳ {getCountdown(book.dueDate)}</p>
          </>
        )}

        <div className="action-row">
          {renderActionButton()}
        </div>
      </div>
    </div>
  );
}
