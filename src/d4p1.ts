const data = await Bun.file("inputs/d4p1.txt")
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

const arrWithScores = arrObjs.map((obj) => {
  const { winningNums, cardNums } = obj;
  const score = winningNums.reduce((acc, curr) => {
    if (cardNums.includes(curr)) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return { ...obj, score };
});

const getScore = (score: number) => {
  if (score === 0) return 0;
  return Math.pow(2, score - 1);
};

const realScores = arrWithScores.map((obj) => {
  const { score } = obj;
  return getScore(score);
});

const sumRealScores = realScores.reduce((acc, curr) => acc + curr, 0);

console.log("🚀 ~ sumRealScores ~ sumRealScores:", sumRealScores);
