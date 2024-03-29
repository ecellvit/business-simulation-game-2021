import React, { useState, useEffect } from "react";

const CountDownDashboard = (props) => {
  const { hours, minutes, seconds } = props.hoursMinSecs;
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const endtime = new Date(props.endtime).getTime();
  const currtime = new Date().getTime();

  const tick = () => {
    if (secs >= 0) {
      setTime([
        endtime > currtime
          ? Math.floor(((endtime - currtime) / 3600000) % 24)
          : 0,
        endtime > currtime
          ? Math.floor(((endtime - currtime) / 60000) % 60)
          : 0,
        endtime > currtime ? Math.floor(((endtime - currtime) / 1000) % 60) : 0,
      ]);
    } else {
      setTime([hrs, mins, secs - 1]);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  return (
    <div style={{}}>
      <p style={{ fontSize: "28px",position:"relative",bottom:"30px",left:"7px" }}>{`${hrs
        .toString()
        .padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`}</p>
    </div>
  );
};

export default CountDownDashboard;
