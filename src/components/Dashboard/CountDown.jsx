import React, { useState, useEffect } from "react";

const CountDown = (props) => {
  const { minutes, seconds } = props.hoursMinSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const [hasTimeUpdated, sethasTimeUpdated] = useState(false);
  const endtime = new Date(props.endtime).getTime();
  const currtime = new Date().getTime();

  useEffect(() => {
    console.log(props.endtime);
    // const currtime = new Date(props.currtime)

    console.log("end", endtime);
    console.log("current", currtime);
    console.log("Difference", endtime - currtime);
    // console.log(endtime,currtime);
    // const timeDiff = endtime-currtime;
    // if(timeDiff<0){
    //   props.submit();
    // }
    // else{
    //   const new_mins = timeDiff.getMinutes
    //   const new_seconds =
    //   setTime([new_mins,new_seconds])
    // }
  }, []);

  // console.log(mins,minutes)

  // useEffect(() => {
  //   setInterval(tick,1000);
  //   return () => {
  //     clearInterval()
  //   }
  // }, [])

  const tick = () => {
    if (secs <= 0 && mins === 0) {
      props.submit();
    } else if (secs >= 0) {
      console.log("object");
      setTime([
        endtime > currtime ? Math.floor((endtime - currtime) / 60000) : 0,
        endtime > currtime ? Math.floor(((endtime - currtime) / 1000) % 60) : 0,
      ]);
      sethasTimeUpdated(true);
      // setTime([mins - 1, 59]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div
      style={{
        textAlign: "center",
        position: "absolute",
        left: "45%",
        top: "20px",
        fontSize: "20px",
        fontWeight: "bolder",
        padding: "10px 20px",
      }}
    >
      <p
        style={{
          width: "130px",
          padding: "10px 40px",
          color: "white",
          background: "#40444c",
          borderRadius: "10px",
        }}
      >{`${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDown;
