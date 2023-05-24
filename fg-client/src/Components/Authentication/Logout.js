import Cookies from "universal-cookie";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Logout() {
  const auth = useAuth();
  const cookies = new Cookies();
  const navigate = useNavigate();

  async function logoutHandler() {
    auth.logout();
    cookies.remove("token");
    cookies.remove("user");
    localStorage.removeItem("user_id");
    await axios
      .get("http://localhost:8081/logout", { withCredentials: true })
      .catch((err) => {
        console.error(err);
      });
    cookies.remove("social");
    toast.success("You are logged out successfully!");
    navigate("/login");
  }

  useEffect(() => {
    logoutHandler();
  }, []);
}
