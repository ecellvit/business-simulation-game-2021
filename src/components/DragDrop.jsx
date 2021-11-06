import React,{useState} from "react";
import { Placeholders, Supermarket } from "../custom/data";
import { useDrop } from "react-dnd";
import SupermarketDrag from "./SupermarketDrag";

function DragDrop() {
  const [board, setBoard] = useState([]);

  const [{ isOver }, drop] = useDrop(()=>({
    accept: "div",
    drop: (item)=> addItemToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToBoard =(id)=>{
    console.log(Supermarket);
    const itemList = Supermarket.filter((item)=>id===item.id);
    console.log(itemList);
    setBoard((board)=>[...board, itemList[0]]);
  }

  return (
    <>
      <div className="Supermarket">
        {Supermarket.map((item)=>{
          return(<SupermarketDrag name={item.name} id={item.id}/>)
        })}
      </div>
      <div className="Placeholders" ref={drop} style={{border:"solid",height:"100px",marginTop:"100px"}}>
        {board.map((item)=>{
          return(<SupermarketDrag name={item.name} id={item.id}/>)
        })}
      </div>
    </>
  );
}

export default DragDrop;
