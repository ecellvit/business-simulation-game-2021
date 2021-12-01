import React, { useState } from "react";

const AuthContext = React.createContext({
  id: "",
  uID: "",
  name: "",
  emailid: "",
  photoURL: "",
  isLoggedIn: false,
  login: (id) => {},
  logout: () => {},
  setTeam: (teamID) => {},
  teamID: "",
  locationChange: false,
  round1Completed: false,
  round2Completed: false,
  roundHandler: (round1status, round2status) => {},
  leaderID: "",
  leaderHandler:()=>{}
});

export const AuthContextProvider = (props) => {
  const initialId = localStorage.getItem("id");
  const initialUId = localStorage.getItem("uID");
  const initialName = localStorage.getItem("name");
  const initialEmail = localStorage.getItem("email");
  const initialTeamID = localStorage.getItem("teamID");
  const initialPhotoURL = localStorage.getItem("photoURL");
  const initialLeaderID = localStorage.getItem("leaderID");

  const [id, setId] = useState(initialId);
  const [uID, setuID] = useState(initialUId);
  const [userName, setUserName] = useState(initialName);
  const [userEmailId, setUserEmailId] = useState(initialEmail);
  const [userPhotoURL, setUserPhotoURL] = useState(initialPhotoURL);
  const [userTeamId, setTeamEmailId] = useState(initialTeamID);
  const [location, setLocation] = useState(false);
  const [round1Completed, setround1Completed] = useState(false);
  const [round2Completed, setround2Completed] = useState(false);
  const [leaderID, setLeaderID] = useState(initialLeaderID);

  const userIsLoggedIn = !!id;
  //note to myself(palani)---> !!id means converting the truthy or falsy value to a true or false boolean value
  //if id is not empty string this will return true else false

  const loginHandler = (id, userName, userEmailId, userPhotoURL) => {
    setId(id === null ? "61a3f2eeb151d2972b2ad1e7" : id);
    setUserName(userName);
    setUserEmailId(userEmailId);
    setUserPhotoURL(userPhotoURL);
    localStorage.setItem("id", id);
    localStorage.setItem("name", userName);
    localStorage.setItem("email", userEmailId);
    localStorage.setItem("photoURL", userPhotoURL);
  };

  const leaderHandler = (leaderID)=>{
    setLeaderID(leaderID);
    localStorage.setItem("leaderID",leaderID)
  }

  const roundHandler = (round1status, round2status) => {
    setround1Completed(round1status);
    setround2Completed(round2status);
  };

  const logoutHandler = () => {
    setId(null);
    localStorage.clear();
  };
  const teamHandler = (teamID) => {
    setTeamEmailId(teamID);
    localStorage.setItem("teamID", teamID);
  };

  const contextValue = {
    id: id,
    uID: uID,
    name: userName,
    emailid: userEmailId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setTeam: teamHandler,
    teamID: userTeamId,
    photoURL: userPhotoURL,
    locationChange: location,
    roundHandler: roundHandler,
    round1Completed: round1Completed,
    round2Completed: round2Completed,
    leaderHandler: leaderHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
