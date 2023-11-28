import { getInput } from "../utils.ts";

const map = {
  X: "A",
  Y: "B",
  Z: "C",
} as const;

const values = {
  A: 1,
  B: 2,
  C: 3,
};

const beatMap = {
  A: "C",
  B: "A",
  C: "B",
} as const;

// const data = `A Y
// B X
// C Z`;

const data = await getInput();

//a
const computeLineA = (line: string) => {
  const [opponent, _me] = line.split(" ") as [
    typeof map[keyof typeof map],
    keyof typeof map,
  ];
  const me = map[_me];

  let count = values[me];

  if (opponent === me) { // tie
    count += 3;
  } else if (opponent === beatMap[me]) { // me beats opponent
    count += 6;
  } // else opponent beats me and I get 0 points
  // console.log({ me, opponent, count });

  return count;
};

const resultA = data.split("\n").map(computeLineA);

console.log("a", resultA, resultA.reduce((a, b) => a + b, 0));

//b
// X = lose
// Y = tie
// Z = win
const computeLineB = (line: string) => {
  const [opponent, endResult] = line.split(" ") as [
    typeof map[keyof typeof map],
    "X" | "Y" | "Z",
  ];

  let count = endResult === "X" ? 0 : endResult === "Y" ? 3 : 6;
  const me = endResult === "X"
    ? beatMap[opponent]
    : endResult === "Y"
    ? opponent
    : beatMap[beatMap[opponent]];
  count += values[me];

  return count;
};

const resultB = data.split("\n").map(computeLineB);

console.log("b", resultB, resultB.reduce((a, b) => a + b, 0));
