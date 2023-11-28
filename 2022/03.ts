import { getInputAsArray } from "../utils.ts";

const priorities = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

//a
// const data = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`.split("\n");

//b
// const data = `vJrwpWtwJgWrhcsFMMfFFhFp
// jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
// PmmdzqPrVvPwwTWBwg
// wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
// ttgJtRGJQctTZtZT
// CrZsJsPPZsGzwwsLwLmpwMDw`.split("\n");

const data = await getInputAsArray();

//a
const searchCommonLetterInLine = (line: string) => {
  const half = line.length / 2;
  const first = line.slice(0, half);
  const second = line.slice(half);
  // console.log({ first, second });

  // search the common letter in two strings
  for (const letter of first) {
    if (second.includes(letter)) {
      return letter;
    }
  }

  throw new Error("No common letter found");
};

const resultA = data.map(searchCommonLetterInLine);
console.log(
  "a",
  resultA.map((letter) => priorities.indexOf(letter) + 1).reduce(
    (a, b) => a + b,
    0,
  ),
);

//b
const searchCommonLetterInThreeLinesSet = (
  [line1, line2, line3]: [string, string, string],
) => {
  for (const letter of line1) {
    if (line2.includes(letter) && line3.includes(letter)) {
      return letter;
    }
  }

  throw new Error("No common letter found");
};

// group lines by 3
const linesGroupedByThree: [string, string, string][] = [];
for (let i = 0; i < data.length; i += 3) {
  linesGroupedByThree.push(data.slice(i, i + 3) as [string, string, string]);
}

const resultB = linesGroupedByThree.map(searchCommonLetterInThreeLinesSet);
console.log(
  "b",
  resultB,
  resultB.map((letter) => priorities.indexOf(letter) + 1).reduce(
    (a, b) => a + b,
    0,
  ),
);
