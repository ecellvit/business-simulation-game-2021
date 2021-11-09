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

  const updateBoard = (index, item) => {
    const updatedArr = board.filter((data) => {
      return data.id == index.id;
    });

    updatedArr[0].droppedItem = item;

    const addArr = board.filter((data) => {
      return data.id != index.id;
    });

    setBoard(updatedArr.concat(addArr));
    console.log(board);
  };

  // const markAsDone = (_id) => {
  //   const task = taskList.filter((task, i) => task._id === _id);
  //   task[0].status = "done";
  //   setTaskList(taskList.filter((task, i) => task._id !== _id).concat(task[0]));
  // };

  return (
    <CardContext.Provider value={{ updateBoard }}>
      <div className="placeholder__main--div">
        <h1>{seconds}</h1>
        <div className="Supermarket">
          {Supermarket.map((item) => {
            return (
              <SupermarketDrag name={item.name} id={item.id} key={item.id} />
            );
          })}
        </div>

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
    </CardContext.Provider>
  );
};

export default DragDrop;
