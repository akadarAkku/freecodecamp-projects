import React from "react";
import "./Button.css";

const Button = ({ onClick, value, className, ...props }) => {
  return (
    <button
      {...props}
      className={`button ${className}`}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

Button.defaultProps = {
  value: "Button",
  onClick: () => {}
};

export default Button;
