import React from "react";
import "./Chat.css";
import { format } from "timeago.js";

import Cookies from "universal-cookie";
import { useAuth } from "../../Authentication/auth";
import { useState , useEffect } from "react";


const Chat = ({ chat, own }) => {

  const cookies = new Cookies();
  const auth = useAuth();
  let options = {};
  const [messages, setMessages] = useState([]);
  // const []

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
 

  return (
    <div className={own ? "chat own" : "chat"}>
      <div className="chatTop">
        <img
          className="chatImg"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <p className="chatText">
          {chat.message}
          
        </p>
      </div>
      <div className="chatBottom">{chat.sender.username}</div>
      <div className="chatBottom">{format(chat.sentDate)}</div>
    </div>
  );
};

export default Chat;
