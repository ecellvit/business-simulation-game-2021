import React, { useState, useContext, useEffect } from "react";
import { Placeholders, Supermarket } from "../custom/data";
import SupermarketDrag from "./SupermarketDrag";
import "./DragDrop.css";
import { io } from "socket.io-client";
import BoardBox1 from "./BoardBox1";
import AuthContext from "../store/auth-context";

export const CardContext = React.createContext({
  finalList: [],
});

const socket = io("http://127.0.0.1:2000/");

const DragDrop = () => {
  const [finalList, setFinalList] = useState([
    { id: "one", item: { id: "1", name: "" } },
    { id: "two", item: { id: "2", name: "" } },
    { id: "three", item: { id: "3", name: "" } },
  ]);
  const board = Placeholders;
  const authCtx = useContext(AuthContext);
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
    socket.on("roomUsers", (data) => {
      console.log(data.users);
      setRoomUsers(data.users);
    });
    socket.emit("joinRoom", roomData);
  }, [socket.on]);

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
    }
  };

  const emitUpdate = () => {
    socket.emit("update", finalList);
  };

  return (
    <CardContext.Provider value={{}}>
      <div className="dragdrop-main-container">
        <div className="placeholders-main-container">
          {board.map((placeholder) => {
            return (
              <BoardBox1
                socket={socket}
                emitUpdate={emitUpdate}
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
};

export default DragDrop;
