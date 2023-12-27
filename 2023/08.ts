import { getInput } from "../utils.ts";

// const data = //
//   `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`;

// const data = //
//   `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;

//data b
// const data = //
//   `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

const data = await getInput();

const [rules, nodes] = data.split("\n\n");

enum RuleType {
  L,
  R,
}

function* getRuleIterator(rules: string): Generator<number> {
  const instructions = rules.split(""); // e.g. "RL" => ["R", "L"]

  // when at the end of the instructions, start over
  while (true) {
    for (const instruction of instructions) {
      yield RuleType[instruction as keyof typeof RuleType];
    }
  }
}

const nodeMap = new Map<string, string[]>();

const PARSER = /(\w+) = \((\w+), (\w+)\)/gi;
for (const node of nodes.split("\n")) {
  const [, key, left, right] = new RegExp(PARSER).exec(node) ?? [];
  nodeMap.set(key, [left, right]);
}

//a
const countSteps = (
  startNode: string,
  endNode: (node: string) => boolean,
) => {
  let nextNode = startNode;
  let count = 0;
  const ruleIt = getRuleIterator(rules);
  while (!endNode(nextNode)) {
    count++;
    const node = nodeMap.get(nextNode)!;
    nextNode = node[ruleIt.next().value];
  }
  return count;
};
const countA = countSteps("AAA", (node) => node === "ZZZ");
console.log({ countA });

//b
/**
 * Greatest common divisor
 */
function gcd(a: number, b: number) {
  for (let temp = b; b !== 0;) {
    b = a % b;
    a = temp;
    temp = b;
  }
  return a;
}

/**
 * Least common multiple
 */
function lcm(a: number, b: number) {
  const gcdValue = gcd(a, b);
  return (a * b) / gcdValue;
}

const nextNodes = [...nodeMap.keys()].filter((key) => key.endsWith("A"));

const counts = await Promise.all(
  nextNodes.map((node) =>
    new Promise<number>((resolve) => {
      resolve(countSteps(node, (n) => n.endsWith("Z")));
    })
  ),
);

console.log({ counts, lcm: counts.reduce(lcm) });
