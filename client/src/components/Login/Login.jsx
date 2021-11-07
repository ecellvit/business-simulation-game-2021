import React, { useState, useEffect, useCallback } from "react";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
require('dotenv').config();
const process = require('process');


function Login() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [showLoggedIn, setShowLoggedIn] = useState(true);
  const [showLoggedOut, setShowLoggedOut] = useState(false);
  const [userId,setUserId] = useState();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoURL: "",
  });

  const onLoginSuccess = (response) => {
    setisLoggedIn(true);
    setUserData({
      name: response.profileObj.name,
      email: response.profileObj.email,
      photoURL: response.profileObj.imageUrl,
    });
    console.log(response);
    console.log("Login Sucess");
    setShowLoggedIn(false);
    setShowLoggedOut(true);
  };
  const onLoginFailure = (response) => {
    setisLoggedIn(false);
    console.log("Login Failure");
  };
  const onLogoutSuccess = (response) => {
    setisLoggedIn(false);
    console.log(response);
    console.log("Logout Sucess");
    setShowLoggedIn(true);
    setShowLoggedOut(false);
  };
  const onLogoutFailure = (response) => {
    setisLoggedIn(true);
    console.log(response);
    console.log("Logout Failure");
  };

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
  // }, [userData]);

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


  const sendUserData = function () {
    fetch("http://127.0.0.1:2000/api/public/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if(isLoggedIn && userData.name !==' '){
  //   sendUserData();
  // }
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     sendUserData();
  //   }
  // }, [sendUserData, userData,isLoggedIn]);
console.log(JSON.stringify(userData));
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {showLoggedIn ? (
        <GoogleLogin
          clientId= "438764085343-k4antacid4gdorklqkhqrmnr2ak1ikq2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={"single_host_origin"}
        />
      ) : null}
      {showLoggedOut ? (
        <GoogleLogout
          clientId="438764085343-k4antacid4gdorklqkhqrmnr2ak1ikq2.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          onFailure={onLogoutFailure}
        ></GoogleLogout>
      ) : null}
      {isLoggedIn ? (
        <Link to="/Mainpage" onClick={sendUserData}>
          Continue
        </Link>
      ) : null}
    </div>
  );
}

export default Login;

// const [movies, setMovies] = useState(["hey"]);

// const movie = [{
//   movieName: "krish",
//   movieId: 102,
// }];

// async function fetchMoviesHandler() {
//   const response = await fetch(
//     "https://react-http-learn-56b47-default-rtdb.firebaseio.com/movies.json"
//   );
//   const data = await response.json();
//   console.log(data.results);
//   setMovies(data.results);
// }

// async function addMovieHandler(movie) {
//   const response = await fetch(
//     "https://react-http-learn-56b47-default-rtdb.firebaseio.com/movies.json",
//     {
//       method: 'POST',
//       body: JSON.stringify(movie),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// }
