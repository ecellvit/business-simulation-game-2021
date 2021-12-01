import React, { useState, useContext, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  Prompt,
  useHistory,
} from "react-router-dom";
import { useTimer } from "react-timer-hook";
import { useSnackbar } from "notistack";
import { io } from "socket.io-client";
import AuthContext from "../store/auth-context";
import cashCounter from "../resources/images/cashCounter.jpg";
import SupermarketDrag from "./SupermarketDrag";
import arrow from "../resources/images/arrow2.png";
import BoardBox1 from "./BoardBox1";
import CountDown from "./Dashboard/CountDown";
import { Placeholders } from "../custom/data";

import "./DragDrop.css";
import { Nav } from "./nav";

import supermarketBG from "../resources/images/bgImg1.jpg";
import { Calculate, MailOutlineSharp } from "@mui/icons-material";
// import SubmissionPage from "./SubmissionPage";
export const CardContext = React.createContext({
  finalList: [],
});

// const socket = io("http://127.0.0.1:2000/");
// const socket = io("https://127.0.0.1:2000/",{transports: ['websocket']});

var socket = io("https://futurepreneursbackend.herokuapp.com");


function MyTimer({ expiryTimestamp, nextQuestionHandler }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const timeOver = (user) => {
    enqueueSnackbar(`Time Over`, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  // console.log(expiryTimestamp,"in timer")
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  // useEffect(() => {
  //   console.log(expiryTimestamp, "in timer");
  // }, [expiryTimestamp]);

  const { seconds, minutes } = useTimer({
    expiryTimestamp,
    onExpire: () => {
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
          console.log(data);
          if (data) {
            timeOver();
            history.replace("/Submission");
            socket.emit("timerOver", "sdfaf");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <div style={{ textAlign: "center", position: "absolute", left: "600px" }}>
      <div style={{ fontSize: "30px" }} className="timer">
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {/* <p>{isRunning ? "Running" : "Not running"}</p> */}
      {/* <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button> */}
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}

function DragDrop() {
  const [isTimerOVer, setisTimerOVer] = useState(false);
  const authCtx = useContext(AuthContext);
  const [expiryTimeStamp, setExpiryTimeStamp] = useState();
  // const [currTime, setcurrTime] = useState(new Date());
  const [isSubmitting, setisSubmitting] = useState(false);
  const [newAttempt, setnewAttempt] = useState(() => {
    fetch("");
  });
  // const [time, setTime] = useState(new Date().setSeconds(this.get));
  let time = new Date();
  time.setSeconds(time.getSeconds() + 900); // 10 minutes timer
  // console.log(time, "oldtime");

  // useEffect(() => {
  //   console.log(expiryTimeStamp, "expire");
  // }, [expiryTimeStamp]);

  // time = time.setSeconds(time.getSeconds() + 900); // This is the time allowed
  // let saved_countdown = localStorage.getItem("saved_countdown");
  // useEffect(() => {
  //   if (saved_countdown == null) {
  //     // Set the time we're counting down to using the time allowed
  //     let new_countdown = new Date().getTime() + (time + 2) * 1000;

  //     console.log(time,"new")
  //     localStorage.setItem("saved_countdown", new_countdown);
  //   } else {
  //     time = saved_countdown;
  //   }
  // }, [input])

  // // Update the count down every 1 second
  // useEffect(() => {
  //   const x = setInterval(() => {
  //     let now = new Date().getTime();
  //     // Find the distance between now and the allowed time
  //     let distance = time - now;

  //     // Time counter
  //     let counter = Math.floor((distance % (1000 * 60)) / 1000);
  //     console.log(counter)
  //     // If the count down is over, write some text
  //     if (counter <= 0) {
  //       clearInterval(x);
  //       localStorage.removeItem("saved_countdown");
  //     }
  //   }, 1000);
  //   return () => clearInterval(x);
  // }, []);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const correctAnswer = () => {
    enqueueSnackbar("Bingo, you got it!", {
      variant: "success",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const wrongAttempt = () => {
    enqueueSnackbar("Oops, wrong one!", {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  const userJoined = (user) => {
    enqueueSnackbar(`${user.username} has joined the game!`, {
      variant: "info",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };
  const alreadySubmitted = (user) => {
    enqueueSnackbar(`Wait,this question is already submitted!`, {
      variant: "warning",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const history = useHistory();
  const [score, setScore] = useState(0);
  const [sockets, setSockets] = useState(false);
  const [micMuted, setMicMuted] = useState(true);
  const [minutes,setMinutes] = useState(1);
  const [seconds,setSeconds] = useState(0);
  const [isHandRaised, setisHandRaised] = useState(false);
  const [items, setItems] = useState(["", "", "", ""]);
  const [question, setQuestion] = useState({
    id: "",
    instruction: "",
    options: [],
  });

  const [supermarketUpdated, setsupermarketUpdated] = useState([
    {
      name: "",
      id: 1,
    },
    // {
    //   name: "",
    //   id: 2,
    // },
    // {
    //   name: "",
    //   id: 3,
    // },
    // {
    //   name: "",
    //   id: 4,
    // },
  ]);

  const [attempts, setAttempts] = useState(1);

  const [currQuestionPointer, setcurrQuestionPointer] = useState(0);

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

  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "", name: "" }, canDrop: "" },
    { id: "two", item: { id: "", name: "" }, canDrop: "" },
    { id: "three", item: { id: "", name: "" }, canDrop: "" },
    { id: "four", item: { id: "", name: "" }, canDrop: "" },
    { id: "five", item: { id: "", name: "" }, canDrop: "" },
    { id: "six", item: { id: "", name: "" }, canDrop: "" },
    { id: "seven", item: { id: "", name: "" }, canDrop: "" },
  ]);

  const [remainingPlaceHoldersIds, setremainingPlaceHolderIds] = useState([]);

  const [filteredFinalList, setFilteredFinalList] = useState([]);

  const board = Placeholders.map((placeholder, i) => {
    return { ...placeholder, canDrop: canDrop[0][i].isDroppable };
  });

  const addToCanDrop = (blocked, unblocked, { Zones }) => {
    // console.log("object", blocked, unblocked, Zones);

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

  // "https://futurepreneursbackend.herokuapp.com/api/RoundOne/getQuestions"
  //useEffect to fetch questions
  useEffect(() => {
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
        console.log(attemptsLeft, "att");
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
        setExpiryTimeStamp(Date(timeStamp));
        // console.log("from backend", timeStamp);
      });
  }, [currQuestionPointer]);

  // useEffect(() => {
  //   setcurrTime(Math.floor(Date.now()/1000))
  // }, [])

  // console.log(Number(expiryTimeStamp)-Math.floor(Date.now()/1000),"time rem")
  // console.log(expiryTimeStamp,"time from backend")
  // console.log(expiryTimeStamp.getTime()/1000 - Math.floor(Date.now()/1000),"time rem")

  //useEffect for sockets

  useEffect(() => {
    console.log("Socket status", socket.connected);
    if (socket.connected) {
      socket.disconnect();
      socket = io("https://futurepreneursbackend.herokuapp.com");
    }
    socket.on("roomUsers", (data) => {
      console.log("roomUsers", data);
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
          // console.log(prevPointer);
          socket.emit("round1", { teamID: authCtx.teamID });
          history.replace("/Submission");
          return prevPointer;
        }
      });
    });
    socket.on("timerCompleted", () => {
      history.replace("/Submission");
    });
    socket.on("receivedAttempts", (attempts) => {
      // setAttempts(attempts.attempt);
      console.log(attempts.attempt, "hey");
      setnewAttempt(attempts.attempt);
    });
  }, [roomData]);
  // console.log(roomUsers)

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

  //disconnecting socket
  // useEffect(
  //   () =>
  //     history.listen(() => {
  //       const disconnect = async () => {
  //         socket.disconnect();
  //       };
  //       disconnect();
  //     }),
  //   []
  // );

  // useEffect(() => {
  //   const disconnect = async () => {
  //     await socket.disconnect();
  //   };
  //   console.log("sockets",sockets,history)
  //   if(sockets){
  //     disconnect();
  //   }else{
  //     setSockets(true);
  //   }
  //   // console.log("history",history)
  // }, [history.location.pathname]);

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

  // useEffect(() => {
  //   fetch(`https://futurepreneursbackend.herokuapp.com/`)
  //     .then((response) => {
  //       if (response.status === 400) {
  //         history.replace("/Error");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if(data.isRoundOneOn){
  //         history.replace("/Dashboard");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

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

  // useEffect(() => {
  //   finalList.map((item) => {
  //     return { ...item, canDrop: { isDroppable: "yes", element: "" } };
  //   });
  //   // const set = ["one", "two", "three", "four", "five", "six", "seven"];
  //   // set.forEach((element) => {});
  // }, [currQuestionPointer]);

  const nextQuestionHandler = () => {
    socket.emit("nextQuestion", "nextques");
    setcurrQuestionPointer((prevPointer) => {
      if (prevPointer < 5) {
        prevPointer = prevPointer + 1;
        setAttempts((prevAttempt) => 1);
        console.log("prevPointer", prevPointer);
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
              console.log("ans", {
                option: element.item.name,
                index: element.id,
              });
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
          correctAnswer();
          nextQuestionHandler();
        } else if (!data.isCorrect) {
          wrongAttempt();
        }
        setScore((prevScore) => {
          return data.currentPoints;
        });
        setMinutes(2);
        setSeconds(20);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisSubmitting(false);
      });
  };
  
  const submitRound1Timer = ()=>{
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
        console.log(data);
        if (data) {
          history.replace("/Submission");
          socket.emit("timerOver", "sdfaf");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("finalList", finalList);
  // console.log("newfinalList", filteredFinalList);

  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  //iscorrect true in any attempt-->attempt=1 and setcurrQues++
  //iscorrect false in 1st attempt-->give msg/prompt you are incorrect and attempt++
  //3rd attempt false-->answer wrong and setcurrQues++
  //3rd attempt true-->answer correct and setcurrQues++
  const [dontgoback, setDontgoback] = useState(true);
  useEffect(() => {
    console.log(currQuestionPointer, "curr");
    if (currQuestionPointer === 3) {
      setDontgoback(false);
    }
  }, [currQuestionPointer]);

  return (
    <CardContext.Provider value={{}}>
      {/* <Nav expiryTimestamp={time} /> */}
      <Nav />
      {/* <CountDown endtime={expiryTimeStamp} hoursMinSecs={{minutes: minutes, seconds: seconds}} submit={submitRound1Timer}/> */}
      {/* <button onClick={handleClick}>Click</button> */}
      {/* <Prompt message="Don't Navigate Away" when={dontgoback} /> */}
      <div>
        {authCtx.id === localStorage.getItem("leaderID") && (
          <MyTimer
            setisTimerOVer={setisTimerOVer}
            nextQuestionHandler={nextQuestionHandler}
            // expiryTimestamp={Number(expiryTimeStamp) - Math.floor(Date.now()/1000)}
            expiryTimestamp1={time}
            submitAnswerHandler={submitAnswerHandler}
          />
        )}
      </div>
      {/* ATTEMPTS LEFT: {4 - attempts > 1 ? 4 - attempts : 1} */}
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
        <img src={arrow} alt="arrow1" className="arrow1" />
        <img src={arrow} alt="arrow2" className="arrow2" />
        <img src={arrow} alt="arrow3" className="arrow3" />
        <p className="entry__text">Entry</p>
        <p className="exit__text">Exit</p>
        <p className="movieExit__text">Movie Exit</p>
        <div className="placeholders-main-container">
          <img src={cashCounter} alt="cashCounter" className="cashCounter" />
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
      </div>
    </CardContext.Provider>
  );
}

export default DragDrop;
