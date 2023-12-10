import { getInputAsArray } from "../utils.ts";

// const data = // => a 4361 / b 467835
//   `467..114..
//   ...*......
//   ..35..633.
//   ......#...
//   617*......
//   .....+.58.
//   ..592.....
//   ......755.
//   ...$.*....
//   .664.598..`.split("\n").map((line) => line.trim());

const data = await getInputAsArray();

interface Position {
  lineIndex: number;
  index: number;
}

interface Value {
  position: Position;
  length: number;
  value: number;
}

const numbersWithPos = data.flatMap((line, lineIndex) =>
  [...line.matchAll(/\d+/g)].map<Value>(({ 0: value, index = NaN }) => ({
    value: Number(value),
    position: {
      lineIndex,
      index,
    },
    length: value.length,
  }))
);

const times = <T>(n: number, fn: (i: number) => T) =>
  Array.from({ length: n }).map((_, i) => fn(i));

//a
const cumulated = numbersWithPos.reduce(
  (acc, { position: { lineIndex, index }, value, length }) => {
    // test around the position of the number including diagonals
    // including in between start and end of the number
    // vvvvv
    // ..*..
    // .123.
    const offsetToTest = [
      [-1, length], // up right after
      [0, -1], // left
      [0, length], // right after
      [1, length], // down right after
      // // up
      ...times(length + 1, (i) => [-1, i - 1]),
      // // down
      ...times(length + 1, (i) => [1, i - 1]),
    ];
    const valid = offsetToTest.some(([lineOffset, indexOffset]) => {
      const line = data[lineIndex + lineOffset];
      if (!line) return false;
      const charIndex = indexOffset + index;
      const char = line[charIndex];
      // console.log({ line, char, charIndex });

      return !!char && !(/(\d|\.)/gi).test(char);
    });

    return valid ? acc + value : acc;
  },
  0,
);

console.log({ cumulated });

interface Gear {
  position: {
    lineIndex: number;
    index: number;
  };
}

//b

const gears: Position[] = [];
data.forEach((line, lineIndex) => {
  let index = line.indexOf("*");
  while (index !== -1) {
    gears.push({ lineIndex, index });
    index = line.indexOf("*", index + 1);
  }
});

function isAdjacent(pos1: Position, pos2: Position, length: number): boolean {
  for (let i = 0; i < length; i++) {
    if (
      Math.abs(pos1.lineIndex - pos2.lineIndex) <= 1 &&
      Math.abs(pos1.index + i - pos2.index) <= 1
    ) {
      return true;
    }
  }
  return false;
}

let totalRatio = 0;
gears.forEach((gear) => {
  const adjacentNumbers = numbersWithPos.filter((num) =>
    isAdjacent(num.position, gear, num.value.toString().length)
  );

  if (adjacentNumbers.length === 2) {
    totalRatio += adjacentNumbers[0].value * adjacentNumbers[1].value;
  }
});

console.log({ totalRatio });
