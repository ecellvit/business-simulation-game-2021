import React, { useState, useContext, useEffect } from "react";
import { Placeholders, Supermarket } from "../custom/data";
import SupermarketDrag from "./SupermarketDrag";
import "./DragDrop.css";
import { io } from "socket.io-client";
import BoardBox1 from "./BoardBox1";
import AuthContext from "../store/auth-context";
import { Route, Switch, useLocation } from "react-router-dom";

export const CardContext = React.createContext({
  finalList: [],
});

const socket = io("http://127.0.0.1:2000/");

function DragDrop() {
  // const {pathname} = useLocation();

  const [canDrop, setCanDrop] = useState([
    { isDroppable: "no", element: "Grains" },
    { isDroppable: "yes", element: "" },
    { isDroppable: "no", element: "Fruits" },
    { isDroppable: "no", element: "" },
    { isDroppable: "yes", element: "" },
    { isDroppable: "no", element: "" },
  ]);
  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "1", name: "" }, canDrop: "" },
    { id: "two", item: { id: "2", name: "" }, canDrop: "" },
    { id: "three", item: { id: "3", name: "" }, canDrop: "" },
    { id: "four", item: { id: "4", name: "" }, canDrop: "" },
    { id: "five", item: { id: "5", name: "" }, canDrop: "" },
    { id: "six", item: { id: "6", name: "" }, canDrop: "" },
  ]);

  const [filteredFinalList, setFilteredFinalList] = useState([]);

  const board = Placeholders.map((placeholder, i) => {
    return { ...placeholder, canDrop: canDrop[i].isDroppable };
  });

  const authCtx = useContext(AuthContext);
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
    setFinalList((finalList) =>
      finalList.map((list, i) => {
        return { ...list, canDrop: canDrop[i] };
      })
    );
    socket.on("roomUsers", (data) => {
      console.log(data.users);
      setRoomUsers(data.users);
    });
    socket.emit("joinRoom", roomData);
  }, [roomData, canDrop]);

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

  console.log("finalList", finalList);
  console.log("newfinalList", filteredFinalList);

  // const emitUpdate = () => {
  //   socket.emit("update", finalList);
  // };

  return (
    <CardContext.Provider value={{}}>
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

      <div className="roomUsersDiv">
        {roomUsers[0] && (
          <div className="roomUserDiv">
            <img
              src={roomUsers[0].photoURL}
              alt="1st team member"
              title={roomUsers[0].username}
            ></img>
          </div>
        )}

        {roomUsers[1] && (
          <div className="roomUserDiv">
            <img
              src={roomUsers[1].photoURL}
              alt="2nd team member"
              title={roomUsers[1].username}
            ></img>
          </div>
        )}
        {roomUsers[2] && (
          <div className="roomUserDiv">
            <img
              src={roomUsers[2].photoURL}
              alt="3rd team member"
              title={roomUsers[2].username}
            ></img>
          </div>
        )}
        {roomUsers[3] && (
          <div className="roomUserDiv">
            <img
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
