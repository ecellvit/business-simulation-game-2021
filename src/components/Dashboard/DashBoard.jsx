import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
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

  const checkTeamHandler = () => {
    fetch(`http://127.0.0.1:2000/api/public/hasTeam?userID=${authCtx.id}`)
      .then((response) => response.json())
      .then((data) => {
        setHasTeam(data);
        setShowTeam(true);
      }).catch(err=>alert(err));
  };

  return (
    <div style={{ color: "white" }}>
      <li>UserName: {authCtx.name}</li>
      <li>Email: {authCtx.emailid}</li>

      <button
        onClick={checkTeamHandler}
        style={{ margin: "3% 50%", fontSize: "30px" }}
      >
        hasTeam
      </button>
      {!hasTeam && (
        <div className="TeamListAndForm">
          <TeamList />
          <CreateTeamForm />
        </div>
      )}
      {hasTeam && showTeam && <TeamDisplay />}
    </div>
  );
}

export default DashBoard;
