const operators = ["+", "-", "/", "*"];

export const addToEquation = (equation, valueToAdd) => {
  const length = equation.length;

  if (valueToAdd === ".") {
    if (!isInDecimal(equation)) {
      return equation + valueToAdd;
    } else {
      return equation;
    }
  }

  if (
    valueToAdd === "0" &&
    equation[length - 1] === "0" &&
    !isInDecimal(equation)
  ) {
    return equation;
  }
  if (
    operators.includes(equation[length - 1]) &&
    operators.includes(valueToAdd)
  ) {
    return equation.substring(0, length - 1) + valueToAdd;
  } else {
    return equation + valueToAdd;
  }
};

export const isInDecimal = equation => {
  const length = equation.length;
  let isInDecimal = false;
  for (let i = length - 1; i >= 0; i--) {
    if (i === length - 1 && isNaN(equation[i])) {
      isInDecimal = true;
      break;
    }
    if (equation[i] === ".") {
      isInDecimal = true;
      break;
    } else if (isNaN(equation[i])) {
      break;
    }
  }
  return isInDecimal;
};
