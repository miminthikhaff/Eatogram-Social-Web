import React, { Component, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Post from "../Posts/Post";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Avatar, Dialog } from "@material-ui/core";

const Profile = (props) => {
  const cookies = new Cookies();
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});
  // const [_id, setUser_id] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [profilePic, setProfilePic] = useState();
  // const [bio, setBio] = useState("");

  // const [state, setState] = useState(false);

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

  useEffect(() => {
    async function getUserDetails() {
      await getUser();
    }
    getUserDetails();
  }, [modal]);

  async function getUser() {
    await axios
      .get("http://localhost:8081/api/users/" + auth.user.user_id, options)
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div>
      <NavBar />
      <div className="h-screen">
        <div className="mt-14 shadow bg-white h-screen">
          {/* PROFILE HEADER */}
          <ProfileHeader setModal={setModal} modal={modal} />
          {/* END PROFILE HEADER */}

          {/* // CONTENT */}
          <div>
            <div className="bg-blue-100 ">
              <div className="flex justify-center h-screen">
                {/* LEFT */}
                <div>
                  {/* // INTRO */}
                  <div className="mr-12 mt-4">
                    <div
                      className="p-4 shadow rounded-lg bg-white w-200"
                      id="intro"
                    >
                      <h1 className="font-bold text-xl">Bio</h1>
                      <hr/>
                      <h2 className="font- text-xl">
                        <b>Name :</b> {auth.user.username}
                      </h2>
                      <h2 className="font- text-xl">
                        <b>Name :</b> {user.firstName + " " + user.lastName}
                      </h2>
                      <h2 className="font- text-xl">
                        <b>Bio :</b> {user.bio}
                      </h2>
                    </div>
                  </div>
                  {/* // END INTRO */}
                </div>
                {/* END LEFT */}

              </div>
            </div>
          </div>
          {/* // END CONTENT */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
