import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

// Components
import { Nav } from "../nav";
import GoogleLogin from "react-google-login";

// Contexts
import AuthContext from "../../store/auth-context";

// CSS
import "./Login.css";

// Images
import illus from "../../resources/images/Group.svg";

function Login() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [isLoggedInGoogle, setisLoggedInGoogle] = useState(false);
  const [showLoggedIn, setShowLoggedIn] = useState(true);
  const [showLoggedOut, setShowLoggedOut] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
    uID: 0,
  });

  //collecting user data from google to send it further to backend
  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      photoURL: localStorage.getItem("photoURL"),
      uID: localStorage.getItem("uID"),
    });
  }, []);

  //for changing login and let me in button visibility states
  useEffect(() => {
    if (authCtx.isLoggedIn === true) {
      setShowLoggedOut(true);
      setShowLoggedIn(false);
    }
  }, [authCtx.isLoggedIn]);

  // functions
  const onLoginSuccess = (response) => {
    const uid = Math.floor(Math.random() * 202123);
    setisLoggedInGoogle(true);
    setUserData({
      name: response.profileObj.name,
      email: response.profileObj.email,
      photoURL: response.profileObj.imageUrl,
      uID: uid,
    });
    localStorage.setItem("isGoogleLogin", "yes");
    localStorage.setItem("name", response.profileObj.name);
    localStorage.setItem("uID", uid);
    localStorage.setItem("email", response.profileObj.email);
    localStorage.setItem("photoURL", response.profileObj.imageUrl);
    setShowLoggedIn(false);
  };

  const onLoginFailure = (response) => {
    setisLoggedInGoogle(false);
    console.log("Login Failure");
  };

  const sendUserData = function () {
    fetch("https://futurepreneursbackend.herokuapp.com/api/public/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 300) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        if (data === 300) {
          alert("Sorry, we can't find your registration");
          history.replace("/Error");
        }
        authCtx.login(
          data._id,
          userData.name,
          userData.email,
          userData.photoURL,
          userData.uID
        );
      })
      .catch((err) => {
        console.log(err);
        history.replace("/Error");
      });
  };

  return (
    <div>
      <Nav item1="Home" />
      <div
        className="loginpage__content--div"
        style={{ backgroundColor: "#040F0F", height: "100vh" }}
      >
        <img
          src={illus}
          alt={"illustration"}
          className="loginPageIllustration"
          viewBox="5 0 0 10"
        ></img>
        {localStorage.getItem("isGoogleLogin") !== "yes" && showLoggedIn ? (
          <GoogleLogin
            className="googleLoginButton"
            clientId={`${process.env.REACT_APP_GOOGLE_ID}`}
            buttonText="Login with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        ) : null}
        {isLoggedInGoogle || localStorage.getItem("isGoogleLogin") === "yes" ? (
          <Link
            to="/Dashboard"
            onClick={sendUserData}
            style={{ color: "white", textDecoration: "none" }}
          >
            <button type="button" className="button__main">
              <p className="buttondesc__main">Let Me In</p>
            </button>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Login;
