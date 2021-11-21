import React, { useState, useContext, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import AuthContext from "../store/auth-context";

import SupermarketDrag from "./SupermarketDrag";
import BoardBox1 from "./BoardBox1";

import { Placeholders, Supermarket } from "../custom/data";

import "./DragDrop.css";

export const CardContext = React.createContext({
  finalList: [],
});

// const socket = io("http://127.0.0.1:2000/");
const socket = io("https://futurepreneursbackend.herokuapp.com");

function DragDrop() {
  const authCtx = useContext(AuthContext);
  // const {pathname} = useLocation();
  const [questions, setQuestion] = useState([
    { id: "", instruction: "", options: [] },
    { id: "", instruction: "", options: [] },
    { id: "", instruction: "", options: [] },
    { id: "", instruction: "", options: [] },
    { id: "", instruction: "", options: [] },
  ]);

  const [currQuestionPointer, setcurrQuestionPointer] = useState(0);

  const [canDrop, setCanDrop] = useState([
    // question1: {
    {
      0: { isDroppable: "yes", element: "" },
      1: { isDroppable: "yes", element: "" },
      2: { isDroppable: "yes", element: "" },
      3: { isDroppable: "yes", element: "" },
      4: { isDroppable: "yes", element: "" },
      5: { isDroppable: "yes", element: "" },
      6: { isDroppable: "yes", element: "" },
    },
    // question2: {
    //   0: { isDroppable: "yes", element: "" },
    //   1: { isDroppable: "yes", element: "" },
    //   2: { isDroppable: "yes", element: "" },
    //   3: { isDroppable: "yes", element: "" },
    //   4: { isDroppable: "yes", element: "" },
    //   5: { isDroppable: "yes", element: "" },
    //   6: { isDroppable: "yes", element: "" },
    // },
    // question3: {
    //   0: { isDroppable: "yes", element: "" },
    //   1: { isDroppable: "yes", element: "" },
    //   2: { isDroppable: "yes", element: "" },
    //   3: { isDroppable: "yes", element: "" },
    //   4: { isDroppable: "yes", element: "" },
    //   5: { isDroppable: "yes", element: "" },
    //   6: { isDroppable: "yes", element: "" },
    // },
    // question4: {
    //   0: { isDroppable: "yes", element: "" },
    //   1: { isDroppable: "yes", element: "" },
    //   2: { isDroppable: "yes", element: "" },
    //   3: { isDroppable: "yes", element: "" },
    //   4: { isDroppable: "yes", element: "" },
    //   5: { isDroppable: "yes", element: "" },
    //   6: { isDroppable: "yes", element: "" },
    // },
    // question5: {
    //   0: { isDroppable: "yes", element: "" },
    //   1: { isDroppable: "yes", element: "" },
    //   2: { isDroppable: "yes", element: "" },
    //   3: { isDroppable: "yes", element: "" },
    //   4: { isDroppable: "yes", element: "" },
    //   5: { isDroppable: "yes", element: "" },
    //   6: { isDroppable: "yes", element: "" },
    // },
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

  const addToCanDrop = (blocked, unblocked, { Zones }) => {
    console.log("object", blocked, unblocked, Zones);

    blocked.forEach((blockedPlaceHolder) => {
      if (blockedPlaceHolder === "one") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            0: { ...prevCanDrop[currQuestionPointer][0], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "two") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            1: { ...prevCanDrop[currQuestionPointer][1], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "three") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            2: { ...prevCanDrop[currQuestionPointer][2], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "four") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            3: { ...prevCanDrop[currQuestionPointer][3], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "five") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            4: { ...prevCanDrop[currQuestionPointer][4], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "six") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            5: { ...prevCanDrop[currQuestionPointer][5], isDroppable: "no" },
          },
        ]);
      } else if (blockedPlaceHolder === "seven") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            6: { ...prevCanDrop[currQuestionPointer][6], isDroppable: "no" },
          },
        ]);
      }
    });
    unblocked.forEach((unblockedPlaceHolder) => {
      if (unblockedPlaceHolder === "one") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            0: { ...prevCanDrop[currQuestionPointer][0], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "two") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            1: { ...prevCanDrop[currQuestionPointer][1], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "three") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            2: { ...prevCanDrop[currQuestionPointer][2], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "four") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            3: { ...prevCanDrop[currQuestionPointer][3], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "five") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            4: { ...prevCanDrop[currQuestionPointer][4], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "six") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            5: { ...prevCanDrop[currQuestionPointer][5], isDroppable: "yes" },
          },
        ]);
      } else if (unblockedPlaceHolder === "seven") {
        setCanDrop((prevCanDrop) => [
          {
            ...prevCanDrop[currQuestionPointer],
            6: { ...prevCanDrop[currQuestionPointer][6], isDroppable: "yes" },
          },
        ]);
      } 
    });
    Zones.map((presetZone) => {
      console.log("preset", presetZone);
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
      }
    });
  };
  console.log(canDrop);
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

  useEffect(() => {
    fetch("https://futurepreneursbackend.herokuapp.com/api/RoundOne/getQuestions")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        addToCanDrop(
          data[currQuestionPointer].BlockedZones,
          data[currQuestionPointer].UnblockedZones,
          data[currQuestionPointer].PrefixEnvironment
        );
        setQuestion(() => [
          {
            id: data[0]._id,
            instruction: data[0].Instruction,
            options: data[0].Options,
          },
          {
            id: data[1]._id,
            instruction: data[1].Instruction,
            options: data[1].Options,
          },
        ]);
      });
  }, [currQuestionPointer]);

  useEffect(() => {
    socket.on("roomUsers", (data) => {
      console.log(data.users);
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

  const submitAnswerHandler = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:2000/api/RoundOne/submitResponse", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  console.log("finalList", finalList);
  console.log("newfinalList", filteredFinalList);

  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  const nextQuestionHandler = () => {
    setcurrQuestionPointer((prevPointer) => {
      if (prevPointer < 1) {
        prevPointer = prevPointer + 1;
        return prevPointer;
      } else {
        console.log(prevPointer);
        return prevPointer;
      }
    });
  };

  return (
    <CardContext.Provider value={{}}>
      <h1>{questions[currQuestionPointer].instruction}</h1>
      <h1>{questions[currQuestionPointer].id}</h1>
      <button onClick={nextQuestionHandler}>Next question</button>
      <div className="dragdrop-main-container">
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
          {Supermarket.map((item) => {
            return (
              <SupermarketDrag name={item.name} id={item.id} key={item.id} />
            );
          })}
        </div>
      </div>
      <button onClick={submitAnswerHandler}>Submit</button>
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
    </CardContext.Provider>
  );
}

export default DragDrop;
