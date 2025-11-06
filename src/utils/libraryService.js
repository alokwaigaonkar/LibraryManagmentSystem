// src/utils/libraryService.js
const BOOKS_KEY = "Books";
const ISSUE_PERIOD_DAYS = 7;

export const getBooks = () => JSON.parse(localStorage.getItem(BOOKS_KEY)) || [];
export const saveBooks = (books) => localStorage.setItem(BOOKS_KEY, JSON.stringify(books));

const getDueDate = () => {
  const now = new Date();
  now.setDate(now.getDate() + ISSUE_PERIOD_DAYS);
  return now.toISOString();
};

// === STUDENT REQUESTS ===

// Request issue (available book)
export const requestIssueBook = (bookId, currentUser) => {
  const books = getBooks();
  const updated = books.map((b) =>
    b.id === bookId && b.status === "Available"
      ? {
          ...b,
          status: "Pending",
          requestedBy: currentUser.firstName,
          requestType: "Issue",
          requestDate: new Date().toISOString(),
        }
      : b
  );
  saveBooks(updated);
  return updated;
};

// Request reserve (issued book)
export const requestReserveBook = (bookId, currentUser) => {
  const books = getBooks();
  const updated = books.map((b) =>
    b.id === bookId && b.status === "Issued"
      ? {
          ...b,
          status: "Pending",
          requestedBy: currentUser.firstName,
          requestType: "Reserve",
          requestDate: new Date().toISOString(),
        }
      : b
  );
  saveBooks(updated);
  return updated;
};

// ✅ Request renew (issued book owned by current user)
export const requestRenewBook = (bookId, currentUser) => {
  const books = getBooks();
  const updated = books.map((b) =>
    b.id === bookId && b.status === "Issued" && b.issuedTo === currentUser.firstName
      ? {
          ...b,
          status: "Pending",
          requestedBy: currentUser.firstName,
          requestType: "Renew",
          requestDate: new Date().toISOString(),
        }
      : b
  );
  saveBooks(updated);
  return updated;
};

// === ADMIN ACTIONS ===
export const approveRequest = (bookId) => {
  const books = getBooks();
  const updated = books.map((b) => {
    if (b.id === bookId && b.status === "Pending") {
      if (b.requestType === "Issue") {
        return {
          ...b,
          status: "Issued",
          issuedTo: b.requestedBy,
          issueDate: new Date().toISOString(),
          dueDate: getDueDate(),
          requestedBy: null,
          requestType: null,
        };
      }
      if (b.requestType === "Reserve") {
        return {
          ...b,
          status: "Reserved",
          reservedBy: b.requestedBy,
          requestedBy: null,
          requestType: null,
        };
      }
      if (b.requestType === "Renew") {
        return {
          ...b,
          status: "Issued",
          dueDate: getDueDate(), // ✅ extend due date
          requestedBy: null,
          requestType: null,
        };
      }
    }
    return b;
  });
  saveBooks(updated);
  return updated;
};

// Deny any pending request
export const denyRequest = (bookId) => {
  const books = getBooks();
  const updated = books.map((b) =>
    b.id === bookId && b.status === "Pending"
      ? { ...b, status: b.requestType === "Renew" ? "Issued" : "Available", requestedBy: null, requestType: null }
      : b
  );
  saveBooks(updated);
  return updated;
};

// Get all pending
export const getPendingRequests = () => getBooks().filter((b) => b.status === "Pending");

// Countdown unchanged
export const getCountdown = (dueDate) => {
  const diff = new Date(dueDate) - new Date();
  if (diff <= 0) return "Overdue ⏰";
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  return `${days}d ${hours}h left`;
};
