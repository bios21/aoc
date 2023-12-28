import { getInputAsArray } from "../utils.ts";

// const data = //
//   `.....
//    .S-7.
//    .|.|.
//    .L-J.
//    .....`.split("\n").map((l) => l.trim());

const data = await getInputAsArray();

type Connect = [north: boolean, east: boolean, south: boolean, west: boolean];
enum Direction {
  north,
  east,
  south,
  west,
}

const pipes = {
  "7": [false, false, true, true],
  "L": [true, true, false, false],
  "J": [true, false, false, true],
  "F": [false, true, true, false],
  "|": [true, false, true, false],
  "-": [false, true, false, true],
  ".": [false, false, false, false],
} as const satisfies Record<string, Connect>;

type Pipe = keyof typeof pipes;

const pipeMap: Pipe[][] = data.map((l) => l.split("") as Pipe[]);

const startPipeCoord = (() => {
  for (let y = 0; y < pipeMap.length; y++) {
    for (let x = 0; x < pipeMap[y].length; x++) {
      if (pipeMap[y][x] === "S" as Pipe) {
        return { x, y };
      }
    }
  }
})()!;

const startPipe = (() => {
  const { x, y } = startPipeCoord;
  const northPipe = pipeMap[y - 1]?.[x];
  const eastPipe = pipeMap[y]?.[x + 1];
  const southPipe = pipeMap[y + 1]?.[x];
  const westPipe = pipeMap[y]?.[x - 1];

  const maybeType = [false, false, false, false];
  if (northPipe && pipes[northPipe]![Direction.south]) {
    maybeType[Direction.north] = true;
  }
  if (eastPipe && pipes[eastPipe]![Direction.west]) {
    maybeType[Direction.east] = true;
  }
  if (southPipe && pipes[southPipe]![Direction.north]) {
    maybeType[Direction.south] = true;
  }
  if (westPipe && pipes[westPipe]![Direction.east]) {
    maybeType[Direction.west] = true;
  }

  return Object.entries(pipes).find(([, connect]) => {
    return connect.every((v, i) => v === maybeType[i]);
  })![0] as Pipe;
})();

let nextPipe = startPipe;
let nextCoord = startPipeCoord;
let prevCoord = startPipeCoord;
let first = true;
const loopPipeCoords: { x: number; y: number }[] = [];

while (first || pipeMap[nextCoord.y][nextCoord.x] !== "S" as Pipe) {
  const [north, east, south, west] = pipes[nextPipe]!;
  const currentCoord = nextCoord;
  loopPipeCoords.push(currentCoord);
  const { x: prevX, y: prevY } = first ? { x: -1, y: -1 } : prevCoord;
  prevCoord = currentCoord;

  if (
    north && (currentCoord.x !== prevX || (currentCoord.y - 1) !== prevY)
  ) {
    nextCoord = { x: currentCoord.x, y: currentCoord.y - 1 };
    nextPipe = pipeMap[nextCoord.y][nextCoord.x];
  } else if (
    east && ((currentCoord.x + 1) !== prevX || currentCoord.y !== prevY)
  ) {
    nextCoord = { x: currentCoord.x + 1, y: currentCoord.y };
    nextPipe = pipeMap[nextCoord.y][nextCoord.x];
  } else if (
    south && (currentCoord.x !== prevX || (currentCoord.y + 1) !== prevY)
  ) {
    nextCoord = { x: currentCoord.x, y: currentCoord.y + 1 };
    nextPipe = pipeMap[nextCoord.y][nextCoord.x];
  } else if (
    west && ((currentCoord.x - 1) !== prevX || currentCoord.y !== prevY)
  ) {
    nextCoord = { x: currentCoord.x - 1, y: currentCoord.y };
    nextPipe = pipeMap[nextCoord.y][nextCoord.x];
  } else {
    throw new Error("No pipe found");
  }

  first = false;
}

console.log(loopPipeCoords.length / 2);

//b
const shoelace = loopPipeCoords.reduce((acc, { x, y }, i) => {
  const nextCoord = loopPipeCoords[(i + 1) % loopPipeCoords.length];
  return acc + (x * nextCoord.y) - (y * nextCoord.x);
}, 0);

const area = Math.abs(shoelace / 2);

const internalPoints = area - (loopPipeCoords.length / 2) + 1;

console.log(internalPoints);
