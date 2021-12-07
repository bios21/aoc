import { getInput } from "../utils.ts";

// const data = [
//   16,
//   1,
//   2,
//   0,
//   4,
//   2,
//   7,
//   1,
//   2,
//   14,
// ];
const data = (await getInput()).split(",").map(Number);

//prep
const rangePos = [Math.min(...data), Math.max(...data)];
const allPos = new Array(rangePos[1] - rangePos[0]).fill(0).map((_, idx) =>
  rangePos[0] + idx
);

//a
// const rangeTotalCost = allPos.map((pos) =>
//   data.reduce(
//     (totalPos, crabPos) => totalPos + Math.abs(crabPos - pos),
//     0,
//   )
// );

//b
const sumUntil = (max: number) =>
  new Array(max).fill(void 0).reduce((total, _, idx) => total + idx + 1, 0);
const rangeTotalCost = allPos.map((pos) =>
  data.reduce(
    (totalPos, crabPos) => totalPos + sumUntil(Math.abs(crabPos - pos)),
    0,
  )
);

console.log(Math.min(...rangeTotalCost));
