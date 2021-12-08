import { getInputAsArray } from "../utils.ts";

// const data = [
//   "London to Dublin = 464",
//   "London to Belfast = 518",
//   "Dublin to Belfast = 141",
// ];

const data = await getInputAsArray();
const distances = new Map<string, Map<string, number>>();

for (const raw of data) {
  const [, from, to, distance] = /(\S+) to (\S+) = ([0-9]+)/gi.exec(raw)!;

  if (!distances.has(from)) {
    distances.set(from, new Map());
  }

  distances.get(from)?.set(to, +distance);

  if (!distances.has(to)) {
    distances.set(to, new Map());
  }

  distances.get(to)?.set(from, +distance);
}

const getPermutations = (
  items: string[],
  perms: string[][] = [],
  len = items.length,
) => {
  if (len === 1) perms.push(items.slice(0));

  for (let i = 0; i < len; i++) {
    getPermutations(items, perms, len - 1);

    len % 2 // parity dependent adjacent elements swap
      ? [items[0], items[len - 1]] = [items[len - 1], items[0]]
      : [items[i], items[len - 1]] = [items[len - 1], items[i]];
  }

  return perms;
};

console.log(
  getPermutations([...distances.keys()]).map((perm) =>
    perm.reduce(
      (acc, city, idx) => acc + (distances.get(city)!.get(perm[idx + 1]) ?? 0),
      0,
    )
    // a
    // ).sort().shift(),
    //b
  ).sort().pop(),
);
