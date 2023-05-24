import { Avatar, Dialog } from "@material-ui/core";
import "./StatusBar.css";
import statusimg from "../../images/pp1.png";
import paperClip from "../../images/paperclip.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import StatusAdd from "./StatusUpdate";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "./config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


function StatusBar() {
  const [status, setStatus] = useState([]); //Status is the state variable and setStatus is the function to update the state variable
  const [user_id, setUser_id] = useState("");
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [uploadImg, setUploadImg] = useState(null);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  var [timestamp, setTimestamp] = useState("");

  const [state, setState] = useState(false);

  var currentDate = new Date().toISOString();
  const objectId = null;

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

  const getStatus = async () => {
    //getStatus is the function to get the data from the backend
    if (localStorage.getItem("user_id")) {
      axios
        .get("http://localhost:8081/status", options)
        .then((res) => {
          setStatus(res.data); //setStatus is used to update the state variable
          setUser_id(res.data.user_id);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setStatus(null);
    }
  };

  const deleteStatus = async (id) => {
    await axios
      .delete("http://localhost:8081/status/" + id, options)
      .then(() => {
        getStatus();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    //useEffect is used to call the function getStock
    if(!localStorage.getItem("user_id")){
    localStorage.setItem("user_id", auth.user.id); //<-key and value is passed, user id gotten from login
    }
    getStatus();
  }, [state]);

  const openDialog = (event) => {
    setImage(event.target.files[0]);
    setUploadImg(URL.createObjectURL(event.target.files[0]));
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const uploadToFirebase = async () => {
    

    const imageRef = ref(storage, `images/${image.name}`);
    console.log(imageRef);

    timestamp = currentDate;

    await uploadBytes(imageRef, image)
      .then(() => {
        console.log("Uploaded images");
      })
      .catch((err) => {
        console.log(err);
      });

    await getDownloadURL(ref(storage, `images/${image.name}`))
      .then(async (url) => {
        console.log(url);

        // setUser_id()

        const newStatus = {
          // status_id:"12345",
          user_id: { id: localStorage.getItem("user_id").toString() },
          statusPath: url,
          caption,
          timestamp,
        };
        // console.log(newStatus);
        await axios
          .post("http://localhost:8081/status", newStatus, options)
          .then(() => {
            // getStatus();
            setState(!state);
            setShow(false);
            // navigate("/home");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const currentTime = new Date();

  const filteredItems = status.filter((item) => {
    const itemTime = new Date(item.timestamp);
    const timeDifference = currentTime - itemTime;
    const timeThreshold = 24 * 60 * 60 * 1000; // 30 minutes in milliseconds
    return timeDifference < timeThreshold;
  });
  

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={show}
      >
        <div className="story_add_header" >Add Story</div>
        <textarea
          className="edit_add_textbox"
          placeholder="Enter a caption...." maxLength="100"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <img src={uploadImg} className="upload_preview" />
        <div style={{backgroundColor:"black", textAlign:"center"}}>
        <input
          type="button"
          value="Share Story"
          className="upload_button"
          onClick={(event) => uploadToFirebase(event)}
        />
        </div>
      </Dialog>

      <div className="statusbar_container">
        <div className="fileupload">
          <label for="file-upload-status">
            <img
              className="statusbar__upload"
              src="https://cdn-icons-png.flaticon.com/512/6711/6711415.png"
              width="60px"
              height="60px"
            />
          </label>
          <input
            type="file"
            hidden
            id="file-upload-status"
            onChange={(event) => openDialog(event)}
          />
        </div>

        {console.log(status)}

        <div style={{overflowX:"scroll", width:"100%", display:"flex",marginLeft:"2rem"}}>
          
          {filteredItems &&
            filteredItems.map((item, index) => (
              <div>           
                <Link to={`/status/viewOne/${JSON.stringify(item.status_id).replace(/\"/g, '')}`} style={{ textDecoration: 'none' }}s>
                  <div className="status">
                    <div
                      className="statusbar_status"
                      style={{ backgroundImage: `url(${item.statusPath})` }}
                    />
                    <div className="statusbar_text">
                      {`${item.user_id.username}`}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
