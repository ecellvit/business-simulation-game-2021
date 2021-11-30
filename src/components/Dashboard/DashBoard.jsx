import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import CreateTeamForm from "./CreateTeamForm";
import { Link } from "react-router-dom";
import fplogo from "../../resources/images/fpLogo.svg";
import ecellLogo from "../../resources/images/ecellLogo.svg";
import TeamList from "./TeamList";
import TeamDisplay from "./TeamDisplay";
import { Nav } from "../nav";
import "./DashBoard.css";

function DashBoard(props) {
  // const location = useLocation();
  const history = useHistory();
  const [hasStarted1, sethasStarted1] = useState(false);
  const [hasCompleted1, sethasCompleted1] = useState(false);
  const [hasCompleted2, sethasCompleted2] = useState(false);

  const authCtx = useContext(AuthContext);
  const [hasTeam, setHasTeam] = useState(true);
  const [showTeam, setShowTeam] = useState(false);
  // const [updateTeamList, setUpdateTeamList] = useState(1);

  // const updateList = () => {
  //   setUpdateTeamList(updateTeamList + 1);
  // };

  // `https://futurepreneursbackend.herokuapp.com/api/public/hasTeam?userID=${authCtx.id}`
  // `http://127.0.0.1:2000/api/public/hasTeam?userID=${authCtx.id}`

  // useEffect(() => {
  //   alert('Location changed');
  // }, [location]);
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

  // const justRoundOneCompleted = (hasCompleted)=>{
  //   console.log("in1", hasCompleted);
  //   if (hasCompleted) {
  //     props.round1CompletedHandler(true);
  //   }
  // }
  const roundTwoCompleted = (hasCompleted) => {
    if (hasCompleted) {
      sethasCompleted2(true);
    }
  };

  // ?userID=${authCtx.id}
  useEffect(() => {
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

  return (
    <div>
      <Nav />
      <div style={{ color: "black" }} className="Dashboard__main--div">
        <div className="teamDetails">
          <p className="startTime">Starting In</p>
          <div className="time__div">
            <p className="time">12:60:49</p>
          </div>
          <hr className="hr" />

          <TeamDisplay
            roundOneStarted={roundOneStarted}
            roundOneCompleted={roundOneCompleted}
            roundTwoCompleted={roundTwoCompleted}
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
              <p className="min">30 Mins</p>
              <Link to={hasCompleted1 ? "/Round2" : "/Round1"}>
                <button className="stbtn button">
                  {hasStarted1 ? "Continue" : "Start"}
                </button>
              </Link>
              {/* <input
                className="elp"
                type="image"
                name="eli"
                src={ellipse}
                alt="text"
              ></input>
              <img className="aro" src={arrow} alt=""></img> */}
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
                <img className="ecell__logo--dashboard" src={ecellLogo} alt="" />
              </p>
            </div>
          )}
        </div>
        {/* <li className="">UserName: {authCtx.name}</li>
      <li>Email: {authCtx.emailid}</li> */}
        {/* <TeamDisplay /> */}

        {/* <button
        onClick={checkTeamHandler}
        style={{ margin: "3% 50%", fontSize: "30px" }}
      >
        hasTeam
      </button> */}
        {/* {!hasTeam && (
        <div className="TeamListAndForm">
          <TeamList />
          <CreateTeamForm />
        </div>
      )} */}
        {/* {hasTeam && showTeam && <TeamDisplay />} */}
      </div>
    </div>
  );
}

export default DashBoard;
