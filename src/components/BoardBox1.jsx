import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);
  const [hasDropped, sethasDropped] = useState(false);
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

  useEffect(() => {});

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: props.canDrop,
      drop: (item) => {
        setCurrItem(item);
        sethasDropped(true);
        // props.emitUpdate();
        addItemToBoard(item.id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
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

  const removeItemFromBoard = () => {
    sethasDropped(false);
    setBoard([]);
    props.deleteFinalPlaceHolder(props.id);
  };

  return (
    <div
      className="Placeholders"
      ref={drop}
      style={{
        border: "2px solid black",
        height: "80px",
        margin: "65px",
        width: "80px",
        backgroundColor: props.canDrop === "yes" ? "#fff" : "grey",
        position: "relative",
      }}
      key={props.id}
    >
      {props.canDrop === "yes" && hasDropped && board[0] ? (
        <div style={{ position: "absolute", right: "2px", bottom: "0px" }}>
          <IconButton
            onClick={removeItemFromBoard}
            aria-label="delete"
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ) : null}

      {/* both sides i.e for prefixed env*/}
      {props.finalList.map((listItem) => {
        if (props.id === listItem.id) {
          return (
            <SupermarketDrag
              name={listItem.canDrop.element}
              id={listItem.item.id}
              key={listItem.item.id}
            />
          );
        }
      })}

      {/* leader side */}
      {board.map((boardItem) => {
        return (
          <SupermarketDrag
            name={currItem.name}
            id={currItem.id}
            key={currItem.id}
          />
        );
      })}

      {/* members side */}
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
      {props.id === "four" ? (
        <SupermarketDrag
          name={returnedItem[3].item.name}
          id={returnedItem[3].item.id}
        />
      ) : null}
      {props.id === "five" ? (
        <SupermarketDrag
          name={returnedItem[4].item.name}
          id={returnedItem[4].item.id}
        />
      ) : null}
      {props.id === "six" ? (
        <SupermarketDrag
          name={returnedItem[5].item.name}
          id={returnedItem[5].item.id}
        />
      ) : null}
    </div>
  );
};

export default BoardBox1;
