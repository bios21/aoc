import { getInputAsArray } from "../utils.ts";

// const data = [
//   "0,9 -> 5,9",
//   "8,0 -> 0,8",
//   "9,4 -> 3,4",
//   "2,2 -> 2,1",
//   "7,0 -> 7,4",
//   "6,4 -> 2,0",
//   "0,9 -> 2,9",
//   "3,4 -> 1,4",
//   "0,0 -> 8,8",
//   "5,5 -> 8,2",
// ];
const data = await getInputAsArray();

const coords = data.map((raw) => {
  const [x1y1, x2y2] = raw.split(" -> ");
  const [x1, y1] = x1y1.split(",").map(Number);
  const [x2, y2] = x2y2.split(",").map(Number);
  return {
    x1,
    y1,
    x2,
    y2,
  };
});

interface Overlap {
  x: number;
  y: number;
  count: number;
}
const overlaps: Overlap[] = [];
const markOverlap = (x: number, y: number) => {
  const overlap = overlaps.find((o) => o.x === x && o.y === y);
  if (overlap) {
    overlap.count++;
  } else {
    overlaps.push({ x, y, count: 1 });
  }
};
coords.forEach((segment) => {
  const vertical = segment.x1 === segment.x2;
  const horizontal = segment.y1 === segment.y2;
  const reverseX = segment.x1 > segment.x2;
  const reverseY = segment.y1 > segment.y2;
  // a
  if (vertical || horizontal) {
    for (
      let x = segment.x1;
      reverseX ? x >= segment.x2 : x <= segment.x2;
      reverseX ? x-- : x++
    ) {
      for (
        let y = segment.y1;
        reverseY ? y >= segment.y2 : y <= segment.y2;
        reverseY ? y-- : y++
      ) {
        markOverlap(y, x);
      }
    }
  } else {
    // b
    for (
      let x = segment.x1, y = segment.y1;
      (reverseX ? x >= segment.x2 : x <= segment.x2) &&
      (reverseY ? y >= segment.y2 : y <= segment.y2);
      reverseX ? x-- : x++, reverseY ? y-- : y++
    ) {
      markOverlap(y, x);
    }
  }
});

console.log(overlaps.filter((o) => o.count > 1).length);

// display
// const maxSize = coords.reduce((size, segment) => {
//   if (segment.x1 > size.x) {
//     size.x = segment.x1;
//   }
//   if (segment.x2 > size.x) {
//     size.x = segment.x2;
//   }
//   if (segment.y1 > size.y) {
//     size.y = segment.y1;
//   }
//   if (segment.y2 > size.y) {
//     size.y = segment.y2;
//   }

//   return size;
// }, { x: 0, y: 0 });

// const map: number[][] = new Array(maxSize.y + 1).fill(void 0);
// map.forEach((_, idx) => map[idx] = new Array(maxSize.x + 1).fill(0));

// overlaps.forEach((o) => {
//   map[o.x][o.y] = o.count;
// });

// map.forEach((s) =>
//   console.log(JSON.stringify(s.map((n) => n === 0 ? "." : `${n}`).join("")))
// );
