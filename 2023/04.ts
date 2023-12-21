import { getInputAsArray } from "../utils.ts";

// const data = //
//   `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
//  Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
//  Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
//  Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
//  Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
//  Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`.split("\n").map((line) =>
//     line.trim()
//   );

const data = await getInputAsArray();

interface Card {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
  copies: number;
}

const cards: Card[] = data.map((line) => {
  const [id, numbers] = line.split(":");
  const [winningNumbers, myNumbers] = numbers.split("|").map((numbers) =>
    numbers.trim().split(/\s+/).map(Number)
  );
  return {
    id: Number(id.split(/\s+/)[1]),
    winningNumbers,
    myNumbers,
    copies: 0,
  };
});

//a
const points = cards.reduce((acc, { id, winningNumbers, myNumbers }) => {
  const founds = myNumbers.filter((number) => winningNumbers.includes(number));
  const count = founds.length
    ? founds
      .reduce(
        (accCount, _, currentIndex) =>
          currentIndex === 0 ? accCount : accCount * 2,
        1,
      )
    : 0;

  // console.log({ id, count, founds, myNumbers });

  return acc + count;
}, 0);

console.log({ points });

//b

for (let cardPos = 0; cardPos < cards.length; cardPos++) {
  const { id, winningNumbers, myNumbers, copies } = cards[cardPos];

  const founds = myNumbers.filter((number) =>
    winningNumbers.includes(number)
  ).length;

  // console.log({ id, founds, copies });

  for (
    let copyCardPos = cardPos + 1;
    copyCardPos <= cardPos + founds;
    copyCardPos++
  ) {
    const copyCard = cards[copyCardPos];
    // console.log(copyCard.id, "add", 1 + copies, "copies");
    copyCard.copies += 1 + copies;
  }
}

const totalScratchcards = cards.reduce(
  (acc, { copies }) => acc + copies + 1,
  0,
);

console.log({ totalScratchcards });
