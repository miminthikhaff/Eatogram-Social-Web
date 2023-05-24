import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Components/Authentication/auth";
import axios from "axios";
import Cookies from "universal-cookie";

// styles
import "./Login.css";
import "./LoginMobile.css";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowRight } from "react-icons/fi";
import { IoHeartSharp, IoChatbubbleOutline } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";

export default function Login() {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();
  const cookies = new Cookies();
  const [buttonLoading, setButtonLoading] = useState(false);

  const loginPostData = {
    image: "./assets/login/form_bg.jpg",
    caption: "I am going to start a diet tomorrow 👀!",
    likes: "9832",
    comments: "234",
  };
  const loginPostbgData = {
    image: "./assets/login/form_bg2.jpg"
  };

  useEffect(() => {
    if (auth.user === null) {
      validateToken();
    }
  }, []);

  async function validateToken() {
    const token = cookies.get("token");
    // if there is a token validate it
    if (token != null) {
      await axios
        .get("http://localhost:8081/user", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          cookies.set("user", res.data);
          cookies.set("social", false);
          auth.login(res.data, false);
          toast.success("You are logged in as " + res.data.username);
        })
        .catch((err) => {});
    } else {
      // if there is no token, validate the social login token (JSESSIONID)
      await axios
        .get("http://localhost:8081/social", { withCredentials: true })
        .then((res) => {
          if (res.data.email) {
            cookies.set("user", res.data);
            cookies.set("social", true);
            auth.login(res.data, true);
            toast.success("You are logged in as " + res.data.username);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  async function login(e) {
    e.preventDefault();
    setButtonLoading(true);

    // authenticate user credentials
    await axios
      .post("http://localhost:8081/api/authenticate", {
        email: email,
        password: password,
      })
      .then(async (res) => {
        if (res.data.token) {
          cookies.set("token", res.data.token);
          await validateToken();
        }
      })
      .catch((err) => {
        if (err?.response?.status === 404 || err?.response?.status === 403) {
          toast.error("Invalid email or password");
        } else if (err?.response?.status === 500) {
          toast.error("Cannot contact server, please try again later");
        } else {
          console.log(err);
        }
      });
    setButtonLoading(false);
  }

  // return
  return (
    <div className="custom_container">
      <img className="container__background" src={loginPostbgData.image} />
      <div className="login_container">
        <div className="login_container__post">
          <div className="login_container__post__details">
            <div className="logiin_container__post__details__likes">
              {/* <span>
                <IoHeartSharp color="red" />
                {loginPostData.likes}
              </span> */}

              {/* <span>
                <IoChatbubbleOutline /> {loginPostData.comments}
              </span> */}
            </div>
            {/* <div className="login_container__post__details__title">
              {loginPostData.caption}
            </div> */}
          </div>
          <img src={loginPostData.image} />
        </div>

        <form className="login_container__form">
          {/* <img
            className="login_container__form__logo"
            src="./assets/login/Flavorgram_cropped_black.png"
            alt="flavorgram"
          /> */}
          {/* <img
            className="login_container__form__logo"
            src="./assets/login/Flavorgram_cropped_with_white_bg.png"
            alt="flavorgram"
          /> */}

          <h1>
            {/* <span className="text__icon">🍜</span> */}
            <span className="gradient"> Explore</span> for more?
          </h1>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={(e) => login(e)}>
            Login{" "}
            {buttonLoading ? (
              <BeatLoader color="var(--light)" size={7} />
            ) : (
              <FiArrowRight className="button_icon" />
            )}
          </button>
          <div className="login_container__form__separator">
            Or Continue with
          </div>
          <div className="login_container__form__social_logins">
            <a
              className="login_container__form__social_links"
              id="fb"
              href="http://localhost:8081/oauth2/authorization/facebook"
            >
              <img className="icon" src="./assets/login/facebook.png" />
              Facebook
            </a>
            <a
              id="google"
              className="login_container__form__social_links"
              href="http://localhost:8081/oauth2/authorization/google"
            >
              <img className="icon" src="./assets/login/google.png" />
              Google
            </a>
          </div>
          <Link className="link" to={"/register"}>
            Create an account..
            <RiArrowRightLine className="link__icon" />
          </Link>
        </form>
      </div>
    </div>
  );
}
