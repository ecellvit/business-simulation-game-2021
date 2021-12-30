import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";

//Contexts
import AuthContext from "../../store/auth-context";

//CSS
import "./DashBoard.css";

//Images
import crown from "../../resources/images/crown.svg";

function Member(props) {
  return (
    <p className="tname">{`${TrimName(
      props.teamData.Members[props.name].User.name
    )}`}</p>
  );
}

function MemberPhoto(props) {
  return (
    <img
      className={`t${props.name + 1}v1`}
      src={`${props.teamData.Members[props.name].User.photoURL}`}
      alt="user"
    />
  );
}

function TrimName(name) {
  if (name.length > 17) {
    let name1 = name.slice(0, 17);
    while (name1.charAt(name1.length - 1) !== " " && name1.length !== 0) {
      name1 = name1.slice(0, -1);
    }
    return name1;
  } else {
    return name;
  }
}

function TeamDisplay(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [teamData, setTeamData] = useState({
    TeamName: "",
    Leader: { User: { name: "", photoURL: "", _id: "" } },
  });
  const [showTeamDetails, setShowTeamDetails] = useState(false);
  const [numOfMembers, setNumOfMembers] = useState(0);

  // fetching user's team data
  useEffect(() => {
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/public/getUserTeam`,
      {
        method: "POST",
        body: JSON.stringify({
          userID: authCtx.id === null ? "61a3f2eeb151d2972b2ad1e7" : authCtx.id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        setTeamData(data);
        props.roundOneStarted(
          data.RoundOneAttemptedQuestions.length > 0 &&
            data.RoundOneAttempted === false
        );
        props.roundOneCompleted(
          data.RoundOneAttempted && !data.RoundTwoAttempted
        );
        authCtx.roundHandler(data.RoundOneAttempted, data.RoundTwoAttempted);
        props.roundTwoCompleted(data.RoundTwoAttempted);
        setNumOfMembers(data.Members.length);
        setShowTeamDetails(true);
        authCtx.setTeam(data._id);
        props.changeIsLoading();
      })
      .catch((err) => console.log(err));
  }, []);

  // storing team leader's data
  useEffect(() => {
    authCtx.leaderHandler(teamData.Leader.User._id)
  }, [teamData]);

  return (
    <div className="">
      {showTeamDetails && (
        <div>
          <p class="yteam">{teamData.TeamName}</p>

          <img class="t1v1" src={teamData.Leader.User.photoURL} alt="" />
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
    </div>
  );
}

export default TeamDisplay;
