// const data = await Bun.file("inputs/d4p1.txt")
const data = await Bun.file("inputs/d4-eg.txt")
  .text()
  .then((x) => x.split("\n"));

const arrObjs = data.map((scratchCard) => {
  const splitOnColon = scratchCard.split(":");
  return {
    title: splitOnColon[0],
    numsRaw: splitOnColon[1],
    winningNums: splitOnColon[1]
      .split("|")[0]
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x)),
    cardNums: splitOnColon[1]
      .split("|")[1]
      .split(" ")
      .map((x) => parseInt(x))
      .filter((x) => !isNaN(x)),
  };
});

const arrWithNumMatches = arrObjs.map((obj) => {
  const { winningNums, cardNums } = obj;
  const numMatches = winningNums.reduce((acc, curr) => {
    if (cardNums.includes(curr)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return { ...obj, numMatches };
});

const getScore = (score: number) => {
  if (score === 0) return 0;
  return Math.pow(2, score - 1);
};

const realScores = arrWithNumMatches.map((obj) => {
  const { numMatches } = obj;
  return getScore(numMatches);
});

const summedRealScores = realScores.reduce((acc, curr) => acc + curr, 0);

const partTwoData = arrWithNumMatches.map((obj, idx) => {
  return {
    cardTitle: obj.title,
    cardID: idx + 1,
    numMatches: obj.numMatches,
    version: 0,
  };
});

console.log("🚀 ~ sumRealScores ~ sumRealScores:", summedRealScores);
console.log("🚀 ~ arrWithScores ~ arrWithScores:", arrWithNumMatches);
console.log("🚀 ~ partTwoData ~ partTwoData:", partTwoData);

// lazy copy, don't want a reference
const allCards = JSON.parse(JSON.stringify(partTwoData));

partTwoData.forEach((obj, idx) => {
  if (obj.numMatches <= 0) {
    return;
  }
});
