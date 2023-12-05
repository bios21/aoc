import { getInputAsArray } from "../utils.ts";

// const data = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`.split("\n");

const data = await getInputAsArray();

interface GameSet {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  sets: GameSet[];
}

const bagContentLimit = { red: 12, green: 13, blue: 14 };

const PARSER = /Game (\d+): (.*)/gi;

//setup
const games: Game[] = data.map((line) => {
  const [, rawId, rawSets] = new RegExp(PARSER).exec(line)!;
  const sets = rawSets
    .split(";")
    .map((rawSet) => {
      const set = { red: 0, green: 0, blue: 0 };
      rawSet
        .split(",")
        .map((rawColor) => rawColor.trim().split(" "))
        .forEach(([amount, color]) => {
          set[color as keyof typeof set] = Number(amount);
        });
      return set;
    });
  return { id: Number(rawId), sets };
});

// a
const cumulated = games.reduce((acc, game) => {
  const valid = game.sets.every((set) => {
    return Object.entries(set).every(([color, amount]) => {
      return amount <= bagContentLimit[color as keyof typeof bagContentLimit];
    });
  });

  return valid ? acc + game.id : acc;
}, 0);

console.log({ cumulated });

//b

const minimalSets = games.map((game) => {
  // extract the highest number of each color off all sets
  const max = game.sets.reduce<GameSet>((acc, set) => {
    return Object.entries(set).reduce((acc, [color, amount]) => {
      return { ...acc, [color]: Math.max(acc[color as keyof GameSet], amount) };
    }, acc);
  }, { red: 0, green: 0, blue: 0 });

  return max;
});

const powerSum = minimalSets.reduce(
  (acc, set) => acc + (set.red * set.green * set.blue),
  0,
);

console.log({ powerSum });
