import { useLocation, useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function AdminVerification({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const adminToken = localStorage.getItem('adminToken');

  if (adminToken) {
    // If the adminToken exists, allow access to /admin/* routes except /admin/login
    if (location.pathname !== '/admin/login') {
      return children;
    } else {
      navigate('/admin/dashboard'); // Redirect the admin to the dashboard if they try to access /admin/login while authenticated.
      return null; // Prevent rendering the original component while redirecting.
    }
  } else {
    // If no adminToken, allow access only to /admin/login
    if (location.pathname === '/admin/login') {
      return children;
    } else {
      navigate('/admin/login'); // Redirect to /admin/login if the admin tries to access other routes without authentication.
      return null; // Prevent rendering the original component while redirecting.
    }
  }
}
