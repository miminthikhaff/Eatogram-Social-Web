import React from 'react'
import "./Conversations.css"

import { useAuth } from "../../Authentication/auth";
import Cookies from "universal-cookie";

const Conversations = (name) => {

  const cookies = new Cookies();
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

  return (
    <div className='conversations'>
        <img className='conversationImg' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt='' />
        <span className='conversationName'>{auth.user.username} </span>
    </div>
  )
}
  
export default Conversations;
