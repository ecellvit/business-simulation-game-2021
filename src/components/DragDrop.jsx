import React, { useState, useEffect, useContext, createContext } from "react";
import { Placeholders, Supermarket } from "../custom/data";
import { useDrop } from "react-dnd";
import { useTime } from "react-timer-hook";
import SupermarketDrag from "./SupermarketDrag";
import "./DragDrop.css";

import BoardBox from "./BoardBox";

export const CardContext = createContext({
  updateBoard: null,
  board: null,
});

const DragDrop = () => {
  const { seconds, minutes, hours, ampm } = useTime({ format: "12-hour" });

  const [board, setBoard] = useState(Placeholders);

  const updateBoard = (updatedBoard, item) => {
    const copyArr = board;
    const index = board.indexOf(updatedBoard);

    setBoard(copyArr);
  };

  return (
    <CardContext.Provider value={{ updateBoard }}>
      <div className="dragdrop-main-container">
        <h1>{seconds}</h1>

        <div className="placeholders-main-container">
          {board.map((placeholder) => {
            return (
              <BoardBox
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
