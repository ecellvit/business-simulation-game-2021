import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import { useTimer } from 'react-timer-hook';

import "./nav.css";

import fpLogo from "../../resources/images/futurepreneursLogo.svg";
import ecellLogo from "../../resources/images/ecellLogoBlack.png";
import AuthContext from "../../store/auth-context";

export function Nav(props) {
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 600);
  // const {
  //   seconds,
  //   minutes,
  //   hours,
  //   days,
  //   isRunning,
  //   start,
  //   pause,
  //   resume,
  //   restart,
  // } = useTimer({time, onExpire: () => console.warn('onExpire called') });
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <Box className="navMainContainer">
      <Box className="navSection1">
        <Grid
          container
          className="logosSection"
          direction="row"
          justifyContent="space-between"
        >
          <Grid
            item
            xs={1}
            className="logosSection-item1"
            justifyContent="flex-start"
          >
            <Link to="/">
              <img
                style={{ width: "80%" }}
                src={fpLogo}
                alt={"FuturePreneurs Logo"}
              />
            </Link>
          </Grid>
          <Grid
            item
            xs
            zeroMinWidth
            className="logosSection-item2"
            justifyContent="center"
          >
            FUTUREPRENEURS 7.0
          </Grid>
          <Grid
            item
            xs={1.5}
            className="logosSection-item3"
            justifyContent="flex-end"
          >
            <img src={ecellLogo} alt={"E-Cell Logo"} />
          </Grid>
        </Grid>
      </Box>
      <Box className="navSection2">
        <Box className="navbarContainer" margin={0}>
          <Grid
            container
            className="navbarContainer-head"
            sx={{
              display: { xs: "none", lg: "block", sm: "block" },
            }}
          >
            <Grid item xs zeroMinWidth>
              Business Simulation Game
            </Grid>
          </Grid>
          <div style={{ fontSize: "100px" }}>
            {/* <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span> */}
          </div>
          <Grid
            container
            spacing={2}
            className="navbarContainer-menu"
            wrap={"nowrap"}
            sx={{
              justifyContent: {
                xs: "center",
                sm: "flex-end",
              },
            }}
          >
            <Grid item>
              <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                {props.item1}
              </Link>
            </Grid>
            <Grid item>{props.item2}</Grid>
            <Grid item>{props.item3}</Grid>
            {!authCtx.isLoggedIn ? (
              <Grid item>
                <Link
                  to="/Login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  {props.item4}
                </Link>
              </Grid>
            ) : null}
            {(authCtx.isLoggedIn ||
              localStorage.getItem("isGoogleLogin") === "yes") && (
              <Grid item>
                <Grid
                  item
                  onClick={logoutHandler}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
