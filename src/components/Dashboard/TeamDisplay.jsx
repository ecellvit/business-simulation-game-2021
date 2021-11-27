import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import "./DashBoard.css";

import crown from "../../resources/images/crown.svg";

function Member(props) {
  // console.log(props.name);
  return (
    <p className="tname">{`${TrimName(props.teamData.Members[props.name].User.name)}`}</p>
  );
}
function MemberPhoto(props) {
  return (
    <img
      className={`t${props.name+1}v1`}
      src={`${props.teamData.Members[props.name].User.photoURL}`}
      alt="user"
    />
  );
}
function TrimName(name){
  // console.log(name);
  if(name.length>17){ 
    let name1 = name.slice(0,17);
    while (name1.charAt(name1.length-1)!== " " && name1.length!==0){
      name1 = name1.slice(0,-1);
      // console.log(name1);
    }
    return name1;
  }
  else{
    return name;
  }
}
function TeamDisplay() {
  const [teamData, setTeamData] = useState({
    TeamName: "",
    Leader: { User: { name: "",photoURL:"",_id:"" } },
  });
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [numOfMembers, setNumOfMembers] = useState(0);

  const authCtx = useContext(AuthContext);
  // http://127.0.0.1:2000/api/public/getUserTeam?userID=${authCtx.id}
  // https://futurepreneursbackend.herokuapp.com/api/public/getUserTeam?userID=${authCtx.id}

  useEffect(() => {
    fetch(`https://futurepreneursbackend.herokuapp.com/api/public/getUserTeam?userID=${authCtx.id}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setTeamData(data);
        setNumOfMembers(data.Members.length);
        // console.log(data.Members.length);
        setShowTeamDetails(true);
        authCtx.setTeam(data._id);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("leaderID",teamData.Leader.User._id)
  }, [teamData])

  return (
    <div className="">
      {showTeamDetails && (
        <div>
          <p class="yteam">{teamData.TeamName}</p>

          <img class="t1v1" src={teamData.Leader.User.photoURL} alt="" />
          {/* <img class="t1v2" src={vector1} alt="" />
          <img class="t1v3" src={vector2} alt="" /> */}
          <img class="t1v4" src={crown} alt="" />
          
          <p class="tname">{TrimName(teamData.Leader.User.name)}</p>
          {numOfMembers > 1 ? (
            <div>
              <MemberPhoto teamData={teamData} name={1} />
              <Member teamData={teamData} name={1} />
            </div>
          ) : null}
          {numOfMembers > 2 ? (
            <div>
              <MemberPhoto teamData={teamData} name={2} />
              <Member teamData={teamData} name={2} />
            </div>
          ) : null}
          {numOfMembers > 3 ? (
            <div>
              <MemberPhoto teamData={teamData} name={3} />
              <Member teamData={teamData} name={3} />
            </div>
          ) : null}
        </div>
      )}

      {/* {showTeamDetails && (
        <div>
          <h1>My Team Details</h1>
          <p>Team Name: {teamData.TeamName}</p>
          <p>Leader: {teamData.Leader.User.name}</p>
          {numOfMembers > 0 ? <Member teamData={teamData} name={0} /> : null}
          {numOfMembers > 1 ? <Member teamData={teamData} name={1} /> : null}
          {numOfMembers > 2 ? <Member teamData={teamData} name={2} /> : null}
          {numOfMembers > 3 ? <Member teamData={teamData} name={3} /> : null}
        </div>
      )} */}
    </div>
  );
}

export default TeamDisplay;
