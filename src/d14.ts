const egMode = false;

const rockLogs = await Bun.file(egMode ? "inputs/d14-eg.txt" : "inputs/d14.txt")
  .text()
  .then((log) => log.split("\n"));

const rockLogToColumns = (rockLogs: string[]) => {
  const columns = [];
  for (let i = 0; i < rockLogs[0].length; i++) {
    columns.push(rockLogs.map((row) => row[i]));
  }
  return columns;
};

const columns = rockLogToColumns(rockLogs);

const pushColRocksNorth = (array: string[]) => {
  let updatedArray = array;
  let updatedArrayFinished = isArrayPushed(updatedArray);
  let i = 0;
  do {
    updatedArrayFinished = isArrayPushed(updatedArray);
    if (updatedArray[i] === "O" && updatedArray[i - 1] === ".") {
      updatedArray[i - 1] = "O";
      updatedArray[i] = ".";
    }
    i = i + 1;
    if (i > updatedArray.length) {
      i = 0;
    }
  } while (!updatedArrayFinished);
  return updatedArray;
};

const isArrayPushed = (array: string[]) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] === "O" && array[i - 1] === ".") {
      return false;
    }
  }
  return true;
};

const pushAllRocksNorth = (columns: string[][]) =>
  columns.map((column) => pushColRocksNorth(column));

// const pushAllRocksEast = (columns: string[][]) =>
//   columns.map((column) => pushColRocksNorth(column));

const allColumnsPushedNorth = pushAllRocksNorth(columns);

// value for each column is the amount of "O" inside each array, multiplied by the length of the array minus the index of the column
// const calculateColumnValue = (column: string[], index: number) => {
const getColumnValue = (column: string[], index: number) => {
  const columnValue = column.reduce((acc, curr) => {
    if (curr === "O") {
      return acc + 1;
    }
    return acc;
  }, 0);
  return columnValue * (column.length - index);
};

const columnsToRows = (columns: string[][]) => {
  const rows = [];
  for (let i = 0; i < columns.length; i++) {
    const row = [];
    for (let j = 0; j < columns.length; j++) {
      row.push(columns[j][i]);
    }
    rows.push(row);
  }
  return rows;
};

const rows = columnsToRows(allColumnsPushedNorth);

const columnValues = rows.map((column, index) => {
  return {
    val: getColumnValue(column, index),
    index,
  };
});

const p1TotalValue = columnValues.reduce((acc, curr) => {
  return acc + curr.val;
}, 0);

if (p1TotalValue === 105623) {
  console.log("✅");
  console.log("✅");
  console.log("✅");
  console.log("✅part one passed✅");
} else {
  console.log("❌");
  console.log("❌");
  console.log("❌");
  console.log("❌part one FAILED ❌");
}
