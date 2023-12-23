import { getInput } from "../../utils.ts";
import {
  Almanac,
  Category,
  Range,
  SeedMap,
  Worker05InputEvent,
  Worker05OutputEvent,
} from "./types.ts";

// const data = //
//   `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

const data = await getInput();

const raw = data.split("\n\n");

const almanac: Almanac = {
  seeds: raw.shift()?.split(":")[1].trim().split(/\s+/).map(Number) ?? [],
  categories: raw.map((category) => {
    const [categoryName, ...maps] = category.split("\n");
    const [source, destinationRaw] = categoryName.split("-to-");
    const destination = destinationRaw.split(" ")[0];
    const ranges = maps.map((map) =>
      map.trim().split(/\s+/).map(Number) as unknown as Range
    );
    return {
      source,
      destination,
      ranges,
    } as Category;
  }),
};

// console.log({ almanac });

//a
const seedMapsA = almanac.seeds.map((seed) => {
  return almanac.categories.reduce((acc, cat) => {
    const sourceNumber = acc[`${cat.source}_number`];
    for (const range of cat.ranges) {
      const [destinationStart, sourceStart, length] = range;
      const sourceInRange = sourceNumber >= sourceStart &&
        sourceNumber < sourceStart + length;
      if (sourceInRange) {
        const destinationNumber = destinationStart +
          (sourceNumber - sourceStart);
        return { ...acc, [`${cat.destination}_number`]: destinationNumber };
      }
    }

    return { ...acc, [`${cat.destination}_number`]: sourceNumber };
  }, { seed_number: seed } as SeedMap);
});
const lowestLocation_a = Math.min(
  ...seedMapsA.map((seedMap) => seedMap.location_number),
);

console.log({ lowestLocation_a });

const args = [] as [seedRangeStart: number, seedStart: number][];
almanac.seeds.forEach((seedStart, idx, arr) => {
  if (idx % 2 !== 0) return null;
  const seedRangeLength = arr[idx + 1];
  args.push([seedRangeLength, seedStart]);
});

let mainIteration = 0;
const lowestLocations_b: number[] = await Promise.all(
  args.map(([seedRangeLength, seedStart]) =>
    new Promise<number>((resolve) => {
      const worker = new Worker(
        new URL("./worker.ts", import.meta.url).href,
        { type: "module", name: `worker_${mainIteration}` },
      );

      worker.onmessage = (event: MessageEvent<Worker05OutputEvent>) => {
        const { data } = event;
        switch (data.type) {
          case "lowestLocation":
            resolve(data.lowestLocation);
            break;
        }
      };

      worker.postMessage({
        type: "run",
        seedRangeLength,
        seedStart,
        almanac,
      } as Worker05InputEvent);

      mainIteration++;
    })
  ),
);

const lowestLocation_b = Math.min(
  ...lowestLocations_b,
);

console.log({ lowestLocation_b });
