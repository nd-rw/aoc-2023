const egMode = true;

const galaxyMap = await Bun.file(
  egMode ? "inputs/d11-eg.txt" : "inputs/d11.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((x) => x.map((y) => y.split("")));

const z = galaxyMap.map((row, yIndex) => {
  let galaxyNum = 0;
  return row.map((coOrd, xIndex) => {
    galaxyNum++;
    return {
      galaxyNum: coOrd === "#" ? galaxyNum : null,
      x: xIndex,
      y: yIndex,
    };
  });
});

const shortestPath = (startCoords: number[], endCoords: number[]) => {
  const [startX, startY] = startCoords;
  const [endX, endY] = endCoords;
  const xDiff = Math.abs(startX - endX);
  const yDiff = Math.abs(startY - endY);
  return xDiff + yDiff;
};

// write a filter that will find the object with the galaxyNum of 1
// using the filter method on the z array
// console.log("z: ", z);
const galaxyOne = z
  .map((row) => row.filter((galaxy) => galaxy.galaxyNum === 1))
  .filter((row) => row.length > 0)[0][0];

console.log("f", z[0]);
console.log("🚀 ~ galaxyOne:", galaxyOne);

// write a function that returns all of the unique pairs of numbers between 1 and 9
// pairs like [1, 2] and [2, 1] are considered the same so only return one of those
// the pairs should be returned as an array of arrays

const pairs = () => {
  const pairs = [];
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      if (i !== j) {
        pairs.push([i, j]);
      }
    }
  }
  return pairs;
};

// console.log("pairs: ", pairs().length);
