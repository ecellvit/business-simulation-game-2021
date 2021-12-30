import React, { useState, useContext, useEffect } from "react";
import {useHistory } from "react-router-dom";

// socket.io
import { io } from "socket.io-client";

// Components
import BoardBox2 from "./BoardBox2"; 
import { Nav } from "./nav";
import SupermarketDrag from "./SupermarketDrag";
import CountDown from "./Dashboard/CountDown";

// Contexts
import AuthContext from "../store/auth-context";

// CSS
import "./DragDrop2.css";

// Images
import supermarketBG2 from "../resources/images/bgImg2.png";

// UI Utilities
import { useSnackbar } from "notistack";
import infoSound from "../resources/Audiofiles/info.mpeg";

// Data
import { Placeholders2 } from "../custom/data2";

//Connecting Socket
var socket = io("https://futurepreneursbackend.herokuapp.com");

function DragDrop() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory();
  const board = Placeholders2;
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);
  const [hasTimeChanged, setHasTimeChanged] = useState(false);
  const [expiryTimeStamp, setExpiryTimeStamp] = useState();
  const infoAudio = new Audio(infoSound);

  const roundHasntStarted = () => {
    enqueueSnackbar(`We haven't started now, please wait`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const timeOver = (user) => {
    enqueueSnackbar(`Round 1.2 is Over`, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const userJoined = (user) => {
    infoAudio.play();
    enqueueSnackbar(`${user.username} has joined the game!`, {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  const [thisCanBeDragged, setThisCanBeDragged] = useState(true);
  const [supermarketUpdated, setSupermarketReceived] = useState([
    {
      name: "Erasers",
      id: 1,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Shampoos",
      id: 2,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Shaving Kits",
      id: 3,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Eyeliner",
      id: 4,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Crayons",
      id: 5,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "After Shave Kits",
      id: 6,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Pencils",
      id: 7,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Conditioners",
      id: 8,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Sketch Books",
      id: 9,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Eye Shadow",
      id: 10,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Chocolates",
      id: 11,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Barbie Dolls",
      id: 12,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Kitchen Tools",
      id: 13,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Trimmer",
      id: 14,
      thisItemCanBeDragged: thisCanBeDragged,
    },
    {
      name: "Board Games",
      id: 15,
      thisItemCanBeDragged: thisCanBeDragged,
    },
  ]);

  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState(0);

  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "two", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "three", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "four", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "five", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "six", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "seven", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "eight", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "nine", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "ten", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "eleven", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "twelve", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "thirteen", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "fourteen", item: { id: "", name: "", thisItemCanBeDragged: true } },
    { id: "fifteen", item: { id: "", name: "", thisItemCanBeDragged: true } },
  ]);

  const [roomUsers, setRoomUsers] = useState([
    { id: "", username: "", room: "", email: "", photoURL: "" },
  ]);

  const [roomData, setRoomData] = useState({
    name: authCtx.name,
    email: authCtx.emailid,
    photoURL: authCtx.photoURL,
    teamID: authCtx.teamID,
  });

  useEffect(() => {
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/public/getUserTeam`,
      {
        method: "POST",
        body: JSON.stringify({
          userID: authCtx.id ? authCtx.id : "61a3f2eeb151d2972b2ad1e7",
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        authCtx.roundHandler(data.RoundOneAttempted, data.RoundTwoAttempted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //useEffect for sockets
  useEffect(() => {
    if (socket.connected) {
      socket.disconnect();
      socket = io("https://futurepreneursbackend.herokuapp.com");
    }
    socket.on("roomUsers", (data) => {
      setRoomUsers(data.users);
      const len = data.users.length;
      userJoined(data.users[len - 1]);
    });
    socket.emit("joinRoom", roomData);
    socket.on("roundTwoCompletion", (data) => {
      timeOver();
      history.replace("/Submission");
    });
  }, [roomData]);

  useEffect(() => {
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/public/getUserTeam`,
      {
        method: "POST",
        body: JSON.stringify({
          userID: authCtx.id === null ? "61a3f2eeb151d2972b2ad1e7" : authCtx.id,
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        authCtx.roundHandler(data.RoundOneAttempted, data.RoundTwoAttempted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`https://futurepreneursbackend.herokuapp.com/`)
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then((data) => {
        if (!data.isRoundTwoOn) {
          roundHasntStarted("Round 1.2 hasn't started yet, try again soon!");
          history.replace("/Dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFinalPlaceHolder = (placeHolderID, itemList) => {
    if (placeHolderID === "one") {
      const newList = finalList.map((x) =>
        x.id === "one" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "two") {
      const newList = finalList.map((x) =>
        x.id === "two" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "three") {
      const newList = finalList.map((x) =>
        x.id === "three" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "four") {
      const newList = finalList.map((x) =>
        x.id === "four" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "five") {
      const newList = finalList.map((x) =>
        x.id === "five" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "six") {
      const newList = finalList.map((x) =>
        x.id === "six" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "seven") {
      const newList = finalList.map((x) =>
        x.id === "seven" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "eight") {
      const newList = finalList.map((x) =>
        x.id === "eight" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "nine") {
      const newList = finalList.map((x) =>
        x.id === "nine" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "ten") {
      const newList = finalList.map((x) =>
        x.id === "ten" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "eleven") {
      const newList = finalList.map((x) =>
        x.id === "eleven" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "twelve") {
      const newList = finalList.map((x) =>
        x.id === "twelve" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "thirteen") {
      const newList = finalList.map((x) =>
        x.id === "thirteen" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "fourteen") {
      const newList = finalList.map((x) =>
        x.id === "fourteen" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    } else if (placeHolderID === "fifteen") {
      const newList = finalList.map((x) =>
        x.id === "fifteen" ? { ...x, item: itemList } : x
      );
      setFinalList(() => [...newList]);
      socket.emit("update", newList);
    }
  };

  const deleteFinalPlaceHolder = (placeholderID) => {
    const deletedFinalList = finalList.map((list) => {
      if (list.id === placeholderID) {
        list.item = { ...list.item, name: "" };
      }
      return list;
    });
    setFinalList(deletedFinalList);
    socket.emit("update", deletedFinalList);
  };

  useEffect(() => {
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/RoundTwo/start?teamID=${authCtx.teamID}`
    )
      .then((response) => {
        if (response.status === 400) {
          history.replace("/Error");
        }
        return response.json();
      })
      .then(({ timeStamp }) => {
        setTimeout(function () {
          setExpiryTimeStamp(timeStamp);
          setHasTimeChanged(true);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitAnswerHandler = () => {
    fetch(
      "https://futurepreneursbackend.herokuapp.com/api/roundTwo/submitResponse",
      {
        method: "POST",
        body: JSON.stringify({
          teamID: authCtx.teamID,

          Zones: finalList.map((element) => {
            return { option: element.item.name, index: element.id };
          }),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setScore((prevScore) => {
          return data.currentPoints;
        });
        timeOver();
        socket.emit("round2", { teamID: authCtx.teamID });
        history.replace("/Submission");
      })
      .catch((err) => {
        history.replace("/Error");
      });
  };

  //iscorrect true in any attempt-->attempt=1 and setcurrQues++
  //iscorrect false in 1st attempt-->give msg/prompt you are incorrect and attempt++
  //3rd attempt false-->answer wrong and setcurrQues++
  //3rd attempt true-->answer correct and setcurrQues++

  return (
    <>
      <Nav />
      {expiryTimeStamp && (
        <CountDown
          endtime={expiryTimeStamp}
          hoursMinSecs={{ minutes: minutes, seconds: seconds }}
          submit={submitAnswerHandler}
          minutes1={minutes}
          seconds1={seconds}
          hasTimeChanged={hasTimeChanged}
        />
      )}
      <div className="game-options">
        {localStorage.getItem("leaderID") === authCtx.id ? (
          <button className="game-submit2" onClick={submitAnswerHandler}>
            SUBMIT
          </button>
        ) : null}
      </div>
      <p
        style={{
          color: "gray",
          position: "absolute",
          zIndex: "1",
          top: "130px",
          left: "550px",
          fontStyle: "bolder"
        }}
      >
        No item should be placed more than once
      </p>

      <div className="dragdrop-main-container2">
        <div className="roomUsersDiv">
          {roomUsers[0] && (
            <div className="roomUserDiv">
              <img
                className="roomUser__profile--pic"
                src={roomUsers[0].photoURL}
                alt="1st team member"
                title={roomUsers[0].username}
              ></img>
            </div>
          )}
          {roomUsers[1] && (
            <div className="roomUserDiv">
              <img
                className="roomUser__profile--pic"
                src={roomUsers[1].photoURL}
                alt="2nd team member"
                title={roomUsers[1].username}
              ></img>
            </div>
          )}
          {roomUsers[2] && (
            <div className="roomUserDiv">
              <img
                className="roomUser__profile--pic"
                src={roomUsers[2].photoURL}
                alt="3rd team member"
                title={roomUsers[2].username}
              ></img>
            </div>
          )}
          {roomUsers[3] && (
            <div className="roomUserDiv">
              <img
                className="roomUser__profile--pic"
                src={roomUsers[3].photoURL}
                alt="4th team member"
                title={roomUsers[3].username}
              ></img>
            </div>
          )}
        </div>
        <div className="placeholders2-main-container">
          <img
            className="supermarketImg2"
            src={supermarketBG2}
            alt="supermarket"
          />
          {board.map((placeholder) => {
            return (
              <BoardBox2
                socket={socket}
                supermarketUpdated={supermarketUpdated}
                deleteFinalPlaceHolder={deleteFinalPlaceHolder}
                roomData={roomData}
                finalList={finalList}
                updateFinalPlaceHolder={updateFinalPlaceHolder}
                index={board.indexOf(placeholder)}
                id={placeholder.id}
                droppedItem={placeholder.droppedItem}
                key={placeholder.id}
              />
            );
          })}
        </div>
        <div className="supermarket2-main-container">
          <div className="question-container">
            <p className="question-instruction2">Rules</p>
            <p
              className="questions-rules2"
              style={{ height: "180px", overflowY: "scroll" }}
            >
              <p>
                Your parents have given you some tips based their experience.
              </p>
              <p>1. Chocolate has good sales among both Adults and Kids.</p>
              <p>2. Pencils and Board Games have least sales.</p>
              <p>
                3. Kitchen knives should not be placed in last 3 rows due to
                safety concerns.
              </p>
            </p>
          </div>
          <div className="question-item-set2">
            {supermarketUpdated.map((item, index) => {
              return (
                <div className={`question-item2${index}`}>
                  <SupermarketDrag
                    thisCanBeDragged={item.thisItemCanBeDragged}
                    name={item.name}
                    id={item.id}
                    key={item.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DragDrop;
