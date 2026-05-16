import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireOnboarding = true
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAuth && isAuthenticated && requireOnboarding && !hasCompletedOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};