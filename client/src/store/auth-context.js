import React, { useState } from "react";

const AuthContext = React.createContext({
  id: "",
  isLoggedIn: false,
  login: (id) => {},
  logout: () => {},
});

function AuthContextProvider(props) {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;
  const loginHandler = () => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLoggenIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContextProvider value={contextValue}>
      {props.childen}
    </AuthContextProvider>
  );
}
