import React, { Component } from "react";
import "./App.css";
import Button from "./button/Button";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="calculator">
          <div className="calculator__display">0</div>
          <Button
            className="calculator__button--clear button--gray"
            value="AC"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--divide button--orange"
            value="/"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--seven"
            value="7"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--eight"
            value="8"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--nine"
            value="9"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--multiply button--orange"
            value="x"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--four"
            value="4"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--five"
            value="5"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--six"
            value="6"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--add button--orange"
            value="+"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--one"
            value="1"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--two"
            value="2"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--three"
            value="3"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--substract button--orange"
            value="-"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--zero"
            value="0"
            onClick={() => {}}
          />
          <Button
            className="calculator__button--decimal"
            value="."
            onClick={() => {}}
          />
          <Button
            className="calculator__button--equals button--orange"
            value="="
            onClick={() => {}}
          />
        </div>
      </div>
    );
  }
}

export default App;
