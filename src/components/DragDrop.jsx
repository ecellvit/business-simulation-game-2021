import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

//socket.io
import { io } from "socket.io-client";

// Components
import { Nav } from "./nav";
import BoardBox1 from "./BoardBox1";
import SupermarketDrag from "./SupermarketDrag";
import CountDown from "./Dashboard/CountDown";

// Contexts
import AuthContext from "../store/auth-context";

// CSS
import "./DragDrop.css";

// Images
import supermarketBG from "../resources/images/bgImg1.jpg";
import arrow from "../resources/images/arrow2.png";
import cashCounter from "../resources/images/cashCounter.jpg";

// UI Utilities
import { useSnackbar } from "notistack";
import ClipLoader from "react-spinners/ClipLoader";
import errorSound from "../resources/Audiofiles/error.mpeg";
import infoSound from "../resources/Audiofiles/info.mpeg";
import successSound from "../resources/Audiofiles/success.mpeg";
import warningSound from "../resources/Audiofiles/warning.mpeg";

// Data
import { Placeholders } from "../custom/data";

//connecting socket
var socket = io("https://futurepreneursbackend.herokuapp.com");

function DragDrop() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [items, setItems] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState({
    id: "",
    instruction: "",
    options: [],
  });

  //questions logic related states 
  const [newAttempt, setnewAttempt] = useState();
  const [attempts, setAttempts] = useState(1);
  const [currQuestionPointer, setcurrQuestionPointer] = useState(0);
  const [score, setScore] = useState(0);

   
  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "", name: "" }, canDrop: "" },
    { id: "two", item: { id: "", name: "" }, canDrop: "" },
    { id: "three", item: { id: "", name: "" }, canDrop: "" },
    { id: "four", item: { id: "", name: "" }, canDrop: "" },
    { id: "five", item: { id: "", name: "" }, canDrop: "" },
    { id: "six", item: { id: "", name: "" }, canDrop: "" },
    { id: "seven", item: { id: "", name: "" }, canDrop: "" },
  ]);

  console.log(finalList)
  const [canDrop, setCanDrop] = useState([
    {
      0: { isDroppable: "yes", element: "" },
      1: { isDroppable: "yes", element: "" },
      2: { isDroppable: "yes", element: "" },
      3: { isDroppable: "yes", element: "" },
      4: { isDroppable: "yes", element: "" },
      5: { isDroppable: "yes", element: "" },
      6: { isDroppable: "yes", element: "" },
    },
  ]);

  const board = Placeholders.map((placeholder, i) => {
    return { ...placeholder, canDrop: canDrop[0][i].isDroppable };
  });

  const [remainingPlaceHoldersIds, setremainingPlaceHolderIds] = useState([]);
  const [filteredFinalList, setFilteredFinalList] = useState([]);
  
  // time states
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(0);

  const [expiryTimeStamp, setExpiryTimeStamp] = useState();
  const [isTimeLoading, setisTimeLoading] = useState(false);
  const [hasTimeChanged, setHasTimeChanged] = useState(false);

  const [supermarketUpdated, setsupermarketUpdated] = useState([
    {
      name: "",
      id: 1,
    },
  ]);

  // loading states
  const [isSubmitting, setisSubmitting] = useState(false);

  //Snackbar effects
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //Sound effects
  const successAudio = new Audio(successSound);
  const errorAudio = new Audio(errorSound);
  const infoAudio = new Audio(infoSound);
  const warningAudio = new Audio(warningSound);

  // functions
  const timeOver = (user) => {
    enqueueSnackbar(`Time Over`, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const correctAnswer = () => {
    successAudio.play();
    enqueueSnackbar("Bingo, you got it!", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const wrongAttempt = () => {
    errorAudio.play();
    enqueueSnackbar("Oops, wrong one!", {
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
  const alreadySubmitted = (user) => {
    warningAudio.play();
    enqueueSnackbar(`Wait,this question is already submitted!`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  useEffect(() => {
    setCanDrop([
      {
        0: { isDroppable: "yes", element: "" },
        1: { isDroppable: "yes", element: "" },
        2: { isDroppable: "yes", element: "" },
        3: { isDroppable: "yes", element: "" },
        4: { isDroppable: "yes", element: "" },
        5: { isDroppable: "yes", element: "" },
        6: { isDroppable: "yes", element: "" },
      },
    ]);
  }, [currQuestionPointer]);


  const addToCanDrop = (blocked, unblocked, { Zones }) => {
    blocked.forEach((blockedPlaceHolder) => {
      if (blockedPlaceHolder === "one") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            0: { ...prevCanDrop[0][0], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "two") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            1: { ...prevCanDrop[0][1], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "three") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            2: { ...prevCanDrop[0][2], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "four") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            3: { ...prevCanDrop[0][3], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "five") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            4: { ...prevCanDrop[0][4], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "six") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            5: { ...prevCanDrop[0][5], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "seven") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            6: { ...prevCanDrop[0][6], isDroppable: "no" },
          },
        ]);
      }
    });
    unblocked.forEach((unblockedPlaceHolder) => {
      if (unblockedPlaceHolder === "one") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            0: { ...prevCanDrop[0][0], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "two") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            1: { ...prevCanDrop[0][1], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "three") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            2: { ...prevCanDrop[0][2], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "four") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            3: { ...prevCanDrop[0][3], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "five") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            4: { ...prevCanDrop[0][4], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "six") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            5: { ...prevCanDrop[0][5], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "seven") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            6: { ...prevCanDrop[0][6], isDroppable: "yes" },
          },
        ]);
      }
    });
    Zones.map((presetZone) => {
      // console.log("preset", presetZone);
      if (presetZone.index === "one") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            0: {
              ...prevCanDrop[0][0],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "two") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            1: {
              ...prevCanDrop[0][1],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "three") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            2: {
              ...prevCanDrop[0][2],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "four") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            3: {
              ...prevCanDrop[0][3],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "five") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            4: {
              ...prevCanDrop[0][4],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "six") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            5: {
              ...prevCanDrop[0][5],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      } else if (presetZone.index === "seven") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[0],
            6: {
              ...prevCanDrop[0][6],
              element: presetZone.option,
              isDroppable: "no",
            },
          },
        ]);
      }
    });
  };

  const [roomUsers, setRoomUsers] = useState([
    { id: "", username: "", room: "", email: "", photoURL: "" },
  ]);

  const [roomData, setRoomData] = useState({
    name: authCtx.name,
    email: authCtx.emailid,
    photoURL: authCtx.photoURL,
    teamID: authCtx.teamID,
    type: "member",
  });

  //useEffect to fetch questions
  useEffect(() => {
    setisTimeLoading(true);
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/RoundOne/getQuestions?question=${
        currQuestionPointer + 1
      }&teamID=${authCtx.teamID}`
    )
      .then((res) => {
        return res.json();
      })
      .then(({ question, timeStamp, attemptsLeft }) => {
        addToCanDrop(
          question.BlockedZones,
          question.UnblockedZones,
          question.PrefixEnvironment
        );
        setnewAttempt(3 - attemptsLeft);
        setItems((preItem) => {
          return question.Options;
        });
        setsupermarketUpdated((prevSupermarketUpdated) => {
          return prevSupermarketUpdated.map((SupermarketItem) => {
            return {
              ...SupermarketItem,
              name: question.Options[0].name,
              id: question.Options[0].id,
            };
          });
        });
        setQuestion((prevQuestion) => {
          return {
            id: question._id,
            instruction: question.Instruction,
            options: question.Options,
          };
        });
        setTimeout(function () {
          setExpiryTimeStamp(timeStamp);
          setHasTimeChanged(true);
        }, 500);
        setisTimeLoading(false);
      });
  }, [currQuestionPointer]);

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
    socket.on("goNext", () => {
      setcurrQuestionPointer((prevPointer) => {
        if (prevPointer < 5) {
          prevPointer = prevPointer + 1;
          setAttempts((prevAttempt) => 1);
          return prevPointer;
        } else {
          socket.emit("round1", { teamID: authCtx.teamID });
          history.replace("/Submission");
          return prevPointer;
        }
      });
    });
    socket.on("correctAnswerAttempted", () => {
      correctAnswer();
    });
    socket.on("wrongAnswerAttempted", () => {
      wrongAttempt();
    });

    socket.on("timerCompleted", () => {
      history.replace("/Submission");
    });
    socket.on("receivedAttempts", (attempts) => {
      setnewAttempt(attempts.attempt);
    });
  }, [roomData]);

  //useEffect for canDrop property to finalList
  useEffect(() => {
    setFinalList((finalList) =>
      finalList.map((list, i) => {
        return { ...list, canDrop: canDrop[0][i] };
      })
    );
  }, [canDrop]);

  //to filter only unblocked zones from finalList with canDrop property
  useEffect(() => {
    setFilteredFinalList(finalList);
    setFilteredFinalList((finalList) => {
      return finalList.filter((list) => {
        return list.canDrop.isDroppable === "yes";
      });
    });
  }, [finalList]);

  //useEffect to check for user's current question
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
        setcurrQuestionPointer(data.RoundOneAttemptedQuestions.length);
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
    }
    // const newList = finalList.map((x) =>
    //   x.id === placeHolderID ? { ...x, item: itemList } : x
    // );
    // setFinalList(() => [...newList]);
    // socket.emit("update", newList);
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

  const nextQuestionHandler = () => {
    socket.emit("nextQuestion", "nextques");
    setcurrQuestionPointer((prevPointer) => {
      if (prevPointer < 5) {
        prevPointer = prevPointer + 1;
        setAttempts((prevAttempt) => 1);
        // console.log("prevPointer", prevPointer);
        return prevPointer;
      } else {
        history.replace("/Submission");
        return prevPointer;
      }
    });
  };

  const remainingPlaceHolderIds = (remainingPlaceHolderId) => {
    setremainingPlaceHolderIds(remainingPlaceHolderId);
  };

  const setremainingPlaceHolderIdsMember = (remainingPlaceHolderId) => {
    remainingPlaceHolderId.forEach((element) => {
      const deletedFinalList = finalList.map((list) => {
        if (list.id === element) {
          list.item = { ...list.item, name: "" };
        }
        return list;
      });
      setFinalList(deletedFinalList);
      socket.emit("update", deletedFinalList);
    });
  };

  const submitAnswerHandler = () => {
    setisSubmitting(true);
    fetch(
      "https://futurepreneursbackend.herokuapp.com/api/RoundOne/submitResponse",
      {
        method: "POST",
        body: JSON.stringify({
          attempts: attempts,
          questionID: question.id,
          teamID: authCtx.teamID,
          responseEnvironment: {
            Zones: filteredFinalList.map((element) => {
              return { option: element.item.name, index: element.id };
            }),
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 400) {
          alreadySubmitted();
        }
        return response.json();
      })
      .then((data) => {
        setAttempts((prevAttempt) => prevAttempt + 1);
        setnewAttempt((prevAttempt) => prevAttempt - 1);
        socket.emit("attempts", {
          attempt: newAttempt - 1,
          currQuestion: currQuestionPointer,
          teamID: authCtx.teamID,
        });
        if (data.isCorrect || newAttempt === 1) {
          if (data.isCorrect) {
            socket.emit("correctAnswer", "afasf");
            correctAnswer();
          } else {
            socket.emit("wrongAnswer", "afassf");
            wrongAttempt();
          }
          nextQuestionHandler();
        } else if (!data.isCorrect) {
          socket.emit("wrongAnswer", "afassf");
          wrongAttempt();
        }
        setScore((prevScore) => {
          return data.currentPoints;
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  };

  //is Round One Completed becoming true here?
  const submitRound1Timer = () => {
    fetch(
      `https://futurepreneursbackend.herokuapp.com/api/RoundOne/finishRoundOne`,
      {
        method: "POST",
        body: JSON.stringify({
          teamID: authCtx.teamID,
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
        // console.log(data);
        if (data) {
          timeOver();
          history.replace("/Submission");
          socket.emit("timerOver", "sdfaf");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log("finalList", finalList);
  // console.log("newfinalList", filteredFinalList);

  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  //iscorrect true in any attempt-->attempt=1 and setcurrQues++
  //iscorrect false in 1st attempt-->give msg/prompt you are incorrect and attempt++
  //3rd attempt false-->answer wrong and setcurrQues++
  //3rd attempt true-->answer correct and setcurrQues++

  // const [dontgoback, setDontgoback] = useState(true);
  // useEffect(() => {
  //   // console.log(currQuestionPointer, "curr");
  //   if (currQuestionPointer === 3) {
  //     setDontgoback(false);
  //   }
  // }, [currQuestionPointer]);

  return (
    <>
      <Nav />

      {expiryTimeStamp && (
        <CountDown
          endtime={expiryTimeStamp}
          hoursMinSecs={{ minutes: minutes, seconds: seconds }}
          submit={submitRound1Timer}
          minutes1={minutes}
          seconds1={seconds}
          hasTimeChanged={hasTimeChanged}
        />
      )}
      <div className="game-options">
        <span className="attempts-left">ATTEMPTS LEFT: {newAttempt}</span>
        {authCtx.id === localStorage.getItem("leaderID") ? (
          <button
            className="game-submit"
            style={{ backgroundColor: isSubmitting === true ? "gray" : null }}
            onClick={submitAnswerHandler}
            disabled={isSubmitting}
          >
            SUBMIT
          </button>
        ) : null}
      </div>

      <div className="dragdrop-main-container">
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
        <p
          style={{
            color: "gray",
            position: "absolute",
            zIndex: "1",
            top: "120px",
            left: "550px",
          }}
        >
          Every question is a new one and has no relevance to the last one
        </p>

        {!isTimeLoading ? (
          <>
            <img src={arrow} alt="arrow1" className="arrow1" />
            <img src={arrow} alt="arrow2" className="arrow2" />
            <img src={arrow} alt="arrow3" className="arrow3" />
            <p className="entry__text">Entry</p>
            <p className="exit__text">Exit</p>
            <p className="movieExit__text">Movie Exit</p>
            <div className="placeholders-main-container">
              <img
                src={cashCounter}
                alt="cashCounter"
                className="cashCounter"
              />
              <img
                className="supermarketImg"
                src={supermarketBG}
                alt="supermarket"
              />
              <div className="wall1"></div>
              <div className="wall2"></div>
              <div className="wall3"></div>
              {board.map((placeholder) => {
                return (
                  <BoardBox1
                    socket={socket}
                    remainingPlaceHoldersIds={remainingPlaceHoldersIds}
                    setremainingPlaceHolderIdsMember={
                      setremainingPlaceHolderIdsMember
                    }
                    currQuestionPointer={currQuestionPointer}
                    setremainingPlaceHolderIds={remainingPlaceHolderIds}
                    supermarketUpdated={supermarketUpdated}
                    deleteFinalPlaceHolder={deleteFinalPlaceHolder}
                    canDrop={placeholder.canDrop}
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
            <div className="supermarket-main-container">
              <div className="question-container">
                <h2>Question {currQuestionPointer + 1}:</h2>
                <p className="question-instruction">{question.instruction}</p>
                <p className="question-rules scrollable-content-question">
                  <p>
                    1. Be very careful about your moves because the number of
                    attempts matter.
                  </p>
                  <p>
                    2. Only the team leader can submit , others can see the
                    proceedings in real time.
                  </p>
                  <p>3. You have 6 questions and 15 mins in total. </p>
                  <p style={{ margin: "0" }}>
                    4. Once Submitted/skipped , you can not go back to previous
                    question.
                  </p>
                </p>
                <div className="question-item-set">
                  {supermarketUpdated.map((item, index) => {
                    return (
                      <div className={`question-item${index}`}>
                        {authCtx.id === localStorage.getItem("leaderID") ? (
                          <SupermarketDrag
                            name={item.name}
                            id={item.id}
                            key={item.id}
                          />
                        ) : (
                          <p id={item.id}>{item.name}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ position: "relative", left: "50%", top: "50%" }}>
            <ClipLoader color={"green"} loading={isTimeLoading} size={60} />
          </div>
        )}
      </div>
    </>
  );
}

export default DragDrop;
