import React, { useState } from "react";

const AuthContext = React.createContext({
  id: "",
  name: "",
  emailid: "",
  isLoggedIn: false,
  login: (id) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialId = localStorage.getItem("id");
  const initialName = localStorage.getItem("name");
  const initialEmail = localStorage.getItem("email");

  const [id, setId] = useState(initialId);
  const [userName, setUserName] = useState(initialName);
  const [userEmailId, setUserEmailId] = useState(initialEmail);

  const userIsLoggedIn = !!id;
  //note to myself(palani)---> !!id means converting the truthy or falsy value to a true or false boolean value
  //if id is not empty string this will return true else false

  const loginHandler = (id, userName, userEmailId) => {
    setId(id);
    setUserName(userName);
    setUserEmailId(userEmailId);
    localStorage.setItem("id", id);
    localStorage.setItem("name", userName);
    localStorage.setItem("email", userEmailId);
  };
  const logoutHandler = () => {
    setId(null);
    // localStorage.removeItem("id");
    // localStorage.removeItem("name");
    // localStorage.removeItem("email");
    localStorage.clear();
  };

  const contextValue = {
    id: id,
    name: userName,
    emailid: userEmailId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
