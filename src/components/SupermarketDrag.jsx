import React, { useState, useContext, useEffect } from "react";
import { useDrag } from "react-dnd";
import AuthContext from "../store/auth-context";

function SupermarketDrag(props) {
  const [type, setType] = useState("yes");
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem("leaderID") !== authCtx.id) {
      setType("no");
    }
  }, []);

  const [{ isDragging }, drag] = useDrag({
    type: type,
    item: { name: props.name, id: props.id },
    // canDrag: props.thisCanBeDragged,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      // canDrag: !!monitor.canDrag(),
    }),
  });
  return (
    <div
      className="question-div"
      style={{
        color: props.color,
      }}
    >
      {!isDragging ? (
        <div ref={drag} style={{ cursor: "pointer" }}>
          <p
            style={{
              color: props.color,
            }}
          >
            {props.name}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default SupermarketDrag;
