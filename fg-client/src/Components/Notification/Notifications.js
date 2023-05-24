import { useEffect, useState } from "react";
import { useAuth } from "../Authentication/auth";
import "./Notifications.css";
import { FaCheck, FaRegComment, FaTimes } from "react-icons/fa";
import axios from "axios";
import Cookies from "universal-cookie";
import BeatLoader from "react-spinners/BeatLoader";
export default function Notifications() {
  const auth = useAuth();
  const [notifications, setNotifications] = useState([]);
  const cookies = new Cookies();
  const [getLoading, setGetLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const emoji = {
    love: "😍",
    hate: "🤮",
    drool: "🤤",
  };

  let options = {};

  if (!auth.social) {
    options = {
      headers: {
        Authorization: "Bearer " + cookies.get("token"),
        "Content-type": "application/json",
      },
    };
  } else {
    options = {
      withCredentials: true,
    };
  }

  async function getNotifications() {
    setGetLoading(true);
    await axios
      .get("http://localhost:8081/notification?id=" + auth.user.id, options)
      .then((res) => {
        if (res.data === []) {
          setNotifications(null);
        } else {
          setNotifications([...res.data]);
        }
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setNotifications(null);
        } else {
          console.log(err);
        }
      });
    setGetLoading(false);
  }

  function getLink(n, rel) {
    return n.links.find((link) => {
      return link.rel === rel;
    }).href;
  }

  async function deleteNotificationHandler(link) {
    await axios
      .delete(link, options)
      .then((res) => {})
      .catch((err) => console.log(err));
    getNotifications();
  }

  async function deleteNotificationsHandler(link) {
    await axios
      .delete(link + "?id=" + auth.user.id, options)
      .then((res) => {})
      .catch((err) => console.log(err));
    getNotifications();
  }

  return (
    <ul className="notification_container">
      {notifications !== null ? (
        notifications.map((n, index) => (
          <li key={index} className="notification_container__notifications">
            <span className="notification_container__notifications__icon">
              <FaRegComment />
            </span>
            <span className="notification_container__notifications__desc">
              <span style={{ fontWeight: "600" }}>
                @{n.notification_sender}
              </span>
              <span className="notification_container__notifications__desc__comment">
                {(n.label === "love"
                  ? emoji.love
                  : n.label === "hate"
                  ? emoji.hate
                  : emoji.drool) +
                  " " +
                  n.description}
              </span>
            </span>
            <span
              onClick={() => deleteNotificationHandler(getLink(n, "delete"))}
              className="notification_container__notifications__clear"
            >
              <FaTimes />
            </span>
          </li>
        ))
      ) : (
        <li className="notification_container__notifications">
          <span className="notification_container__notifications__icon empty">
            <FaCheck />
          </span>
          <span className="notification_container__notifications__desc">
            You have no new notifications!
          </span>
        </li>
      )}
      {(notifications !== null) & (notifications !== []) & !getLoading ? (
        <div className="notification_container__clear_all">
          <button
            onClick={() =>
              deleteNotificationsHandler(
                getLink(notifications[0], "delete-all")
              )
            }
          >
            Clear all notifications
          </button>
        </div>
      ) : null}
    </ul>
  );
}
