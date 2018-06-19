import React, { Component } from "react";
import "./App.css";
import Button from "./button/Button";
import { addToEquation } from "./helpers/helpers";

class App extends Component {
  state = {
    equation: ""
  };

  addToEquation = value => {
    const equation = this.state.equation;
    const newEquation = addToEquation(equation, value);
    this.setState({
      equation: newEquation
    });
  };

  equals = () => {
    this.setState({
      equation: eval(this.state.equation)
    });
  };

  render() {
    const equation = this.state.equation;
    return (
      <div className="wrapper">
        <div className="calculator">
          <div id="display" className="calculator__display">
            {equation === "" ? "0" : equation}
          </div>
          <Button
            id="clear"
            className="calculator__button--clear button--gray"
            value="AC"
            onClick={() => this.setState({ equation: "" })}
          />
          <Button
            id="divide"
            className="calculator__button--divide button--orange"
            value="/"
            onClick={this.addToEquation}
          />
          <Button
            id="seven"
            className="calculator__button--seven"
            value="7"
            onClick={this.addToEquation}
          />
          <Button
            id="eight"
            className="calculator__button--eight"
            value="8"
            onClick={this.addToEquation}
          />
          <Button
            id="nine"
            className="calculator__button--nine"
            value="9"
            onClick={this.addToEquation}
          />
          <Button
            id="multiply"
            className="calculator__button--multiply button--orange"
            value="*"
            onClick={this.addToEquation}
          />
          <Button
            id="four"
            className="calculator__button--four"
            value="4"
            onClick={this.addToEquation}
          />
          <Button
            id="five"
            className="calculator__button--five"
            value="5"
            onClick={this.addToEquation}
          />
          <Button
            id="six"
            className="calculator__button--six"
            value="6"
            onClick={this.addToEquation}
          />
          <Button
            id="add"
            className="calculator__button--add button--orange"
            value="+"
            onClick={this.addToEquation}
          />
          <Button
            id="one"
            className="calculator__button--one"
            value="1"
            onClick={this.addToEquation}
          />
          <Button
            id="two"
            className="calculator__button--two"
            value="2"
            onClick={this.addToEquation}
          />
          <Button
            id="three"
            className="calculator__button--three"
            value="3"
            onClick={this.addToEquation}
          />
          <Button
            id="subtract"
            className="calculator__button--substract button--orange"
            value="-"
            onClick={this.addToEquation}
          />
          <Button
            id="zero"
            className="calculator__button--zero"
            value="0"
            onClick={this.addToEquation}
          />
          <Button
            id="decimal"
            className="calculator__button--decimal"
            value="."
            onClick={this.addToEquation}
          />
          <Button
            id="equals"
            className="calculator__button--equals button--orange"
            value="="
            onClick={this.equals}
          />
        </div>
      </div>
    );
  }
}

export default App;
