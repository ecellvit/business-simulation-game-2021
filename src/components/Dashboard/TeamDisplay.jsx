import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import "./DashBoard.css";

function Member(props) {
  console.log(props.name);
  return (
    <div>
      <p>{`Member ${props.name + 1}: ${
        props.teamData.Members[props.name].User.name
      }`}</p>
    </div>
  );
}

function TeamDisplay() {
  const [teamData, setTeamData] = useState({
    TeamName: "",
    Leader: { User: { name: "" } },
  });
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [numOfMembers, setNumOfMembers] = useState(0);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://127.0.0.1:2000/api/public/getUserTeam?userID=${authCtx.id}`)
      .then((response) => response.json())
      .then((data) => {
        setTeamData(data);
        setNumOfMembers(data.Members.length);
        console.log(data.Members.length);
        setShowTeamDetails(true);
        authCtx.setTeam(data._id)
      });
  }, [showTeamDetails, authCtx.id]);

  return (
    <div className="TeamDisplay__main--div">
      {showTeamDetails && (
        <div>
          <h1>My Team Details</h1>
          <p>Team Name: {teamData.TeamName}</p>
          <p>Leader: {teamData.Leader.User.name}</p>
          {numOfMembers > 0 ? <Member teamData={teamData} name={0} /> : null}
          {numOfMembers > 1 ? <Member teamData={teamData} name={1} /> : null}
          {numOfMembers > 2 ? <Member teamData={teamData} name={2} /> : null}
          {numOfMembers > 3 ? <Member teamData={teamData} name={3} /> : null}
        </div>
      )}
    </div>
  );
}

export default TeamDisplay;
