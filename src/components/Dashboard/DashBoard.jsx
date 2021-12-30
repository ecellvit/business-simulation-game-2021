import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

// Components
import { Nav } from "../nav";
import TeamDisplay from "./TeamDisplay";

// Contexts
import AuthContext from "../../store/auth-context";

// CSS
import "./DashBoard.css";

// Images
import fplogo from "../../resources/images/fpLogo.svg";
import ecellLogo from "../../resources/images/ecellLogo.svg";

// UI Utilities
import { useSnackbar } from "notistack";
import ClipLoader from "react-spinners/ClipLoader";
import warningSound from "../../resources/Audiofiles/warning.mpeg";
import CountDownDashboard from "./CountDownDashboard";

function DashBoard(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [Round2State, setRound2State] = useState(true);
  const [Round1State, setRound1State] = useState(true);
  const [hasStarted1, sethasStarted1] = useState(false);
  const [hasCompleted1, sethasCompleted1] = useState(false);
  const [hasCompleted2, sethasCompleted2] = useState(false);
  const [hasTeam, setHasTeam] = useState(true);
  const [showTeam, setShowTeam] = useState(false);

  //Loading states
  const [isLoading, setisLoading] = useState(false);

  //time states
  const [hours, setHours] = useState(23);
  const [minutes, setMinutes] = useState(59);
  const [seconds, setSeconds] = useState(0);

  const [expiryTimeStamp, setExpiryTimeStamp] = useState();
  const [hasTimeChanged, setHasTimeChanged] = useState(false);

  //Snackbar effects
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Sound effects
  const warningAudio = new Audio(warningSound);

  //calls for managing round access
  useEffect(() => {
    fetch(`https://futurepreneursbackend.herokuapp.com/`)
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.isRoundOneOn) {
          roundHasntStarted(1);
          setRound1State(false);
        }
        if (!data.isRoundTwoOn) {
          roundHasntStarted(2);
          setRound2State(false);
        }
        setExpiryTimeStamp(data.timeOfEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //call for checking if user is registered with us or not
  useEffect(() => {
    setisLoading(true);
    fetch(`https://futurepreneursbackend.herokuapp.com/api/public/hasTeam`, {
      method: "POST",
      body: JSON.stringify({
        userID: authCtx.id === null ? "61a3f2eeb151d2972b2ad1e7" : authCtx.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        setHasTeam(data);
        setShowTeam(true);
      })
      .catch((err) => {
        alert(err);
        history.replace("/Error");
      });
  }, []);

  //callback functions
  const roundHasntStarted = (data) => {
    warningAudio.play();
    enqueueSnackbar(`We haven't started round ${data} yet, please wait`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const roundOneStarted = (hasStarted) => {
    if (hasStarted) {
      sethasStarted1(true);
    }
  };

  const roundOneCompleted = (hasCompleted) => {
    if (hasCompleted) {
      sethasCompleted1(true);
    }
  };

  const roundTwoCompleted = (hasCompleted) => {
    if (hasCompleted) {
      sethasCompleted2(true);
    }
  };

  const changeIsLoading = (bool) => {
    setisLoading(false);
  };

  return (
    <div>
      <Nav />
      <div style={{ position: "relative", left: "50%" }}>
        <ClipLoader color={"green"} loading={isLoading} size={60} />
      </div>
      <div style={{ color: "black" }} className="Dashboard__main--div">
        <div className="teamDetails">
          <p className="startTime">Starting In</p>
          <div className="time__div">
            {expiryTimeStamp && (
              <CountDownDashboard
                endtime={expiryTimeStamp}
                hoursMinSecs={{
                  hours: hours,
                  minutes: minutes,
                  seconds: seconds,
                }}
                minutes1={minutes}
                seconds1={seconds}
                hasTimeChanged={hasTimeChanged}
              />
            )}
          </div>
          <hr className="hr" />

          <TeamDisplay
            roundOneStarted={roundOneStarted}
            roundOneCompleted={roundOneCompleted}
            roundTwoCompleted={roundTwoCompleted}
            changeIsLoading={changeIsLoading}
          />
          {!hasCompleted2 ? (
            <div className="tbox">
              <p className="rhead">
                {hasCompleted1 ? "Round 1.2" : "Round 1.1"}
              </p>
              <p className="inst">Instructions</p>
              <p className="content">
                {hasCompleted1 ? (
                  <div className="scrollable-content">
                    <p>
                      Intelligent placement of products in the shelves is a
                      determining factor. Now in your supermarket, There's a
                      certain group of products which is left to be placed in
                      the shelves.
                    </p>
                    <p>
                      You have to arrange these products optimally on the
                      shelves while considering various psychological and
                      behavioural factors and maximising your profits.
                    </p>
                    <p>Some Instructions :</p>
                    <p>
                      1. One of these shelves is a 200 cm height (5 X 2 rack )
                    </p>
                    <p>2. Another one is a 200 cm (5 X 1 rack)</p>
                    <p>3. They are placed 1 m apart from each other</p>
                    <p>Demographics of town:</p>
                    <p>
                      Average Height of a 5 year old in the town is 70cm.
                      Average height of women in the town is 150cm. Average
                      height of men in the is 180cm.
                    </p>
                  </div>
                ) : (
                  <div className="scrollable-content">
                    <p>
                      You can see the floor-plan of the supermarket that you are
                      managing. On the right you are given a list of sections
                      that you have to arrange in the supermarket. You have to
                      decide at which position a particular section will go, and
                      place it there in order to achieve your target.
                    </p>
                    <p>
                      1. You have to manually drag and drop a particular section
                      in the empty slots on the map in the way you see fit.
                    </p>
                    <p>
                      2. Be very careful about your moves because the number of
                      attempts matter.
                    </p>
                    <p>
                      3. Only the team leader can submit , others can see the
                      proceedings in real time.
                    </p>
                    <p>4. You have 6 questions and 15 mins in total.</p>
                    <p>
                      5. Once Submitted/skipped , you can not go back to
                      previous question.
                    </p>
                  </div>
                )}
              </p>
              <p className="min">15 Mins</p>
              {!isLoading ? (
                <Link to={hasCompleted1 ? "/Round2" : "/Round1"}>
                  <button
                    className="stbtn button"
                    disabled={hasCompleted1 ? !Round2State : !Round1State}
                  >
                    {hasStarted1 ? "Continue" : "Start"}
                  </button>
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="tbox">
              <p className="rhead">
                <img className="fp__logo--dashboard" src={fplogo} alt="" />
                <p className="thankyou">Thank you</p>
                <p className="final__submission--dashboard">
                  We are glad to have you today at FuturePreneurs 7.0, See you
                  next time, you can logout now
                </p>
                <img
                  className="ecell__logo--dashboard"
                  src={ecellLogo}
                  alt=""
                />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
