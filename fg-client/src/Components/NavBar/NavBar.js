import React, { useState } from "react";
import "./NavBar.css";
import { Grid } from "@material-ui/core";
import app_logo from "../../images/Flavorgram_copy.png";
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import Avatar from "@material-ui/core/Avatar";
import pp from "../../images/pp1.png";
import { Link } from "react-router-dom";
import Notifications from "../Notification/Notifications";

export default function NavBar(props) {
  const [notificationsIsOpen, setNotificationsIsOpen] = useState(false);

  function notificationsClickHandler() {
    setNotificationsIsOpen(!notificationsIsOpen);
  }
  return (
    <div>
      <div className="navbar_barContent">
        <Grid container>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <Link to="/home">
              <img className="navbar_logo" src={app_logo} width="220px" />
            </Link>
          </Grid>

          <Grid item xs={3}>
            <input
              text="text"
              className="navbar_seacrhBar"
              placeholder="search"
            />
          </Grid>
          <Grid item xs={3} style={{ display: "flex" }}>
            <Link to="/home">
              <img className="navbar_img" src={home} width="30px" />
            </Link>
            {/* <Link to="/messenger">
              <img className="navbar_img" src={message} width="30px" />
            </Link> */}
            <img className="navbar_img" src={find} width="30px" />
            <button onClick={notificationsClickHandler}>
              <img className="navbar_img" src={react} width="30px" />
            </button>
            <Link to="/profile">
              <Avatar
                src={pp}
                className="navbar_img"
                style={{ maxWidth: "25px", maxHeight: "25px" }}
              />
            </Link>
            <Link to="/logout">
              <button className="danger" style={{ "margin-top": ".7rem" }}>
                Logout
              </button>
            </Link>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
      {notificationsIsOpen && <Notifications />}
    </div>
  );
}
