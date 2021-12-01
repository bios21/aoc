import { getInputAsNumbers } from "../utils.ts";

// const data = [
//   199,
//   200,
//   208,
//   210,
//   200,
//   207,
//   240,
//   269,
//   260,
//   263,
// ];
const data = await getInputAsNumbers();

const countIncreased = (measurements: number[]) => {
  let count = 0;
  measurements.forEach((value, index) => {
    if (index === 0) return "";
    const prevValue = measurements[index - 1];
    if (value > prevValue) count++;
  });
  return count;
};

const threeSlideWindowSum = (measurements: number[]) =>
  measurements.map((value, index) =>
    value + (measurements[index + 1] ?? 0) + (measurements[index + 2] ?? 0)
  );

console.log(countIncreased(threeSlideWindowSum(data)));
