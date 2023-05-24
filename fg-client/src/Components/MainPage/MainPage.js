import { Avatar, Dialog } from "@material-ui/core";
import "./MainPage.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Authentication/auth";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../StatusBar/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uploadImage from "../../images/upload.png";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { RiHeart3Line, RiHeart3Fill, RiChat1Line } from "react-icons/ri";
import Comment from "../Comment/Comment";

function MainPage() {
  const [post, setPost] = useState([]); //Post is the state variable and setPost is the function to update the state variable
  const [user_id, setUser_id] = useState("");
  const cookies = new Cookies();
  const [show, setShow] = useState(false);
  const [uploadImg, setUploadImg] = useState(null);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  var [timestamp, setTimestamp] = useState("");
  const [isCommentOpen, setIsCommentOpen] = useState();

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

  const getPost = async () => {
    //getPost is the function to get the data from the backend
    if (localStorage.getItem("user_id")) {
      axios
        .get("http://localhost:8081/post", options)
        .then((res) => {
          setPost(res.data); //setPost is used to update the state variable
          setUser_id(res.data.user_id);
          console.log(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      setPost(null);
    }
  };

  const deletePost = async (id) => {
    await axios
      .delete("http://localhost:8081/post/" + id, options)
      .then(() => {
        getPost();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    //useEffect is used to call the function getStock
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("user_id", auth.user.id); //<-key and value is passed, user id gotten from login
    }
    getPost();
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

        const newPost = {
          // post_id:"12345",
          user_id: { id: localStorage.getItem("user_id").toString() },
          postPath: url,
          caption,
          timestamp,
        };
        // console.log(newPost);
        await axios
          .post("http://localhost:8081/post", newPost, options)
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

  const filteredItems = post.filter((item) => {
    const itemTime = new Date(item.timestamp);
    const timeDifference = currentTime - itemTime;
    const timeThreshold = 24 * 60 * 60 * 1000; // 30 minutes in milliseconds
    return timeDifference < timeThreshold;
  });

  return (
    <div>
      <Dialog
        onClose={handleClose}
        style={{ backgroundColor: "black" }}
        aria-labelledby="simple-dialog-title"
        open={show}
      >
        <div className="upload_header">Add Post</div>
        <input
          type="text"
          className="upload_textbox"
          placeholder="Enter a caption...."
          onChange={(e) => {
            setCaption(e.target.value);
          }}
        />
        <img src={uploadImg} className="upload_preview" />
        <input
          type="button"
          value="Share Post"
          className="upload_button"
          onClick={(event) => uploadToFirebase(event)}
        />
      </Dialog>

      <div className="mainpage__container">
        <div className="mainpage__divider"></div>
        <div className="fileupload">
          <label for="file-upload-post">
            <img className="mainpage__uploadicon" src={uploadImage} />
          </label>
          <input
            type="file"
            hidden
            id="file-upload-post"
            onChange={(event) => openDialog(event)}
          />
        </div>
        <div className="mainpage__divider"></div>
        {console.log(post)}
      </div>
      <div className="post_container">
        {filteredItems &&
          filteredItems.map((item, index) => (
            <div>
              {/* <Link to={`/status/viewOne/${JSON.stringify(item.status_id).replace(/\"/g, '')}`}></Link> */}

              <div className="post">
                <div className="post_header">
                  <div className="post_username">{item.user_id.username}</div>
                </div>
                <div
                  className="postContainer_post"
                  style={{
                    backgroundImage: `url(${item.postPath})`,
                    backgroundSize: `cover`,
                  }}
                />
                <div className="post_footer">
                  <div className="post_caption">{`${item.caption}`}</div>
                  <button
                    className="post_comment"
                    onClick={() =>
                      setIsCommentOpen({
                        title: item.caption,
                        author: item.user_id.id,
                        post_id: item.post_id,
                      })
                    }
                  >
                    <RiChat1Line />
                  </button>
                  {
                    <button className="post_comment">
                      <RiHeart3Line />
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
      </div>
      {isCommentOpen != null && (
        <Comment
          postTitle={isCommentOpen.title}
          setIsCommentOpen={setIsCommentOpen}
          postId={isCommentOpen.post_id}
          postAuthor={isCommentOpen.author}
          commentResourceLink={"http://localhost:8081/comment"}
        />
      )}
    </div>
  );
}

export default MainPage;
