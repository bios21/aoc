import { getInputAsArray } from "../utils.ts";

// const data = [
//   "forward 5",
//   "down 5",
//   "forward 8",
//   "up 3",
//   "down 8",
//   "forward 2",
// ];
const data = await getInputAsArray();

let [hPos, depth, aim] = [0, 0, 0];

type Direction = "forward" | "down" | "up";

// a
// data.forEach((rawCommand) => {
//   const command = rawCommand.split(" ");
//   const [direction, units] = [command[0] as Direction, +command[1]];

//   switch (direction) {
//     case "forward":
//       hPos += units;
//       break;
//     case "down":
//       depth += units;
//       break;
//     case "up":
//       depth -= units;
//       break;
//   }
// });

// b
data.forEach((rawCommand) => {
  const command = rawCommand.split(" ");
  const [direction, units] = [command[0] as Direction, +command[1]];

  switch (direction) {
    case "forward":
      hPos += units;
      depth += aim * units;
      break;
    case "down":
      aim += units;
      break;
    case "up":
      aim -= units;
      break;
  }
});
console.log(hPos * depth);
