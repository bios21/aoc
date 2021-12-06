import { getInput } from "../utils.ts";

// const data = [
//   3,
//   4,
//   3,
//   1,
//   2,
// ];
const data = (await getInput()).split(",").map(Number);

//a
// for (let day = 0; day < 80; day++) {
//   for (let idx = 0; idx < data.length; idx++) {
//     let fish = data[idx] - 1;

//     if (fish === -1) {
//       data.push(9);
//       fish = 6;
//     }

//     data[idx] = fish;
//   }
// }

//b
const initialCount: number[] = [
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
];
let fishCounts = [...initialCount];
data.forEach((fish) => fishCounts[fish]++);

for (let day = 0; day < 256; day++) {
  const nextCounts = [...initialCount];
  for (let timer = 0; timer < 9; timer++) {
    if (timer === 0) {
      nextCounts[6] += fishCounts[0];
      nextCounts[8] += fishCounts[0];
    } else {
      nextCounts[timer - 1] += fishCounts[timer];
    }
  }
  fishCounts = nextCounts;
}

console.log(fishCounts.reduce((total, current) => total + current, 0));
