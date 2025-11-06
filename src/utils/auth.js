import { getStudents, saveStudent, getAdmins, initializeLibraryData } from "./Storage";

initializeLibraryData();

export const setCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/";
};

export const login = (email, password) => {
  initializeLibraryData();

  const students = getStudents();
  const admins = getAdmins();

  // ✅ Look for both students and admins
  const user =
    admins.find(
      (a) =>
        a.email.toLowerCase() === email.toLowerCase() &&
        a.password === password
    ) ||
    students.find(
      (s) =>
        s.email.toLowerCase() === email.toLowerCase() &&
        s.password === password
    );

  if (user) {
    setCurrentUser(user);
    return { success: true, user };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === "ADMIN";
};

// ✅ NEW: Register User Function
export const registerUser = (newUser) => {
  const existingUsers = getStudents();

  const exists = existingUsers.some(
    (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
  );

  if (exists) {
    return { success: false, message: "User with this email already exists." };
  }

  // Add role field for clarity
  const userToSave = {
    ...newUser,
    likedBooks: [],
    role: "STUDENT",
  };

  saveStudent(userToSave);

  console.log("✅ New student registered:", newUser.email);
  return { success: true, message: "Registration successful." };
};
