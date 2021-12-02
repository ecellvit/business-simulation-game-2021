import React, { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
// import { useTimer } from 'react-timer-hook';

import "./nav.css";

import fpLogo from "../../resources/images/futurepreneursLogo.svg";
import ecellLogo from "../../resources/images/ecellLogoBlack.png";
import AgoraRTC from "agora-rtc-react";
import AuthContext from "../../store/auth-context";
import { useSnackbar } from "notistack";
import errorSound from "../../resources/Audiofiles/error.mpeg";
import successSound from "../../resources/Audiofiles/success.mpeg"

let rtc = {
  localAudioTrack: null,
  client: null,
};

async function startBasicCall() {
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  rtc.client.on("user-published", async (user, mediaType) => {
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    if (mediaType === "audio") {
      const remoteAudioTrack = user.audioTrack;
      // Play the remote audio track.
      remoteAudioTrack.play();
    }
    rtc.client.on("user-unpublished", async (user) => {
      await rtc.client.unsubscribe(user);
    });
  });
}
startBasicCall();

export function Nav(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [micMuted, setMicMuted] = useState(true);
  const [firstTry, setfirstTry] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const errorAudio = new Audio(errorSound);
  const successAudio = new Audio(successSound);

  const callConnectionError = (data) => {
    errorAudio.play();
    enqueueSnackbar(data, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const callConnectionSuccessful = (data) => {
    successAudio.play();
    enqueueSnackbar(data, {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  // useEffect(() => {
  //   localStorage.setItem("call", "disconnected");
  // }, []);

  const [options, setOptions] = useState({
    // Pass your App ID here.
    appId: "583e53c6739745739d20fbb11ac8f0ef",
    // Set the channel name.
    channel: "", //teamID
    // Pass your temp token here.
    token: "",
    // "006583e53c6739745739d20fbb11ac8f0efIACLjOSOWphoCPS9d8v+ZvoU5wMg1G9yOwRcB/TUgN/RQAx+f9gAAAAAEACdnafAgkufYQEAAQCCS59h",
    // Set the user ID.
    uid: authCtx.uID,
  });
  useEffect(() => {
    // console.log("token details", authCtx.teamID, authCtx.uID);
    if (authCtx.id && authCtx.teamID) {
      fetch(
        `https://futurepreneursbackend.herokuapp.com/api/voice/token?channel=${authCtx.teamID}&uid=${authCtx.uID}&role=publisher`
      )
        .then((res) => res.json())
        .then((data) => {
          setOptions((prevOptions) => ({
            ...prevOptions,
            channel: authCtx.teamID,
            token: data.token,
          }));
          // console.log("token", data.token);
        });
    }
  }, []);

  const joinCall = async function () {
    // Join an RTC channel.
    // console.log("object", options.token);
    // rtc.client.leaveCall();
    try {
      await rtc.client
        .join(options.appId, options.channel, options.token, options.uid)
        .catch((e) => {
          // console.log(e);
          console.log("Joining error");
          callConnectionError("Joining Error")
        });
      // Create a local audio track from the audio sampled by a microphone.
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack().catch(
        (e) => {
          console.log(e);
          console.log("Mic error");
          callConnectionError("Couldn't access Microphone!")
        }
      );
      // Publish the local audio tracks to the RTC channel.
      await rtc.client.publish([rtc.localAudioTrack]).catch((e) => {
        console.log(e);
        console.log("Publishing error");
        callConnectionError("Couldn't connect, try again!")
      });
      // setMicMuted(false);
      // localStorage.setItem("call", "connected");
      console.log("publish success!");
      authCtx.callConnectHandler(true)
      callConnectionSuccessful("Sucessfully connected!");
    } catch (e) {
      console.log("Agora Error");
      throw e;
    }
  };

  const leaveCall = async function () {
    // Destroy the local audio track.
    rtc.localAudioTrack.close();

    // Leave the channel.
    await rtc.client.leave().catch((e)=>{
      callConnectionError("Couldn't disconnect call,refresh your page to disconnect")
    });
    // setMicMuted(true);
    // localStorage.setItem("call", "disconnected");
    console.log("leave Success");
    authCtx.callConnectHandler(false)
    callConnectionSuccessful("Sucessfully disconnected call")
  };
  const logoutHandler = () => {
    if (authCtx.callConnected) {
      leaveCall();
    }
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
            <div>
              <img
                style={{ width: "80%" }}
                src={fpLogo}
                alt={"FuturePreneurs Logo"}
              />
              {authCtx.isLoggedIn &&
                authCtx.teamID &&
                authCtx.callConnected === false && (
                  <button
                    className="game-microphone"
                    onClick={() => {
                      joinCall();
                    }}
                  >
                    Start Call
                  </button>
                )}
              {authCtx.isLoggedIn &&
                authCtx.teamID &&
                authCtx.callConnected === true && (
                  <button
                    className="game-microphone"
                    onClick={() => {
                      leaveCall();
                    }}
                  >
                    Leave Call
                  </button>
                )}
              {/* {micMuted &&
                authCtx.isLoggedIn &&
                localStorage.getItem("call")==="disconnected" && (
                  <button
                    className="game-microphone"
                    onClick={() => {
                      joinCall();
                      setfirstTry(true);
                    }}
                  >
                    Start Call
                  </button>
                )}
              {firstTry &&
                authCtx.isLoggedIn && (
                  <button
                    className="game-microphone"
                    onClick={() => {
                      joinCall();
                      setfirstTry(false);
                    }}
                  >
                    Join Voice
                  </button>
                )}
              {!firstTry && !micMuted && authCtx.isLoggedIn && (
                <button
                  className="game-microphone"
                  onClick={() => {
                    leaveCall();
                    setfirstTry(false);
                  }}
                >
                  End Call
                </button>
              )} */}
            </div>
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
          {(authCtx.isLoggedIn ||
            localStorage.getItem("isGoogleLogin") === "yes") && (
            <Grid item>
              <Grid
                item
                onClick={logoutHandler}
                style={{
                  color: "#0E0E0E",
                  textDecoration: "none",
                  cursor: "pointer",
                  position: "relative",
                  left: "100%",
                  top: "25%",
                }}
              >
                Logout
              </Grid>
            </Grid>
          )}
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
            {/* <Grid item xs zeroMinWidth>
              Business Simulation Game
            </Grid> */}
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
            {/* {(authCtx.isLoggedIn ||
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
            )} */}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
