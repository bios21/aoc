import { getInputAsArray } from "../utils.ts";

// const data = //
//   `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`.split("\n");

const data = await getInputAsArray();

const cardValuesA = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
] as const;

const figuresCount = [
  "1,1,1,1,1",
  "2,1,1,1",
  "2,2,1",
  "3,1,1",
  "3,2",
  "4,1",
  "5",
];

type Card = typeof cardValuesA[number];

interface Hand {
  cards: [Card, Card, Card, Card, Card];
  bid: number;
}

const hands = data.map((line) => {
  const [cards, bid] = line.split(" ");
  const hand = cards.split("") as Hand["cards"];
  return { cards: hand, bid: Number(bid) } as Hand;
});

interface HandWithFigure extends Hand {
  figure: string;
  figurePower: number;
  mainFigureCard: Card;
  secondFigureCard?: Card;
  thirdFigureCard?: Card;
  fourthFigureCard?: Card;
  fifthFigureCard?: Card;
}

// multiply by bid in reverse order
const computeResult = (hands: HandWithFigure[]) =>
  hands.reduce((acc, { bid }, index) => {
    return acc + (bid * (handsWithFigureA.length - index));
  }, 0);

const addFigureA = (hand: Hand): HandWithFigure => {
  const countByCards = cardValuesA.map((card) => ({
    card,
    count: hand.cards.filter((handCard) => handCard === card).length,
  })).filter(({ count }) => {
    return count;
  }).sort(({ card: cardA, count: countA }, { card: cardB, count: countB }) => {
    const firstOrder = countB as number - (countA as number);

    if (!firstOrder) {
      return cardValuesA.indexOf(cardB) - cardValuesA.indexOf(cardA);
    }

    return firstOrder;
  });

  const figure = countByCards.map(({ count }) => count).join(",");

  try {
    return {
      ...hand,
      figure,
      figurePower: figuresCount.indexOf(figure),
      mainFigureCard: countByCards[0].card,
      secondFigureCard: countByCards[1]?.card,
      thirdFigureCard: countByCards[2]?.card,
      fourthFigureCard: countByCards[3]?.card,
      fifthFigureCard: countByCards[4]?.card,
    };
  } catch (e) {
    console.log({ hand, countByCards, figure });
    throw e;
  }
};

const sortHands = (hands: HandWithFigure[], cardValues: readonly string[]) =>
  hands.sort((
    {
      figurePower: figurePowerA,
      cards: cardsA,
    },
    {
      figurePower: figurePowerB,
      cards: cardsB,
    },
  ) => {
    const firstOrder = figurePowerB - figurePowerA;

    if (!firstOrder) {
      const secondOrder = cardValues.indexOf(cardsB[0]) -
        cardValues.indexOf(cardsA[0]);

      if (!secondOrder) {
        const thirdOrder = cardValues.indexOf(cardsB[1]) -
          cardValues.indexOf(cardsA[1]);

        if (!thirdOrder) {
          const fourthOrder = cardValues.indexOf(cardsB[2]) -
            cardValues.indexOf(cardsA[2]);

          if (!fourthOrder) {
            const fifthOrder = cardValues.indexOf(cardsB[3]) -
              cardValues.indexOf(cardsA[3]);

            if (!fifthOrder) {
              return cardValues.indexOf(cardsB[4]) -
                cardValues.indexOf(cardsA[4]);
            }

            return fifthOrder;
          }

          return fourthOrder;
        }

        return thirdOrder;
      }

      return secondOrder;
    }

    return firstOrder;
  });

const handsWithFigureA = sortHands(hands.map(addFigureA), cardValuesA);
const resultA = computeResult(handsWithFigureA);
console.log({ resultA });

//b
const cardValuesB = [
  "J", // joker not jack
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
] as const;

const addFigureB = (hand: Hand): HandWithFigure => {
  let countByCards = cardValuesB.map((card) => ({
    card,
    count: hand.cards.filter((handCard) => handCard === card).length,
  })).filter(({ count }) => {
    return count;
  }).sort(({ card: cardA, count: countA }, { card: cardB, count: countB }) => {
    // J in last position
    if (cardA === "J") {
      return 1;
    } else if (cardB === "J") {
      return -1;
    }

    const firstOrder = countB as number - (countA as number);

    if (!firstOrder) {
      return cardValuesB.indexOf(cardB) - cardValuesB.indexOf(cardA);
    }

    return firstOrder;
  });

  // handle jokers
  if (countByCards[countByCards.length - 1].card === "J") {
    // if there is a figure
    const Jcount = countByCards.pop()!.count;

    // if JJJJJ
    if (countByCards.length === 0) {
      countByCards = [{ card: "J", count: Jcount }];
    } else {
      // add joker to any found figure
      const [mainFigureCard, ...rest] = countByCards;
      const newMainFigureCard = {
        ...mainFigureCard,
        count: mainFigureCard.count + Jcount,
      };
      countByCards = [newMainFigureCard, ...rest];
    }
  }

  const figure = countByCards.map(({ count }) => count).join(",");

  try {
    return {
      ...hand,
      figure,
      figurePower: figuresCount.indexOf(figure),
      mainFigureCard: countByCards[0].card,
      secondFigureCard: countByCards[1]?.card,
      thirdFigureCard: countByCards[2]?.card,
      fourthFigureCard: countByCards[3]?.card,
      fifthFigureCard: countByCards[4]?.card,
    };
  } catch (e) {
    console.log({ hand, countByCards, figure });
    throw e;
  }
};

const handsWithFiguresB = sortHands(hands.map(addFigureB), cardValuesB);
const resultB = computeResult(handsWithFiguresB);
console.log({ resultB });
