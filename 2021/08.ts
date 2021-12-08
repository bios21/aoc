import { getInputAsArray } from "../utils.ts";

// const data = [
//   "acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf",
// ];
// const data = [
//   "be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe",
//   "edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc",
//   "fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg",
//   "fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb",
//   "aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea",
//   "fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb",
//   "dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe",
//   "bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef",
//   "egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb",
//   "gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce",
// ];
const data = await getInputAsArray();
const entries = data.map((entry) =>
  (entry.split(" | ")).map((digit) => digit.split(" "))
) as [string[], string[]][];

// reminder
//  aaaa
// b    c
// b    c
//  dddd
// e    f
// e    f
//  gggg
const REF_DIGITS = [
  "abcefg",
  "cf",
  "acdeg",
  "acdfg",
  "bcdf",
  "abdfg",
  "abdefg",
  "acf",
  "abcdefg",
  "abcdfg",
];

//a
// const REVERSE_REF_DIGITS = REF_DIGITS.reduce((map, refDigit, realNumber) => {
//   map[refDigit] = realNumber;
//   return map;
// }, {} as Record<string, number>);

// const REF_DIGITS_BY_LENGTH = REF_DIGITS.reduce((map, refDigit) => {
//   const refLength = refDigit.length;
//   if (!map.get(refLength)?.length) {
//     map.set(refLength, []);
//   }
//   map.get(refLength)!.push(refDigit);
//   return map;
// }, new Map<number, string[]>());

// const count: number[] = new Array(REF_DIGITS.length).fill(0);
// for (const [, output] of entries) {
//   for (const digit of output) {
//     const digitLength = digit.length;
//     const refDigits = REF_DIGITS_BY_LENGTH.get(digitLength)!;
//     if (refDigits.length === 1) {
//       count[REVERSE_REF_DIGITS[refDigits[0]]]++;
//     }
//   }
// }

// console.log(count.reduce((total, current) => total + current, 0));

//b
const REF_DIGITS_LENGTH = REF_DIGITS.map((digit) => digit.length);
const mappingOverlaps = (m1: string, m2: string) => {
  const m1exploded = m1.split("");
  return m2.split("").every((segment) => m1exploded.includes(segment));
};

let outputCount = 0;
for (const [input, output] of entries) {
  const maps: string[] = new Array(10);

  // find easy first -- 1, 4, 7, 8
  maps[1] = input.find((signal) => signal.length === REF_DIGITS_LENGTH[1])!;
  maps[4] = input.find((signal) => signal.length === REF_DIGITS_LENGTH[4])!;
  maps[7] = input.find((signal) => signal.length === REF_DIGITS_LENGTH[7])!;
  maps[8] = input.find((signal) => signal.length === REF_DIGITS_LENGTH[8])!;

  // then find other by decreasing mapping length
  // --
  // -- 0, 6, and 9 have 6 segments
  const mappings069 = input.filter((signal) =>
    signal.length === REF_DIGITS[0].length
  )!;
  // 0 and 9 have segment 1 in it
  const mappings09 = mappings069.filter((mapping) =>
    mappingOverlaps(mapping, maps[1])
  );
  maps[6] = mappings069.find((mapping) => !mappings09.includes(mapping))!;
  // 9 have segment 4 in it
  maps[9] = mappings09.find((mapping) => mappingOverlaps(mapping, maps[4]))!;
  // 0 is left
  maps[0] = mappings09.find((mapping) => mapping !== maps[9])!;

  // --
  // -- 2, 3 and 5 have 5 segments
  const mappings235 = input.filter((signal) =>
    signal.length === REF_DIGITS_LENGTH[2]
  )!;
  // 6 have segment 5 in it
  maps[5] = mappings235.find((mapping) => mappingOverlaps(maps[6], mapping))!;
  const mappings23 = mappings235.filter((mapping) => mapping !== maps[5]);
  // 9 have segment 3 in it
  maps[3] = mappings23.find((mapping) => mappingOverlaps(maps[9], mapping))!;
  // 2 is left
  maps[2] = mappings23.find((mapping) => mapping !== maps[3])!;

  // now resolve output
  outputCount += +output.reduce(
    (acc, signal) => {
      const signalExploded = signal.split("");
      return acc +
        maps.findIndex((map) => {
          const exploded = map.split("");
          return signal.length === map.length &&
            signalExploded.every((segment) => exploded.includes(segment));
        });
    },
    "",
  );
}

console.log(outputCount);
