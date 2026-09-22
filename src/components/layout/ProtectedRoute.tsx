import {Navigate, Outlet} from "react-router";
import {useAppSelector} from "@/slice/hooks";

interface ProtectedRouteProps {
  allowedRoles?: Array<"admin" | "user">;
}

export function ProtectedRoute({allowedRoles}: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}