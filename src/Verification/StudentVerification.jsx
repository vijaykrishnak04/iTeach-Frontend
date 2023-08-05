import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function StudentVerification({ children }) {
  const location = useLocation();

  const token = localStorage.getItem('studentToken');

  if (!token) {
    const allowedRoutesForUnauthenticatedUsers = [
      '/login',
      '/signup',
      '/otp-page',
    ];

    if (allowedRoutesForUnauthenticatedUsers.includes(location.pathname)) {
      return children;
    } else {
      return <Navigate to={'/login'} />; // Prevent rendering the original component while redirecting.
    }
  } else {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/otp-page' || location.pathname === '/') {
      return <Navigate to={'/student/home'} />;
    } else {
      const routePattern = /^\/rent-payment\/\d+$/;
      const isMatchingRoute = routePattern.test(location.pathname);
      if (isMatchingRoute && token.role === 'guest') {
        return <div>Guests are not allowed to access this route.</div>; // Replace with an appropriate message or redirect.
      }
      // Handle all other cases
      return children;
    }
  }
}
