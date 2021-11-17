import React, { useContext,useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop.jsx";
import Login from "./components/Login/Login";

import MainNavigation from "./components/MainNavigation.jsx";
import AuthContext from "./store/auth-context.js";
import DashBoard from "./components/Dashboard/DashBoard.jsx";
import "./App.css";

/* Pages */
import { Landing } from "./pages/Landing";
import { Nav } from "./components/nav/Nav.jsx";

function App() {
  const authCtx = useContext(AuthContext);
  // const {pathname} = useLocation();
  
  return (
    <div className="main-container">
      <MainNavigation />
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        <Route path="/Round1">
          <DndProvider backend={HTML5Backend}>
            <div>
              <DragDrop />
            </div>
          </DndProvider>
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/Dashboard" exact>
            <DashBoard />
          </Route>
        )}
        {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
