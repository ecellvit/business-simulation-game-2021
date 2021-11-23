import { useContext, useState } from "react";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";
import { Supermarket } from "../custom/data";

import { CardContext } from "./DragDrop";

const BoardBox = ({ index, id, droppedItem }) => {
  const { updateBoard, board } = useContext(CardContext);
  // const cardCtx = useContext(CardContext);

  const [currentItems, setCurrentItems] = useState((name, id) => {
    return <SupermarketDrag name={name} id={id} />;
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      addItemToBoard(index, item.id);
      // console.log(item.id);
      return { name: "akash" }; //whatever you return here can be caught in "end" method in useDrag using monitor.getDropResult()
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard = (updatedBoard, id) => {
    const itemList = Supermarket.filter((item) => id === item.id);
    updateBoard(updatedBoard, itemList[0]);
    setCurrentItems(itemList[0].name, itemList[0].id);
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
      key={id}
    >
      {/* <SupermarketDrag name={showItem.name} id={showItem.id} /> */}
      {currentItems}
    </div>
  );
};

export default BoardBox;
