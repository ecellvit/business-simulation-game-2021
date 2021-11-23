import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import CreateTeamForm from "./CreateTeamForm";

import TeamList from "./TeamList";
import TeamDisplay from "./TeamDisplay";
import { Nav } from "../nav";
import "./DashBoard.css";

import arrow from "../../resources/images/arrow.svg";
import ellipse from "../../resources/images/Ellipse7.svg"

function DashBoard() {
  const authCtx = useContext(AuthContext);
  const [hasTeam, setHasTeam] = useState(true);
  const [showTeam, setShowTeam] = useState(false);
  // const [updateTeamList, setUpdateTeamList] = useState(1);

  // const updateList = () => {
  //   setUpdateTeamList(updateTeamList + 1);
  // };

  // `https://futurepreneursbackend.herokuapp.com/api/public/hasTeam?userID=${authCtx.id}`
  // `http://127.0.0.1:2000/api/public/hasTeam?userID=${authCtx.id}`

  useEffect(() => {
    fetch(`https://futurepreneursbackend.herokuapp.com/api/public/hasTeam?userID=${authCtx.id}`)
      .then((response) => response.json())
      .then((data) => {
        setHasTeam(data);
        setShowTeam(true);
      })
      .catch((err) => alert(err));
  }, []);

  return (
    <div >
      <Nav />
      <div style={{ color: "black" }} className="Dashboard__main--div">
        <div class="teamDetails">
          <p class="startTime">Starting In</p>
          <p class="time">12:60:49</p>
          <hr class="hr" />

          <TeamDisplay />
          <hr class="hr2"></hr>
          <p class="contactus">CONTACT US</p>

          <div class="tbox">
            <p class="rhead">Round 1</p>
            <p class="inst">Instructions</p>
            <p class="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p class="min">30 Mins</p>
            <button class="stbtn button">START</button>
            <input
              class="elp"
              type="image"
              name="eli"
              src={ellipse}
              alt="text"
            ></input>
            <img class="aro" src={arrow} alt=""></img>
          </div>
        </div>
        {/* <li className="">UserName: {authCtx.name}</li>
      <li>Email: {authCtx.emailid}</li> */}
        {/* <TeamDisplay /> */}

        {/* <button
        onClick={checkTeamHandler}
        style={{ margin: "3% 50%", fontSize: "30px" }}
      >
        hasTeam
      </button> */}
        {/* {!hasTeam && (
        <div className="TeamListAndForm">
          <TeamList />
          <CreateTeamForm />
        </div>
      )} */}
        {/* {hasTeam && showTeam && <TeamDisplay />} */}
      </div>
    </div>
  );
}

export default DashBoard;
