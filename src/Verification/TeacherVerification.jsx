import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function TeacherVerification({ children }) {
  const location = useLocation();

  const teacherToken = localStorage.getItem("teacherToken");

  if (teacherToken) {
    // If the teacherToken exists, allow access to /teacher/* routes except /teacher-login
    if (location.pathname !== "/teacher-login") {
      return children;
    } else {
      return <Navigate to={"/teacher/home"} />; // Redirect the teacher to the dashboard if they try to access /teacher-login while authenticated.
    }
  } else {
    // If no teacherToken, allow access only to /teacher-login
    if (location.pathname === "/teacher-login") {
      return children;
    } else {
      return <Navigate to={"/teacher-login"} />; // Redirect to /teacher-login if the teacher tries to access other routes without authentication.
    }
  }
}
