import React, { useState, useContext, useEffect } from "react";
import { Placeholders, Supermarket } from "../custom/data";
// import { useDrop } from "react-dnd";
// import { useTime } from "react-timer-hook";
import SupermarketDrag from "./SupermarketDrag";
import "./DragDrop.css";
import { io } from "socket.io-client";
import BoardBox1 from "./BoardBox1";
import AuthContext from "../store/auth-context";

export const CardContext = React.createContext({
  // updateBoard: null,
  // board: null,
  finalList: []
});

const socket = io("http://127.0.0.1:2000/");

const DragDrop = () => {
  const [finalList, setFinalList] = useState([]);
  // const [board, setBoard] = useState(Placeholders);
  const board = Placeholders;
  const authCtx = useContext(AuthContext);
  const [roomUsers, setRoomUsers] = useState([]);
  const [roomData, setRoomData] = useState({
    name: authCtx.name,
    email: authCtx.emailid,
    photoURL: "123",
    teamID: "12345",
  });

  useEffect(() => {
    socket.on("roomUsers", (data) => {
      console.log(data);
    });
    socket.emit("joinRoom", roomData);
  }, []);

  const updateFinalPlaceHolder = (placeHolderID, itemList) => {
    setFinalList((finalList) => [
      ...finalList,
      { id: placeHolderID, item: itemList },
    ]);
  };

  console.log("finalList",finalList);
  return (
    <CardContext.Provider value={{}}>
      <div className="dragdrop-main-container">
        <div className="placeholders-main-container">
          {board.map((placeholder) => {
            return (
              <BoardBox1
                socket={socket}
                roomData={roomData}
                finalList={[...finalList]}
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
    </CardContext.Provider>
  );
};

export default DragDrop;
