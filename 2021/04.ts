import { getInputAsArray } from "../utils.ts";

// const data = [
//   "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
//   "",
//   "22 13 17 11  0",
//   " 8  2 23  4 24",
//   "21  9 14 16  7",
//   " 6 10  3 18  5",
//   " 1 12 20 15 19",
//   "",
//   " 3 15  0  2 22",
//   " 9 18 13 17  5",
//   "19  8  7 25 23",
//   "20 11 10 24  4",
//   "14 21 16 12  6",
//   "",
//   "14 21 17 24  4",
//   "10 16 15  9 19",
//   "18  8 23 26 20",
//   "22 11 13  6  5",
//   " 2  0 12  3  7",
// ];
const data = await getInputAsArray();
const drawnNumbers = data.shift()!.split(",").map(Number);

interface BoardNumber {
  value: number;
  mark: boolean;
}

type BoardRow = BoardNumber[];

type Board = BoardRow[];

data.shift();
let boardLine = 0;
let boardPos = 0;
const boards: Board[] = [];
data.forEach((rawLine) => {
  if (boardLine === 5) {
    boardPos++;
    boardLine = 0;
    return;
  }

  const row = rawLine.replace(/\s+/g, ",").split(",").filter((i) =>
    i &&
    i !== ""
  ).map((value) => ({ value: +value, mark: false } as BoardNumber));
  if (boardLine === 0) {
    boards.push([row]);
  } else if (boardLine < 5) {
    boards[boardPos].push(row);
  }
  boardLine++;
});

const hasCompleteRow = (board: Board): boolean => {
  for (const row of board) {
    if (row.every((n) => n.mark)) {
      return true;
    }
  }

  return false;
};

const markNumber = (board: Board, value: number) => {
  board.forEach((row) =>
    row.forEach((n) => {
      if (n.value === value) n.mark = true;
    })
  );
};

const rotate90Board = (board: Board): Board =>
  board[0].map((_, index) => board.map((row) => row[index]).reverse());

const hasCompleteColumn = (board: Board): boolean => {
  return hasCompleteRow(rotate90Board(board));
};

const sumUnmarkedNumbers = (board: Board): number =>
  board.reduce(
    (sum, row) =>
      sum + row.reduce((sumRow, n) => sumRow + (n.mark ? 0 : n.value), 0),
    0,
  );

// a
// const run = () => {
//   for (const drawnNumber of drawnNumbers) {
//     for (const board of boards) {
//       markNumber(board, drawnNumber);
//       if (hasCompleteColumn(board) || hasCompleteRow(board)) {
//         const sum = sumUnmarkedNumbers(board);
//         console.log("sum", sum);
//         console.log("last called", drawnNumber);
//         console.log("ouput", sum * drawnNumber);
//         return;
//       }
//     }
//   }
// };

//b
const winBoards: number[] = [];
const run = () => {
  for (const drawnNumber of drawnNumbers) {
    for (let boardIdx = 0; boardIdx < boards.length; boardIdx++) {
      markNumber(boards[boardIdx], drawnNumber);
      if (winBoards.includes(boardIdx)) continue;
      if (
        hasCompleteColumn(boards[boardIdx]) ||
        hasCompleteRow(boards[boardIdx])
      ) {
        if (winBoards.length < boards.length - 1) {
          winBoards.push(boardIdx);
        } else {
          const sum = sumUnmarkedNumbers(boards[boardIdx]);
          console.log("sum", sum);
          console.log("last called", drawnNumber);
          console.log("ouput", sum * drawnNumber);
          return;
        }
      }
    }
  }
};

run();
