import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Dropzone = ({ isDropDisabled, items, id }) => (
  <div className="column col-4" style={{ border: "2px solid black" }}>
    <div className="divider" data-content={id.name} />
    <Droppable droppableId={id} isDropDisabled={isDropDisabled}>
      {(provided) => {
        return (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items.map(({ name }, index) => (
              <Item key={name} name={name} index={index} />
            ))}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  </div>
);

const Item = ({ name, index }) => (
  <Draggable key={name} draggableId={name} index={index}>
    {(provided) => {
      return (
        <div
          className="menu-item tile tile-centered"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="tile-content">{name}</div>
        </div>
      );
    }}
  </Draggable>
);

export default Dropzone;
