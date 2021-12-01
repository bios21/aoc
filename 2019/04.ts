import { getInput } from "../utils.ts";

const input = await getInput();

const [start, end] = input.split("-").map(Number);

const is6Digit = (n: number) => n > 99999;
const hasAdj = (n: number) =>
  [...String(n)].some((v, i, a) => a[i - 1] && v === a[i - 1]); // with array
const hasAdj2 = (n: number) => /(.)\1/.test(String(n).replace(/(.)\1\1+/g, "")); // with regexp (replace remove the bigger than 3 chars group) (test check if duo group still remains)
const neverDecrease = (n: number) =>
  [...String(n)].every((v, i, a) => v >= (a[i - 1] ?? v)); // "<=" works with strings

let count = 0;
let i = 0;
for (i = start; i <= end; i++) {
  if (is6Digit(i) && hasAdj2(i) && neverDecrease(i)) {
    count++;
  }
}
console.log(count);
