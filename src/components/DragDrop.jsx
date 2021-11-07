import React, { useState, useEffect } from "react";
import { Placeholders, Supermarket } from "../custom/data";
import { useDrop } from "react-dnd";
import { useTime } from 'react-timer-hook';
import SupermarketDrag from "./SupermarketDrag";
import "./DragDrop.css";

function DragDrop() {
  const {
    seconds,
    minutes,
    hours,
    ampm,
  } = useTime({ format: '12-hour'});

  const [board, setBoard] = useState([]);
  const [board1, setBoard1] = useState([]);
  const [board2, setBoard2] = useState([]);
  const [board3, setBoard3] = useState([]);
  const [board4, setBoard4] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => addItemToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver1 }, drop1] = useDrop(() => ({
    accept: "div",
    drop: (item) => addItemToBoard1(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver2 }, drop2] = useDrop(() => ({
    accept: "div",
    drop: (item) => addItemToBoard2(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver3 }, drop3] = useDrop(() => ({
    accept: "div",
    drop: (item) => addItemToBoard3(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  const [{ isOver4 }, drop4] = useDrop(() => ({
    accept: "div",
    drop: (item) => addItemToBoard4(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard = (id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    setBoard((board) => [itemList[0]]);
  };
  const addItemToBoard1 = (id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    setBoard1((board) => [itemList[0]]);
  };
  const addItemToBoard2 = (id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    setBoard2((board) => [itemList[0]]);
  };
  const addItemToBoard3 = (id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    setBoard3((board) => [itemList[0]]);
  };
  const addItemToBoard4 = (id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    setBoard4((board) => [itemList[0]]);
  };

  return (
    <div className="placeholder__main--div">
      <h1>{seconds}</h1>
      <div className="Supermarket">
        {Supermarket.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
      <div
        className="Placeholders"
        ref={drop}
        style={{
          border: "solid",
          height: "100px",
          width: "100px",
          margin: "100px",
        }}
      >
        {board.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
      <div
        className="Placeholders"
        ref={drop1}
        style={{
          border: "solid",
          height: "100px",
          width: "100px",
          margin: "100px",
        }}
      >
        {board1.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
      <div
        className="Placeholders"
        ref={drop2}
        style={{
          border: "solid",
          height: "100px",
          width: "100px",
          margin: "100px",
        }}
      >
        {board2.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
      <div
        className="Placeholders"
        ref={drop3}
        style={{
          border: "solid",
          height: "100px",
          width: "100px",
          margin: "100px",
        }}
      >
        {board3.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
      <div
        className="Placeholders"
        ref={drop4}
        style={{
          border: "solid",
          height: "100px",
          width: "100px",
          margin: "100px",
        }}
      >
        {board4.map((item) => {
          return <SupermarketDrag name={item.name} id={item.id} />;
        })}
      </div>
    </div>
  );
}

export default DragDrop;
