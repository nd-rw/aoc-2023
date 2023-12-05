const createArrayFromRange = (start: number, length: number) => {
  return Array.from(new Array(length), (x, i) => i + start);
};

const seedNums = await Bun.file("inputs/d5-eg/seeds.txt")
  .text()
  .then((x) => x.split(" "));

const seedToSoil = await Bun.file("inputs/d5-eg/seed-to-soil.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) =>
    x.map((y) => {
      return {
        destRangeStart: y[0],
        sourceRangeStart: y[1],
        rangeLength: y[2],
        sourceRange: createArrayFromRange(y[1], y[2]),
        destRange: createArrayFromRange(y[0], y[2]),
      };
    })
  );

// to get the soil number for a given seed number
const getSoilNum = (seedNum: number) => {
  const seedToSoilEntry = seedToSoil.find((x) =>
    x.sourceRange.includes(seedNum)
  );
  if (!seedToSoilEntry) {
    return seedNum;
  }
  const index = seedToSoilEntry.sourceRange.indexOf(seedNum);
  return seedToSoilEntry.destRange[index];
};

const egSeeds = [0, 1, 48, 49, 50, 51, 96, 97, 98, 99];

const soilToSeedVals = egSeeds.map((x) => {
  return {
    seed: x,
    soil: getSoilNum(x),
  };
});

console.log("🚀 ~ soilToSeedVals ~ soilToSeedVals:", soilToSeedVals);
