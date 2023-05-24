import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Components/HomePage/HomePage";
import "./App.css";
import Login from "./Views/Login/Login";
import RequireAuth from "./Components/Authentication/RequireAuth";
import Profile from "./Components/Profile/Profile";
import CheckAuth from "./Components/Authentication/CheckAuth";
import { useAuth } from "./Components/Authentication/auth";
import Logout from "./Components/Authentication/Logout";
import { ToastContainer } from "react-toastify";
import Sample from "./Views/Sample";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import Register from "./Views/Register/Register";
import StatusAdd from "./Components/StatusBar/StatusUpdate";
import StatusPreview from "./Components/StatusBar/StatusPreview";
import StatusUpdate from "./Components/StatusBar/StatusUpdate";
import Messenger from "./Components/Messages/Messenger/Messenger";
import MessageEdit from "./Components/Messages/Messenger/MessageEdit";
function App() {
  const cookies = new Cookies();
  const auth = useAuth();

  function checkCookie() {
    const user = cookies.get("user");
    const social = cookies.get("social");

    if (auth.user === null) {
      if (user & social) {
        auth.login(user, true);
      } else if (user & !social) {
        auth.login(user, false);
      }
    }
  }

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/home"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/register"
            element={
              <CheckAuth>
                <Register />
              </CheckAuth>
            }
          />

          <Route
            exact
            path="/sample"
            element={
              <RequireAuth>
                <Sample />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/logout"
            element={
              <RequireAuth>
                <Logout />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/"
            element={
              <CheckAuth>
                <Login />
              </CheckAuth>
            }
          />
          <Route
            exact
            path="/login"
            element={
              <CheckAuth>
                <Login />
              </CheckAuth>
            }
          />
          <Route
            exact
            path="/messenger"
            element={
              <RequireAuth>
                <Messenger />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/messenger/editMessage/:id"
            element={
              <RequireAuth>
                <MessageEdit />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route
            exact
            path="/post"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          <Route exact path="/status/viewOne/:id" element={<StatusPreview />} />

          <Route exact path="/status/update/:id" element={<StatusUpdate />} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
