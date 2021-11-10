import React, { useState, useEffect, useContext } from "react";
import "./DashBoard.css";
import AuthContext from "../../store/auth-context";
import TeamJoin from "./TeamJoin";

function Team(teamData) {
  return (
    <div className="individual__team">
      <TeamJoin
        key={teamData._id}
        teamName={teamData.TeamName}
        teamLeader={teamData.Leader.User.name}
        teamSize={teamData.Members.length}
      ></TeamJoin>
      <button style={{ marginLeft: "80px" }}>JOIN</button>
    </div>
  );
}

function TeamList(props) {
  const [teamsData, setTeamsData] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch("http://127.0.0.1:2000/api/public/getAllTeams")
      .then((response) => response.json())
      .then((data) => {
        setTeamsData(data);
      }).catch(err=>alert(err));
  }, []);

  return (
    <div className="TeamList__main--div">
      <h1>Teams Available</h1>
      {teamsData.map(Team)}
    </div>
  );
}

export default TeamList;
