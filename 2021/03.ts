import { getInputAsArray } from "../utils.ts";

// const data = [
//   "00100",
//   "11110",
//   "10110",
//   "10111",
//   "10101",
//   "01111",
//   "00111",
//   "11100",
//   "10000",
//   "11001",
//   "00010",
//   "01010",
// ];
const data = await getInputAsArray();

const bits: number[][] = data.map((binary) => binary.split("").map(Number));
// a
// let [gammaRate, epsilonRate] = [
//   "",
//   "",
// ];
// bits[0].forEach((_, position) => {
//   let [zero, one] = [0, 0];
//   bits.forEach((row) => {
//     const bit = row[position];
//     bit === 0 ? zero++ : one++;
//   });
//   if (zero > one) {
//     gammaRate += "0";
//     epsilonRate += "1";
//   } else {
//     gammaRate += "1";
//     epsilonRate += "0";
//   }
// });
// const powerRate = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);

// b
const extractRating = (filtred: number[][], position: number, o2: boolean) => {
  let [zero, one] = [0, 0];
  filtred.forEach((row) => {
    const bit = row[position];
    bit === 0 ? zero++ : one++;
  });
  return filtred.filter((line) =>
    line[position] === (zero > one ? o2 ? 0 : 1 : o2 ? 1 : 0)
  );
};

let o2Rate = bits;
let o2BitPos = 0;
while (o2Rate.length > 1) {
  o2Rate = extractRating(o2Rate, o2BitPos, true);
  o2BitPos++;
}
let co2Rate = bits;
let co2BitPos = 0;
while (co2Rate.length > 1) {
  co2Rate = extractRating(co2Rate, co2BitPos, false);
  co2BitPos++;
}

console.log(parseInt(o2Rate[0].join(""), 2) * parseInt(co2Rate[0].join(""), 2));
