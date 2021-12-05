import { getInputAsArray } from "../utils.ts";

// const data = [
//   "qjhvhtzxzqqjkmpb",
//   "xxyxx",
//   "uurcxstgmygtbstg",
//   "ieodomkazucvgmuy",
// ];
const data = await getInputAsArray();

//a
// const isGood = (str: string) =>
//   !str.match(/ab|cd|pq|xy/gi)?.length &&
//   (str.match(/[aeiou]/gi)?.length ?? 0) > 2 &&
//   !!str.match(/([a-z])\1/gi)?.length;

//b

const isGood = (str: string) =>
  !!str.match(/(..).*\1/)?.length && !!str.match(/(.).\1/)?.length;

const countGoods = data.filter(isGood).length;

console.log({ countGoods });
