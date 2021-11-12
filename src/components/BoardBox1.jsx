import React, { useState } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);
  const [currItem, setCurrItem] = useState({ name: "", id: "" });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      addItemToBoard(item.id);
      setCurrItem(item);
      console.log(item);
      return { name: "akash" }; //whatever you return here can be caught in "end" method in useDrag using monitor.getDropResult()
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard = (id) => {
    const itemList = Supermarket.filter(
      (itemInSupermarket) => id === itemInSupermarket.id
    );
    setBoard((board) => [itemList[0]]);
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
    </div>
  );
};

export default BoardBox1;
