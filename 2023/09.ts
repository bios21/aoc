import { getInputAsArray } from "../utils.ts";

// const data = //
//   `0 3 6 9 12 15
// 1 3 6 10 15 21
// 10 13 16 21 30 45`.split("\n");

const data = await getInputAsArray();

type Sequence = number[];
type Extrapolation = Sequence[];

const sequences: Sequence[] = data.map((line) =>
  line.split(" ").map((n) => parseInt(n))
);

const extrapoledSequences: Extrapolation[] = sequences.map((sequence) => {
  let currentStep = sequence;
  const extrapolation: Extrapolation = [currentStep];
  while (!currentStep.every((n) => n === 0)) {
    const nextStep: Sequence = [];
    currentStep.forEach((n, i) => {
      if (i !== currentStep.length - 1) {
        nextStep.push(currentStep[i + 1] - n);
      }
    });
    extrapolation.push(nextStep);
    currentStep = nextStep;
  }

  return extrapolation;
});

//a
const forwaredExtrapolatedSequences = extrapoledSequences
  .map(
    (extrapolation) =>
      extrapolation.reduceRight((acc, _, i) => {
        if (i === 0) return acc;
        const prev = extrapolation[i - 1];
        const prevLast = prev[prev.length - 1];

        return acc + prevLast;
      }, 0),
  );

const sumA = forwaredExtrapolatedSequences.reduce((acc, n) => acc + n, 0);
console.log({ sumA });

//b
const backwardedExtrapolatedSequences = extrapoledSequences
  .map(
    (extrapolation) =>
      extrapolation.reduceRight((acc, _, i) => {
        if (i === 0) return acc;
        const prev = extrapolation[i - 1];
        const prevFirst = prev[0];

        return prevFirst - acc;
      }, 0),
  );

const sumB = backwardedExtrapolatedSequences.reduce((acc, n) => acc + n, 0);
console.log({ sumB });

/*
//a
[ 10, 13, 16, 21, 30, 45 ],
[ 3, 3, 5, 9, 15 ],
[ 0, 2, 4, 6 ],
[ 2, 2, 2(prevLast), (A => acc) ],
[ 0, 0, (acc) ],

A - prevLast = acc
A = prevLast + acc

//b
[ 10, 13, 16, 21, 30, 45 ],
[ 3, 3, 5, 9, 15 ],
[ 0, 2, 4, 6 ],
[ B => acc, 2(prevFirst), 2, 2 ],
[ (acc), 0, 0 ],

prevFirst - B = acc
B = prevFirst - acc
*/
