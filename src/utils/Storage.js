import defaultStudents from "../data/StudentsData";
import defaultBooks from "../data/BooksData";

// ✅ New default admins
const defaultAdmins = [
  {
    firstName: "Rajesh",
    lastName: "Jain",
    email: "admin@compsa.edu",
    password: "admin123",
    role: "ADMIN",
  },
];

export const getStudents = () => {
  const students = localStorage.getItem("Students");
  return students ? JSON.parse(students) : [];
};

export const saveStudent = (student) => {
  const students = getStudents();
  students.push(student);
  localStorage.setItem("Students", JSON.stringify(students));
};

// ✅ Admin functions
export const getAdmins = () => {
  const admins = localStorage.getItem("Admins");
  return admins ? JSON.parse(admins) : [];
};

export const saveAdmin = (admin) => {
  const admins = getAdmins();
  admins.push(admin);
  localStorage.setItem("Admins", JSON.stringify(admins));
};

// ✅ Book functions
export const getBooks = () => {
  const books = localStorage.getItem("Books");
  return books ? JSON.parse(books) : [];
};

export const saveBooks = (books) => {
  localStorage.setItem("Books", JSON.stringify(books));
};

// ✅ Initialize everything once
export const initializeLibraryData = () => {
  if (!localStorage.getItem("Students"))
    localStorage.setItem("Students", JSON.stringify(defaultStudents));

  if (!localStorage.getItem("Books"))
    localStorage.setItem("Books", JSON.stringify(defaultBooks));

  if (!localStorage.getItem("Admins"))
    localStorage.setItem("Admins", JSON.stringify(defaultAdmins));
};
