// ProtectedRoute.jsx - blocks access to pages that require login
// If the user is not logged in, they get redirected to the login page
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user }   = useAuth();
  const location   = useLocation();

  if (!user) {
    // pass along where they were trying to go so we can redirect back after login
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return children;
}
