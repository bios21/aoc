import { getInputAsArray } from "../utils.ts";

// test a
// const data = `1abc2
// pqr3stu8vwx
// a1b2c3d4e5f
// treb7uchet`.split("\n");

// test b
// const data = `two1nine
// eightwothree
// abcone2threexyz
// xtwone3four
// 4nineeightseven2
// zoneight234
// 7pqrstsixteen`.split("\n");

// test b with overlap
// const data = "oneighthree4twoneazeaz788".split("\n");

const data = await getInputAsArray();

//a
const firstAndLastDigit = (str: string) => {
  const [first, ...rest] = [...str.matchAll(/\d/g)].map((m) => m[0]);
  const last = rest.pop() ?? first;
  return +`${first}${last}`;
};
const sumA = data.reduce((a, b) => a + firstAndLastDigit(b), 0);
console.log({ sumA });

//b
const validDigitWord: Record<string, number> = {
  "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

const possibleKeys = Object.keys(validDigitWord).join("|");
const regexWord = new RegExp(`(?<=(${possibleKeys}|\\d))`, "g");

const firstAndLastDigitWithWord = (str: string) => {
  const matches = Array.from(str.matchAll(regexWord), (m) => m[1]);
  const [first, ...rest] = matches;
  const last = rest.pop() ?? first;
  return +`${validDigitWord[first] || first}${validDigitWord[last] || last}`;
};

const sumB = data.reduce(
  (a, b) => a + firstAndLastDigitWithWord(b),
  0,
);

console.log({ sumB });
