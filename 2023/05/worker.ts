/// <reference no-default-lib="true" />
/// <reference lib="deno.worker" />

import {
  Almanac,
  SeedMap,
  Worker05InputEvent,
  Worker05OutputEvent,
} from "./types.ts";

// test that we are in a worker in Deno

self.onmessage = (event: MessageEvent<Worker05InputEvent>) => {
  const { data } = event;
  switch (data.type) {
    case "run":
      run(data.seedRangeLength, data.seedStart, data.almanac);
      break;
  }
};

function run(seedRangeLength: number, seedStart: number, almanac: Almanac) {
  if (!almanac) throw new Error("almanac not initialized");

  console.log("run worker", self.name);
  let lowestLocation_b = Infinity;
  for (let i = 0; i < seedRangeLength; i++) {
    const seed = seedStart + i;
    const seedMap = almanac.categories.reduce((acc, cat) => {
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
    lowestLocation_b = Math.min(lowestLocation_b, seedMap.location_number);
    if (lowestLocation_b === seedMap.location_number) {
      console.log("new lowest location", {
        seed,
        name: self.name,
        lowestLocation_b,
      });
    }
    // seedIteration++;
  }

  self.postMessage({
    type: "lowestLocation",
    lowestLocation: lowestLocation_b,
  } as Worker05OutputEvent);
}
