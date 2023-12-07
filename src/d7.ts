const cardToNumDict = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const egMode = true;

// const strHandToIntVal = (hand: string) => {
//   return parseInt(
//     hand
//       .split("")
//       .map((x) => cardToNumDict[x as keyof typeof cardToNumDict])
//       .toString()
//       .replaceAll(",", "")
//   );
// };

const strHandToValArray = (hand: string) => {
  return hand
    .split("")
    .map((x) => cardToNumDict[x as keyof typeof cardToNumDict]);
};

const handsOfCards = await Bun.file(
  egMode ? "inputs/d7p1-eg.txt" : "inputs/d7p1.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((hands) => {
    return hands.map((hand) => {
      return {
        hand: hand[0],
        handValArray: strHandToValArray(hand[0]),
        bet: parseInt(hand[1]),
      };
    });
  });
console.log("🚀 ~ handsOfCards:", handsOfCards);

const isFiveOfAKind = (hand: number[]) => {
  return hand.every((x) => x === hand[0]);
};

const isFourOfAkind = (hand: number[]) => {
  const handSorted = hand.sort((a, b) => a - b);
  return (
    handSorted[0] === handSorted[1] &&
    handSorted[1] === handSorted[2] &&
    handSorted[2] === handSorted[3]
  );
};

const isFullHouse = (hand: number[]) => {
  const handSorted = hand.sort((a, b) => a - b);
  return (
    handSorted[0] === handSorted[1] &&
    handSorted[1] === handSorted[2] &&
    handSorted[3] === handSorted[4]
  );
};

const isThreeOfAKind = (hand: number[]) => {
  for (const card of hand) {
    const numMatches = hand.filter((x) => x === card).length;
    if (numMatches === 3) {
      return true;
    }
  }
  return false;
};

const isTwoPair = (hand: number[]) => {
  let cardWithPair: number | null = null;
  for (const card of hand) {
    const numMatches = hand.filter((x) => x === card).length;
    if (numMatches === 2) {
      cardWithPair = card;
    }
  }

  if (cardWithPair === null) {
    return false;
  }

  let remainingHand = hand.filter((card) => card !== cardWithPair);
  for (const card of remainingHand) {
    const numMatches = remainingHand.filter((x) => x === card).length;
    if (numMatches === 2) {
      return true;
    }
  }

  return false;
};

const isOnePair = (hand: number[]) => {
  for (const card of hand) {
    const numMatches = hand.filter((x) => x === card).length;
    if (numMatches === 2) {
      return true;
    }
  }
  return false;
};

const isHighCard = (hand: number[]) => {
  const handSorted = hand.sort((a, b) => a - b);
  return (
    handSorted[0] !== handSorted[1] &&
    handSorted[1] !== handSorted[2] &&
    handSorted[2] !== handSorted[3] &&
    handSorted[3] !== handSorted[4]
  );
};

const whatHandIsThis = (hand: number[]) => {
  if (isFiveOfAKind(hand)) {
    return { handTypeName: "5kind", handTypeVal: 7 };
  } else if (isFourOfAkind(hand)) {
    return { handTypeName: "4kind", handTypeVal: 6 };
  } else if (isFullHouse(hand)) {
    return { handTypeName: "fhouse", handTypeVal: 5 };
  } else if (isThreeOfAKind(hand)) {
    return { handTypeName: "3kind", handTypeVal: 4 };
  } else if (isTwoPair(hand)) {
    return { handTypeName: "2pair", handTypeVal: 3 };
  } else if (isOnePair(hand)) {
    return { handTypeName: "1pair", handTypeVal: 2 };
  } else if (isHighCard(hand)) {
    return { handTypeName: "high", handTypeVal: 1 };
  } else {
    return { handTypeName: "no", handTypeVal: 0 };
  }
};

const getHandTypeVal = (hand: number[]) => {
  return whatHandIsThis(hand);
};

const proHands = handsOfCards.map((hand) => {
  const { handTypeName, handTypeVal } = getHandTypeVal(hand.handValArray);
  return {
    hand: hand.hand,
    handValArray: hand.handValArray,
    bet: hand.bet,
    handTypeName,
    handTypeVal,
  };
});
console.log("🚀 ~ proHands ~ proHands:", proHands);

const compareHands = (hand1: number[], hand2: number[]) => {
  for (const [index, cardNum] of hand1.entries()) {
    if (cardNum !== hand2[index]) {
      return cardNum - hand2[index] < 0 ? 1 : -1;
    }
  }
  return 0;
};

// sort pro hands by hand type val and if they have the same hand type val
// sort them by handSecondaryVal descending
const sortedProHands = proHands.sort((a, b) => {
  if (a.handTypeVal === b.handTypeVal) {
    return compareHands(a.handValArray, b.handValArray);
  } else {
    return b.handTypeVal - a.handTypeVal;
  }
});

sortedProHands.forEach((hand) => {
  console.log(
    `Hand: ${hand.hand} | Bet: ${hand.bet} | Hand Type: ${hand.handTypeName}`
  );
});
console.log("🚀 ~ sortedProHands ~ sortedProHands:", sortedProHands);

// write a function that will return the hand with the highest card for compared to another hand's index
// if they are the same try to compare the next value in both arrays
