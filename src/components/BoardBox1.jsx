import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";
import { io } from "socket.io-client";

// const socket = io("https://futurepreneursbackend.herokuapp.com/");

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);
  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);

  const [returnedItem, setReturnedItem] = useState({
    item: { name: "", id: "" },
    id: "",
  });
  const [currItem, setCurrItem] = useState({ name: "", id: "" });

  useEffect(() => {
    props.socket.on("change", (data) => {
      setReturnedItem(data);
      addReturnedItemToBoard(data);
    });
  }, [props.socket, props.finalList]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      addItemToBoard(item.id);
      setCurrItem(item);
      props.socket.emit("update", { id: props.id, item: item });
      // return { name: "akash" }; //whatever you return here can be caught in "end" method in useDrag using monitor.getDropResult()
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard = (id) => {
    const itemList = Supermarket.filter(
      (itemInSupermarket) => id === itemInSupermarket.id
    );
    props.updateFinalPlaceHolder(props.id, itemList[0]);
    setBoard((board) => [itemList[0]]);
    setBoard2((board2) => [itemList[0]]);
  };

  const addReturnedItemToBoard = (returnedItem) => {
    const itemList = Supermarket.filter(
      (itemInSupermarket) => returnedItem.item.id === itemInSupermarket.id
    );
    setBoard1((board1) => [itemList[0]]);
  };

  return (
    <div
      className="Placeholders"
      ref={drop}
      style={{
        border: "2px solid black",
        height: "100px",
        width: "100px",
        margin: "100px",
      }}
      key={props.id}
    >
      {board.map((boardItem) => {
        return (
          <SupermarketDrag
            name={currItem.name}
            id={currItem.id}
            key={currItem.id}
          />
        );
      })}
      {/* returnedItem.id is placeholder's id that socket is sending back 
      after "update" and props.id is the actual placeholder box's id */}
      {returnedItem.id === props.id
        ? board1.map((boardItem) => {
            return (
              <SupermarketDrag
                name={boardItem.name}
                id={boardItem.id}
                key={boardItem.id}
              />
            );
          })
        : null}
    </div>
  );
};

export default BoardBox1;
