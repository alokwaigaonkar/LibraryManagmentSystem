import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import "../styles/Books.css";
import { getCurrentUser } from "../utils/auth";
import {
  getBooks,
  requestIssueBook,
  requestReserveBook,
  requestRenewBook,
} from "../utils/libraryService";

export default function Books() {
  const [books, setBooks] = useState([]);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setBooks(getBooks());
  }, []);

  const handleAction = (type, bookId) => {
    let updated = [];
    if (type === "issue") updated = requestIssueBook(bookId, currentUser);
    if (type === "reserve") updated = requestReserveBook(bookId, currentUser);
    if (type === "renew") updated = requestRenewBook(bookId, currentUser);
    setBooks(updated);
  };

  return (
    <>
      <Navbar />
      <div className="books-page">
        <h1 className="page-title">📚 Library Books</h1>

        <div className="books-grid">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              currentUser={currentUser}
              onAction={handleAction}
            />
          ))}
        </div>
      </div>
    </>
  );
}
