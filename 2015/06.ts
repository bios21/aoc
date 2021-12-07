import { getInputAsArray } from "../utils.ts";

// const data = [
//   "toggle 0,0 through 999,999",
// ];
const data = await getInputAsArray();

const PARSER =
  /(turn on|toggle|turn off) ([0-9]+,[0-9]+) through ([0-9]+,[0-9]+)/gi;

interface Instruction {
  todo: "turn on" | "toggle" | "turn off";
  a: [number, number];
  b: [number, number];
}

const instructions = data.map((raw) => {
  const [, todo, rawA, rawB] = new RegExp(PARSER).exec(raw)!;

  return {
    todo: todo,
    a: rawA.split(",").map(Number),
    b: rawB.split(",").map(Number),
  } as Instruction;
});

const GRID_SIZE = 1000;

//a
// const grid: boolean[][] = new Array(GRID_SIZE).fill(void 0).map(() =>
//   new Array(GRID_SIZE).fill(false)
// );

// for (const instruction of instructions) {
//   for (let x = instruction.a[0]; x <= instruction.b[0]; x++) {
//     for (let y = instruction.a[1]; y <= instruction.b[1]; y++) {
//       grid[x][y] = instruction.todo === "toggle"
//         ? !grid[x][y]
//         : instruction.todo === "turn on"
//         ? true
//         : false;
//     }
//   }
// }

// console.log(grid.flat().filter((light) => light).length);

//b
const grid: number[][] = new Array(GRID_SIZE).fill(void 0).map(() =>
  new Array(GRID_SIZE).fill(0)
);

for (const instruction of instructions) {
  for (let x = instruction.a[0]; x <= instruction.b[0]; x++) {
    for (let y = instruction.a[1]; y <= instruction.b[1]; y++) {
      if (instruction.todo === "toggle") {
        grid[x][y] += 2;
      } else if (instruction.todo === "turn on") {
        grid[x][y]++;
      } else {
        const newBrightness = grid[x][y] - 1;
        grid[x][y] = newBrightness >= 0 ? newBrightness : 0;
      }
    }
  }
}

console.log(grid.flat().reduce((total, light) => total + light, 0));
