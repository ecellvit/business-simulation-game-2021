import React, { useState, useEffect } from "react";

const CountDown = (props) => {
  const { minutes, seconds } = props.hoursMinSecs;
  const [[mins, secs], setTime] = useState([minutes, seconds]);
  const endtime = new Date(props.endtime).getTime();
  const currtime = new Date().getTime();

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  const tick = () => {
    if (secs <= 0 && mins === 0) {
      props.submit();
    } else if (secs >= 0) {
      setTime([
        endtime > currtime ? Math.floor((endtime - currtime) / 60000) : 0,
        endtime > currtime ? Math.floor(((endtime - currtime) / 1000) % 60) : 0,
      ]);
    } else {
      setTime([mins, secs - 1]);
    }
  };

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
