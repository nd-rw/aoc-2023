const egMode = true;

const reflectionLogs = await Bun.file(
  egMode ? "inputs/d13-eg.txt" : "inputs/d13.txt"
)
  .text()
  .then((log) => log.split("\n\n"));

console.log("first ref: ");
console.log(" ");
console.log(reflectionLogs[0]);

const getHorozontalRows = (log: string) => {
  return log.split("\n").map((row) => row.split(""));
};

const getVerticalRows = (log: string) => {
  const horozontalRows = getHorozontalRows(log);
  const verticalRows = [];

  for (let i = 0; i < horozontalRows[0].length; i++) {
    verticalRows.push(horozontalRows.map((row) => row[i]));
  }

  return verticalRows;
};

const findHorozontalReflectionPoint = (log: string) => {
  const horozontalRows = getHorozontalRows(log);

  for (let i = 0; i < horozontalRows.length; i++) {
    if (horozontalRows[i] === horozontalRows[i + 1]) {
      if (checkCompleteHorozontalReflection(horozontalRows, i, i + 1)) {
        return [];
      }
    }
  }

  return false;
};

const checkCompleteHorozontalReflection = (
  rows: string[][],
  startIndex: number,
  endIndex: number
) => {
  const stepDirection = startIndex < rows.length - endIndex ? -1 : 1;

  if (stepDirection > 0) {
    for (let i = endIndex; i < rows.length; i++) {
      if (rows[i] !== rows[i + 1]) {
        return false;
      }
    }
    return true;
  }

  if (stepDirection < 0) {
    for (let i = startIndex; i > 0; i--) {
      if (rows[i] !== rows[i - 1]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};
