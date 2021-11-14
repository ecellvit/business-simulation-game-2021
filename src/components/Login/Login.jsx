import React, { useState, useEffect, useContext } from "react";
import GoogleLogin from "react-google-login";
// import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function Login() {
  const [isLoggedInGoogle, setisLoggedInGoogle] = useState(false);
  const [showLoggedIn, setShowLoggedIn] = useState(true);
  const [showLoggedOut, setShowLoggedOut] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
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
    setShowLoggedIn(false);
    // setShowLoggedOut(true);
  };

  const onLoginFailure = (response) => {
    setisLoggedInGoogle(false);
    console.log("Login Failure");
  };

  console.log(showLoggedOut);
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
        console.log(data._id);
        authCtx.login(data._id, userData.name, userData.email,userData.photoURL);
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {localStorage.getItem("isGoogleLogin") !== "yes" || showLoggedIn ? (
        <GoogleLogin
          clientId={`${process.env.REACT_APP_GOOGLE_ID}`}
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : null}
      {/* {showLoggedOut ? (
        <GoogleLogout
          clientId={`${process.env.REACT_APP_GOOGLE_ID}`}
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          onFailure={onLogoutFailure}
        ></GoogleLogout>
      ) : null} */}
      {isLoggedInGoogle ? (
        <Link to="/Dashboard" onClick={sendUserData} style={{color:''}}>
          Continue
        </Link>
      ) : null}
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
