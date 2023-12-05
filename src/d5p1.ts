const createArrayFromRange = (start: number, length: number) => {
  return Array.from(new Array(length), (x, i) => i + start);
};

const mapNumArrToSourceDestObj = (arr: number[][]) => {
  return arr.map((y: any) => {
    return {
      sourceRangeStart: y[1],
      sourceRangeEnd: y[1] + y[2],
      destRangeStart: y[0],
      destRange: y[0] + y[2],
      rangeLength: y[2],
    };
  });
};

const fertilizerToWater = await Bun.file("inputs/d5/fertilizer-to-water.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const humidityToLocation = await Bun.file("inputs/d5/humidity-to-location.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const lightToTemperature = await Bun.file("inputs/d5/light-to-temperature.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const seedToSoil = await Bun.file("inputs/d5/seed-to-soil.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const seedNums = await Bun.file("inputs/d5/seeds.txt")
  .text()
  .then((x) => x.split(" "))
  .then((x) => x.map((y) => parseInt(y, 10)));

const soilToFertilizer = await Bun.file("inputs/d5/soil-to-fertilizer.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const temperatureToHumidity = await Bun.file(
  "inputs/d5/temperature-to-humidity.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const waterToLight = await Bun.file("inputs/d5/water-to-light.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

// to get the soil number for a given seed number
const getDestNum = (seedNum: number, sourceToDestMap: any) => {
  const seedToSoilEntry = sourceToDestMap.find(
    (x: { sourceRangeStart: number; sourceRangeEnd: number }) =>
      seedNum >= x.sourceRangeStart && seedNum < x.sourceRangeEnd
  );
  if (!seedToSoilEntry) {
    return seedNum;
  }
  const index = seedNum - seedToSoilEntry.sourceRangeStart;
  return seedToSoilEntry.destRangeStart + index;
};

const getSourceNum = (destNum: number, sourceToDestMap: any) => {
  const sourceToDestEntry = sourceToDestMap.find(
    (x: { destRangeStart: number; destRange: number }) =>
      destNum >= x.destRangeStart && destNum < x.destRange
  );
  if (!sourceToDestEntry) {
    return destNum;
  }
  const index = destNum - sourceToDestEntry.destRangeStart;
  return sourceToDestEntry.sourceRangeStart + index;
};

// seed-to-soil
// soil-to-fertilizer
// fertilizer-to-water
// water-to-light
// light-to-temperature
// temperature-to-humidity
// humidity-to-location

const getLocationSeedNum = (locationNum: number, notTest: boolean) => {
  const humidityNum = getSourceNum(
    locationNum,
    notTest ? humidityToLocation : eg_humidityToLocation
  );
  const temperatureNum = getSourceNum(
    humidityNum,
    notTest ? temperatureToHumidity : eg_temperatureToHumidity
  );
  const lightNum = getSourceNum(
    temperatureNum,
    notTest ? lightToTemperature : eg_lightToTemperature
  );
  const waterNum = getSourceNum(
    lightNum,
    notTest ? waterToLight : eg_waterToLight
  );
  const fertilizerNum = getSourceNum(
    waterNum,
    notTest ? fertilizerToWater : eg_fertilizerToWater
  );
  const soilNum = getSourceNum(
    fertilizerNum,
    notTest ? soilToFertilizer : eg_soilToFertilizer
  );
  const seedNum = getSourceNum(soilNum, notTest ? seedToSoil : eg_seedToSoil);
  return seedNum;
};

const getSeedLocationNum = (seedNum: number, notTest: boolean) => {
  const soilNum = getDestNum(seedNum, notTest ? seedToSoil : eg_seedToSoil);
  const fertilizerNum = getDestNum(
    soilNum,
    notTest ? soilToFertilizer : eg_soilToFertilizer
  );
  const waterNum = getDestNum(
    fertilizerNum,
    notTest ? fertilizerToWater : eg_fertilizerToWater
  );
  const lightNum = getDestNum(
    waterNum,
    notTest ? waterToLight : eg_waterToLight
  );
  const temperatureNum = getDestNum(
    lightNum,
    notTest ? lightToTemperature : eg_lightToTemperature
  );
  const humidityNum = getDestNum(
    temperatureNum,
    notTest ? temperatureToHumidity : eg_temperatureToHumidity
  );
  const locationNum = getDestNum(
    humidityNum,
    notTest ? humidityToLocation : eg_humidityToLocation
  );
  return locationNum;
};

const p1 = seedNums.map((x) => {
  return {
    seed: x,
    location: getSeedLocationNum(x, true),
  };
});
console.log(
  "🚀 ~ p1 ~ p1:",
  p1.sort((a, b) => a.location - b.location)
);

Bun.write("d5p1.json", JSON.stringify(p1));

const eg_fertilizerToWater = await Bun.file(
  "inputs/d5-eg2/fertilizer-to-water.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_humidityToLocation = await Bun.file(
  "inputs/d5-eg2/humidity-to-location.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_lightToTemperature = await Bun.file(
  "inputs/d5-eg2/light-to-temperature.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_seedToSoil = await Bun.file("inputs/d5-eg2/seed-to-soil.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_seedNums = await Bun.file("inputs/d5-eg2/seeds.txt")
  .text()
  .then((x) => x.split(" "))
  .then((x) => x.map((y) => parseInt(y, 10)));

const eg_soilToFertilizer = await Bun.file(
  "inputs/d5-eg2/soil-to-fertilizer.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_temperatureToHumidity = await Bun.file(
  "inputs/d5-eg2/temperature-to-humidity.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

const eg_waterToLight = await Bun.file("inputs/d5-eg2/water-to-light.txt")
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split(" ")))
  .then((x) => x.map((y) => y.map((z) => parseInt(z, 10))))
  .then((x) => mapNumArrToSourceDestObj(x));

// more tests using eg files
console.log(
  "basic test for seed 79: ",
  getSeedLocationNum(79, false),
  `${getSeedLocationNum(79, false) === 82 ? "✅" : "🚨"}`
);
console.log(
  "basic test for seed 14: ",
  getSeedLocationNum(14, false),
  `${getSeedLocationNum(14, false) === 43 ? "✅" : "🚨"}`
);
console.log(
  "basic test for seed 55: ",
  getSeedLocationNum(55, false),
  `${getSeedLocationNum(55, false) === 86 ? "✅" : "🚨"}`
);
console.log(
  "basic test for seed 13: ",
  getSeedLocationNum(13, false),
  `${getSeedLocationNum(13, false) === 35 ? "✅" : "🚨"}`
);

// tests
const egSeeds = [0, 1, 48, 49, 50, 51, 96, 97, 98, 99];

const soilToSeedVals = egSeeds.map((x) => {
  return {
    seed: x,
    soil: getDestNum(x, eg_seedToSoil),
  };
});

const expectedSoilToSeedVals = [
  {
    seed: 0,
    soil: 0,
  },
  {
    seed: 1,
    soil: 1,
  },
  {
    seed: 48,
    soil: 48,
  },
  {
    seed: 49,
    soil: 49,
  },
  {
    seed: 50,
    soil: 52,
  },
  {
    seed: 51,
    soil: 53,
  },
  {
    seed: 96,
    soil: 98,
  },
  {
    seed: 97,
    soil: 99,
  },
  {
    seed: 98,
    soil: 50,
  },
  {
    seed: 99,
    soil: 51,
  },
];

const isTestPassed =
  JSON.stringify(soilToSeedVals) === JSON.stringify(expectedSoilToSeedVals);

if (isTestPassed) {
  console.log("✅ ~ Test Passed");
} else {
  console.log("🚨 ~ Test Failed");
}

// p2

const seeds = [79, 14, 55, 13];
const p2EgSeeds = seeds
  .map((x, idx) => {
    if (idx === 0 || idx % 2 === 0) {
      return {
        seedNumStart: x,
        seedNumEnd: x + seeds[idx + 1] - 1,
      };
    }
  })
  .filter((x) => x !== undefined);

console.log("🚀 ~p2EgSeeds:", p2EgSeeds);
console.log("🚀 ~eg_humidityToLocation:", eg_humidityToLocation);

eg_humidityToLocation;
const p2Eg = seedNums.map((x) => {
  return {
    seed: x,
    location: getSeedLocationNum(x, true),
  };
});

// todo: idea is to go from location (need to account for there not being a humid <-> location mapping, you just use the humid value)
// and start from the lowest location number until you hit a valid seed

console.log(
  "eg_humidityToLocation:",
  eg_humidityToLocation
    .sort((a, b) => a.destRangeStart - b.destRangeStart)
    .map((x) => x.destRangeStart)
);

console.log(
  "eg_temperatureToHumidity:",
  eg_temperatureToHumidity.sort((a, b) => a.destRangeStart - b.destRangeStart)
);
