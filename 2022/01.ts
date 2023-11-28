import { getInput } from "../utils.ts";
// const data = `1000
// 2000
// 3000

// 4000

// 5000
// 6000

// 7000
// 8000
// 9000

// 10000`;

const data = await getInput();

//a
const groups = data.split("\n\n").map((group) =>
  group.split("\n").map(Number).reduce((a, b) => a + b, 0)
);
console.log("a", Math.max(...groups));

//b
const orderedGroups = groups.sort((a, b) => b - a);
console.log("b", orderedGroups.slice(0, 3).reduce((a, b) => a + b, 0));
