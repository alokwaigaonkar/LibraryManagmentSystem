# 📚 COMPSA Library Management System

A modern frontend Library Management System built with **React.js**, made for Computer Science students and librarians (admins).  
This version is frontend-only and uses browser `localStorage` for persistence so you can run and test the full app without a backend. Backend integration (Spring Boot + MySQL) is planned.

> ⚠️ Backend integration is planned but not required. You can deploy the frontend easily on Vercel and test end-to-end flows locally.

---

## 🚀 Features

### 👨‍🎓 Student
- Signup / Login system
- Browse available books
- Request book: **Issue**, **Reserve**, or **Renewal**
- Manage **My Borrowed Books**, **Reserved Books**, and **Notes**
- Auto-updating dashboard (no manual refresh required)
- Responsive UI with due-date countdowns

### 👩‍🏫 Admin (Librarian)
- Dedicated admin login page
- Manage library books (Add / Edit / Delete)
- View and approve/deny student requests
- Monitor registered student accounts
- Real-time updates reflected in student dashboards

---

## 🗂️ Project Structure

src/
├── components/
│   ├── Navbar.jsx
│   ├── BookCard.jsx
│   └── BookDetail.jsx
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Dashboard.jsx
│   ├── Books.jsx
│   ├── AdminLogin.jsx
│   └── AdminDashboard.jsx
├── utils/
│   ├── auth.js
│   ├── Storage.js
│   └── libraryService.js
├── data/
│   ├── StudentsData.js
│   └── BooksData.js
├── hooks/
│   └── useLocalStorageSync.js
└── styles/
    ├── Books.css
    ├── Dashboard.css
    ├── Navbar.css
    ├── login.css
    └── AdminDashboard.css

---

## 🧩 Prerequisites

- Node.js (LTS) — recommended ≥ 16
- npm (bundled with Node.js)
- (Optional) GitHub account — for deployment via Vercel

---

## 🛠️ Installation & Setup

1) Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

⚠️ Avoid spaces in your project folder name.  
Good: `library-management` ✅ — Bad: `Library Management` ❌

2) Install dependencies
```bash
npm install
```

3) Run locally (development)
```bash
npm start
```

Then open your browser: http://localhost:3000

---

## ☁️ Deploy to Vercel (quick)

- Push your repo to GitHub.
- Log in to Vercel → New Project → Import from GitHub.
- Accept defaults (Framework: React) → Deploy.
- Your app will be live at: `https://your-project-name.vercel.app`

---

## 🧭 Application Routes & Pages

| Route | Description | Access |
|---|---:|---|
| / | Student login page | Public |
| /signup | Student signup | Public |
| /dashboard | Student dashboard | Private |
| /books | Browse & actions for students | Private |
| /admin | Admin login page | Public |
| /admin/dashboard | Admin control panel | Private |

---

## 👤 Default Accounts & Test Data

On first run the app seeds `localStorage` with sample users and books.

Admin:
- Email: `admin@compsa.edu`
- Password: `admin123`

Sample Students:
| Name | Email | Password |
|---|---|---:|
| Alok Waigaonkar | alok@compsa.edu | 12345 |
| Sanika Patil | sanika@compsa.edu | 54321 |
| Rohan Deshmukh | rohan@compsa.edu | 11111 |
| Sneha Joshi | sneha@compsa.edu | 22222 |
| Aarav Kulkarni | aarav@compsa.edu | 33333 |
| Meera Bhosale | meera@compsa.edu | 44444 |
| Pranav Kale | pranav@compsa.edu | 55555 |

Books:
- 20 sample books are auto-added on first run (see `src/data/BooksData.js`).

---

## 💾 Data Storage & Reset

All data is stored in the browser's `localStorage`. Important keys:

| Key | Description |
|---|---|
| `Students` | List of registered student accounts |
| `Books` | All books and their statuses |
| `Admins` | Admin account list |
| `currentUser` | Currently logged-in user |
| `<email>_notes` | Notes saved by each student (per email) |

To reset data:
1. Open DevTools → Application → Local Storage.
2. Delete keys: `Students`, `Books`, `Admins`, `currentUser`.
3. Refresh — default seed data will be reloaded.

---

## 🧠 How It Works

Student flow:
1. Login or Signup.
2. Visit `/books`:
   - Available books → Request Issue.
   - Issued by someone else → Request Reserve.
   - Issued to you → Request Renewal.
3. Requests are submitted as "Pending".
4. Admin approves/denies. Student dashboard updates automatically.

Admin flow:
1. Login at `/admin`.
2. Visit `/admin/dashboard`:
   - Add / Delete books.
   - Review pending requests (Issue / Reserve / Renew).
   - Approve or Deny requests.
   - View all student accounts.
3. Actions take effect immediately and are reflected for students.

---

## 🧭 Quick Usage Guide

For Students:
- Open: http://localhost:3000
- Signup / Login (use sample credentials or create an account)
- Browse: `/books`
- Click “Request Issue” / “Request Reserve” / “Request Renewal”
- Check dashboard `/dashboard` for Borrowed & Reserved Books and Notes

For Admins:
- Admin login: http://localhost:3000/admin
- Credentials: `admin@compsa.edu` / `admin123`
- Manage library and requests at `/admin/dashboard`

---

## 🔍 View Login Credentials in Local Storage

Open your app → DevTools (F12) → Application → Local Storage → `http://localhost:3000`.  
Select the `Students` key to view JSON like:

```json
[
  {
    "firstName": "Alok",
    "lastName": "Waigaonkar",
    "email": "alok@compsa.edu",
    "password": "12345",
    "role": "STUDENT"
  },
  {
    "firstName": "Sanika",
    "lastName": "Patil",
    "email": "sanika@compsa.edu",
    "password": "54321",
    "role": "STUDENT"
  }
]
```

You may edit or delete these entries to simulate user changes or reset state.

---

## 🧩 Limitations & Next Steps

Current limitations:
- Frontend-only, uses browser `localStorage`.
- No real authentication or server-side validation.

Planned next steps:
- Backend (Spring Boot + MySQL)
- JWT authentication
- Persistent user/book storage
- Search, filters, and pagination for books
- Admin analytics dashboard
- File upload for book covers
