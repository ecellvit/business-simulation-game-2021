import React from "react";
import { useDrag } from "react-dnd";

function SupermarketDrag(props) {
  const [{ isDragging }, drag] = useDrag({
    type: "yes",
    item: { name: props.name, id: props.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
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
