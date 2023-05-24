import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Authentication/auth";
import Cookies from "universal-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Dialog ,DialogActions,DialogTitle,DialogContentText, DialogContent,Button,TextField } from "@material-ui/core";
import { IoCloseCircleSharp } from "react-icons/io5";


function MessageEdit() {
  const cookies = new Cookies();

  const [messages, setMessages] = useState([]);
  const [message_id, setMessage_id] = useState("");
  var [sender, setSender] = useState("");
  const [message, setMessage] = useState("");
  const [sentDate, setSentDate] = useState("");
  const [oldMessage, setOldMessage] = useState("");

  var currentDate = new Date().toISOString();

  const navigate = useNavigate();

  const auth = useAuth();
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

  const {id} = useParams();
  console.log(id);

  const getMessage = async () => {
    //getStatus is the function to get the data from the backend
    await axios.get("http://localhost:8081/messages/" + id , options).then((res) => {
      setMessages(res.data);  
      setMessage_id(res.data.message_id);
      setSender(res.data.sender);
      setMessage(res.data.message);
      setSentDate(res.data.sentDate);
      setOldMessage(res.data.message);

      console.log("Status: " + message.message_id);

  }).catch((err) => {
      alert(err);
  })
  };

  useEffect(() => {
    getMessage();
  }, [id]);


  const editMessage = async (id) => {

    const newMessage = {
      message_id: id,
      sender: { id: localStorage.getItem("user_id").toString() },
      message,
      sentDate: currentDate
    };
    console.log(newMessage);
    await axios
      .put("http://localhost:8081/messages/" + id, newMessage, options)
      .then(() => {
         getMessage();
        // setState(!state);
        // setShow(false);
        navigate("/messenger");
      })
      .catch((err) => {
        console.log(err);
      });

};

  const goBack = () => {
    navigate('/messenger');
  }

  return (
    <div >
      <Dialog open={true} >
        <DialogTitle>Edit Message</DialogTitle>
        <button onClick={() => goBack()}
        style={{fontSize:"40px", position:"absolute", top:"10px", right:"10px"}} >
        <IoCloseCircleSharp /></button>
        <DialogContent>
          <DialogContentText>
            Edit your message with a new message to send
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`${messages.message}`}
            type="text"
            fullWidth
            variant="standard"
             onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => editMessage(id)} className={message.trim().length === 0 ? 'edit-disabled-button' : ''} disabled={message.trim().length === 0}>Edit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }

export default MessageEdit;
