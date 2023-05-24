import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export default function CheckAuth({ children }) {
  const auth = useAuth();

  return <>{auth.user === null ? children : <Navigate to="/home" />}</>;
}
