import React, { useState } from "react";

const AuthContext = React.createContext({
  id: "",
  name: "",
  emailid: "",
  photoURL: "",
  isLoggedIn: false,
  login: (id) => {},
  logout: () => {},
  setTeam: (teamID) => {},
  teamID: "",
});

export const AuthContextProvider = (props) => {
  const initialId = localStorage.getItem("id");
  const initialName = localStorage.getItem("name");
  const initialEmail = localStorage.getItem("email");
  const initialTeamID = localStorage.getItem("teamID");
  const initialPhotoURL = localStorage.getItem("photoURL");

  const [id, setId] = useState(initialId);
  const [userName, setUserName] = useState(initialName);
  const [userEmailId, setUserEmailId] = useState(initialEmail);
  const [userPhotoURL, setUserPhotoURL] = useState(initialPhotoURL);
  const [userTeamId, setTeamEmailId] = useState(initialTeamID);

  const userIsLoggedIn = !!id;
  //note to myself(palani)---> !!id means converting the truthy or falsy value to a true or false boolean value
  //if id is not empty string this will return true else false

  const loginHandler = (id, userName, userEmailId, userPhotoURL) => {
    setId(id);
    setUserName(userName);
    setUserEmailId(userEmailId);
    setUserPhotoURL(userPhotoURL);
    localStorage.setItem("id", id);
    localStorage.setItem("name", userName);
    localStorage.setItem("email", userEmailId);
    localStorage.setItem("photoURL", userPhotoURL);
  };
  const logoutHandler = () => {
    setId(null);
    // localStorage.removeItem("id");
    // localStorage.removeItem("name");
    // localStorage.removeItem("email");
    localStorage.clear();
  };
  const teamHandler = (teamID) => {
    setTeamEmailId(teamID);
    localStorage.setItem("teamID", teamID);
  };
  const contextValue = {
    id: id,
    name: userName,
    emailid: userEmailId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setTeam: teamHandler,
    teamID: userTeamId,
    photoURL: userPhotoURL,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
