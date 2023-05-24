import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function RequireAuth({ children }) {
  const auth = useAuth();

  return <>{auth.user !== null ? children : <Navigate to="/login" />}</>;
}
