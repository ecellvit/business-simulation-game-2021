import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);
  const [hasDropped, sethasDropped] = useState(false);

  const [supermarketReceived, setSupermarketReceived] = useState([
    {
      name: "FreshProduce",
      id: 1,
    },
    {
      name: "Kids Section",
      id: 2,
    },
    {
      name: "Restraunt",
      id: 3,
    },
    {
      name: "Biscuits",
      id: 4,
    },
    {
      name: "Tea",
      id: 5,
    },
    {
      name: "Coffee",
      id: 6,
    },
    {
      name: "Grains",
      id: 7,
    },
    {
      name: "Pulses",
      id: 8,
    },
    {
      name: "Bread",
      id: 9,
    },
    {
      name: "Milk",
      id: 10,
    },
    {
      name: "Biscuits",
      id: 11,
    },
    {
      name: "Biscuits",
      id: 12,
    },
    {
      name: "Biscuits",
      id: 13,
    },
    {
      name: "Biscuits",
      id: 14,
    },
    {
      name: "Biscuits",
      id: 15,
    },
  ]);

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
    const itemList = supermarketReceived.filter((itemInSupermarket) => {
      return id === itemInSupermarket.id;
    });
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
      className={`Placeholders2 placeholder2-${props.id}`}
      ref={drop}
      style={{
        border: "0.01px solid black",
        height: "12.2%",
        margin: "15px",
        width: "21%",
        backgroundColor: props.canDrop === "yes" ? "#fff" : "grey",
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
      {props.id === "one" && board.length ? (
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
      {props.id === "seven" ? (
        <SupermarketDrag
          name={returnedItem[6].item.name}
          id={returnedItem[6].item.id}
        />
      ) : null}
      {props.id === "eight" ? (
        <SupermarketDrag
          name={returnedItem[7].item.name}
          id={returnedItem[7].item.id}
        />
      ) : null}
      {props.id === "nine" ? (
        <SupermarketDrag
          name={returnedItem[8].item.name}
          id={returnedItem[8].item.id}
        />
      ) : null}
      {props.id === "ten" ? (
        <SupermarketDrag
          name={returnedItem[9].item.name}
          id={returnedItem[9].item.id}
        />
      ) : null}
      {props.id === "eleven" ? (
        <SupermarketDrag
          name={returnedItem[10].item.name}
          id={returnedItem[10].item.id}
        />
      ) : null}
      {props.id === "twelve" ? (
        <SupermarketDrag
          name={returnedItem[11].item.name}
          id={returnedItem[11].item.id}
        />
      ) : null}
      {props.id === "thirteen" ? (
        <SupermarketDrag
          name={returnedItem[12].item.name}
          id={returnedItem[12].item.id}
        />
      ) : null}
      {props.id === "fourteen" ? (
        <SupermarketDrag
          name={returnedItem[13].item.name}
          id={returnedItem[13].item.id}
        />
      ) : null}
      {props.id === "fifteen" ? (
        <SupermarketDrag
          name={returnedItem[14].item.name}
          id={returnedItem[14].item.id}
        />
      ) : null}
    </div>
  );
};

export default BoardBox1;
