import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-react";
import AuthContext from "../store/auth-context";

import SupermarketDrag from "./SupermarketDrag";
import BoardBox1 from "./BoardBox1";

import { Placeholders, Supermarket } from "../custom/data";

import "./DragDrop.css";
import { Nav } from "./nav";

export const CardContext = React.createContext({
  finalList: [],
});

const socket = io("http://127.0.0.1:2000/");
// const socket = io("https://futurepreneursbackend.herokuapp.com");

let rtc = {
  localAudioTrack: null,
  client: null,
};

let options = {
  // Pass your App ID here.
  appId: "583e53c6739745739d20fbb11ac8f0ef",
  // Set the channel name.
  channel: "test",
  // Pass your temp token here.
  token: `${process.env.REACT_APP_GOOGLE_ID}`,
  // Set the user ID.
  uid: Math.floor(Math.random() * 202123),
};

async function startBasicCall() {
  // Create an AgoraRTCClient object.
  rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  // Listen for the "user-published" event, from which you can get an AgoraRTCRemoteUser object.
  rtc.client.on("user-published", async (user, mediaType) => {
    // Subscribe to the remote user when the SDK triggers the "user-published" event
    await rtc.client.subscribe(user, mediaType);
    console.log("subscribe success");

    // If the remote user publishes an audio track.
    if (mediaType === "audio") {
      // Get the RemoteAudioTrack object in the AgoraRTCRemoteUser object.
      const remoteAudioTrack = user.audioTrack;
      // Play the remote audio track.
      remoteAudioTrack.play();
    }
  });
}
startBasicCall();

function DragDrop() {
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState(0);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const [items, setItems] = useState(["", "", "", ""]);
  // const {pathname} = useLocation();
  const [question, setQuestion] = useState({
    id: "",
    instruction: "",
    options: [],
  });

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
    { id: "one", item: { id: "1", name: "" }, canDrop: "" },
    { id: "two", item: { id: "2", name: "" }, canDrop: "" },
    { id: "three", item: { id: "3", name: "" }, canDrop: "" },
    { id: "four", item: { id: "4", name: "" }, canDrop: "" },
    { id: "five", item: { id: "5", name: "" }, canDrop: "" },
    { id: "six", item: { id: "6", name: "" }, canDrop: "" },
    { id: "seven", item: { id: "6", name: "" }, canDrop: "" },
  ]);

  const [filteredFinalList, setFilteredFinalList] = useState([]);

  const board = Placeholders.map((placeholder, i) => {
    return { ...placeholder, canDrop: canDrop[0][i].isDroppable };
  });

  const joinCall = async function () {
    // Join an RTC channel.
    await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    // Create a local audio track from the audio sampled by a microphone.
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Publish the local audio tracks to the RTC channel.
    await rtc.client.publish([rtc.localAudioTrack]);

    console.log("publish success!");
  };

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
      }
    });
  };
  // console.log(canDrop);
  // useEffect(() => {
  //   socket.emit("disconnects");
  //   console.log("disconnected")
  // }, [pathname]);

  const [roomUsers, setRoomUsers] = useState([
    { id: "", username: "", room: "", email: "", photoURL: "" },
  ]);

  const [roomData, setRoomData] = useState({
    name: authCtx.name,
    email: authCtx.emailid,
    photoURL: authCtx.photoURL,
    teamID: authCtx.teamID,
  });
  // "https://futurepreneursbackend.herokuapp.com/api/RoundOne/getQuestions"
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
        setQuestion((prevQuestion) => {
          return {
            id: data._id,
            instruction: data.Instruction,
            options: data.Options,
          };
        });
      });
  }, [currQuestionPointer]);

  useEffect(() => {
    socket.on("roomUsers", (data) => {
      // console.log(data.users);
      setRoomUsers(data.users);
    });
    socket.emit("joinRoom", roomData);
  }, [roomData]);

  useEffect(() => {
    setFinalList((finalList) =>
      finalList.map((list, i) => {
        return { ...list, canDrop: canDrop[0][i] };
      })
    );
  }, [canDrop]);

  useEffect(() => {
    setFilteredFinalList(finalList);
    setFilteredFinalList((finalList) => {
      return finalList.filter((list) => {
        return list.canDrop.isDroppable === "yes";
      });
    });
  }, [finalList]);

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
        x.id === "six" ? { ...x, item: itemList } : x
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
  // {questionID:,teamID:,attempts:,responseEnvironment:{Zones:[{index:"",option:""}]}}

  const nextQuestionHandler = () => {
    setcurrQuestionPointer((prevPointer) => {
      if (prevPointer < 1) {
        prevPointer = prevPointer + 1;
        setAttempts((prevAttempt) => 1);
        return prevPointer;
      } else {
        // console.log(prevPointer);
        return prevPointer;
      }
    });
  };

  const submitAnswerHandler = (event) => {
    event.preventDefault();
    fetch("https://futurepreneursbackend.herokuapp.com/api/RoundOne/submitResponse", {
      method: "POST",
      body: JSON.stringify({
        attempts: attempts,
        questionID: question.id,
        teamID: authCtx.teamID,
        responseEnvironment: {
          Zones: filteredFinalList.map((element) => {
            // console.log({ option: element.item.name, index: element.id });
            return { option: element.item.name, index: element.id };
          }),
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAttempts((prevAttempt) => prevAttempt + 1);
        // console.log(data);
        // console.log("attempt", attempts);
        if (data.isCorrect || attempts === 3) {
          nextQuestionHandler();
        }
        setScore((prevScore) => {
          return data.currentPoints;
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  // console.log("finalList", finalList);
  // console.log("newfinalList", filteredFinalList);
  // console.log("currQuestion", currQuestionPointer);
  // console.log("items", items);
  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  //iscorrect true in any attempt-->attempt=1 and setcurrQues++
  //iscorrect false in 1st attempt-->give msg/prompt you are incorrect and attempt++
  //3rd attempt false-->answer wrong and setcurrQues++
  //3rd attempt true-->answer correct and setcurrQues++

  return (
    <CardContext.Provider value={{}}>
      <Nav expiryTimestamp={time} />
      <div className="game-options">
        <button className="game-microphone" onClick={joinCall}>
          Microphone
        </button>
        <button className="game-submit" onClick={nextQuestionHandler}>
          SKIP
        </button>
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
        <div className="placeholders-main-container">
          {board.map((placeholder) => {
            return (
              <BoardBox1
                socket={socket}
                // emitUpdate={emitUpdate}
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
            <p className="question-instruction">{question.instruction}</p>
            {/* <h1>{question.id}</h1> */}
            <p className="question-score">Score:{score}</p>
            <p className="question-attempt">Attempt:{attempts}</p>
          </div>
          {items.map((item, index) => {
            return <p className="question-item">{item}</p>;
          })}
        </div>
      </div>
      <button onClick={submitAnswerHandler}>Submit</button>
    </CardContext.Provider>
  );
}

export default DragDrop;
