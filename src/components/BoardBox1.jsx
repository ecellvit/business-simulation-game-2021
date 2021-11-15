import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);

  const [returnedItem, setReturnedItem] = useState([
    {
      item: { name: "", id: "" },
      id: "",
    },
    {
      item: { name: "", id: "" },
      id: "",
    },
    {
      item: { name: "", id: "" },
      id: "",
    },
  ]);
  const [currItem, setCurrItem] = useState({ name: "", id: "" });

  useEffect(() => {
    props.socket.on("change", (data) => {
      setReturnedItem(data);
    });
  }, [props.socket]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "div",
      drop: (item) => {
        setCurrItem(item);
        props.emitUpdate();
        addItemToBoard(item.id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [props.finalList]
  );

  const addItemToBoard = (id) => {
    const itemList = Supermarket.filter(
      (itemInSupermarket) => id === itemInSupermarket.id
    );
    props.updateFinalPlaceHolder(props.id, itemList[0]);
    setBoard((board) => [itemList[0]]);
  };

  return (
    <div
      className="Placeholders"
      ref={drop}
      style={{
        border: "2px solid black",
        height: "50px",
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
      {props.id === "one" ? (
        <SupermarketDrag
          name={returnedItem[0].item.name}
          id={returnedItem[0].item.id}
        />
      ) : null}
      {props.id === "two" ? (
        <SupermarketDrag
          name={returnedItem[1].item.name}
          id={returnedItem[1].item.id}
        />
      ) : null}
      {props.id === "three" ? (
        <SupermarketDrag
          name={returnedItem[2].item.name}
          id={returnedItem[2].item.id}
        />
      ) : null}
    </div>
  );
};

export default BoardBox1;
