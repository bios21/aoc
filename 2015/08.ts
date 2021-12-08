import { getInputAsArray } from "../utils.ts";

// const data = [
//   '""',
//   '"abc"',
//   '"aaa\\"aaa"', // have to tweak for test purpose
//   '"\\x27"',
// ];

const data = await getInputAsArray();

// a
// console.log(
//   data.reduce((acc, str) => acc + str.length, 0) -
//     data.reduce((acc, str) => acc + eval(`${str}.length`), 0),
// );

//b
const originalCodeReprLength = data.reduce((acc, str) => acc + str.length, 0);
const escapedCodeReprLength = data.map((str) =>
  `"${str.replace(/("|\\)/gi, "\\$1")}"`
).reduce((acc, str) => acc + str.length, 0);

console.log(
  escapedCodeReprLength - originalCodeReprLength,
);
