import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-react";
import AuthContext from "../store/auth-context";
import handImg from "../resources/images/hand.png";
import handDownImg from "../resources/images/handDown.jpeg";
import SupermarketDrag from "./SupermarketDrag";
import BoardBox2 from "./BoardBox2";

import { Placeholders2 } from "../custom/data2";

import "./DragDrop2.css";
import { Nav } from "./nav";

import supermarketBG2 from "../resources/images/bgImg2.png";
export const CardContext = React.createContext({
  finalList: [],
});

// const socket = io("http://127.0.0.1:2000/");
const socket = io("https://futurepreneursbackend.herokuapp.com");

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

function DragDrop() {
  const history = useHistory();
  const board = Placeholders2;

  const [supermarketUpdated, setSupermarketReceived] = useState([
    {
      name: "Erasers",
      id: 1,
    },
    {
      name: "Shampoos",
      id: 2,
    },
    {
      name: "Shaving Kits",
      id: 3,
    },
    {
      name: "Tooth Pastes",
      id: 4,
    },
    {
      name: "Crayons",
      id: 5,
    },
    {
      name: "After Shave Kits",
      id: 6,
    },
    {
      name: "Pencils",
      id: 7,
    },
    {
      name: "Conditioners",
      id: 8,
    },
    {
      name: "Sketch Books",
      id: 9,
    },
    {
      name: "Tooth Brushes",
      id: 10,
    },
    {
      name: "Dark Chocolates",
      id: 11,
    },
    {
      name: "Barbie Dolls",
      id: 12,
    },
    {
      name: "Kitchen Tools",
      id: 13,
    },
    {
      name: "Trimmer",
      id: 14,
    },
    {
      name: "Board Games",
      id: 15,
    },
  ]);
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState(0);
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

  // const [supermarketUpdated, setsupermarketUpdated] = useState([
  //   {
  //     name: "",
  //     id: 1,
  //   },
  //   {
  //     name: "",
  //     id: 2,
  //   },
  //   {
  //     name: "",
  //     id: 3,
  //   },
  //   {
  //     name: "",
  //     id: 4,
  //   },
  //   {
  //     name: "",
  //     id: 5,
  //   },
  //   {
  //     name: "",
  //     id: 6,
  //   },
  //   {
  //     name: "",
  //     id: 7,
  //   },
  //   {
  //     name: "",
  //     id: 8,
  //   },
  //   {
  //     name: "",
  //     id: 9,
  //   },
  //   {
  //     name: "",
  //     id: 10,
  //   },
  //   {
  //     name: "",
  //     id: 11,
  //   },
  //   {
  //     name: "",
  //     id: 12,
  //   },
  //   {
  //     name: "",
  //     id: 13,
  //   },
  //   {
  //     name: "",
  //     id: 14,
  //   },
  //   {
  //     name: "",
  //     id: 15,
  //   },
  // ]);

  const [attempts, setAttempts] = useState(1);

  const [currQuestionPointer, setcurrQuestionPointer] = useState(0);

  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "", name: "" } },
    { id: "two", item: { id: "", name: "" } },
    { id: "three", item: { id: "", name: "" } },
    { id: "four", item: { id: "", name: "" } },
    { id: "five", item: { id: "", name: "" } },
    { id: "six", item: { id: "", name: "" } },
    { id: "seven", item: { id: "", name: "" } },
    { id: "eight", item: { id: "", name: "" } },
    { id: "nine", item: { id: "", name: "" } },
    { id: "ten", item: { id: "", name: "" } },
    { id: "eleven", item: { id: "", name: "" } },
    { id: "twelve", item: { id: "", name: "" } },
    { id: "thirteen", item: { id: "", name: "" } },
    { id: "fourteen", item: { id: "", name: "" } },
    { id: "fifteen", item: { id: "", name: "" } },
  ]);

  const [filteredFinalList, setFilteredFinalList] = useState([]);

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
      `https://futurepreneursbackend.herokuapp.com/api/voice/token?channel=${authCtx.teamID}&uid=${authCtx.uID}&role=publisher`
    )
      .then((res) => res.json())
      .then((data) => {
        setOptions((prevOptions) => ({
          ...prevOptions,
          channel: authCtx.teamID,
          token: data.token,
        }));
      });
  }, []);

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
    setMicMuted(false);
    console.log("publish success!");
  };

  const leaveCall = async function () {
    // Destroy the local audio track.
    rtc.localAudioTrack.close();

    // Leave the channel.
    await rtc.client.leave();
    setMicMuted(true);
    console.log("leave Success");
  };

  const handRaise = () => {
    socket.emit("handraise", "fp");
    setisHandRaised(true);
  };

  const handDown = () => {
    socket.emit("handdown", "fp");
    setisHandRaised(false);
  };

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

  //useEffect for sockets
  useEffect(() => {
    socket.on("roomUsers", (data) => {
      setRoomUsers(data.users);
    });
    socket.emit("joinRoom", roomData);
  }, [roomData]);

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
  // {questionID:,teamID:,attempts:,responseEnvironment:{Zones:[{index:"",option:""}]}}

  const submitAnswerHandler = (event) => {
    event.preventDefault();
    fetch("https://futurepreneursbackend.herokuapp.com/api/roundTwo/submitResponse", {
      method: "POST",
      body: JSON.stringify({
        teamID: authCtx.teamID,

        Zones: finalList.map((element) => {
          console.log({ option: element.item.name, index: element.id });
          return { option: element.item.name, index: element.id };
        }),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setScore((prevScore) => {
          return data.currentPoints;
        });
        socket.emit("round2", { teamID: authCtx.teamID });
        history.replace("/Submission");
      })
      .catch((err) => {
        // alert(err);
        history.replace("/Error");
      });
  };
  console.log("finalList", finalList);
  console.log("newfinalList", filteredFinalList);

  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  //iscorrect true in any attempt-->attempt=1 and setcurrQues++
  //iscorrect false in 1st attempt-->give msg/prompt you are incorrect and attempt++
  //3rd attempt false-->answer wrong and setcurrQues++
  //3rd attempt true-->answer correct and setcurrQues++

  return (
    <CardContext.Provider value={{}}>
      {/* <Nav expiryTimestamp={time} /> */}
      <Nav />
      {isHandRaised ? (
        <img
          alt="handDown"
          onClick={handDown}
          className="hand"
          src={handDownImg}
        />
      ) : (
        <img alt="hand" onClick={handRaise} className="hand2" src={handImg} />
      )}
      {!isHandRaised ? (
        <img alt="hand" onClick={handRaise} className="hand2" src={handImg} />
      ) : (
        <img
          alt="handDown"
          onClick={handDown}
          className="hand"
          src={handDownImg}
        />
      )}
      <div className="game-options">
        {micMuted && (
          <button className="game-microphone2" onClick={joinCall}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-mic-mute-fill"
              viewBox="0 0 16 16"
            >
              <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z" />
              <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z" />
            </svg>
          </button>
        )}
        {!micMuted && (
          <button className="game-microphone2" onClick={leaveCall}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-mic"
              viewBox="0 0 16 16"
            >
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
            </svg>
          </button>
        )}
        {localStorage.getItem("leaderID") === authCtx.id ? (
          <button className="game-submit" onClick={submitAnswerHandler}>
            SUBMIT
          </button>
        ) : null}
      </div>

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
                // emitUpdate={emitUpdate}
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
            {/* <p className="question-instruction">{question.instruction}</p> */}
            <p className="question-instruction2">Rules</p>
            <p className="questions-rules2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
              odio distinctio, non ab iusto nesciunt officiis voluptatibus
              officia ex veniam aperiam eaque voluptas omnis consequatur
              perspiciatis quidem natus error dolore.
            </p>
          </div>
          <div className="question-item-set2">
            {supermarketUpdated.map((item, index) => {
              return (
                <div className={`question-item2${index}`}>
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
    </CardContext.Provider>
  );
}

export default DragDrop;
