import React, { useContext, useState, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop.jsx";
import DragDrop2 from "./components/DragDrop2.jsx";
import Login from "./components/Login/Login";
import SubmissionPage from "./components/SubmissionPage.jsx";

// import MainNavigation from "./components/MainNavigation.jsx";
import AuthContext from "./store/auth-context.js";
import DashBoard from "./components/Dashboard/DashBoard.jsx";
import "./App.css";

/* Pages */
import { Landing } from "./pages/Landing";
import Errorpage from "./components/Errorpage.jsx";
// import { useViewport } from "./store/use-viewport.js";
// import { Nav } from "./components/nav/Nav.jsx";

function App() {
  // const history = useHistory();
  const authCtx = useContext(AuthContext);

  // console.log("Round1completed",authCtx.round1Completed)
  // console.log("Round2completed",authCtx.round2Completed)
  // const {pathname} = useLocation();
  // const {isMobile,height,width} = useViewport();
  return (
    <div className="main-container">
      {/* <h1>{height}</h1> */}
      {/* <MainNavigation /> */}
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/Login" exact>
          <Login />
        </Route>
        {authCtx.isLoggedIn &&
          authCtx.teamID &&
          authCtx.round1Completed === false && (
            <Route path="/Round1">
              <DndProvider backend={HTML5Backend}>
                <div>
                  <DragDrop />
                </div>
              </DndProvider>
            </Route>
          )}

        {authCtx.isLoggedIn &&
          authCtx.teamID &&
          authCtx.round2Completed === false &&
          authCtx.round1Completed === true && (
            <Route path="/Round2">
              <DndProvider backend={HTML5Backend}>
                <div>
                  <DragDrop2 />
                </div>
              </DndProvider>
            </Route>
          )}
        {authCtx.isLoggedIn && (
          <Route path="/Dashboard" exact>
            <DashBoard />
          </Route>
        )}
        <Route path="/Submission" exact>
          <SubmissionPage />
        </Route>
        <Route path="/Error" exact>
          <Errorpage />
        </Route>
        {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
