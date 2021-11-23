import React, { useState, useEffect, useContext } from "react";
import GoogleLogin from "react-google-login";
// import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Box from "@mui/material/Box";
import illus from "../../resources/images/Group.svg";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";
import "./Login.css";

import { Nav } from "../nav";

function Login() {
  const [isLoggedInGoogle, setisLoggedInGoogle] = useState(false);
  const [showLoggedIn, setShowLoggedIn] = useState(true);
  const [showLoggedOut, setShowLoggedOut] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });
  const [open, toggle] = useState(false);
  const [ref, { width }] = useMeasure();
  const props1 = useSpring({
    config: { friction: 35 },
    to: { width: open ? width : 0 },
  });

  const authCtx = useContext(AuthContext);
  
  const onLoginSuccess = (response) => {
    setisLoggedInGoogle(true);
    setUserData({
      name: response.profileObj.name,
      email: response.profileObj.email,
      photoURL: response.profileObj.imageUrl,
    });
    console.log("Login Sucess");
    localStorage.setItem("isGoogleLogin", "yes");
    localStorage.setItem("name", response.profileObj.name);
    localStorage.setItem("email", response.profileObj.email);
    localStorage.setItem("photoURL", response.profileObj.imageUrl);
    setShowLoggedIn(false);
    // setShowLoggedOut(true);
  };

  useEffect(() => {
    setUserData({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      photoURL: localStorage.getItem("photoURL"),
    });
  }, []);

  const onLoginFailure = (response) => {
    setisLoggedInGoogle(false);
    console.log("Login Failure");
  };

  // const onLogoutSuccess = (response) => {
  //   setisLoggedInGoogle(false);
  //   setShowLoggedIn(true);
  //   setShowLoggedOut(false);
  //   authCtx.logout();
  // };

  // const onLogoutFailure = (response) => {
  //   setisLoggedInGoogle(true);
  //   console.log(response);
  //   console.log("Logout Failure");
  // };

  // https://futurepreneursbackend.herokuapp.com/api/public/createUser
  const sendUserData = function () {
    fetch("https://futurepreneursbackend.herokuapp.com/api/public/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        authCtx.login(
          data._id,
          userData.name,
          userData.email,
          userData.photoURL
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (authCtx.isLoggedIn === true) {
      setShowLoggedOut(true);
      setShowLoggedIn(false);
    }
  }, [authCtx.isLoggedIn]);

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
            {/* <div
              ref={ref}
              className="button__main"
              onMouseOver={() => toggle(true)}
              onMouseOut={() => toggle(false)}
            >
              <animated.div className="button__fill" style={props1} />
              <p
                className="buttondesc__main"
                style={{ color: open ? "white" : "black" }}
              >
                Let Me In
              </p>
            </div> */}
          </Link>
        ) : null}
      </div>

      {/* {showLoggedOut ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_GOOGLE_ID}`}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          onFailure={onLogoutFailure}
        ></GoogleLogout>
      ) : null} */}
    </div>
  );
}

export default Login;

// const sendUserData = useCallback(async function () {
//   const response = await fetch(
//     "http://127.0.0.1:2000/api/public/createUser",
//     {
//       method: "POST",
//       body: JSON.stringify(userData),
//       headers: {
//         "Content-Type": "application/json",
//         'Accept': 'application/json'
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// }, []);

// const sendUserData = async function () {
//   const response = await fetch(
//     "http://127.0.0.1:2000/api/public/createUser",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",

//       },
//       body: JSON.stringify(userData),
//     }
//   );
//   const data = await response.json();
// };
