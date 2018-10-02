const convert = require("./tempConverter");

test("convert 0 celcius to 32 fahrenheit", () => {
  expect(convert.calcFarenheit(0)).toBe(32);
});

test("convert 73 fahrenheit to 23 celcius", () => {
  expect(convert.calcCelcius(73)).toBe(23);
});

test("convert -10 celcius to 14 fahrenheit", () => {
  expect(convert.calcFarenheit(-10)).toBe(14);
});

test("convert -20 fahrenheit to -29 celcius", () => {
  expect(convert.calcCelcius(-20)).toBe(-29);
});

test("convert 100 celcius to 212 fahrenheit", () => {
  expect(convert.calcFarenheit(100)).toBe(212);
});

test("convert 0 fahrenheit to -18 celcius", () => {
  expect(convert.calcCelcius(0)).toBe(-18);
});
