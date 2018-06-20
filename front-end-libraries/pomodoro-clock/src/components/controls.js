import React from "react";

import PAUSE from "../assets/pause.png";
import PLAY from "../assets/play.png";
import STOP from "../assets/stop.png";

const Controls = props => {
  return (
    <div className="app__div controls">
      <Play time={props.time} handle={props.controls[0]} src={PLAY} />
      <SingleControl handle={props.controls[1]} src={PAUSE} />
      <SingleControl handle={props.controls[2]} src={STOP} />
    </div>
  );
};

const Play = props => {
  let startTime = new Date().getTime();

  return (
    <button type="button" onClick={props.handle}>
      <img src={props.src} />
    </button>
  );
};

const SingleControl = props => {
  return (
    <button type="button" onClick={props.handle}>
      <img src={props.src} />
    </button>
  );
};

export { Controls };
