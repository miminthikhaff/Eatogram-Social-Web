import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Authentication/auth";
import axios from "axios";
import Cookies from "universal-cookie";

// styles
import "./SelectCategory.css";
import "../Login/Login.css";
import "../Login/LoginMobile.css";
import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { FaTimes, FaCheck } from "react-icons/fa";
import { IoHeartSharp, IoChatbubbleOutline } from "react-icons/io5";
import { RiArrowRightLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function Register() {
  const regex = {
    email: /^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$/,
    password: /^(.{6,})*$/,
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [inputCategories, setInputCategories] = useState([]);
  const [registerFormCount, setRegisterFormCount] = useState(1);
  const [valid, setValid] = useState(null);
  const navigate = useNavigate();

  const cookies = new Cookies();

  const registerPostData =
    registerFormCount === 1
      ? {
          image: "./assets/register/form_bg_2.jpg"
        }
      : {
          image: "./assets/register/form_bg_21.jpg"
        };
  async function saveUserHandler(e) {
    e.preventDefault();
    if (registerFormCount === 1) {
      if (
        regex.email.test(email) &
        regex.password.test(password) &
        (cpassword === password)
      ) {
        setRegisterFormCount(2);
      } else {
        setValid("Invalid Details");
      }
    } else if (registerFormCount === 2) {
      const newUser = {
        email,
        password,
        firstname,
        lastname,
        username,
        interestedCategories: inputCategories,
      };
      await axios
        .post("http://localhost:8081/api/register", newUser)
        .then((res) => {
          if (res.data.token) {
            cookies.set("token", res.data.token);
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err?.response?.status === 500) {
            toast.error("Cannot contact server at the moment, try again later");
          } else if (err?.response?.status === 403) {
            toast.warning("User already exists with email " + email);
          } else {
            console.log(err);
          }
        });
    }
  }

  useEffect(() => {
    setValid(null);
  }, [email, password, cpassword]);

  function RegisterForm1() {
    return (
      <form className="login_container__form register">
        {/* <img
          className="login_container__form__logo"
          src="./assets/login/Flavorgram_cropped_with_white_bg.png"
          alt="flavorgram"
        /> */}
        <h1>
          Lets <span className="text__icon"></span>create your
          <br />
          <span className="gradient"></span> account here!
        </h1>
        <label id="cpassword">
          Email{" "}
          <span
            style={
              !regex.email.test(email)
                ? {
                    color: "var(--dark_red)",
                  }
                : {
                    color: "var(--green)",
                  }
            }
            className="validity"
          >
            {email &&
              (regex.email.test(email) ? (
                <FaCheck color="var(--green)" />
              ) : (
                <>
                  <FaTimes color="var(--dark_red)" /> Invalid Email
                </>
              ))}
          </span>
        </label>
        <input
          type="email"
          placeholder="Enter your mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label id="cpassword">
          Password{" "}
          <span
            style={
              !regex.password.test(password)
                ? {
                    color: "var(--dark_red)",
                  }
                : {
                    color: "var(--green)",
                  }
            }
            className="validity"
          >
            {password &&
              (regex.password.test(password) ? (
                <FaCheck color="var(--green)" />
              ) : (
                <>
                  <FaTimes color="var(--dark_red)" /> Should have atleast 6
                  characters
                </>
              ))}
          </span>
        </label>
        <input
          type="password"
          placeholder="Enter Your password"
          value={password}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <label id="cpassword">
          Confirm Password{" "}
          <span
            style={
              cpassword !== password
                ? {
                    color: "var(--dark_red)",
                  }
                : {
                    color: "var(--green)",
                  }
            }
            className="validity"
          >
            {cpassword &&
              (cpassword === password ? (
                <FaCheck color="var(--green)" />
              ) : (
                <FaTimes color="var(--dark_red)" />
              ))}
            {cpassword &&
              (cpassword !== password
                ? "Passwords don't match"
                : "Passwords match")}
          </span>
        </label>

        <input
          type="password"
          placeholder="Enter your password again"
          value={cpassword}
          onChange={(e) => setCPassword(e.target.value)}
        />
        <button
          style={valid ? { backgroundColor: "var(--red)" } : null}
          onClick={(e) => saveUserHandler(e)}
        >
          {valid ? (
            <>{valid}</>
          ) : (
            <>
              Create account <FiArrowRight className="button_icon" />
            </>
          )}
        </button>
        <div className="login_container__form__separator">Or Continue with</div>
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
        <Link className="link" to={"/login"}>
          Already have an account?{" "}
          <RiArrowRightLine className="link__icon" />
        </Link>
      </form>
    );
  }

  const categories = [
    "Traditionally prepared",
    "Do-It-Yourself",
    "Gourmet",
    "Street Food",
    "Indian Cuisine",
    "Chinese Cuisine",
    "Michelin chef",
    "Fast-food",
  ];

  function SelectCategories() {
    function selectCategoryHandler(c) {
      if (inputCategories.includes(c)) {
        setInputCategories(inputCategories.filter((cat) => cat !== c));
      } else {
        setInputCategories([...inputCategories, c]);
      }
    }
    return (
      <ul className="register__select_category">
        {categories.map((c) => {
          return (
            <li
              style={
                inputCategories.includes(c)
                  ? {
                      background:
                        "linear-gradient(45deg, rgb(255, 170, 22), rgb(247, 34, 34))",
                      color: "var(--light)",
                    }
                  : null
              }
              onClick={() => selectCategoryHandler(c)}
              className="register__select_category__option"
              key={c}
            >
              {c}
            </li>
          );
        })}
      </ul>
    );
  }

  function RegisterForm2() {
    return (
      <form className="login_container__form register register1">
        {/* <img
          className="login_container__form__logo"
          src="./assets/login/Flavorgram_cropped_with_white_bg.png"
          alt="flavorgram"
        /> */}
        <h1>
          Tell us more about
          <br /> <span className="gradient">yourself</span>
        </h1>
        <div className="login_container__form__social_logins">
          <label>
            First name
            <input
              type="text"
              placeholder="Tommas"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
            Last name
            <input
              type="text"
              placeholder="Shelby"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
        </div>
        <label>Enter your username</label>
        <input
          type="text"
          placeholder="Tommas_Shelby"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* <label>Categories you are interested in ...</label> */}
        {/* <SelectCategories /> */}
        <div className="login_container__form__social_logins">
          <button
            onClick={(e) => setRegisterFormCount(1)}
            className="register2__register"
          >
            <FiArrowLeft className="button_icon" /> Go Back
          </button>
          <button
            onClick={(e) => saveUserHandler(e)}
            className="register2__register"
          >
            Register <FiArrowRight className="button_icon" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="custom_container register">
      <img className="container__background" src={registerPostData.image} />
      <div className="login_container register">
        <div className="login_container__post register">
          <div className="login_container__post__details register">
            
           
          </div>
          <img src={registerPostData.image} />
        </div>

        {registerFormCount === 1 ? RegisterForm1() : RegisterForm2()}
      </div>
    </div>
  );
}
