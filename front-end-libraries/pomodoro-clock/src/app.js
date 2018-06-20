import React from "react";

import { Header } from "./components/header";
import { Setup } from "./components/timer_setup";
import { Countdown } from "./components/countdown";
import { Controls } from "./components/controls";
import WOLF from "./assets/wolf.mp3";

import "./app.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      session: 25,
      break: 10,
      inSession: false,
      startTime: 0,
      timeLeft: 25 * 60,
      start: false
    }),
      (this.increaseBreakTimer = this.increaseBreakTimer.bind(this));
    this.decreaseBreakTimer = this.decreaseBreakTimer.bind(this);
    this.increaseSessionTimer = this.increaseSessionTimer.bind(this);
    this.decreaseSessionTimer = this.decreaseSessionTimer.bind(this);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.stop = this.stop.bind(this);
    this.tick = this.tick.bind(this);
  }

  tick() {
    if (this.state.start) {
      let time = this.state.timeLeft - 1;
      let session = this.state.inSession;
      if (time === 0) {
        if (session) {
          time = this.state.session * 60;
          document.getElementById("Break").classList.toggle("active");
          document.getElementById("Session").classList.toggle("active");
        } else {
          document.getElementById("Session").classList.toggle("active");
          document.getElementById("Break").classList.toggle("active");
          time = this.state.break * 60;
        }
        session = !session;
      }
      this.setState({
        timeLeft: time,
        inSession: session
      });
    }
  }

  start() {
    this.timerID = setInterval(() => this.tick(), 1000);
    document.getElementById("Session").classList.add("active");
    this.setState({
      start: true
    });
  }

  pause() {
    this.setState({
      start: false
    });
    clearInterval(this.timerID);
  }

  stop() {
    this.setState({
      start: false,
      inSession: false,
      timeLeft: this.state.session * 60
    });
    clearInterval(this.timerID);
  }

  increaseSessionTimer() {
    if (this.state.session < 99) {
      this.setState({
        session: this.state.session + 1,
        timeLeft: this.state.timeLeft + 60
      });
    }
  }

  decreaseSessionTimer() {
    if (this.state.session > 1) {
      this.setState({
        session: this.state.session - 1,
        timeLeft: this.state.timeLeft - 60
      });
    }
  }

  increaseBreakTimer() {
    if (this.state.break < 99) {
      this.setState({
        break: this.state.break + 1
      });
    }
  }

  decreaseBreakTimer() {
    if (this.state.break > 1) {
      this.setState({
        break: this.state.break - 1
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Setup
          sessionTime={this.state.session}
          breakTime={this.state.break}
          handleClick={[
            this.increaseSessionTimer,
            this.decreaseSessionTimer,
            this.increaseBreakTimer,
            this.decreaseBreakTimer
          ]}
        />
        <Countdown time={this.state.timeLeft} title={this.state.inSession} />
        <Controls
          controls={[this.start, this.pause, this.stop]}
          time={this.state.session}
        />
      </div>
    );
  }
}
