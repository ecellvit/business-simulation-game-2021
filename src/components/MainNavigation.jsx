import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import classes from "./MainNavigation.module.css";
import AuthContext from "../store/auth-context";

const MainNavigation = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>FuturePreneurs</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/Dashboard">Dashboard</Link>
            </li>
          )}
          <li>
            <Link to="/Round1">Start Game</Link>
          </li>
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

// export default NavigationBar;
