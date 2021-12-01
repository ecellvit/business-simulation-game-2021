import React, { useState, useEffect } from "react";

const CountDown = (props) => {
  const { minutes, seconds } = props.hoursMinSecs;
  const [[mins, secs], setTime] = useState([10,10]);
  
  useEffect(() => {
    const endtime = new Date(props.endtime);
    // const currtime = new Date(props.currtime)
    const currtime = new Date().toISOString();
    console.log(endtime,currtime);
    // const timeDiff = endtime-currtime;
    // if(timeDiff<0){
    //   props.submit();
    // }
    // else{
    //   const new_mins = timeDiff.getMinutes
    //   const new_seconds = 
    //   setTime([new_mins,new_seconds])
    // }
  }, [])

  console.log(mins,minutes)

  // useEffect(() => {
  //   setInterval(tick,1000);
  //   return () => {
  //     clearInterval()
  //   }
  // }, [])

  const tick = () => {
    if (mins === 0 && secs === 0) {
      console.log("timer over");
      props.submit();
    } else if (secs === 0) {
      setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div>
      <p>{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDown;
