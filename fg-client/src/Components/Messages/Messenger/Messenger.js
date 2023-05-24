import React, { useEffect, useState, useRef } from "react";
import NavBar from "../../NavBar/NavBar";
import "./Messenger.css";
import Conversations from "../Conversations/Conversations";
import Chat from "../Chats/Chat";
import { useAuth } from "../../Authentication/auth";
import Cookies from "universal-cookie";
import { FaEdit, FaPaperPlane, FaPlane, FaTrash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IoClose, IoCloseCircle, IoCloseCircleSharp } from "react-icons/io5";

const Messenger = () => {
  const cookies = new Cookies();
  const auth = useAuth();
  let options = {};
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();
  const [oneMessage, setOneMessage] = useState([]);
  const [editedMsg, setEditedMesg] = useState("");
  const [disable,setDisable] = useState(true);
  
  const navigate = useNavigate();

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

  if (!localStorage.getItem("user_id")) {
    localStorage.setItem("user_id", auth.user.id); //<-key and value is passed, user id gotten from login
  }
  const user = localStorage.getItem("user_id");
  console.log(user);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    //getStatus is the function to get the data from the backend

    await axios
      .get("http://localhost:8081/messages", options)
      .then((res) => {
        setMessages(res.data); //setMessages is used to update the state variable
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const date = new Date();

  const submitMessage = async () => {
    const message = {
      sender: { id: localStorage.getItem("user_id").toString() },
      message: newMessage,
      sentDate: date,
    };
    await axios
      .post("http://localhost:8081/messages", message, options)
      .then(() => {
        getMessages();
        setNewMessage("");
        // navigate("/messenger");
      })
      .catch((err) => {
        console.log(err);
      });
    setCreate(!create);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [deleted, setDeleted] = useState(false);
  const [create, setCreate] = useState(false);

  const deleteMessage = async (id) => {
    console.log(id);
    await axios
      .delete("http://localhost:8081/messages/" + id, options)
      .then(() => {
        getMessages();
        setDeleted(!deleted);
        // navigate('/messenger');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    getMessages();
  }, [deleted, create]);

  const goBack = () => {
    navigate("/home");
  };

  

  const setChatMessage = (value) => {
    setNewMessage(value);
  }

  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <button onClick={() => goBack()}>
            <IoCloseCircleSharp />
          </button>
          <div className="ChatMenuWrapper">
            {/* <input placeholder="Search for user..." className="chatMenuInput" /> */}
            <Conversations />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div ref={scrollRef}>
                  <Chat chat={m} own={m.sender.id === user} />
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      padding: "5px",
                    }}
                  >
                    <Link
                      to={`/messenger/editMessage/${JSON.stringify(
                        m.message_id
                      ).replace(/\"/g, "")}`}
                    >
                      <button
                        hidden={m.sender.id == user ? false : true}
                        style={{
                          color: "black",
                          width: "10px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                      >
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      hidden={m.sender.id == user ? false : true}
                      onClick={() => deleteMessage(m.message_id)}
                    >
                      <FaTrash />
                    </button>
                  </span>
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Enter a message..."
                onChange={(e) => setChatMessage(e.target.value)}
                value={newMessage}
              />
              <button className={newMessage.trim().length === 0 ? 'disabled-button' : 'chatSubmitButton'} disabled={newMessage.trim().length === 0}
              onClick={submitMessage}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="ChatOnlineWrapper">{/* <ChatOnline /> */}</div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
