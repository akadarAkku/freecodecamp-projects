import React from "react";
import "./timer_setup.css";

import DOWN from "../assets/down.png";
import UP from "../assets/up.png";



const Setup = props => {
  return (
    <div className="app__div setup">
      <Time
        title={"Session"}
        increase={props.handleClick[0]}
        decrease={props.handleClick[1]}
        timer={props.sessionTime}
      />
      <Time
        title={"Break"}
        increase={props.handleClick[2]}
        decrease={props.handleClick[3]}
        timer={props.breakTime}
      />
    </div>
  );
};

const Active = props => {
  if (props.title === "Session") {
    return (
      <div className="setup__timer">{"0".concat(props.timer).slice(-2)}</div>
    );
  } else {
    return (
      <div className="setup__timer">{"0".concat(props.timer).slice(-2)}</div>
    );
  }
};

const Time = props => {
  return (
    <div className="setup__time" id={props.title}>
      <h2>{props.title}</h2>
      <div className="setup__controls">
        <button type="button" onClick={props.increase}>
          <img src={UP} />
        </button>
        <Active timer={props.timer} />

        <button type="setup__controls" onClick={props.decrease}>
          <img src={DOWN} />
        </button>
      </div>
    </div>
  );
};

export { Setup };
