import { addToEquation, isInDecimal } from "./helpers";

describe("addToEquation", () => {
  let equation;
  beforeEach(() => {
    equation = "1+2-3*5";
  });
  it("should remove previous operators and have only the last operator when one after another", () => {
    const newEquation = addToEquation(equation, "+");
    expect(newEquation).toBe("1+2-3*5+");
    expect(addToEquation(newEquation, "*")).toBe("1+2-3*5*");
  });

  it("should properly handle decimal point", () => {
    expect(addToEquation("1+2-3*5", ".")).toBe("1+2-3*5.");
    expect(addToEquation("1+2-3*5.", "*")).toBe("1+2-3*5.*");
    expect(addToEquation("1+2-3*5.0", ".")).toBe("1+2-3*5.0");
    expect(addToEquation("1+2-3*5.0321", ".")).toBe("1+2-3*5.0321");
    expect(addToEquation("1+2-3*5.0321+", ".")).toBe("1+2-3*5.0321+");
    expect(addToEquation("1+2-3*5.0321+1", ".")).toBe("1+2-3*5.0321+1.");
  });

  it("should test bug", () => {
    expect(addToEquation("0", "/")).toBe("0/");
    expect(addToEquation("9+", "6")).toBe("9+6");
  });

  it("should not allow multiple 0's in front", () => {
    expect(addToEquation("0", "0")).toBe("0");
    expect(addToEquation("0.0", "0")).toBe("0.00");
  });
});

describe("isInDecimal", () => {
  it("should return true when in decimal", () => {
    expect(isInDecimal("1+2-3*5.032")).toBe(true);
    expect(isInDecimal("1+2-3*5.032+1")).toBe(false);
    expect(isInDecimal("1+2-3*5.032+")).toBe(true);
    expect(isInDecimal("1+2-3*5.")).toBe(true);
    expect(isInDecimal("1+2-3*5.0")).toBe(true);
  });
});
