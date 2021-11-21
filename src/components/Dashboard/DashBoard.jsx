import React, { useState, useContext,useEffect } from "react";
import AuthContext from "../../store/auth-context";
import CreateTeamForm from "./CreateTeamForm";

import TeamList from "./TeamList";
import TeamDisplay from "./TeamDisplay";

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
  }).catch(err=>alert(err));
}, [])
  

  return (
    <div style={{ color: "black" }}>
      <li className="">UserName: {authCtx.name}</li>
      <li>Email: {authCtx.emailid}</li>
      <TeamDisplay />

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
  );
}

export default DashBoard;
