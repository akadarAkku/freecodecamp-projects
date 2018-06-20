import React from "react";
import "./countdown.css";

const Countdown = ( props ) => {
  let time = props.time;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  return (
    <div className="app__div countdown">
      {!(props.inSession) && <h2>Session</h2>}
      {props.inSession && <h2>Break</h2>}
      <div className="countdown__timer">
        {"0".concat(minutes).slice(-2)} : {"0".concat(seconds).slice(-2)}
      </div>
    </div>
  );
}

export { Countdown };
