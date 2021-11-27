const { assert } = require("chai");

describe("Box Exercises", () => {
  const Box = (x) => ({
    map: (f) => Box(f(x)),
    fold: (f) => f(x),
    inspect: () => `Box(${x})`,
  });

  // Exercise: Box
  // Goal: Refactor each example using Box
  // Keep these tests passing!
  // Bonus points: no curly braces

  // Ex1: Using Box, refactor moneyToFloat
  // =========================
  const moneyToFloat = (str) =>
    Box(str)
      .map((s) => s.replace(/\$/, ""))
      .fold((r) => parseFloat(r));

  it("ex1", () => {
    assert.equal(String(moneyToFloat("$5.00")), 5);
  });

  // Ex2: Using Box, refactor percentToFloat
  // =========================
  const percentToFloat = (str) =>
    Box(str.replace(/\%/, ""))
      .map((replaced) => parseFloat(replaced))
      .fold((number) => number * 0.01);

  it("ex2", () => {
    assert.equal(String(percentToFloat("20%")), 0.2);
  });

  // Ex3: Using Box, refactor applyDiscount (hint: each variable introduces a new Box)
  // =========================
  const applyDiscount = (price, discount) =>
    Box(moneyToFloat(price)).fold((cost) =>
      Box(percentToFloat(discount)).fold((savings) => cost - cost * savings)
    );

  it("ex3", () => {
    assert.equal(String(applyDiscount("$5.00", "20%")), 4);
  });
});
