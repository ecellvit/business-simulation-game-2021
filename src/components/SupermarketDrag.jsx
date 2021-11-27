import React,{useState,useContext,useEffect} from "react";
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
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div className="question-div">
      {!isDragging ? (
        <div ref={drag} style={{ cursor: "pointer" }}>
          <p>{props.name}</p>
        </div>
      ) : null}
    </div>
  );
}

export default SupermarketDrag;
