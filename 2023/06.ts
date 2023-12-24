import { getInputAsArray } from "../utils.ts";

// const data = //
//   `Time:      7  15   30
// Distance:  9  40  200`.split("\n");

const data = await getInputAsArray();

const [time, distance] = data.map((line) =>
  line.split(/\s+/).slice(1).map(Number)
);

const racesA = time.map((t, i) => ({ t, d: distance[i] }));

const countPossibilities = ({ d, t }: { d: number; t: number }) => {
  let count = 0;
  for (let i = 0; i <= t; i++) {
    const speed = i * 1;
    const distance = speed * (t - i);
    if (distance > d) {
      count++;
    }
  }

  return count;
};

const possibilitiesA = racesA.map(countPossibilities);

console.log(
  { racesA, count: possibilitiesA.reduce((a, b) => a * b) },
);

const raceB = { t: Number(time.join("")), d: Number(distance.join("")) };

const possibilitiesB = countPossibilities(raceB);

console.log({ raceB, count: possibilitiesB });
