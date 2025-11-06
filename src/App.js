import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { getCurrentUser } from "./utils/auth";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Signup from "./pages/Signup";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children})=>{
  return getCurrentUser() ? children : <Navigate to ="/"></Navigate>
}

const PublicRoute = ({ children }) => {
  return getCurrentUser() ? <Navigate to="/home" /> : children;
};


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminLogin /></PrivateRoute>} />
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
