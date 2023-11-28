import { getInputAsArray } from "../utils.ts";

// let data = [
//   "2199943210",
//   "3987894921",
//   "9856789892",
//   "8767896789",
//   "9899965678",
// ];
let data = await getInputAsArray();

const heightmap: number[][] = data.map((line) => line.split("").map(Number));

interface Location {
  x: number;
  y: number;
  height: number;
}
const getAdjacentLocations = (
  { x, y }: Location,
): [top: Location, right: Location, bottom: Location, left: Location] => [
  { x: x - 1, y, height: heightmap[x - 1]?.[y] ?? Infinity },
  { x, y: y + 1, height: heightmap[x][y + 1] ?? Infinity },
  { x: x + 1, y, height: heightmap[x + 1]?.[y] ?? Infinity },
  { x, y: y - 1, height: heightmap[x][y - 1] ?? Infinity },
];

const lowestLocations: Location[] = [];
heightmap.forEach((row, x) => {
  row.forEach((height, y) => {
    const location: Location = { x, y, height };
    if (
      getAdjacentLocations(location).every((adjacent) =>
        adjacent.height > height
      )
    ) {
      lowestLocations.push(location);
    }
  });
});

data = [];

// a
// console.log(
//   lowestLocations.reduce((acc, { height }) => acc + height + 1, 0),
// );

//b
// const seen = new Set<string>();
// const getBassinSize = (
//   currentLocation: Location,
// ) => {
//   let size = 1;
//   seen.add(`x${currentLocation.x}y${currentLocation.y}`);
//   const adjacents = getAdjacentLocations(currentLocation);
//   for (const adjacent of adjacents) {
//     if (adjacent.height >= 9) continue;
//     if (seen.has(`x${adjacent.x}y${adjacent.y}`)) continue;
//     if (
//       adjacent.height === currentLocation.height ||
//       adjacent.height === currentLocation.height + 1
//     ) {
//       size += getBassinSize(adjacent);
//     }
//   }

//   return size;
// };

// const bassinSizes: number[] = [];
// for (const location of lowestLocations) {
//   bassinSizes.push(getBassinSize(location));
// }

// const [a, b, c] = bassinSizes.sort((b1, b2) => b1 < b2 ? 1 : b1 > b2 ? -1 : 0);
// console.log(a * b * c);

//edldc
const grid = heightmap;
const width = grid[0].length;
const height = grid.length;

function gridRead(x: number, y: number): number | null {
  if (x < 0 || x >= width || y < 0 || y >= height) {
    return null;
  }
  return grid[y][x];
}

function isLowerThan(current: number, val: number | null): boolean {
  return val === null ? true : current < val;
}

const minimums: Array<{ x: number; y: number; val: number }> = [];

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const up = gridRead(x, y - 1);
    const down = gridRead(x, y + 1);
    const left = gridRead(x - 1, y);
    const right = gridRead(x + 1, y);
    const current = gridRead(x, y);
    if (current === null) {
      throw new Error(`Invalid grid`);
    }
    if (
      isLowerThan(current, up) &&
      isLowerThan(current, down) &&
      isLowerThan(current, left) &&
      isLowerThan(current, right)
    ) {
      minimums.push({ x, y, val: current });
    }
  }
}

const sizes: Array<number> = [];

const visited = new Set<string>();

function solve(x: number, y: number): number {
  const coord = `${x},${y}`;
  if (visited.has(coord)) {
    return 0;
  }
  const val = gridRead(x, y);
  visited.add(coord);
  if (val === null) {
    return 0;
  }
  if (val === 9) {
    return 0;
  }
  const left = solve(x + 1, y);
  const right = solve(x - 1, y);
  const up = solve(x, y - 1);
  const down = solve(x, y + 1);
  return 1 + left + right + up + down;
}

minimums.forEach((m) => {
  sizes.push(solve(m.x, m.y));
});

console.log(
  sizes
    .sort((l, r) => r - l)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1),
);
