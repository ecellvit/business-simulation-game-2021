import React, { useState } from "react";
import { useDrag } from "react-dnd";

//item = our draggable values

function SupermarketDrag(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: {name:props.name, id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // end: (item,monitor) => {
    //   console.log("dragging ended"); //triggers when drag operation is over ie when dragging stops
    //   console.log(monitor.getDropResult())
    // },
  });
  return (
    <div>
      {!isDragging ? (
        <div ref={drag} style={{ cursor: "pointer" }}>
          <h1>{props.name}</h1>
        </div>
      ) : null}
    </div>
  );
}

export default SupermarketDrag;

{/* {Supermarket.filter((item) => item.id === props.id ).map((item) => (
  <h1>{item.name}</h1>
))} */}