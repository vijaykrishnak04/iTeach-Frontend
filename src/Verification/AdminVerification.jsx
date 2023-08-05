import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function AdminVerification({ children }) {
  const location = useLocation();

  const adminToken = localStorage.getItem("adminToken");

  if (adminToken) {
    // If the adminToken exists, allow access to /admin/* routes except /admin/login
    if (location.pathname !== "/admin/login") {
      return children;
    } else {
      // Redirect the admin to the dashboard if they try to access /admin/login while authenticated.
      return <Navigate to={"/admin/dashboard"} />; // Prevent rendering the original component while redirecting.
    }
  } else {
    // If no adminToken, allow access only to /admin/login
    if (location.pathname === "/admin/login") {
      return children;
    } else {
      // Redirect to /admin/login if the admin tries to access other routes without authentication.
      return <Navigate to={"/admin/login"} />; // Prevent rendering the original component while redirecting.
    }
  }
}
