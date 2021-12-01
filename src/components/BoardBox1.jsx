import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BoardBox1 = (props) => {
  const [board, setBoard] = useState([]);
  const [hasDropped, sethasDropped] = useState(false);
  const [supermarketReceived, setSupermarketReceived] = useState([
    {
      name: "Fresh Produce",
      id: 6,
    },
    {
      name: "Tea",
      id: 1,
    },
    {
      name: "Restaurant",
      id: 2,
    },
    {
      name: "Kids Section",
      id: 3,
    },
    {
      name: "Essentials Section",
      id: 4,
    },
    {
      name: "Impulse buys Section",
      id: 5,
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
  ]);

  const [placeHolderIds, setplaceHolderIds] = useState([
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
  ]);

  const [currItem, setCurrItem] = useState({ name: "", id: "" });

  useEffect(() => {
    props.socket.on("change", (data) => {
      setReturnedItem(data);
      // console.log("returned item", data);
      // setBoard(()=>[])
    });
    // props.socket.on("change1", (id) => {
    //   removeItemFromBoard(id);
    // });
    // removeItemFromBoard();
    // setBoard([]);
  }, [props.socket]);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: props.canDrop,
      drop: (item) => {
        setCurrItem(item);
        sethasDropped(true);
        console.log(item.id);
        // props.socket.emit("update1", props.id);
        clearRemainingBoards(props.id);
        addItemToBoard(item.id);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [props.finalList]
  );

  //useEffect for clearing placeholders
  useEffect(() => {
    //check in remaining placeholders and if exists clear placeholders in that only!
    props.remainingPlaceHoldersIds.map((id) => {
      // console.log("remove",props.id,id)
      if (props.id === id) {
        setBoard([]);
      }
    });
  }, [props.remainingPlaceHoldersIds]);
  const clearRemainingBoards = (id) => {
    const remainingPlaceHolders = placeHolderIds.filter(
      (id) => id !== props.id
    );
    props.setremainingPlaceHolderIds(remainingPlaceHolders);
    props.setremainingPlaceHolderIdsMember(remainingPlaceHolders);
  };

  const addItemToBoard = (id) => {
    const itemList = supermarketReceived.filter((itemInSupermarket) => {
      return id === itemInSupermarket.id;
    });
    // console.log("sentItem", itemList[0]);
    props.updateFinalPlaceHolder(props.id, itemList[0]);
    setBoard(() => [itemList[0]]);
  };

  const removeItemFromBoard = (id) => {
    // console.log("id", id);
    sethasDropped(false);
    setBoard([]);
    props.deleteFinalPlaceHolder(id);
  };

  useEffect(() => {
    removeItemFromBoard(props.id);
  }, [props.currQuestionPointer]);
  // console.log("board", board, props.id);

  return (
    <div
      className={`Placeholders placeholder-${props.id}`}
      ref={drop}
      style={{
        border: "0.01px solid black",
        // height: "80px",
        // margin: "65px",
        // width: "80px",
        backgroundColor: props.canDrop === "yes" ? "#fff" : "grey",
      }}
      key={props.id}
    >
      {props.canDrop === "yes" && hasDropped && board[0] ? (
        <div style={{ position: "absolute", right: "2px", bottom: "0px" }}>
          <IconButton
            onClick={() => {
              removeItemFromBoard(props.id);
            }}
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
          return <p key={listItem.item.id}>{listItem.canDrop.element}</p>;
        }
      })}
      {/* <SupermarketDrag
              color="white"
              name={listItem.canDrop.element}
              id={listItem.item.id}
              key={listItem.item.id}
            /> */}

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
      {props.id === "one" ? <p>{returnedItem[0].item.name}</p> : null}
      {props.id === "two" ? <p>{returnedItem[1].item.name}</p> : null}
      {props.id === "three" ? <p>{returnedItem[2].item.name}</p> : null}
      {props.id === "four" ? <p>{returnedItem[3].item.name}</p> : null}
      {props.id === "five" ? <p>{returnedItem[4].item.name}</p> : null}
      {props.id === "six" ? <p>{returnedItem[5].item.name}</p> : null}
      {props.id === "seven" ? <p>{returnedItem[6].item.name}</p> : null}
    </div>
  );
};

export default BoardBox1;

{
  /* <SupermarketDrag
          name={returnedItem[5].item.name}
          id={returnedItem[5].item.id}
        /> */
}
