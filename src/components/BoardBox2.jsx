import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

// Components
import SupermarketDrag from "./SupermarketDrag";

// UI Utilities
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dropSound from "../resources/Audiofiles/drop.mpeg"

const BoardBox2 = (props) => {
  const [board, setBoard] = useState([]);
  const [hasDropped, sethasDropped] = useState(false);
  const [supermarketReceived, setSupermarketReceived] = useState([
    {
      name: "Erasers",
      id: 1,
    },
    {
      name: "Shampoos",
      id: 2,
    },
    {
      name: "Shaving Kits",
      id: 3,
    },
    {
      name: "Eyeliner",
      id: 4,
    },
    {
      name: "Crayons",
      id: 5,
    },
    {
      name: "After Shave Kits",
      id: 6,
    },
    {
      name: "Pencils",
      id: 7,
    },
    {
      name: "Conditioners",
      id: 8,
    },
    {
      name: "Sketch Books",
      id: 9,
    },
    {
      name: "Eye Shadow",
      id: 10,
    },
    {
      name: "Chocolates",
      id: 11,
    },
    {
      name: "Barbie Dolls",
      id: 12,
    },
    {
      name: "Kitchen Tools",
      id: 13,
    },
    {
      name: "Trimmer",
      id: 14,
    },
    {
      name: "Board Games",
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
  const dropAudio = new Audio(dropSound);

  useEffect(() => {
    props.socket.on("change", (data) => {
      setReturnedItem(data);
    });
  }, [props.socket]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "yes",
      drop: (item) => {
        dropAudio.play();
        setCurrItem(item);
        sethasDropped(true);
        addItemToBoard(item.id);
        // props.setItemcantDrag(item.id);
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
        backgroundColor: "#fff",
      }}
      key={props.id}
    >
      {hasDropped && board[0] ? (
        <div style={{ position: "absolute", right: "2px", bottom: "0px" }}>
          <IconButton
            onClick={() => {
              removeItemFromBoard();
            }}
            aria-label="delete"
            size="small"
            color="error"
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
      ) : null}

      {/* leader side */}
      {board.map((boardItem) => {
        return (
          <p id={currItem.id} key={currItem.id}>
            {currItem.name}
          </p>
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

export default BoardBox2;
