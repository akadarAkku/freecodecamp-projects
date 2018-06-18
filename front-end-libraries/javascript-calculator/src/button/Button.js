import React from "react";
import "./Button.css";

const Button = ({ onClick, value, className }) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {value}
    </button>
  );
};

Button.defaultProps = {
  value: "Button",
  onClick: () => {}
};

export default Button;
