const egMode = true;

const springLogs = await Bun.file(
  egMode ? "inputs/d12-eg.txt" : "inputs/d12.txt"
)
  .text()
  .then((x) => x.split("\n"))
  .then((log) => log.map((x) => x.split(" ")))
  .then((logListArray) =>
    logListArray.map((logList) => {
      return {
        logStr: logList[0],
        logArray: logList[1].split(",").map(Number),
      };
    })
  );

const secondSpringLog = springLogs[1];

const findFirstIndexOfPotentialSpring = (logStr: string, startFrom: number) => {
  const strToUse = logStr.substring(startFrom, logStr.length);
  const firstStrValIndexStart = strToUse.indexOf("?")
    ? strToUse.indexOf("?")
    : strToUse.indexOf("#") ?? false;

  if (!firstStrValIndexStart) {
    throw new Error("No ? or # found in logStr");
  }
  return firstStrValIndexStart + startFrom;
};

const getRelevantStrsForLogArray = (logStr: string, logArray: number[]) => {
  const firstStrValIndexStart = findFirstIndexOfPotentialSpring(logStr, 0);

  let firstStrValIndexEnd = firstStrValIndexStart;
  for (let i = firstStrValIndexStart + 1; i <= logStr.length; i++) {
    if (logStr[i] === "?" || logStr[i] === "#") {
      firstStrValIndexEnd = i;
    } else {
      break;
    }
  }

  const secondStrValIndexStart = findFirstIndexOfPotentialSpring(
    logStr,
    firstStrValIndexEnd + 1
  );

  let secondStrValIndexEnd = secondStrValIndexStart;
  for (let i = secondStrValIndexStart + 1; i <= logStr.length; i++) {
    if (logStr[i] === "?" || logStr[i] === "#") {
      secondStrValIndexEnd = i;
    }
    if (logStr[i] === ".") {
      break;
    }
  }

  const thirdStrValIndexStart = findFirstIndexOfPotentialSpring(
    logStr,
    secondStrValIndexEnd + 1
  );

  let thirdStrValIndexEnd = thirdStrValIndexStart;
  for (let i = thirdStrValIndexStart + 1; i <= logStr.length; i++) {
    if (logStr[i] === "?" || logStr[i] === "#") {
      thirdStrValIndexEnd = i;
    }
    if (logStr[i] === ".") {
      break;
    }
  }

  return {
    firstStrValIndexStart,
    firstStrValIndexEnd,
    secondStrValIndexStart,
    secondStrValIndexEnd,
    thirdStrValIndexStart,
    thirdStrValIndexEnd,
  };
};

const f = getRelevantStrsForLogArray(
  secondSpringLog.logStr,
  secondSpringLog.logArray
);
console.log(f);
