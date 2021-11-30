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

import { Placeholders } from "../custom/data";

import "./DragDrop.css";
import { Nav } from "./nav";

import supermarketBG from "../resources/images/bgImg1.jpg";
// import SubmissionPage from "./SubmissionPage";
export const CardContext = React.createContext({
  finalList: [],
});

// const socket = io("http://127.0.0.1:2000/");
// const socket = io("https://127.0.0.1:2000/",{transports: ['websocket']});

const socket = io("https://futurepreneursbackend.herokuapp.com");

// let rtc = {
//   localAudioTrack: null,
//   client: null,
// };

// async function startBasicCall() {
//   rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

//   rtc.client.on("user-published", async (user, mediaType) => {
//     await rtc.client.subscribe(user, mediaType);
//     console.log("subscribe success");

//     if (mediaType === "audio") {
//       const remoteAudioTrack = user.audioTrack;
//       // Play the remote audio track.
//       remoteAudioTrack.play();
//     }
//     rtc.client.on("user-unpublished", async (user) => {
//       await rtc.client.unsubscribe(user);
//     });
//   });
// }
// startBasicCall();

function MyTimer({ expiryTimestamp ,nextQuestionHandler}) {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const { seconds, minutes, isRunning, start, pause, resume, restart } =
    useTimer({
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
              history.replace("/Submission")
              socket.emit('timerOver','sdfaf')
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
  const time = new Date();
  time.setSeconds(time.getSeconds() + 900); // 10 minutes timer

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
  const timeOver = (user) => {
    enqueueSnackbar(`Time Over`, {
      variant: "error",
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "right",
      },
    });
  };

  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState(0);
  const [sockets, setSockets] = useState(false);
  // const time = new Date();
  // time.setSeconds(time.getSeconds() + 600);
  const [micMuted, setMicMuted] = useState(true);
  const [isHandRaised, setisHandRaised] = useState(false);
  const [items, setItems] = useState(["", "", "", ""]);
  // const {pathname} = useLocation();
  const [question, setQuestion] = useState({
    id: "",
    instruction: "",
    options: [],
  });
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

  //token generation
  // useEffect(() => {
  //   // console.log("token details", authCtx.teamID, authCtx.uID);
  //   fetch(
  //     `https://futurepreneursbackend.herokuapp.com/api/voice/token?channel=${authCtx.teamID}&uid=${authCtx.uID}&role=publisher`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setOptions((prevOptions) => ({
  //         ...prevOptions,
  //         channel: authCtx.teamID,
  //         token: data.token,
  //       }));
  //       // console.log("token", data.token);
  //     });
  // }, []);

  // const joinCall = async function () {
  //   // Join an RTC channel.
  //   // console.log("object", options.token);
  //   await rtc.client.join(
  //     options.appId,
  //     options.channel,
  //     options.token,
  //     options.uid
  //   );
  //   // Create a local audio track from the audio sampled by a microphone.
  //   rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
  //   // Publish the local audio tracks to the RTC channel.
  //   await rtc.client.publish([rtc.localAudioTrack]);
  //   setMicMuted(false);
  //   console.log("publish success!");
  // };

  // const leaveCall = async function () {
  //   // Destroy the local audio track.
  //   rtc.localAudioTrack.close();

  //   // Leave the channel.
  //   await rtc.client.leave();
  //   setMicMuted(true);
  //   console.log("leave Success");
  // };

  // const handRaise = () => {
  //   socket.emit("handraise", "fp");
  //   setisHandRaised(true);
  // };

  // const handDown = () => {
  //   socket.emit("handdown", "fp");
  //   setisHandRaised(false);
  // };

  const addToCanDrop = (blocked, unblocked, { Zones }) => {
    console.log("object", blocked, unblocked, Zones);

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
      }`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        addToCanDrop(
          data.BlockedZones,
          data.UnblockedZones,
          data.PrefixEnvironment
        );
        setItems((preItem) => {
          return data.Options;
        });
        // console.log("data", data.Options);
        setsupermarketUpdated((prevSupermarketUpdated) => {
          return prevSupermarketUpdated.map((SupermarketItem) => {
            return {
              ...SupermarketItem,
              name: data.Options[0].name,
              id: data.Options[0].id,
            };
          });
        });
        setQuestion((prevQuestion) => {
          return {
            id: data._id,
            instruction: data.Instruction,
            options: data.Options,
          };
        });
      });
  }, [currQuestionPointer]);

  //useEffect for sockets
  useEffect(() => {
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
    socket.on('timerCompleted',()=>{
      history.replace('/Submission')
    })
    socket.on("receivedAttempts", (attempts) => {
      setAttempts(attempts.attempt);
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

  useEffect(() => {
    const set = ["one", "two", "three", "four", "five", "six", "seven"];
    set.forEach((element) => {});
  }, [currQuestionPointer]);

  // {questionID:,teamID:,attempts:,responseEnvironment:{Zones:[{index:"",option:""}]}}

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
      .then((response) => response.json())
      .then((data) => {
        setAttempts((prevAttempt) => prevAttempt + 1);
        socket.emit("attempts", {
          attempt: attempts + 1,
          currQuestion: currQuestionPointer,
          teamID: authCtx.teamID,
        });
        if (data.isCorrect || attempts === 3) {
          correctAnswer();
          nextQuestionHandler();
        } else if (!data.isCorrect) {
          wrongAttempt();
        }
        setScore((prevScore) => {
          return data.currentPoints;
        });
      })
      .catch((err) => {
        // alert(err);
        history.replace("/Error");
      });
  };
  console.log("timerOver", isTimerOVer);
  // console.log("finalList", finalList);
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
    console.log(currQuestionPointer,"curr")
    if(currQuestionPointer===3){
      setDontgoback(false)
    }
  }, [currQuestionPointer])

  return (
    <CardContext.Provider value={{}}>
      {/* <Nav expiryTimestamp={time} /> */}
      <Nav />
      {/* <button onClick={handleClick}>Click</button> */}
      <Prompt message="Don't Navigate Away" when={dontgoback} />
      <div>
        {authCtx.id === localStorage.getItem("leaderID") && (
          <MyTimer
            setisTimerOVer={setisTimerOVer}
            nextQuestionHandler={nextQuestionHandler}
            expiryTimestamp={time}
            submitAnswerHandler={submitAnswerHandler}
          />
        )}
      </div>
      {/* {isHandRaised ? (
        <img
          alt="handDown"
          onClick={handDown}
          className="hand"
          src={handDownImg}
        />
      ) : (
        <img alt="hand" onClick={handRaise} className="hand" src={handImg} />
      )}
      {!isHandRaised ? (
        <img alt="hand" onClick={handRaise} className="hand" src={handImg} />
      ) : (
        <img
          alt="handDown"
          onClick={handDown}
          className="hand"
          src={handDownImg}
        />
      )} */}
      {/* <Button onClick={}>Open simple snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={}
        message="Note archived"
        action={action}
      /> */}
      <div className="game-options">
        <span className="attempts-left">ATTEMPTS LEFT: {4 - attempts}</span>
        {/* <span className="score">SCORE: {score}</span> */}

        {/* {micMuted && (
          <button className="game-microphone" onClick={joinCall}>
            Join Call
          </button>
        )}
        {!micMuted && (
          <button className="game-microphone" onClick={leaveCall}>
            End Call
          </button>
        )} */}

        {authCtx.id === localStorage.getItem("leaderID") ? (
          <button className="game-submit" onClick={submitAnswerHandler}>
            SUBMIT
          </button>
        ) : null}
        {/* <button className="game-skip" onClick={nextQuestionHandler}>
          SKIP
        </button> */}
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
                // emitUpdate={emitUpdate}
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
                    <SupermarketDrag
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
      </div>
    </CardContext.Provider>
  );
}

export default DragDrop;
