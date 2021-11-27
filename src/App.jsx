import React, { useContext, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragDrop from "./components/DragDrop.jsx";
import DragDrop2 from "./components/DragDrop2.jsx";
import Login from "./components/Login/Login";

// import MainNavigation from "./components/MainNavigation.jsx";
import AuthContext from "./store/auth-context.js";
import DashBoard from "./components/Dashboard/DashBoard.jsx";
import "./App.css";

/* Pages */
import { Landing } from "./pages/Landing";
// import { useViewport } from "./store/use-viewport.js";
// import { Nav } from "./components/nav/Nav.jsx";

function App() {
  const authCtx = useContext(AuthContext);
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
        {authCtx.isLoggedIn && authCtx.teamID && (
          <Route path="/Round1">
            <DndProvider backend={HTML5Backend}>
              <div>
                <DragDrop />
              </div>
            </DndProvider>
          </Route>
        )}
        {authCtx.isLoggedIn && authCtx.teamID && (
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
        {/* <Route path="*">
          <Redirect to="/" />
        </Route> */}
      </Switch>
    </div>
  );
}

export default App;
