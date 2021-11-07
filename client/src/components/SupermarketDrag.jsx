import React from "react";
import { useDrag } from "react-dnd";

function SupermarketDrag(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "div",
    item: {id:props.id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return <div ref={drag}>{props.name}</div>;
}

export default SupermarketDrag;
